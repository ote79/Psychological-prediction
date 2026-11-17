/**
 * COSMOGRAPH & FOUNDRY UI VISUALS AND CONTROLS
 * Handles histograms, legends, timeline scrubbers, student cards, and data tables.
 */
(() => {
  "use strict";

  const data = window.PREVIEW_DATA;
  const trajectories = window.CAMPUS_TRAJECTORIES;
  const records = data ? data.records : [];
  const points = trajectories ? trajectories.points : [];

  window.WORKBENCH_VISUALS = {
    renderCosmographDrawer,
    renderCosmographTimeline,
    renderStudentFlyout,
    renderCasesTable,
    renderCaseDetailPane
  };

  /**
   * 1. Render Cosmograph Left Drawer (FILTERS)
   */
  function renderCosmographDrawer(callbacks = {}) {
    renderClusterHistogram(callbacks.onZoneFilter);
    renderScoreHistogram(callbacks.onScoreFilter);
    renderLegendFilter(callbacks.onPhenotypeFilter);
    renderStudentList(callbacks.onSelectStudent);
  }

  function renderClusterHistogram(onFilter) {
    const container = document.getElementById("cluster-histogram");
    if (!container || !trajectories || !trajectories.metadata) return;

    // Count points per zone
    const zoneCounts = { dorm: 0, library: 0, canteen: 0, sports: 0, offcampus: 0 };
    points.forEach(p => {
      if (zoneCounts[p.zone] !== undefined) zoneCounts[p.zone]++;
    });

    const maxCount = Math.max(...Object.values(zoneCounts), 1);
    const zones = [
      { key: "dorm", name: "南区宿舍", count: zoneCounts.dorm, color: "#c084fc" },
      { key: "library", name: "图文大楼", count: zoneCounts.library, color: "#facc15" },
      { key: "canteen", name: "生活餐饮", count: zoneCounts.canteen, color: "#38bdf8" },
      { key: "sports", name: "运动中心", count: zoneCounts.sports, color: "#4ade80" },
      { key: "offcampus", name: "校外漫游", count: zoneCounts.offcampus, color: "#94a3b8" }
    ];

    container.innerHTML = zones.map(z => {
      const heightPct = Math.round((z.count / maxCount) * 100);
      return `
        <div class="h-bar" data-zone="${z.key}" style="height:${heightPct}%; background:${z.color}; opacity:0.8;" 
             title="${z.name}: ${z.count.toLocaleString()} 点">
        </div>
      `;
    }).join("");

    container.querySelectorAll(".h-bar").forEach(bar => {
      bar.addEventListener("click", () => {
        const zone = bar.dataset.zone;
        bar.classList.toggle("active");
        if (onFilter) onFilter(zone);
      });
    });
  }

  function renderScoreHistogram(onFilter) {
    const container = document.getElementById("score-histogram");
    if (!container || !records.length) return;

    // 10 score bins from 0.0 to 1.0
    const bins = Array(10).fill(0);
    records.forEach(r => {
      const score = r.scoreExact ?? r.score;
      const binIdx = Math.min(9, Math.floor(score * 10));
      bins[binIdx]++;
    });

    const maxBin = Math.max(...bins, 1);
    container.innerHTML = bins.map((count, idx) => {
      const heightPct = Math.round((count / maxBin) * 100);
      const isRed = idx >= 7;
      const isOrange = idx >= 5 && idx < 7;
      const color = isRed ? "#f87171" : (isOrange ? "#fbbf24" : "#38bdf8");
      const minS = (idx / 10).toFixed(1);
      const maxS = ((idx + 1) / 10).toFixed(1);

      return `
        <div class="score-bar" data-bin="${idx}" style="height:${heightPct}%; background:${color};"
             title="${minS}-${maxS}分: ${count} 人">
        </div>
      `;
    }).join("");

    container.querySelectorAll(".score-bar").forEach(bar => {
      bar.addEventListener("click", () => {
        container.querySelectorAll(".score-bar").forEach(b => b.classList.remove("active"));
        bar.classList.add("active");
        const idx = Number(bar.dataset.bin);
        if (onFilter) onFilter(idx / 10, (idx + 1) / 10);
      });
    });
  }

  function renderLegendFilter(onFilter) {
    const list = document.getElementById("legend-filter-list");
    if (!list) return;

    const activeSet = new Set(["normal_mobility", "retreat_high_risk", "wavering_mid_risk"]);

    list.querySelectorAll(".legend-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const ptype = btn.dataset.phenotype;
        if (activeSet.has(ptype)) {
          if (activeSet.size > 1) {
            activeSet.delete(ptype);
            btn.classList.add("dimmed");
            btn.classList.remove("active");
          }
        } else {
          activeSet.add(ptype);
          btn.classList.remove("dimmed");
          btn.classList.add("active");
        }
        if (onFilter) onFilter(new Set(activeSet));
      });
    });
  }

  function renderStudentList(onSelect) {
    const listContainer = document.getElementById("cg-student-list");
    const searchInput = document.getElementById("cg-student-search");
    if (!listContainer || !records.length) return;

    function populate(filterText = "") {
      const query = filterText.trim().toLowerCase();
      const filtered = records.filter(r => !query || r.uid.toLowerCase().includes(query));

      listContainer.innerHTML = filtered.map(r => {
        const tierClass = r.tier === "red" ? "red" : (r.tier === "orange" ? "orange" : "green");
        const tierName = r.tier === "red" ? "高分" : (r.tier === "orange" ? "中分" : "常态");
        const resH = r.behavior?.residence_hours_daily?.toFixed(1) || "-";
        return `
          <button type="button" class="student-row-btn" data-uid="${r.uid}">
            <span class="s-uid">${r.uid}</span>
            <span class="s-res">${resH}h/日</span>
            <span class="s-pill ${tierClass}">${tierName} ${(r.scoreExact ?? r.score).toFixed(2)}</span>
          </button>
        `;
      }).join("");

      listContainer.querySelectorAll(".student-row-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          listContainer.querySelectorAll(".student-row-btn").forEach(b => b.classList.remove("selected"));
          btn.classList.add("selected");
          if (onSelect) onSelect(btn.dataset.uid);
        });
      });
    }

    populate();

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        populate(e.target.value);
      });
    }
  }

  /**
   * 2. Render Cosmograph Bottom Timeline Scrubber
   */
  function renderCosmographTimeline(onDayChange) {
    const barsContainer = document.getElementById("timeline-bars");
    const scrubber = document.getElementById("timeline-scrubber");
    const dayDisplay = document.getElementById("timeline-day-display");
    const playBtn = document.getElementById("btn-play-timeline");
    if (!barsContainer || !scrubber) return;

    // Generate 56 daily activity spark bars
    const days = Array(56).fill(0);
    points.forEach(p => {
      if (p.day >= 1 && p.day <= 56) days[p.day - 1]++;
    });
    const maxDayCount = Math.max(...days, 1);

    barsContainer.innerHTML = days.map((c, i) => {
      const h = Math.round((c / maxDayCount) * 100);
      return `<div class="t-spark passed" id="t-spark-${i + 1}" style="height:${Math.max(15, h)}%;"></div>`;
    }).join("");

    let isPlaying = false;
    let timerId = null;

    function setDay(day) {
      day = Math.max(1, Math.min(56, Number(day)));
      scrubber.value = day;
      if (dayDisplay) dayDisplay.textContent = `Day ${day}`;

      // Update spark bars color
      for (let i = 1; i <= 56; i++) {
        const bar = document.getElementById(`t-spark-${i}`);
        if (bar) {
          if (i <= day) bar.classList.add("passed");
          else bar.classList.remove("passed");
        }
      }

      if (onDayChange) onDayChange(day);
    }

    scrubber.addEventListener("input", (e) => {
      setDay(e.target.value);
    });

    if (playBtn) {
      playBtn.addEventListener("click", () => {
        isPlaying = !isPlaying;
        const iconPlay = playBtn.querySelector(".icon-play");
        const iconPause = playBtn.querySelector(".icon-pause");

        if (isPlaying) {
          if (iconPlay) iconPlay.style.display = "none";
          if (iconPause) iconPause.style.display = "block";
          if (Number(scrubber.value) >= 56) setDay(1);

          timerId = setInterval(() => {
            let nextDay = Number(scrubber.value) + 1;
            if (nextDay > 56) {
              clearInterval(timerId);
              isPlaying = false;
              if (iconPlay) iconPlay.style.display = "block";
              if (iconPause) iconPause.style.display = "none";
            } else {
              setDay(nextDay);
            }
          }, 140);
        } else {
          clearInterval(timerId);
          if (iconPlay) iconPlay.style.display = "block";
          if (iconPause) iconPause.style.display = "none";
        }
      });
    }
  }

  /**
   * 3. Render Student Profile Flyout Drawer
   */
  function renderStudentFlyout(uid) {
    const flyout = document.getElementById("cg-profile-flyout");
    if (!flyout) return;

    const record = records.find(r => r.uid === uid) || records[0];
    if (!record) return;

    // Elements
    const avatar = document.getElementById("flyout-avatar");
    const uidElem = document.getElementById("flyout-uid");
    const tierElem = document.getElementById("flyout-tier");
    const scoreElem = document.getElementById("flyout-score");
    const qualityElem = document.getElementById("flyout-quality");

    const resVal = document.getElementById("flyout-res-val");
    const resBar = document.getElementById("flyout-res-bar");
    const studyVal = document.getElementById("flyout-study-val");
    const studyBar = document.getElementById("flyout-study-bar");
    const nightVal = document.getElementById("flyout-night-val");
    const nightBar = document.getElementById("flyout-night-bar");

    const reportElem = document.getElementById("flyout-report-text");

    if (avatar) avatar.textContent = record.uid.slice(0, 2).toUpperCase();
    if (uidElem) uidElem.textContent = `UID: ${record.uid}`;

    const isRed = record.tier === "red";
    const isOrange = record.tier === "orange";

    if (tierElem) {
      tierElem.textContent = isRed ? "高分预警 (红色)" : (isOrange ? "中分关注 (橙色)" : "常态观察 (绿色)");
      tierElem.style.color = isRed ? "#f87171" : (isOrange ? "#fbbf24" : "#4ade80");
    }

    if (scoreElem) {
      const s = (record.scoreExact ?? record.score).toFixed(3);
      scoreElem.textContent = s;
      scoreElem.className = isRed ? "red-text" : (isOrange ? "warn-text" : "safe-text");
    }

    if (qualityElem) {
      const isHigh = record.quality === "HIGH_CONFIDENCE";
      qualityElem.textContent = isHigh ? "记录充分 (56天完备)" : "基本可用 (轻微断连)";
      qualityElem.style.color = isHigh ? "#4ade80" : "#fbbf24";
    }

    // Deviations & Behavior
    const beh = record.behavior || {};
    const dev = record.deviations || {};

    const resHours = beh.residence_hours_daily?.toFixed(2) || "12.0";
    const resZ = (dev.spatial_residence ?? 0).toFixed(2);
    if (resVal) resVal.textContent = `${resHours} h/日 (${resZ > 0 ? "+" : ""}${resZ}σ)`;
    if (resBar) {
      resBar.style.width = `${Math.min(100, Math.max(10, (resHours / 24) * 100))}%`;
      resBar.className = `dev-bar-fill ${Number(resZ) > 1.2 ? "red" : "blue"}`;
    }

    const studyHours = beh.study_hours_daily?.toFixed(2) || "3.5";
    const studyZ = (dev.study_engagement ?? 0).toFixed(2);
    if (studyVal) studyVal.textContent = `${studyHours} h/日 (${studyZ > 0 ? "+" : ""}${studyZ}σ)`;
    if (studyBar) {
      studyBar.style.width = `${Math.min(100, Math.max(10, (studyHours / 10) * 100))}%`;
      studyBar.className = `dev-bar-fill ${Number(studyZ) < -1.0 ? "red" : "blue"}`;
    }

    const nightTimes = beh.night_unlock_times?.toFixed(1) || "18.0";
    const nightZ = (dev.circadian_night_unlock ?? 0).toFixed(2);
    if (nightVal) nightVal.textContent = `${nightTimes} 次/夜 (${nightZ > 0 ? "+" : ""}${nightZ}σ)`;
    if (nightBar) {
      nightBar.style.width = `${Math.min(100, Math.max(10, (nightTimes / 60) * 100))}%`;
      nightBar.className = `dev-bar-fill ${Number(nightZ) > 1.5 ? "red" : "blue"}`;
    }

    // LLM Counselor Report text
    if (reportElem) {
      let reportText = "";
      if (isRed) {
        reportText = `【时空行为画像】该生近 56 天日均宿舍滞留高达 ${resHours} 小时（显著偏高 +${resZ}σ），且随学期推移呈现典型的“孤岛化退缩”；夜间点亮 ${nightTimes} 次/夜，睡眠节律紊乱。<br><br>
                      【干预建议】建议辅导员协同心理咨询中心，以“学业帮扶/选课沟通”为非侵入切入点开展面对面交流，避免直接提及“心理危机预警”以免触发防卫心理。`;
      } else if (isOrange) {
        reportText = `【时空行为画像】该生各项行为指标轻度偏离队列常态，空间驻留 ${resHours} 小时，学习驻留处于波动状态，数据置信度审计完备。<br><br>
                      【关怀建议】纳入常规朋辈互助与生活导师日常关怀范围，无需即刻启动紧急医疗转介。`;
      } else {
        reportText = `【时空行为画像】该生日常校园轨迹健康活跃，生活圈与图文教学大楼流动均衡，日均睡眠作息规律，心理状态处于常态观察区间。`;
      }
      reportElem.innerHTML = reportText;
    }

    flyout.classList.add("open");
  }

  /**
   * 4. Render Cases Table in View 3
   */
  function renderCasesTable(onSelect) {
    const tableBody = document.getElementById("cases-table-body");
    const searchInput = document.getElementById("cases-search");
    const tierFilter = document.getElementById("cases-tier-filter");
    if (!tableBody || !records.length) return;

    function update() {
      const query = (searchInput?.value || "").trim().toLowerCase();
      const tier = tierFilter?.value || "all";

      const filtered = records.filter(r => {
        if (query && !r.uid.toLowerCase().includes(query)) return false;
        if (tier !== "all" && r.tier !== tier) return false;
        return true;
      });

      tableBody.innerHTML = filtered.map(r => {
        const score = (r.scoreExact ?? r.score).toFixed(3);
        const tierBadge = r.tier === "red" 
          ? `<span class="badge red">高分预警</span>`
          : (r.tier === "orange" ? `<span class="badge orange">中分关注</span>` : `<span class="badge green">常态观察</span>`);
        const qualityText = r.quality === "HIGH_CONFIDENCE" ? "充分" : "基本可用";
        const resH = r.behavior?.residence_hours_daily?.toFixed(2) || "-";
        const studyH = r.behavior?.study_hours_daily?.toFixed(2) || "-";
        const nightU = r.behavior?.night_unlock_times?.toFixed(1) || "-";

        return `
          <tr data-uid="${r.uid}">
            <td><strong>${r.uid}</strong></td>
            <td><strong>${score}</strong></td>
            <td>${tierBadge}</td>
            <td>${qualityText}</td>
            <td>${resH} h/日</td>
            <td>${studyH} h/日</td>
            <td>${nightU} 次/夜</td>
          </tr>
        `;
      }).join("");

      tableBody.querySelectorAll("tr").forEach(tr => {
        tr.addEventListener("click", () => {
          tableBody.querySelectorAll("tr").forEach(t => t.classList.remove("selected"));
          tr.classList.add("selected");
          if (onSelect) onSelect(tr.dataset.uid);
        });
      });
    }

    update();

    if (searchInput) searchInput.addEventListener("input", update);
    if (tierFilter) tierFilter.addEventListener("change", update);
  }

  function renderCaseDetailPane(uid) {
    const pane = document.getElementById("cases-detail-pane");
    if (!pane) return;

    const record = records.find(r => r.uid === uid) || records[0];
    if (!record) return;

    const score = (record.scoreExact ?? record.score).toFixed(3);
    const beh = record.behavior || {};
    const dev = record.deviations || {};

    pane.innerHTML = `
      <div class="card-screen" style="border: 1px solid #cbd5e1; border-radius: 8px;">
        <div class="screen-header">
          <span class="screen-title">STUDENT CLINICAL DOSSIER</span>
          <span class="badge ${record.tier}">${record.tier === "red" ? "高分预警" : (record.tier === "orange" ? "中分关注" : "常态观察")}</span>
        </div>
        <h3 style="font-size:16px; margin: 8px 0;">匿名编号: ${record.uid}</h3>
        <p style="color:#64748b; font-size:11.5px; margin-bottom:12px;">数据集: CES 56 天真实多模态被动感知记录 · 严格只读脱敏</p>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:16px;">
          <div style="background:#f8fafc; padding:8px 12px; border-radius:6px; border:1px solid #e2e8f0;">
            <span style="font-size:10.5px; color:#64748b;">危机筛查评分</span>
            <strong style="display:block; font-size:18px; color:${record.tier === 'red' ? '#dc2626' : '#0f172a'};">${score}</strong>
            <small style="color:#64748b;">(模型预测阈值: 0.46)</small>
          </div>
          <div style="background:#f8fafc; padding:8px 12px; border-radius:6px; border:1px solid #e2e8f0;">
            <span style="font-size:10.5px; color:#64748b;">CA-Gate 置信度审计</span>
            <strong style="display:block; font-size:18px; color:#16a34a;">${record.quality === 'HIGH_CONFIDENCE' ? '充分' : '基本可用'}</strong>
            <small style="color:#64748b;">权重 1.0 (无断电断网漂移)</small>
          </div>
        </div>

        <h4 style="font-size:12px; font-weight:700; margin-bottom:8px;">三通道核心特征偏离度 (Z-Score)</h4>
        <div style="display:flex; flex-direction:column; gap:8px; font-size:11.5px; margin-bottom:16px;">
          <div style="display:flex; justify-content:space-between; border-bottom:1px dashed #e2e8f0; padding-bottom:4px;">
            <span>空间居住驻留:</span>
            <strong>${beh.residence_hours_daily?.toFixed(2)} h/日 (${dev.spatial_residence > 0 ? '+' : ''}${dev.spatial_residence?.toFixed(2)}σ)</strong>
          </div>
          <div style="display:flex; justify-content:space-between; border-bottom:1px dashed #e2e8f0; padding-bottom:4px;">
            <span>学习地点驻留:</span>
            <strong>${beh.study_hours_daily?.toFixed(2)} h/日 (${dev.study_engagement > 0 ? '+' : ''}${dev.study_engagement?.toFixed(2)}σ)</strong>
          </div>
          <div style="display:flex; justify-content:space-between; border-bottom:1px dashed #e2e8f0; padding-bottom:4px;">
            <span>夜间屏幕点亮:</span>
            <strong>${beh.night_unlock_times?.toFixed(1)} 次/夜 (${dev.circadian_night_unlock > 0 ? '+' : ''}${dev.circadian_night_unlock?.toFixed(2)}σ)</strong>
          </div>
        </div>

        <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:6px; padding:10px 12px; margin-bottom:16px;">
          <div style="font-weight:700; color:#1e40af; font-size:11.5px; margin-bottom:4px;">辅导员非侵入性关怀建议</div>
          <p style="font-size:11px; color:#1e3a8a; line-height:1.6;">
            该生空间特征表现为驻留偏高与图文教学区活跃度走低。在开展关怀走访时，切忌直接向学生出示“心理系统高危预警”等标签词汇，建议以选课进度沟通、宿舍用电生活关心等日常话题作为切入点。
          </p>
        </div>

        <button type="button" class="btn-action-primary" id="btn-open-in-cg" style="width:100%; padding:8px;" data-uid="${record.uid}">
          在 Cosmograph 轨迹星图中定位该生 ↗
        </button>
      </div>
    `;

    const btnOpenCg = pane.querySelector("#btn-open-in-cg");
    if (btnOpenCg) {
      btnOpenCg.addEventListener("click", () => {
        document.dispatchEvent(new CustomEvent("app:navigate", { detail: { view: "cosmograph", uid: record.uid } }));
      });
    }
  }

})();
