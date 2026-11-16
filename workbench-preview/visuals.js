(() => {
  "use strict";

  const data = window.PREVIEW_DATA;
  const records = data.records;
  const scene = window.WORKBENCH_3D;
  const count = tier => records.filter(record => record.tier === tier).length;
  const number = (value, digits = 3) => Number(value).toFixed(digits);
  let distributionView = "depth";

  function icon(name, size = 20) {
    const paths = {
      constellation: '<circle cx="6" cy="6" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="10" cy="18" r="2"/><path d="m8 6 8 2M7 8l2 8m3 0 5-6"/>',
      flow: '<path d="M4 4v5c0 2 2 3 4 3h8c2 0 4 1 4 3v5M4 20v-5c0-2 2-3 4-3M12 4v5m0 6v5"/>',
      person: '<circle cx="12" cy="7" r="3"/><path d="M5 21v-3a7 7 0 0 1 14 0v3"/>',
      research: '<path d="M5 3h11l3 3v15H5zM14 3v5h5M8 12h8m-8 4h5"/>',
      arrow: '<path d="M5 19 19 5M6 5h13v13"/>',
      layers: '<path d="m12 2 10 6-10 6L2 8zm-9 11 9 5 9-5M3 18l9 5 9-5"/>',
      grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
      shield: '<path d="m12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6zM8 12l3 3 5-6"/>',
      target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 1v4m0 14v4M1 12h4m14 0h4"/>',
      bars: '<path d="M4 20V10h4v10m3 0V4h4v16m3 0v-7h4v7M2 21h21"/>',
      home: '<path d="m3 11 9-8 9 8v10h-7v-7h-4v7H3z"/>',
      moon: '<path d="M20 15A9 9 0 0 1 9 4a9 9 0 1 0 11 11Z"/>',
      book: '<path d="M12 6C9 3 5 3 2 4v16c4-1 7-1 10 2m0-16c3-3 7-3 10-2v16c-4-1-7-1-10 2z"/>'
    };
    return `<svg class="ui-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.constellation}</svg>`;
  }

  function homeMarkup() {
    return `<section class="world-panel"><div class="world-heading"><div><span class="eyebrow">观微 · 研究全景</span><h2>从这里，找到你想看的信息</h2></div><span class="world-badge">209 份记录 · 7 个入口</span></div>${scene.viewMarkup("home")}<div class="world-footnote"><span>模型代表功能入口，详细数值以各页面为准</span><span>离线研究 · 人工复核</span></div></section><div class="home-metrics"><button data-viz-filter="all"><span>匿名记录</span><strong>209<small>份</small></strong></button><button data-viz-filter="screened"><span>关注区间</span><strong>${count("red") + count("orange")}<small>份</small></strong></button><button data-viz-filter="high"><span>高分区间</span><strong>${count("red")}<small>份</small></strong></button><button data-viz-filter="qualityHigh"><span>采集记录充分</span><strong>199<small>份</small></strong></button></div><div class="directory-heading"><h2>也可以直接进入</h2><span>按任务选择模块</span></div><div class="module-directory">${scene.modules.map((module, index) => `<button data-viz-${module.kind}="${module.target}"><span class="directory-number">0${index + 1}</span><span><strong>${module.name}</strong><small>${module.description}</small></span>${icon("arrow", 15)}</button>`).join("")}</div>`;
  }

  function distributionMarkup() {
    return `<div class="viz-segment"><button data-distribution-view="depth" aria-pressed="${distributionView === "depth"}">${icon("layers", 14)}3D 视图</button><button data-distribution-view="flat" aria-pressed="${distributionView === "flat"}">${icon("bars", 14)}平面数据</button></div><div id="distribution-chart"></div>`;
  }

  function renderDistribution() {
    const element = document.getElementById("distribution-chart");
    if (!element) return;
    if (distributionView === "depth") element.innerHTML = scene.viewMarkup("distribution");
    else {
      const bins = Array.from({ length: 10 }, (_, index) => records.filter(record => Math.min(9, Math.floor((record.scoreExact ?? record.score) * 10)) === index).length);
      element.innerHTML = `<div class="flat-distribution">${bins.map((value, index) => `<button data-viz-bin="${index}" aria-label="${number(index / 10, 1)} 至 ${number((index + 1) / 10, 1)} 分，${value} 人"><strong>${value}</strong><span class="flat-bar tone-${index >= 7 ? "high" : index >= 5 ? "mid" : "low"}" style="height:${value / 49 * 200}px"></span><span>${number(index / 10, 1)}</span></button>`).join("")}</div>`;
    }
    document.querySelectorAll("[data-distribution-view]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.distributionView === distributionView)));
  }

  function qualityFlow() {
    return scene.viewMarkup("quality");
  }

  function careFlow(queue, stageOf, stageInfo) {
    const counts = Object.fromEntries(Object.keys(stageInfo).map(stage => [stage, queue.filter(record => stageOf(record.uid) === stage).length]));
    return scene.viewMarkup("care", { counts, stages: stageInfo });
  }

  function deviationMarkup(items) {
    return `${scene.viewMarkup("deviation", { items })}<div class="deviation-values">${items.map(item => `<div><span>${item.short}</span><strong>${item.z > 0 ? "+" : ""}${number(item.z, 2)}<small>标准差</small></strong></div>`).join("")}</div>`;
  }

  function modelComparison(variants) {
    return `<section class="research-block model-comparison"><div class="section-head"><div><span class="eyebrow">模型结果</span><h2>对比三种研究方案</h2></div><span class="muted">ROC-AUC · 重复实验均值</span></div>${scene.viewMarkup("research")}<div class="model-numbers">${variants.map(([variant, label]) => `<div><span>${label}</span><strong>${number(data.repeatedMetrics.find(item => item.variant === variant).roc_auc_mean)}</strong></div>`).join("")}</div><p class="source-note">圆环长度表示数值，整圈为 1；完整指标见下方表格</p></section>`;
  }

  document.addEventListener("click", event => {
    const mode = event.target.closest("[data-distribution-view]");
    if (mode) { distributionView = mode.dataset.distributionView; renderDistribution(); return; }
    const action = event.target.closest("[data-viz-case], [data-viz-filter], [data-viz-page], [data-viz-bin], [data-viz-analysis], [data-viz-cross], [data-viz-stage]");
    if (!action) return;
    const [key, value] = Object.entries(action.dataset).find(([key]) => key.startsWith("viz"));
    document.dispatchEvent(new CustomEvent("workbench:navigate", { detail: { kind: key.slice(3).toLowerCase(), value } }));
  });
  document.addEventListener("keydown", event => {
    if (event.target.closest('svg [role="button"]') && ["Enter", " "].includes(event.key)) {
      event.preventDefault();
      event.target.closest('[role="button"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
    }
  });

  window.WORKBENCH_VISUALS = { icon, homeMarkup, distributionMarkup, renderDistribution, qualityFlow, careFlow, deviationMarkup, modelComparison };
})();
