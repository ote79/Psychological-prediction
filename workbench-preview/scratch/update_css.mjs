import fs from "node:fs";
import path from "node:path";

const cssPath = "E:\\心理预警\\Psychological-prediction\\workbench-preview\\ui.css";
const existingCss = fs.readFileSync(cssPath, "utf8");

const startFoundryCss = existingCss.indexOf('/* ==========================================================================\n   VIEW 1: PALANTIR FOUNDRY ARCHITECTURE (CANVAS)');
const startCosmographCss = existingCss.indexOf('/* ==========================================================================\n   VIEW 2: COSMOGRAPH APP');

if (startFoundryCss === -1 || startCosmographCss === -1) {
  console.error("Could not find section markers in ui.css");
  process.exit(1);
}

const newFoundryCss = `/* ==========================================================================
   VIEW 1: PALANTIR FOUNDRY ARCHITECTURE (CANVAS)
   ========================================================================== */
.palantir-canvas {
  max-width: 1400px;
  margin: 0 auto;
  padding: 8px 24px 14px 24px;
  min-height: calc(100vh - 52px);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: var(--p-bg);
  background-image: 
    var(--p-top-gradient),
    linear-gradient(to right, rgba(0, 0, 0, 0.025) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.025) 1px, transparent 1px);
  background-size: 100% 200px, 24px 24px, 24px 24px;
  background-repeat: no-repeat, repeat, repeat;
}

/* Top Monitors Row */
.monitors-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 18px;
  margin-top: 2px;
  flex-shrink: 0;
}

.monitor-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.monitor-screen {
  width: 100%;
  height: 82px;
  background: #ffffff;
  border: 1.5px solid #1e293b;
  border-radius: 5px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.screen-chrome {
  height: 18px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
}

.screen-chrome .dots {
  display: flex;
  gap: 3px;
}

.screen-chrome .dots i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #cbd5e1;
}

.chrome-title {
  font-size: 7.5px;
  font-weight: 700;
  letter-spacing: 0.8px;
  color: #64748b;
  font-family: var(--font-mono);
}

.chrome-badge {
  font-size: 7px;
  font-weight: 700;
  padding: 1px 4px;
  background: #e2e8f0;
  border-radius: 2.5px;
  color: #475569;
}

.chrome-badge.live {
  background: #dcfce7;
  color: #15803d;
}

.screen-viewport {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
}

.monitor-svg {
  width: 100%;
  height: 100%;
}

.monitor-stand {
  width: 6px;
  height: 8px;
  background: #1e293b;
}

.monitor-base {
  width: 40px;
  height: 2px;
  background: #1e293b;
  border-radius: 1px;
}

.monitor-title-box {
  margin-top: 3px;
  border: 1.5px solid #1e293b;
  border-radius: 3px;
  background: #ffffff;
  padding: 2px 18px;
}

.monitor-title-box h3 {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.4px;
  color: #000000;
  text-align: center;
  margin: 0;
}

/* Fanning Bus Cables */
.cables-fanning {
  width: 100%;
  position: relative;
  height: 28px;
  flex-shrink: 0;
}

.cables-fanning svg {
  width: 100%;
  height: 100%;
  display: block;
}

.mcp-badges-row {
  position: absolute;
  top: 17px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 20px;
  pointer-events: none;
}

.mcp-pill {
  font-size: 7.5px;
  font-weight: 800;
  letter-spacing: 0.5px;
  padding: 0 5px;
  border-radius: 2.5px;
  background: #ffffff;
  border: 1px solid #1e293b;
  color: #000000;
  font-family: var(--font-mono);
}

/* Center 2.5D Isometric ONTOLOGY SYSTEM Stage */
.ontology-master-stage {
  position: relative;
  width: 100%;
  margin-top: 0px;
  cursor: pointer;
  flex-shrink: 1;
}

.isometric-canvas-wrap {
  width: 100%;
  position: relative;
}

.isometric-svg {
  width: 100%;
  height: auto;
  max-height: 380px;
  display: block;
}

/* Floating Cards in Palantir View */
.palantir-float-card {
  position: absolute;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 5px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
  z-index: 10;
}

.palantir-float-card.card-left {
  top: 35px;
  left: 0px;
  width: 180px;
  padding: 6px 10px;
}

.palantir-float-card.card-right {
  top: 35px;
  right: 0px;
  width: 215px;
  padding: 6px 10px;
}

.f-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}

.f-card-tag {
  font-size: 9.5px;
  font-weight: 800;
  color: #000000;
  font-family: var(--font-mono);
}

.f-card-pill-blue {
  font-size: 8px;
  font-weight: 700;
  padding: 1px 4px;
  border-radius: 2.5px;
  background: #e0f2fe;
  color: #0369a1;
}

.f-card-table {
  width: 100%;
  font-size: 8.5px;
  border-collapse: collapse;
}

.f-card-table td {
  padding: 1.5px 0;
  border-bottom: 1px dashed #f1f5f9;
  color: #475569;
}

.f-card-table td.bold {
  font-weight: 700;
  color: #000000;
  text-align: right;
}

.f-card-table td.red-dot {
  color: #dc2626;
}

.f-card-hint {
  margin-top: 4px;
  font-size: 8px;
  color: #0284c7;
  font-weight: 600;
}

.access-table {
  width: 100%;
  font-size: 8px;
  border-collapse: collapse;
}

.access-table th {
  padding: 2px 0;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
  color: #64748b;
  font-weight: 700;
}

.access-table td {
  padding: 2px 0;
  border-bottom: 1px solid #f8fafc;
}

.access-table td.bold {
  font-weight: 700;
  color: #000000;
}

.policy-tag {
  font-family: var(--font-mono);
  font-size: 7.5px;
  color: #0369a1;
}

/* Center Platform Slabs & [ ONTOLOGY SYSTEM ] */
.ontology-platform-slabs {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -12px;
  z-index: 20;
}

.ontology-title-pill {
  background: #ffffff;
  border: 1.5px solid #0284c7;
  border-radius: 3px;
  padding: 2px 18px;
  margin-bottom: 3px;
  box-shadow: 0 2px 6px rgba(2, 132, 199, 0.1);
}

.ontology-title-pill span {
  font-size: 11.5px;
  font-weight: 900;
  letter-spacing: 1.8px;
  color: #0284c7;
}

.slab-layer {
  width: 92%;
  height: 16px;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  display: flex;
  font-size: 7.5px;
  color: #475569;
  letter-spacing: 0.3px;
}

.slab-layer.slab-1 {
  border-bottom: none;
}

.slab-col {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 10px;
}

.slab-col.right {
  border-left: 1px solid #cbd5e1;
  justify-content: flex-end;
}

.slab-footer-caption {
  margin-top: 3px;
}

.slab-footer-caption span {
  font-size: 8.5px;
  font-weight: 800;
  letter-spacing: 1.8px;
  color: #0284c7;
  font-family: var(--font-sans);
}

/* Cables to Base */
.cables-to-base {
  width: 100%;
  height: 16px;
  flex-shrink: 0;
}

.cables-to-base svg {
  width: 100%;
  height: 100%;
}

/* Bottom Four Server Chassis Units (DATA, LOGIC, MODELS, ACTIONS) */
.chassis-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  flex-shrink: 0;
  margin-top: 2px;
}

.chassis-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chassis-box {
  width: 100%;
  background: #ffffff;
  border: 1.5px solid #1e293b;
  border-radius: 3px;
  padding: 5px 8px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.03);
}

.chassis-box.highlight-chassis {
  border-color: #0284c7;
}

.chassis-switches-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3px 6px;
}

.chassis-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 8px;
  font-weight: 700;
  color: #1e293b;
  font-family: var(--font-mono);
  user-select: none;
}

.toggle-icon {
  font-size: 8.5px;
  color: #94a3b8;
}

.toggle-icon.active {
  color: #0284c7;
}

.chassis-legs {
  width: 65%;
  height: 3px;
  background: #cbd5e1;
}

.chassis-title {
  margin-top: 2px;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 1.8px;
  color: #000000;
  text-align: center;
}

`;

const updatedCss = existingCss.slice(0, startFoundryCss) + newFoundryCss + existingCss.slice(startCosmographCss);
fs.writeFileSync(cssPath, updatedCss, "utf8");
console.log("Updated ui.css successfully");
