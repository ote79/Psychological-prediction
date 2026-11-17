/**
 * APPLICATION ORCHESTRATOR (APP.JS)
 * Coordinates View Transitions, Cosmograph WebGL Engine, State, and Events.
 */
(() => {
  "use strict";

  const data = window.PREVIEW_DATA;
  const c3d = window.COSMOGRAPH_3D;
  const visuals = window.WORKBENCH_VISUALS;

  let currentView = "foundry";
  let selectedUid = data ? data.metadata.showcaseUid : "6c4cf487";

  function setView(viewName, targetUid = null) {
    currentView = viewName;

    // 1. Update Navigation Tab Buttons
    document.querySelectorAll(".tab-btn").forEach(btn => {
      if (btn.dataset.view === viewName) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // 2. Toggle View Panels
    document.querySelectorAll(".view-panel").forEach(panel => {
      if (panel.id === `view-${viewName}`) {
        panel.classList.add("active");
      } else {
        panel.classList.remove("active");
      }
    });

    // 3. Update Body Class for Theming
    if (viewName === "cosmograph") {
      document.body.className = "mode-cosmograph";
      if (c3d) {
        setTimeout(() => {
          c3d.resize();
          if (targetUid) {
            selectedUid = targetUid;
            c3d.focusStudent(targetUid);
            visuals.renderStudentFlyout(targetUid);
          }
        }, 50);
      }
    } else {
      document.body.className = "mode-foundry";
    }

    if (viewName === "cases") {
      visuals.renderCaseDetailPane(targetUid || selectedUid);
    }

    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function initApp() {
    // 1. Initialize Cosmograph 3D Scene in background
    if (c3d) {
      c3d.init("cg-canvas-container");

      // Bind selection callback from 3D raycast click
      c3d.setSelectCallback(uid => {
        selectedUid = uid;
        c3d.focusStudent(uid);
        visuals.renderStudentFlyout(uid);
      });
    }

    // 2. Render Cosmograph Controls & Drawer
    visuals.renderCosmographDrawer({
      onZoneFilter: (zone) => {
        // Find cluster center and pan camera
        const trajectoryData = window.CAMPUS_TRAJECTORIES;
        if (trajectoryData?.metadata?.centers?.[zone]) {
          // Can focus zone
        }
      },
      onScoreFilter: (minScore, maxScore) => {
        if (c3d) c3d.filterByScoreRange(minScore, maxScore);
      },
      onPhenotypeFilter: (activePhenotypeSet) => {
        if (c3d) c3d.filterByPhenotype(activePhenotypeSet);
      },
      onSelectStudent: (uid) => {
        selectedUid = uid;
        if (c3d) c3d.focusStudent(uid);
        visuals.renderStudentFlyout(uid);
      }
    });

    // 3. Render Timeline Scrubber
    visuals.renderCosmographTimeline((day) => {
      if (c3d) c3d.filterByDay(day);
    });

    // 4. Render Cases Table
    visuals.renderCasesTable((uid) => {
      selectedUid = uid;
      visuals.renderCaseDetailPane(uid);
    });

    // 5. Setup View Switching Click Events
    document.querySelectorAll("[data-view]").forEach(btn => {
      btn.addEventListener("click", () => {
        setView(btn.dataset.view);
      });
    });

    // 6. Direct Portal Dive into Cosmograph
    const btnDive = document.getElementById("portal-dive");
    if (btnDive) {
      btnDive.addEventListener("click", () => {
        setView("cosmograph");
      });
    }

    const btnQuickDive = document.getElementById("btn-dive-cosmograph");
    if (btnQuickDive) {
      btnQuickDive.addEventListener("click", () => {
        setView("cosmograph");
      });
    }

    const btnBackFoundry = document.getElementById("cg-btn-back-foundry");
    if (btnBackFoundry) {
      btnBackFoundry.addEventListener("click", () => {
        setView("foundry");
      });
    }

    // 7. Cosmograph Top Controls
    const btnResetView = document.getElementById("cg-btn-reset-view");
    if (btnResetView) {
      btnResetView.addEventListener("click", () => {
        if (c3d) c3d.resetView();
        const flyout = document.getElementById("cg-profile-flyout");
        if (flyout) flyout.classList.remove("open");
      });
    }

    const btnResetFilters = document.getElementById("btn-reset-filters");
    if (btnResetFilters) {
      btnResetFilters.addEventListener("click", () => {
        if (c3d) c3d.resetView();
        visuals.renderCosmographDrawer({
          onScoreFilter: (min, max) => c3d && c3d.filterByScoreRange(min, max),
          onPhenotypeFilter: (set) => c3d && c3d.filterByPhenotype(set),
          onSelectStudent: (uid) => {
            selectedUid = uid;
            if (c3d) c3d.focusStudent(uid);
            visuals.renderStudentFlyout(uid);
          }
        });
      });
    }

    const btnToggleOrbit = document.getElementById("cg-btn-toggle-orbit");
    if (btnToggleOrbit) {
      btnToggleOrbit.addEventListener("click", () => {
        if (c3d) {
          const orbiting = c3d.toggleOrbit();
          btnToggleOrbit.textContent = `3D 轨道慢旋: ${orbiting ? "开" : "关"}`;
        }
      });
    }

    const btnToggleDrawer = document.getElementById("btn-toggle-drawer");
    const drawer = document.getElementById("cg-drawer");
    if (btnToggleDrawer && drawer) {
      btnToggleDrawer.addEventListener("click", () => {
        drawer.classList.toggle("collapsed");
        btnToggleDrawer.textContent = drawer.classList.contains("collapsed") ? "▸" : "◂";
        setTimeout(() => c3d && c3d.resize(), 260);
      });
    }

    // 8. Profile Flyout Close & Actions
    const btnCloseFlyout = document.getElementById("btn-close-flyout");
    if (btnCloseFlyout) {
      btnCloseFlyout.addEventListener("click", () => {
        const flyout = document.getElementById("cg-profile-flyout");
        if (flyout) flyout.classList.remove("open");
        if (c3d) c3d.focusStudent(null);
      });
    }

    const btnFlyoutFocus = document.getElementById("btn-flyout-focus");
    if (btnFlyoutFocus) {
      btnFlyoutFocus.addEventListener("click", () => {
        if (c3d && selectedUid) c3d.focusStudent(selectedUid);
      });
    }

    const btnFlyoutFollow = document.getElementById("btn-flyout-follow");
    if (btnFlyoutFollow) {
      btnFlyoutFollow.addEventListener("click", () => {
        btnFlyoutFollow.textContent = "已纳入重点关怀名单 ✓";
        btnFlyoutFollow.style.background = "#16a34a";
      });
    }

    // 9. Node Clicks on Foundry Ontology Platform
    document.querySelectorAll(".iso-node").forEach(node => {
      node.addEventListener("click", () => {
        const zone = node.dataset.zone;
        setView("cosmograph");
      });
    });

    // 10. Listen to custom navigation events
    document.addEventListener("app:navigate", (e) => {
      if (e.detail?.view) {
        setView(e.detail.view, e.detail.uid);
      }
    });

    // 11. Keyboard Shortcuts
    window.addEventListener("keydown", (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT") return;

      if (e.key === "1") setView("foundry");
      else if (e.key === "2") setView("cosmograph");
      else if (e.key === "3") setView("cases");
      else if (e.key === "4") setView("research");
      else if (e.key === "Escape") {
        const flyout = document.getElementById("cg-profile-flyout");
        if (flyout) flyout.classList.remove("open");
        if (c3d) c3d.focusStudent(null);
      }
    });

    // Initial View setup
    setView("foundry");
  }

  // Launch when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }

})();
