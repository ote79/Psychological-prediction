/**
 * APPLICATION ORCHESTRATOR (APP.JS)
 * Controls 1:1 view switching between Palantir Foundry and Cosmograph.
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

    // 1. Update Top Switcher Buttons
    document.querySelectorAll(".view-switch-btn").forEach(btn => {
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

    // 3. Theme-specific adjustments
    if (viewName === "cosmograph") {
      document.body.className = "theme-cosmograph";
      if (c3d) {
        setTimeout(() => {
          c3d.resize();
          if (targetUid) {
            selectedUid = targetUid;
            c3d.focusStudent(targetUid);
            visuals.renderStudentFlyout(targetUid);
          }
        }, 30);
      }
    } else {
      document.body.className = "theme-foundry";
    }

    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function initApp() {
    // 1. Initialize Cosmograph 3D Engine
    if (c3d) {
      c3d.init("cg-canvas-container");

      c3d.setSelectCallback(uid => {
        selectedUid = uid;
        c3d.focusStudent(uid);
        visuals.renderStudentFlyout(uid);
      });
    }

    // 2. Render Cosmograph Controls
    visuals.renderCosmographDrawer({
      onPhenotypeFilter: (set) => {
        if (c3d) c3d.filterByPhenotype(set);
      },
      onSelectStudent: (uid) => {
        selectedUid = uid;
        if (c3d) c3d.focusStudent(uid);
        visuals.renderStudentFlyout(uid);
      }
    });

    // 3. Render Timeline
    visuals.renderCosmographTimeline((day) => {
      if (c3d) c3d.filterByDay(day);
    });

    // 4. Render Table
    visuals.renderCasesTable((uid) => {
      selectedUid = uid;
      setView("cosmograph", uid);
    });

    // 5. Navigation Tab Click Events
    document.querySelectorAll(".view-switch-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        setView(btn.dataset.view);
      });
    });

    // 6. Direct Click on the Ontology Platform to Dive into Cosmograph
    const ontologyStage = document.getElementById("ontology-master-stage");
    if (ontologyStage) {
      ontologyStage.addEventListener("click", () => {
        setView("cosmograph");
      });
    }

    const btnQuickStart = document.getElementById("btn-quick-launch-star");
    if (btnQuickStart) {
      btnQuickStart.addEventListener("click", () => {
        setView("cosmograph");
      });
    }

    // 7. Cosmograph Back Button
    const btnBackFoundry = document.getElementById("btn-cg-back-foundry");
    if (btnBackFoundry) {
      btnBackFoundry.addEventListener("click", () => {
        setView("foundry");
      });
    }

    // 8. Cosmograph Viewport Controls (Fit view, zoom)
    const btnFit = document.getElementById("cg-tool-fit");
    if (btnFit && c3d) {
      btnFit.addEventListener("click", () => c3d.resetView());
    }

    const zoomIn = document.getElementById("cg-zoom-in");
    const zoomOut = document.getElementById("cg-zoom-out");
    if (zoomIn) {
      zoomIn.addEventListener("click", () => {
        // Zoom in event
      });
    }

    // 9. Profile Flyout Controls
    const btnCloseFlyout = document.getElementById("btn-close-cg-flyout");
    if (btnCloseFlyout) {
      btnCloseFlyout.addEventListener("click", () => {
        const flyout = document.getElementById("cg-flyout-panel");
        if (flyout) flyout.classList.remove("open");
        if (c3d) c3d.focusStudent(null);
      });
    }

    const btnFocusStudent = document.getElementById("btn-focus-student-pt");
    if (btnFocusStudent && c3d) {
      btnFocusStudent.addEventListener("click", () => {
        if (selectedUid) c3d.focusStudent(selectedUid);
      });
    }

    // 10. Floating Paper Tags Hover / Click
    document.querySelectorAll(".cg-paper-tag").forEach(tag => {
      tag.addEventListener("click", () => {
        // Focus high risk cluster
        if (c3d) c3d.focusStudent("6c4cf487");
        visuals.renderStudentFlyout("6c4cf487");
      });
    });

    // 11. Keyboard Shortcuts (1: Foundry, 2: Cosmograph, 3: Cases, 4: Research, Esc: Close)
    window.addEventListener("keydown", (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT") return;

      if (e.key === "1") setView("foundry");
      else if (e.key === "2") setView("cosmograph");
      else if (e.key === "3") setView("cases");
      else if (e.key === "4") setView("research");
      else if (e.key === "Escape") {
        const flyout = document.getElementById("cg-flyout-panel");
        if (flyout) flyout.classList.remove("open");
        if (c3d) c3d.focusStudent(null);
      }
    });

    // Default view
    setView("foundry");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }

})();
