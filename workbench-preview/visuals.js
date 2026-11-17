/**
 * COSMOGRAPH & FOUNDRY UI VISUALS AND CONTROLS (1:1 REPLICA)
 * Connects exact visual components, histograms, categories, timeline, and flyout.
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
    renderCasesTable
  };

  /**
   * 1. Render Left Filters Drawer (Exact Image 2)
   */
  function renderCosmographDrawer(callbacks = {}) {
    // Histogram 1: micro_cluster (12 stepped bars)
    const microContainer = document.getElementById("cg-micro-bars");
    if (microContainer) {
      const stepHeights = [100, 92, 85, 78, 72, 66, 60, 54, 48, 40, 32, 24];
      microContainer.innerHTML = stepHeights.map((h, i) => {
        return `<div class="cg-bar-col" data-idx="${i}" style="height:${h}%;" title="Cluster ${i + 1}: ${Math.round(h * 38)} points"></div>`;
      }).join("");

      microContainer.querySelectorAll(".cg-bar-col").forEach(b => {
        b.addEventListener("click", () => {
          microContainer.querySelectorAll(".cg-bar-col").forEach(col => col.classList.remove("active"));
          b.classList.add("active");
          if (callbacks.onClusterFilter) callbacks.onClusterFilter(Number(b.dataset.idx));
        });
      });
    }

    // Histogram 2: size (power-law decay)
    const sizeContainer = document.getElementById("cg-size-bars");
    if (sizeContainer) {
      const powerHeights = [100, 38, 20, 14, 10, 8, 6, 5, 4, 3, 2, 2];
      sizeContainer.innerHTML = powerHeights.map((h, i) => {
        return `<div class="cg-bar-col" style="height:${h}%;" title="Intensity bin ${i + 1}"></div>`;
      }).join("");
    }

    // Color categories selection
    const colorItems = document.querySelectorAll("#cg-color-list .cg-color-item");
    const activePhenotypes = new Set(["normal_mobility", "retreat_high_risk", "wavering_mid_risk"]);

    colorItems.forEach(item => {
      item.addEventListener("click", () => {
        item.classList.toggle("active");
        const ptype = item.dataset.phenotype;
        if (item.classList.contains("active")) {
          activePhenotypes.add(ptype);
        } else {
          activePhenotypes.delete(ptype);
        }
        if (callbacks.onPhenotypeFilter) {
          callbacks.onPhenotypeFilter(new Set(activePhenotypes));
        }
      });
    });

    const resetBtn = document.getElementById("btn-reset-categories");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        colorItems.forEach(i => i.classList.add("active"));
        activePhenotypes.add("normal_mobility");
        activePhenotypes.add("retreat_high_risk");
        activePhenotypes.add("wavering_mid_risk");
        if (callbacks.onPhenotypeFilter) {
          callbacks.onPhenotypeFilter(new Set(activePhenotypes));
        }
      });
    }

    // Student list search & populate
    const studentList = document.getElementById("cg-student-scroll-list");
    const searchInput = document.getElementById("cg-uid-input");
    if (studentList && records.length) {
      function populateList(query = "") {
        const q = query.trim().toLowerCase();
        const filtered = records.filter(r => !q || r.uid.toLowerCase().includes(q));

        studentList.innerHTML = filtered.map(r => {
          const score = (r.scoreExact ?? r.score).toFixed(2);
          const isRed = r.tier === "red";
          const resH = r.behavior?.residence_hours_daily?.toFixed(1) || "-";
          return `
            <div class="cg-student-row" data-uid="${r.uid}">
              <span style="font-family:monospace; font-weight:700;">${r.uid}</span>
              <span style="color:#8b949e;">${resH}h/d</span>
              <span style="color:${isRed ? '#f87171' : '#58a6ff'}; font-weight:700;">${score}</span>
            </div>
          `;
        }).join("");

        studentList.querySelectorAll(".cg-student-row").forEach(row => {
          row.addEventListener("click", () => {
            studentList.querySelectorAll(".cg-student-row").forEach(r => r.classList.remove("selected"));
            row.classList.add("selected");
            if (callbacks.onSelectStudent) callbacks.onSelectStudent(row.dataset.uid);
          });
        });
      }

      populateList();

      if (searchInput) {
        searchInput.addEventListener("input", (e) => populateList(e.target.value));
      }
    }
  }

  /**
   * 2. Render Cosmograph Bottom Timeline Scrubber
   */
  function renderCosmographTimeline(onDayChange) {
    const waveContainer = document.getElementById("timeline-wave-bars");
    const rangeSlider = document.getElementById("cg-timeline-range");
    const playBtn = document.getElementById("btn-timeline-play");
    if (!waveContainer || !rangeSlider) return;

    // 56 activity waveform bars
    const days = Array(56).fill(0);
    points.forEach(p => {
      if (p.day >= 1 && p.day <= 56) days[p.day - 1]++;
    });
    const maxDayCount = Math.max(...days, 1);

    waveContainer.innerHTML = days.map((c, i) => {
      const h = Math.round((c / maxDayCount) * 100);
      return `<div class="wave-bar active" id="w-bar-${i + 1}" style="height:${Math.max(15, h)}%;"></div>`;
    }).join("");

    let isPlaying = false;
    let timerId = null;

    function setDay(day) {
      day = Math.max(1, Math.min(56, Number(day)));
      rangeSlider.value = day;

      for (let i = 1; i <= 56; i++) {
        const bar = document.getElementById(`w-bar-${i}`);
        if (bar) {
          if (i <= day) bar.classList.add("active");
          else bar.classList.remove("active");
        }
      }

      if (onDayChange) onDayChange(day);
    }

    rangeSlider.addEventListener("input", (e) => {
      setDay(e.target.value);
    });

    if (playBtn) {
      playBtn.addEventListener("click", () => {
        isPlaying = !isPlaying;
        playBtn.textContent = isPlaying ? "⏸" : "▶";

        if (isPlaying) {
          if (Number(rangeSlider.value) >= 56) setDay(1);

          timerId = setInterval(() => {
            let nextDay = Number(rangeSlider.value) + 1;
            if (nextDay > 56) {
              clearInterval(timerId);
              isPlaying = false;
              playBtn.textContent = "▶";
            } else {
              setDay(nextDay);
            }
          }, 150);
        } else {
          clearInterval(timerId);
        }
      });
    }
  }

  /**
   * 3. Render Student Profile Flyout
   */
  function renderStudentFlyout(uid) {
    const flyout = document.getElementById("cg-flyout-panel");
    if (!flyout) return;

    const record = records.find(r => r.uid === uid) || records[0];
    if (!record) return;

    const uidText = document.getElementById("flyout-uid-text");
    const tierBadge = document.getElementById("flyout-tier-badge");
    const scoreVal = document.getElementById("flyout-score-val");
    const qualityVal = document.getElementById("flyout-quality-val");
    const devRes = document.getElementById("f-dev-res");
    const devStudy = document.getElementById("f-dev-study");
    const devNight = document.getElementById("f-dev-night");
    const llmText = document.getElementById("f-llm-text");

    if (uidText) uidText.textContent = `UID: ${record.uid}`;
    const isRed = record.tier === "red";
    const isOrange = record.tier === "orange";

    if (tierBadge) {
      tierBadge.textContent = isRed ? "高分预警 (红色)" : (isOrange ? "中分关注 (橙色)" : "常态观察 (绿色)");
      tierBadge.style.color = isRed ? "#f87171" : (isOrange ? "#fbbf24" : "#4ade80");
    }

    if (scoreVal) {
      scoreVal.textContent = (record.scoreExact ?? record.score).toFixed(3);
      scoreVal.className = isRed ? "red" : (isOrange ? "orange" : "green");
    }

    if (qualityVal) {
      qualityVal.textContent = record.quality === "HIGH_CONFIDENCE" ? "充分 (1.0)" : "基本可用 (0.85)";
    }

    const beh = record.behavior || {};
    const dev = record.deviations || {};

    if (devRes) {
      const z = (dev.spatial_residence ?? 0).toFixed(2);
      devRes.textContent = `${beh.residence_hours_daily?.toFixed(2) || 12.0} h/日 (${z > 0 ? "+" : ""}${z}σ)`;
    }
    if (devStudy) {
      const z = (dev.study_engagement ?? 0).toFixed(2);
      devStudy.textContent = `${beh.study_hours_daily?.toFixed(2) || 3.5} h/日 (${z > 0 ? "+" : ""}${z}σ)`;
    }
    if (devNight) {
      const z = (dev.circadian_night_unlock ?? 0).toFixed(2);
      devNight.textContent = `${beh.night_unlock_times?.toFixed(1) || 18.0} 次/夜 (${z > 0 ? "+" : ""}${z}σ)`;
    }

    if (llmText) {
      if (isRed) {
        llmText.innerHTML = `【时空画像】该生近 56 天日均宿舍滞留高达 ${beh.residence_hours_daily?.toFixed(2)} 小时，且随学期推移呈现典型的“孤岛化退缩”；夜间点亮偏高，睡眠节律紊乱。<br><br>【关怀切入】建议以“学业选课沟通/生活用电关心”为由开展面对面交流，切忌直接出示“心理系统高危预警”等标签。`;
      } else if (isOrange) {
        llmText.innerHTML = `【时空画像】该生行为指标轻度偏离队列常态，主要表现为时空活动半径收缩。数据质量置信度完备。<br><br>【建议】纳入常规朋辈互助陪伴，保持日常关注。`;
      } else {
        llmText.innerHTML = `【时空画像】日常校园轨迹健康活跃，生活圈与图文教学大楼流动均衡，日均作息规律，心理状态处于常态观察区间。`;
      }
    }

    flyout.classList.add("open");
  }

  /**
   * 4. Render Plain Data Table in View 3
   */
  function renderCasesTable(onSelect) {
    const tbody = document.getElementById("cases-plain-tbody");
    if (!tbody || !records.length) return;

    tbody.innerHTML = records.map(r => {
      const score = (r.scoreExact ?? r.score).toFixed(3);
      const isRed = r.tier === "red";
      const isOrange = r.tier === "orange";
      const tierBadge = isRed 
        ? `<span style="color:#b91c1c; font-weight:700;">高分预警</span>`
        : (isOrange ? `<span style="color:#b45309; font-weight:700;">中分关注</span>` : `<span style="color:#15803d;">常态观察</span>`);

      return `
        <tr data-uid="${r.uid}" style="cursor:pointer;">
          <td style="font-family:monospace; font-weight:700;">${r.uid}</td>
          <td><strong>${score}</strong></td>
          <td>${tierBadge}</td>
          <td>${r.quality === "HIGH_CONFIDENCE" ? "充分 (1.0)" : "基本可用"}</td>
          <td>${r.behavior?.residence_hours_daily?.toFixed(2)} h/日</td>
          <td>${r.behavior?.study_hours_daily?.toFixed(2)} h/日</td>
          <td>${r.behavior?.night_unlock_times?.toFixed(1)} 次/夜</td>
        </tr>
      `;
    }).join("");

    tbody.querySelectorAll("tr").forEach(tr => {
      tr.addEventListener("click", () => {
        tbody.querySelectorAll("tr").forEach(t => t.style.background = "");
        tr.style.background = "#f0f9ff";
        if (onSelect) onSelect(tr.dataset.uid);
      });
    });
  }

})();
