(() => {
  "use strict";

  const data = window.PREVIEW_DATA;
  const visuals = window.WORKBENCH_VISUALS;
  const records = [...data.records].sort((a, b) => (b.scoreExact ?? b.score) - (a.scoreExact ?? a.score) || a.uid.localeCompare(b.uid));
  const tiers = { red: "高分区间", orange: "中分区间", green: "常态观察" };
  const tierClasses = { red: "tier-high", orange: "tier-mid", green: "tier-low" };
  const qualityLabels = { HIGH_CONFIDENCE: "记录充分", MEDIUM_CONFIDENCE: "基本可用", LOW_CONFIDENCE_DEFERRED: "暂缓判定" };
  const pages = { insights: "全景首页", analysis: "分布分析", overview: "跟进总览", workspace: "个案工作台", research: "研究说明" };
  const stages = ["pending", "contact", "followup", "archived"];
  const stageInfo = {
    pending: { label: "待复核", description: "先看行为依据与数据质量", action: "完成复核，进入待沟通", next: "contact" },
    contact: { label: "待沟通", description: "记录需要进一步了解的情境", action: "记录沟通，进入跟进", next: "followup" },
    followup: { label: "跟进中", description: "整理演练中的后续观察要点", action: "完成本次演练并归档", next: "archived" },
    archived: { label: "已归档", description: "保留本次演练的过程与摘要", action: "重新纳入复核演练", next: "pending" }
  };
  const dimensions = [
    { key: "spatial_residence", field: "residence_hours_daily", name: "居住地点驻留", short: "居住驻留", unit: "小时 / 日", digits: 2 },
    { key: "study_engagement", field: "study_hours_daily", name: "学习地点驻留", short: "学习驻留", unit: "小时 / 日", digits: 2 },
    { key: "circadian_night_unlock", field: "night_unlock_times", name: "夜间手机点亮", short: "夜间点亮", unit: "次 / 夜", digits: 1 }
  ];
  const state = { selected: data.metadata.showcaseUid, tab: "profile", synthetic: false, scoreBin: null, scatterMetric: "residence_hours_daily", scatterSelected: data.metadata.showcaseUid, care: new Map(), reports: new Map(), eventSequence: 0 };
  const byId = id => document.getElementById(id);
  const escape = value => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  const fixed = (value, digits = 3) => Number(value).toFixed(digits);
  const signed = value => `${value > 0 ? "+" : ""}${fixed(value, 2)}`;
  const getRecord = uid => records.find(record => record.uid === uid);
  const stageOf = uid => state.care.get(uid)?.stage || "pending";
  const attentionRecords = () => records.filter(record => record.tier !== "green" || state.care.has(record.uid));
  const countTier = tier => records.filter(record => record.tier === tier).length;
  const countQuality = quality => records.filter(record => record.quality === quality).length;
  const tierTag = record => `<span class="tier-tag ${tierClasses[record.tier]}">${tiers[record.tier]}</span>`;
  const workflowBadge = record => `<span class="workflow-badge">${stageInfo[stageOf(record.uid)].label}</span>`;
  const avatar = (uid, large = false) => `<span class="avatar${large ? " avatar-large" : ""}" aria-hidden="true">${uid.slice(0, 2).toUpperCase()}</span>`;
  const scoreBin = score => Math.min(9, Math.floor(score * 10));

  function facts(record) {
    return dimensions.map(dimension => ({ ...dimension, value: record.behavior[dimension.field], z: record.deviations[dimension.key] }));
  }

  function strongestFact(record) {
    return [...facts(record)].sort((a, b) => Math.abs(b.z) - Math.abs(a.z))[0];
  }

  function factLabel(fact) {
    return Math.abs(fact.z) <= 1 ? `${fact.short}接近均值` : `${fact.short}${fact.z > 0 ? "偏高" : "偏低"}`;
  }

  function profileSentence(record) {
    const fact = strongestFact(record);
    if (Math.abs(fact.z) <= 1) return "当前展示的三项行为指标都在队列均值附近，可结合其他信息阅读筛查分数。";
    return `${fact.name}${fact.z > 0 ? "高于" : "低于"}队列均值 ${fixed(Math.abs(fact.z), 2)} 个标准差，是三项展示指标中差异较明显的一项。`;
  }

  function readingAdvice(record) {
    if (record.quality === "MEDIUM_CONFIDENCE") return "先核查采集覆盖与设备使用情境，再阅读行为差异。";
    const fact = strongestFact(record);
    if (Math.abs(fact.z) <= 1) return "这三项指标不足以单独解释分数，可结合其他记录与实际情境进一步了解。";
    if (fact.key === "spatial_residence") return "可先核对居住地点识别与日常安排，了解驻留记录所处的情境。";
    if (fact.key === "circadian_night_unlock") return "可先核对设备点亮记录与实际使用习惯，了解夜间记录所处的情境。";
    return "可先了解学习活动地点与采集覆盖，核对地点驻留是否完整反映日常安排。";
  }

  function announce(message) {
    byId("app-status").textContent = message;
  }

  function setPage(page) {
    const selected = pages[page] ? page : "insights";
    document.querySelectorAll(".page").forEach(section => { section.hidden = section.id !== `page-${selected}`; });
    document.querySelectorAll("[data-page]").forEach(button => {
      if (button.dataset.page === selected) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });
    if (selected !== "insights") {
      document.body.classList.remove("presentation-mode");
      byId("presentation-toggle").textContent = "展开汇报视图";
      byId("presentation-toggle").setAttribute("aria-pressed", "false");
    }
    byId("breadcrumb").textContent = `研究空间 / ${pages[selected]}`;
    document.title = `${pages[selected]} · 观微`;
    if (location.protocol === "file:") location.hash = selected;
    else history.replaceState(null, "", `#${selected}`);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function cohortDonut() {
    const radius = 87;
    const circumference = 2 * Math.PI * radius;
    let offset = 0;
    const filters = { red: "high", orange: "medium", green: "normal" };
    const circles = ["red", "orange", "green"].map((tier, index) => {
      const length = countTier(tier) / records.length * circumference;
      const circle = `<circle class="donut-segment" cx="120" cy="120" r="${radius}" fill="none" stroke="var(--${["text", "muted", "line"][index]})" stroke-width="17" stroke-dasharray="${Math.max(0, length - 4)} ${circumference - length + 4}" stroke-dashoffset="${-offset}" transform="rotate(-90 120 120)" data-viz-filter="${filters[tier]}" role="button" tabindex="0" aria-label="${tiers[tier]} ${countTier(tier)} 人，点击查看名单"><title>${tiers[tier]} · ${countTier(tier)} 人 · 点击查看名单</title></circle>`;
      offset += length;
      return circle;
    }).join("");
    return `<div class="donut-layout"><div class="cohort-donut"><svg viewBox="0 0 240 240" role="group" aria-label="209人队列，点选分段可进入对应名单">${circles}<text x="120" y="119" text-anchor="middle" class="donut-number">${records.length}</text><text x="120" y="143" text-anchor="middle" class="donut-caption">匿名研究记录</text></svg></div><div class="donut-legend">${["red", "orange", "green"].map((tier, index) => `<button class="legend-item" data-viz-filter="${filters[tier]}"><span class="square shade-${index + 1}" aria-hidden="true"></span><span>${tiers[tier]}</span><strong>${countTier(tier)}<small> 人</small></strong></button>`).join("")}</div></div>`;
  }

  function renderOverview() {
    const featured = getRecord(data.metadata.showcaseUid);
    const queue = attentionRecords();
    byId("care-flow").innerHTML = visuals.careFlow(queue, stageOf, stageInfo);
    byId("home-hero").innerHTML = `<div class="hero-copy"><span class="eyebrow">校园关怀 · 行为数据辅助研究</span><h1 class="hero-title" id="home-title">看清记录<br>安排下一步</h1><p class="hero-description">先看群体分布，再查看个案，记录后续安排</p><div class="hero-actions"><button class="button button-primary" data-open-case="${featured.uid}">从一份个案开始 <span aria-hidden="true">↗</span></button><button class="button button-quiet" data-page="insights">查看群体态势</button></div><div class="hero-footnote">离线研究结果 <span aria-hidden="true">·</span> 演示分级 <span aria-hidden="true">·</span> 人工复核</div></div><div class="hero-visual"><div class="cohort-composition">${cohortDonut()}<div class="preview-person">${avatar(featured.uid)}<div class="preview-person-copy"><strong>匿名参与者 <span class="mono">${featured.uid}</span></strong><span>${factLabel(strongestFact(featured))} · ${featured.behavior.sensing_days} 天感知记录</span></div><button class="button button-small button-quiet" data-open-case="${featured.uid}" aria-label="打开典型个案画像">查看 ↗</button></div></div></div>`;
    const actions = [
      { id: "high", number: countTier("red"), title: "高分记录，先看依据", note: "进入高分区间的人工复核入口" },
      { id: "quality", number: countQuality("MEDIUM_CONFIDENCE"), title: "采集质量，先核查", note: "基本可用记录，需要结合覆盖情况阅读" },
      { id: "attention", number: queue.length, title: "关注名单，继续跟进", note: "中、高分记录及本次手动演练个案" }
    ];
    byId("overview-stats").innerHTML = actions.map((action, index) => `<button class="action-card" data-open-filter="${action.id}"><span class="action-icon" aria-hidden="true">${visuals.icon(["target", "shield", "flow"][index], 22)}</span><span class="action-text"><span>${action.title}</span><strong class="action-number">${action.number}<small> 份</small></strong><span>${action.note}</span></span><span class="action-arrow" aria-hidden="true">↗</span></button>`).join("");
    byId("care-stages").innerHTML = stages.map((stage, index) => `<button class="stage-summary" data-open-stage="${stage}"><span class="stage-index">${visuals.icon(["target", "person", "flow", "shield"][index], 16)}</span><strong class="stage-count">${queue.filter(record => stageOf(record.uid) === stage).length}</strong><span class="stage-name">${stageInfo[stage].label}</span><p>${stageInfo[stage].description}</p></button>`).join("");
    const priority = queue.filter(record => stageOf(record.uid) === "pending").slice(0, 4);
    byId("priority-grid").innerHTML = priority.length ? priority.map(record => `<button class="priority-card" data-open-case="${record.uid}"><span class="priority-top">${avatar(record.uid)}<span class="uid-name"><span>匿名参与者</span><strong class="mono">${record.uid}</strong></span>${tierTag(record)}</span><p class="priority-reason">${profileSentence(record)}</p><span class="priority-bottom">${workflowBadge(record)}<span>查看画像 ↗</span></span></button>`).join("") : '<div class="empty-state">当前关注名单没有待复核的演练记录。<br>可通过上方阶段查看后续进展。</div>';
    byId("quality-insight").innerHTML = `<span class="eyebrow">看分数，也看记录是否充分</span><h3>先检查采集质量</h3><div class="quality-callout">${countQuality("MEDIUM_CONFIDENCE")}<small> 份基本可用记录</small></div><p>采集质量与分数分别呈现。先核查记录情境，有助于更完整地阅读行为差异。</p><button class="button button-quiet" data-open-filter="quality">查看这些记录 ↗</button><p class="source-note">真实暂缓 ${countQuality("LOW_CONFIDENCE_DEFERRED")} 人 · <button class="inline-button" data-show-synthetic>查看合成示例</button></p>`;
    const events = [...state.care.entries()].flatMap(([uid, care]) => care.events.map(event => ({ ...event, uid }))).sort((a, b) => b.sequence - a.sequence).slice(0, 3);
    byId("recent-activity").innerHTML = events.length ? events.map(event => `<button class="event-item" data-open-case="${event.uid}"><span class="event-dot" aria-hidden="true"></span><span class="event-copy"><strong class="mono">${event.uid}</strong><span>演练进入${stageInfo[event.to].label}</span><span class="event-time">${event.time}</span></span></button>`).join("") : '<p class="muted recent-empty">从个案页记录一次复核，这里会显示本次演练的推进过程。</p>';
  }

  function resetFilters() {
    byId("workspace-search").value = "";
    byId("workspace-tier").value = "all";
    byId("workspace-quality").value = "all";
    byId("workspace-stage").value = "all";
    state.scoreBin = null;
  }

  function workspaceRecords() {
    const search = byId("workspace-search").value.trim().toLowerCase();
    const tier = byId("workspace-tier").value;
    const quality = byId("workspace-quality").value;
    const stage = byId("workspace-stage").value;
    return records.filter(record => record.uid.toLowerCase().includes(search) && (tier === "all" || (tier === "attention" ? record.tier !== "green" || state.care.has(record.uid) : tier === "screened" ? record.tier !== "green" : record.tier === tier)) && (quality === "all" || record.quality === quality) && (stage === "all" || stageOf(record.uid) === stage) && (state.scoreBin === null || scoreBin(record.scoreExact ?? record.score) === state.scoreBin));
  }

  function renderWorkspace(resetSelection = false) {
    const filtered = workspaceRecords();
    if (resetSelection) {
      state.synthetic = false;
      state.tab = "profile";
      if (!filtered.some(record => record.uid === state.selected)) state.selected = filtered[0]?.uid || null;
    }
    byId("workspace-count").textContent = `符合条件 ${filtered.length} / ${records.length} 人`;
    byId("workspace-range").hidden = state.scoreBin === null;
    byId("workspace-range").innerHTML = state.scoreBin === null ? "" : `<span>展示分数 ${fixed(state.scoreBin / 10, 1)}–${fixed((state.scoreBin + 1) / 10, 1)}</span><button class="inline-button" data-clear-range>清除</button>`;
    byId("case-list").innerHTML = filtered.length ? filtered.map(record => `<button class="case-item" data-select-case="${record.uid}" aria-pressed="${!state.synthetic && state.selected === record.uid}"><span class="case-item-top"><span class="mono">${record.uid}</span><strong>${fixed(record.score)}</strong></span><span class="case-reason">${factLabel(strongestFact(record))}</span><span class="case-item-bottom"><span>${tiers[record.tier]}</span><span>${stageInfo[stageOf(record.uid)].label}</span></span></button>`).join("") : '<div class="empty-state">没有匹配的记录。<br>调整筛选条件后再查看。</div>';
    renderDetail();
  }

  function openCase(uid, tab = "profile") {
    resetFilters();
    state.selected = uid;
    state.synthetic = false;
    state.tab = tab;
    renderWorkspace();
    setPage("workspace");
    byId("case-list").querySelector('[aria-pressed="true"]')?.scrollIntoView({ block: "nearest", behavior: "auto" });
  }

  function openFilter(kind, stage = "all") {
    resetFilters();
    if (kind === "high") byId("workspace-tier").value = "red";
    if (kind === "medium") byId("workspace-tier").value = "orange";
    if (kind === "normal") byId("workspace-tier").value = "green";
    if (kind === "screened") byId("workspace-tier").value = "screened";
    if (kind === "qualityHigh") byId("workspace-quality").value = "HIGH_CONFIDENCE";
    if (kind === "quality") byId("workspace-quality").value = "MEDIUM_CONFIDENCE";
    if (kind === "attention") byId("workspace-tier").value = "attention";
    byId("workspace-stage").value = stage;
    renderWorkspace(true);
    setPage("workspace");
  }

  function deviationChart(record) {
    return visuals.deviationMarkup(facts(record));
  }

  function profilePanel(record) {
    const items = facts(record);
    return `<section class="detail-section"><div class="section-head"><h3>这份记录的行为特点</h3><span class="muted">观测窗口内汇总</span></div><div class="profile-evidence-grid">${items.map(item => `<div class="metric-evidence"><span>${item.name}</span><strong>${fixed(item.value, item.digits)}</strong><span>${item.unit}</span><p class="metric-comparison">${factLabel(item)}<br><span>${signed(item.z)} 个标准差</span></p></div>`).join("")}</div></section><section class="profile-chart-block"><div class="section-head"><h3>和群体均值比一比</h3><span class="muted">标准化偏离</span></div>${deviationChart(record)}<div class="observation-list"><div><strong>核查切口</strong><p>${readingAdvice(record)}</p></div><div><strong>阅读范围</strong><p>这三项汇总指标提供行为线索。心理状态与变化原因仍需结合其他信息，由人工进一步了解。</p></div></div></section><div class="data-availability"><strong>数据范围</strong><span>当前为汇总行为记录；逐日情绪、个人历史轨迹尚未接入。</span></div>`;
  }

  function qualityPanel(record) {
    return `<section class="detail-section"><h3>看看采集记录是否足够</h3><div class="detail-meta quality-metadata"><div class="detail-meta-item"><span>已导出的质量分层</span><strong>${qualityLabels[record.quality]}</strong></div><div class="detail-meta-item"><span>有效感知记录</span><strong>${record.behavior.sensing_days} 天</strong></div></div><div class="profile-insight"><span>阅读建议</span><p>${readingAdvice(record)}</p></div></section><section class="detail-section"><h3>质量分层依据</h3><ul class="research-list"><li><strong>记录充分：</strong>感知天数 ≥ 45 且覆盖率 ≥ 0.80。</li><li><strong>基本可用：</strong>感知天数 ≥ 28 且覆盖率 ≥ 0.50，未达上一档。</li><li><strong>暂缓判定：</strong>不满足上述条件。</li></ul><p class="source-note">沿用成果包已导出的分层；每人的原始覆盖率未包含在展示数据中。数据覆盖充分不等于模型判断准确。</p></section><button class="button" data-show-synthetic>查看数据不足时的合成演示 ↗</button>`;
  }

  function workflowPanel(record) {
    const stage = stageOf(record.uid);
    const current = stages.indexOf(stage);
    const events = state.care.get(record.uid)?.events || [];
    return `<section class="detail-section"><div class="section-head"><h3>记录下一步</h3><span class="demo-label">本机流程演练</span></div><div class="flow-stepper">${stages.map((key, index) => `<div class="flow-step${index === current ? " is-current" : index < current ? " is-complete" : ""}"><span>${visuals.icon(["target", "person", "flow", "shield"][index], 14)}</span><strong>${stageInfo[key].label}</strong></div>`).join("")}</div><div class="workflow-compose"><p class="next-step-description">${stageInfo[stage].description}。填写一条演练备注后，可推进到下一阶段。</p><label for="workflow-note">本次演练记录</label><textarea id="workflow-note" class="workflow-note" rows="3" maxlength="300" placeholder="例如：已核对记录覆盖情况，下一步演练沟通安排。"></textarea><div class="workflow-actions"><span class="muted">仅记录演练信息，最多 300 字</span><button class="button button-primary" data-advance-care>${stageInfo[stage].action}</button></div></div><p class="workflow-disclaimer">这些阶段与备注仅在本次页面会话中演示，不代表已发生真实复核、访谈或危机解除。刷新后清空，不改动研究数据。</p></section><section class="detail-section"><h3>跟进时间轴</h3>${events.length ? `<ol class="care-timeline">${events.map(event => `<li class="timeline-entry"><span class="timeline-node" aria-hidden="true"></span><div class="timeline-content"><h4>演练进入${stageInfo[event.to].label}</h4><time>${event.time}</time><p>${escape(event.note)}</p></div></li>`).join("")}</ol>` : '<div class="timeline-empty"><strong>从第一条复核记录开始</strong><p>完成上方演练后，这里会依次呈现阶段与备注。</p></div>'}</section>`;
  }

  function makeReport(record) {
    const events = state.care.get(record.uid)?.events || [];
    const behavior = facts(record).map(item => `${item.name}：${fixed(item.value, item.digits)} ${item.unit}；相对队列均值 ${signed(item.z)} 个标准差`).join("\n");
    const timeline = events.length ? events.map(event => `${event.time} · 演练进入${stageInfo[event.to].label}\n${event.note}`).join("\n") : "尚未添加跟进演练记录。";
    return `个案复核与跟进摘要\n\n匿名参与者：${record.uid}\n研究分数：${fixed(record.score)} · ${tiers[record.tier]}\n数据质量：${qualityLabels[record.quality]} · 感知记录 ${record.behavior.sensing_days} 天\n\n一句话阅读\n${profileSentence(record)}\n\n行为依据\n${behavior}\n\n下一步核查\n${readingAdvice(record)}当前没有逐日情绪、学业压力或人际冲突的直接记录，不能据此推断原因。\n\n本机跟进演练\n当前阶段：${stageInfo[stageOf(record.uid)].label}\n${timeline}\n\n来源与边界\n分数为融合方案首轮五折折外预测，未经概率校准；0.50 / 0.70 仅用于演示分级。行为偏离不是模型贡献或因果解释。摘要由固定模板生成，演练记录不代表真实访谈或干预。`;
  }

  function reportPanel(record) {
    const report = state.reports.get(record.uid);
    return `<section class="detail-section"><div class="report-toolbar"><div><h3>整理这份记录</h3><p class="muted">当前个案的行为线索、核查要点与本次演练过程。</p></div><button class="button button-primary" data-generate-report>${report ? "重新生成摘要" : "生成复核摘要"}</button></div>${report ? `<div class="report-text" id="current-report">${escape(report)}</div>` : '<div class="report-empty"><strong>生成一份复核摘要</strong><p>整合行为画像、数据质量与跟进时间轴，形成可阅读的复核摘要。</p><em>固定模板生成，无需联网。</em></div>'}</section>`;
  }

  function renderDetail() {
    if (state.synthetic) return renderSynthetic();
    const record = getRecord(state.selected);
    if (!record) {
      byId("case-detail").innerHTML = '<div class="empty-state"><h2>没有匹配的记录</h2><p>调整左侧筛选，选择一份记录开始查看。</p></div>';
      return;
    }
    const differences = facts(record).filter(item => Math.abs(item.z) > 1).slice(0, 2);
    const tags = differences.length ? differences.map(factLabel) : ["三项展示指标接近均值"];
    const tabs = [{ key: "profile", label: "行为画像" }, { key: "quality", label: "数据质量" }, { key: "workflow", label: "跟进演练" }, { key: "report", label: "复核摘要" }];
    const content = state.tab === "quality" ? qualityPanel(record) : state.tab === "workflow" ? workflowPanel(record) : state.tab === "report" ? reportPanel(record) : profilePanel(record);
    byId("case-detail").innerHTML = `<header class="profile-hero">${avatar(record.uid, true)}<div class="profile-identity"><span class="eyebrow">理解一个人，从记录开始</span><h2>匿名参与者</h2><p class="uid-name mono">${record.uid}</p><div class="profile-tags">${tierTag(record)}${tags.map(tag => `<span class="profile-tag">${tag}</span>`).join("")}</div></div><div class="profile-score"><span>研究筛查分数</span><strong>${fixed(record.score)}</strong><span>${qualityLabels[record.quality]} · ${record.behavior.sensing_days} 天</span></div></header><div class="profile-insight"><span>一句话阅读</span><p>${profileSentence(record)}</p></div><div class="next-action-bar"><div class="next-action-copy"><span>演练阶段 · ${stageInfo[stageOf(record.uid)].label}</span><strong>${stageInfo[stageOf(record.uid)].description}</strong></div><button class="button" data-detail-tab="workflow">进入跟进演练 ↗</button></div><div class="detail-tabs" role="tablist" aria-label="个案详情">${tabs.map(tab => `<button id="detail-tab-${tab.key}" type="button" role="tab" aria-selected="${state.tab === tab.key}" aria-controls="detail-panel" data-detail-tab="${tab.key}">${tab.label}</button>`).join("")}</div><div id="detail-panel" role="tabpanel" aria-labelledby="detail-tab-${state.tab}">${content}</div><p class="source-note detail-footnote">离线研究 · 演示分级 · 画像描述行为依据，不替代人工判断。</p>`;
  }

  function renderSynthetic() {
    byId("case-detail").innerHTML = `<section class="synthetic-view"><span class="synthetic-tag">合成示例 · 不计入真实队列</span><h2>记录不足，先检查采集情况</h2><p class="muted">这个样例展示数据质量不足时的产品流程。</p><div class="detail-meta"><div class="detail-meta-item"><span>示例编号</span><strong class="mono">${data.synthetic.uid}</strong></div><div class="detail-meta-item"><span>模拟感知天数</span><strong>${data.synthetic.sensingDays} 天</strong></div><div class="detail-meta-item"><span>演示状态</span><strong>暂缓判定</strong></div></div><div class="profile-insight"><span>下一步</span><p>模拟感知记录为 12 天，低于 28 天的基本门槛。先核查采集和设备情境，暂缓给出筛查分数。</p></div><section class="detail-section"><h3>本例的展示范围</h3><ul class="research-list"><li>不展示或虚构真实模型分数。</li><li>不计入真实 209 人或真实暂缓人数。</li><li>不据此宣称已经验证降低误报。</li></ul></section><button class="button button-primary" data-return-real>返回真实个案</button></section>`;
  }

  function showSynthetic() {
    state.synthetic = true;
    renderWorkspace();
    setPage("workspace");
    announce("正在查看合成示例，真实队列数据与统计不变。");
  }

  function advanceCare() {
    const input = byId("workflow-note");
    const note = input.value.trim();
    if (!note) {
      announce("请先填写一条本次演练记录，再推进阶段。");
      input.focus();
      return;
    }
    const uid = state.selected;
    const previous = stageOf(uid);
    const next = stageInfo[previous].next;
    const care = state.care.get(uid) || { stage: previous, events: [] };
    care.stage = next;
    care.events.push({ from: previous, to: next, note, time: new Date().toLocaleString("zh-CN", { timeZone: "Asia/Shanghai", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }), sequence: ++state.eventSequence });
    state.care.set(uid, care);
    state.reports.delete(uid);
    if (byId("workspace-stage").value !== "all") byId("workspace-stage").value = next;
    renderOverview();
    renderWorkspace();
    announce(`演练记录已添加，${uid} 已进入${stageInfo[next].label}。`);
    byId("workflow-note").focus({ preventScroll: true });
  }

  function renderScatterSelection() {
    const selected = getRecord(state.scatterSelected);
    const metric = dimensions.find(item => item.field === state.scatterMetric) || dimensions[0];
    byId("scatter-selection").innerHTML = `<div class="selected-person"><strong>匿名记录 <span class="mono">${selected.uid}</span></strong><span>${tiers[selected.tier]} · ${fixed(selected.score)} 分</span><span>${metric.short} ${fixed(selected.behavior[metric.field], metric.digits)} ${metric.unit}</span></div><button class="button" data-open-case="${selected.uid}">查看个案 ↗</button>`;
    document.querySelectorAll("[data-select-point]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.selectPoint === state.scatterSelected)));
  }

  function renderScatter() {
    const metric = dimensions.find(item => item.field === state.scatterMetric) || dimensions[0];
    byId("scatter-content").innerHTML = `<div class="scatter-3d">${window.WORKBENCH_3D.viewMarkup("scatter", { metric: metric.field, selected: state.scatterSelected })}</div><div class="selected-observation" id="scatter-selection"></div><div class="scatter-examples"><span>快速选择</span>${[data.metadata.showcaseUid, records[0].uid, "003df5de"].map(uid => `<button class="inline-button mono" data-select-point="${uid}" aria-pressed="${state.scatterSelected === uid}">${uid}</button>`).join("")}</div>`;
    renderScatterSelection();
  }

  function renderInsights() {
    byId("insights-content").innerHTML = visuals.homeMarkup();
  }

  function renderAnalysis() {
    const attention = countTier("red") + countTier("orange");
    const kind = { red: "high", orange: "mid", green: "normal" };
    const rules = [
      { name: "居住驻留偏高", icon: "home", note: "高于队列均值 1 个标准差", match: record => record.deviations.spatial_residence > 1 },
      { name: "夜间点亮偏高", icon: "moon", note: "高于队列均值 1 个标准差", match: record => record.deviations.circadian_night_unlock > 1 },
      { name: "学习驻留偏低", icon: "book", note: "低于队列均值 1 个标准差", match: record => record.deviations.study_engagement < -1 }
    ];
    const kpis = [
      { value: records.length, unit: "人", label: "研究队列", note: "每一点，都可走近一份个案", filter: "all", icon: "constellation" },
      { value: attention, unit: "人", label: "进入关注区间", note: `${fixed(attention / records.length * 100, 1)}% · 中、高分演示区间`, filter: "screened", icon: "target" },
      { value: countTier("red"), unit: "人", label: "高分区间", note: `${fixed(countTier("red") / records.length * 100, 1)}% · 供人工复核`, filter: "high", icon: "layers" },
      { value: countQuality("HIGH_CONFIDENCE"), unit: "人", label: "采集记录充分", note: `${fixed(countQuality("HIGH_CONFIDENCE") / records.length * 100, 1)}% · 与分数分别阅读`, filter: "qualityHigh", icon: "shield" }
    ];
    byId("analysis-content").innerHTML = `<div class="atlas-kpis">${kpis.map(kpi => `<button class="atlas-kpi" data-open-filter="${kpi.filter}"><span class="kpi-label">${visuals.icon(kpi.icon, 17)}${kpi.label}${visuals.icon("arrow", 12)}</span><strong>${kpi.value}<small>${kpi.unit}</small></strong><p>${kpi.note}</p><span class="kpi-rule" aria-hidden="true"></span></button>`).join("")}</div>
      <div class="analysis-section-title"><div><span class="eyebrow">从全景，走向细节</span><h2>从数据中找线索</h2></div><span>点选图表，继续探索 ${visuals.icon("arrow", 13)}</span></div>
      <div class="atlas-primary-grid"><section class="chart-panel distribution-panel" id="analysis-distribution"><div class="chart-heading"><div><span class="panel-number">01 / 分数分布</span><h2>看看分数如何分布</h2></div>${visuals.icon("bars", 22)}</div>${visuals.distributionMarkup()}<div class="histogram-zone-legend"><span>常态观察区间</span><span>中分</span><span>高分</span></div><p class="chart-footnote">拖动查看不同角度，点击柱形进入名单；柱高表示人数，0.50 / 0.70 为演示阈值</p></section>
      <section class="chart-panel quality-flow-panel" id="analysis-quality"><div class="chart-heading"><div><span class="panel-number">02 / 质量与分数</span><h2>同时看分数和采集质量</h2></div>${visuals.icon("flow", 22)}</div>${visuals.qualityFlow()}<p class="chart-footnote">拖动查看连线，点击节点或线管进入名单；粗细表示交叉人数，不表示时间变化</p><details class="quality-data-details"><summary>查看精确交叉人数</summary><div class="quality-cross-wrap"><div class="cross-column-head"><span>高分</span><span>中分</span><span>常态</span></div>${["HIGH_CONFIDENCE", "MEDIUM_CONFIDENCE"].map(quality => `<div class="quality-cross-row"><span class="row-label">${qualityLabels[quality]}</span>${["red", "orange", "green"].map(tier => { const total = records.filter(record => record.tier === tier && record.quality === quality).length; return `<button class="cross-cell" data-quality-cross="${tier}:${quality}" ${total === 0 ? "disabled" : ""} aria-label="查看${qualityLabels[quality]}且${tiers[tier]}的 ${total} 人"><strong>${total}</strong><span>${fixed(total / countTier(tier) * 100, 1)}%</span></button>`; }).join("")}</div>`).join("")}</div><p class="chart-footnote">百分比为该分数区间内占比。</p></details></section></div>
      <section class="chart-panel scatter-full-panel" id="analysis-behavior"><div class="chart-heading"><div><span class="panel-number">03 / 行为坐标</span><h2>看看分数与行为的分布</h2></div><label class="scatter-metric-label">探索维度<select id="scatter-metric">${dimensions.map(metric => `<option value="${metric.field}"${metric.field === state.scatterMetric ? " selected" : ""}>${metric.short}</option>`).join("")}</select></label></div><div id="scatter-content"></div><p class="chart-footnote">一圆一人，点击选择记录；高度表示当前行为，纵深显示另一项行为，坐标范围见图中标尺。分布不说明因果</p></section>
      <section class="chart-panel atlas-full-panel"><div class="chart-heading"><div><span class="panel-number">04 / 行为对比</span><h2>对比三项行为</h2></div><span class="chart-subtitle">各区间内的观察比例 · 0–100%</span></div><div class="grouped-comparisons">${rules.map(rule => `<section class="comparison-group"><div class="comparison-icon">${visuals.icon(rule.icon, 20)}</div><h3>${rule.name}</h3><p>${rule.note}</p>${["red", "orange", "green"].map(tier => { const group = records.filter(record => record.tier === tier); const total = group.filter(rule.match).length; const percent = total / group.length * 100; return `<div class="comparison-row"><div><span>${tiers[tier]}</span><strong class="comparison-count">${fixed(percent, 1)}% <small>${total}/${group.length} 人</small></strong></div><span class="comparison-track"><span class="comparison-fill person-${kind[tier]}" style="width:${percent}%"></span></span></div>`; }).join("")}</section>`).join("")}</div><p class="chart-footnote">各区间使用自身人数作分母。同一人可能出现多项观察，不能相加或据此推断心理原因。</p></section>
      <div class="atlas-summary-bar"><div><strong>查看记录，安排后续跟进</strong><p>同一队列、同一轮预测 · 统计使用未舍入分数 · 列表显示三位小数</p></div><button class="button button-primary" data-open-filter="screened">查看 ${attention} 份关注记录 ${visuals.icon("arrow", 14)}</button><button class="button" data-page="overview">进入跟进总览</button></div>`;
    visuals.renderDistribution();
    renderScatter();
  }
  function renderResearch() {
    const variants = [["baseline_25", "原始 25 特征基线"], ["fusion_all_weighted", "三通道融合＋质量加权"], ["ch2_spatial", "空间分布单通道"]];
    const current = data.firstFoldMetrics.find(item => item.variant === data.metadata.model);
    byId("research-content").innerHTML = `${visuals.modelComparison(variants)}<div class="research-grid"><section class="research-block"><span class="eyebrow">研究数据</span><h2>209 份匿名记录</h2><p>使用前 56 天感知数据的汇总特征，研究随后 56 天内是否观测到 PHQ-4 总分 ≥ 6。研究标签阳性 ${data.metadata.positives} 人、阴性 ${records.length - data.metadata.positives} 人，不等同临床诊断或危机事件。</p><p class="source-note">纳入条件：标签有效，且感知天数 ≥ 28。</p></section><section class="research-block"><span class="eyebrow">个案分数来源</span><h2>个案分数从哪里来</h2><p>名单、分数区间和个案分数采用种子 42 的首轮结果。每人的分数由未用此人训练的验证折模型给出，该轮五个验证折平均 AUC 为 <strong>${fixed(current.roc_auc)}</strong>。</p><p>以下模型对照使用重复实验均值，两种口径分别标注。</p></section></div><section class="research-block"><div class="section-head"><h2>保存的模型对照结果</h2><span class="muted">5 折 × 10 次 · 50 个验证折均值</span></div><div class="table-wrap"><table class="research-table"><thead><tr><th>研究方案</th><th class="numeric">Macro-F1</th><th class="numeric">平衡准确率</th><th class="numeric">ROC-AUC</th></tr></thead><tbody>${variants.map(([variant, label]) => { const metric = data.repeatedMetrics.find(item => item.variant === variant); return `<tr><td>${label}</td><td class="numeric">${fixed(metric.macro_f1_mean)}</td><td class="numeric">${fixed(metric.balanced_accuracy_mean)}</td><td class="numeric">${fixed(metric.roc_auc_mean)}</td></tr>`; }).join("")}</tbody></table></div><p class="source-note">融合改善有限；空间单通道为本轮比较后的探索性发现，仍需独立验证。重复划分不是 50 次独立研究。</p></section><div class="research-grid"><section class="research-block"><h2>画像与分数怎样阅读</h2><ul class="research-list"><li>筛查分数未经概率校准；0.50 / 0.70 只是演示切分阈值。</li><li>画像标签直接来自三项行为与队列均值的差异，不推断学业压力、人际冲突等原因。</li><li>数据质量描述采集覆盖，不表示判断正确程度。</li><li>当前不含个人逐日情绪与历史轨迹，因此不绘制虚构趋势。</li><li>复核摘要使用固定模板，不是大模型诊断或归因。</li></ul></section><section class="research-block"><h2>跟进功能的演示范围</h2><p>待复核、待沟通、跟进中、已归档为本机流程演练。阶段与备注仅在当前页面会话中保存，刷新后清空，不表示真实访谈、干预或危机解除。</p><p>合成暂缓样例独立标记，不进入真实人数。当前仍为离线研究原型，未接入实时校园业务。</p><p class="source-note">操作组织参考成熟平台的分级关注、个案档案与跟进台账思路；研究性能以本项目保存结果为准。</p></section></div><p class="source-note">来源：${escape(data.metadata.sourceFile)}<br>模型汇总：repeated_summary.csv；首轮指标：primary_5fold_summary.csv<br>成果包日期：${data.metadata.sourceDate} · 数据源校验：<span class="mono">${data.metadata.sourceSha256.slice(0, 12)}</span></p>`;
  }

  document.addEventListener("workbench:record", event => {
    state.scatterSelected = event.detail;
    renderScatterSelection();
  });

  document.addEventListener("workbench:navigate", event => {
    const { kind, value } = event.detail;
    if (kind === "analysis") {
      setPage("analysis");
      byId(`analysis-${value === "population" ? "behavior" : value}`)?.scrollIntoView({ block: "start", behavior: "auto" });
      return;
    }
    if (kind === "case") return openCase(value);
    if (kind === "filter") return openFilter(value);
    if (kind === "page") return setPage(value);
    if (kind === "stage") return openFilter("attention", value);
    resetFilters();
    if (kind === "bin") state.scoreBin = Number(value);
    if (kind === "cross") {
      const [tier, quality] = value.split(":");
      byId("workspace-tier").value = tier;
      byId("workspace-quality").value = quality;
    }
    renderWorkspace(true);
    setPage("workspace");
  });
  document.addEventListener("click", event => {
    const point = event.target.closest("[data-select-point]");
    if (point) {
      state.scatterSelected = point.dataset.selectPoint;
      renderScatter();
      announce(`已选中散点记录 ${state.scatterSelected}，可进入个案查看。`);
      return;
    }
    const button = event.target.closest("button");
    if (!button || button.disabled) return;
    if (button.dataset.page) return setPage(button.dataset.page);
    if (button.dataset.openCase) return openCase(button.dataset.openCase);
    if (button.dataset.openFilter) return openFilter(button.dataset.openFilter);
    if (button.dataset.openStage) return openFilter("attention", button.dataset.openStage);
    if (button.dataset.qualityCross) {
      const [tier, quality] = button.dataset.qualityCross.split(":");
      resetFilters();
      byId("workspace-tier").value = tier;
      byId("workspace-quality").value = quality;
      renderWorkspace(true);
      setPage("workspace");
      return;
    }
    if (button.dataset.selectCase) {
      state.selected = button.dataset.selectCase;
      state.synthetic = false;
      state.tab = "profile";
      renderWorkspace();
      byId("case-list").querySelector(`[data-select-case="${state.selected}"]`)?.focus({ preventScroll: true });
      return;
    }
    if (button.dataset.detailTab) {
      state.tab = button.dataset.detailTab;
      renderDetail();
      byId(`detail-tab-${state.tab}`).focus({ preventScroll: true });
      return;
    }
    if (button.hasAttribute("data-advance-care")) return advanceCare();
    if (button.hasAttribute("data-generate-report")) {
      const record = getRecord(state.selected);
      state.reports.set(record.uid, makeReport(record));
      renderDetail();
      byId("case-detail").querySelector("[data-generate-report]").focus({ preventScroll: true });
      announce(`已生成 ${record.uid} 的画像与跟进摘要。`);
      return;
    }
    if (button.hasAttribute("data-show-synthetic")) return showSynthetic();
    if (button.hasAttribute("data-return-real")) return openCase(data.metadata.showcaseUid);
    if (button.hasAttribute("data-clear-range")) {
      state.scoreBin = null;
        renderWorkspace(true);
      return;
    }
    if (button.id === "presentation-toggle") {
      const expanded = document.body.classList.toggle("presentation-mode");
      button.textContent = expanded ? "退出汇报视图" : "展开汇报视图";
      button.setAttribute("aria-pressed", String(expanded));
    }
  });

  document.addEventListener("keydown", event => {
    if (!event.target.matches('[role="tab"][data-detail-tab]') || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    const tabs = ["profile", "quality", "workflow", "report"];
    const current = tabs.indexOf(state.tab);
    const next = event.key === "Home" ? 0 : event.key === "End" ? 3 : (current + (event.key === "ArrowRight" ? 1 : 3)) % 4;
    state.tab = tabs[next];
    renderDetail();
    byId(`detail-tab-${state.tab}`).focus({ preventScroll: true });
    event.preventDefault();
  });

  document.addEventListener("change", event => {
    if (event.target.id !== "scatter-metric") return;
    state.scatterMetric = event.target.value;
    renderScatter();
  });

  byId("workspace-search").addEventListener("input", () => renderWorkspace(true));
  ["workspace-tier", "workspace-quality", "workspace-stage"].forEach(id => byId(id).addEventListener("change", () => renderWorkspace(true)));
  document.querySelectorAll(".nav-number").forEach((element, index) => { element.innerHTML = visuals.icon(["constellation", "bars", "flow", "person", "research"][index], 19); });
  renderOverview();
  renderWorkspace();
  renderInsights();
  renderAnalysis();
  renderResearch();
  setPage(location.hash.slice(1) || "insights");
})();

