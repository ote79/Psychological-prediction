import fs from "node:fs";
import path from "node:path";

const jsPath = "E:\\心理预警\\Psychological-prediction\\workbench-preview\\scene3d.js";
let content = fs.readFileSync(jsPath, "utf8");

// Update sprite gradient
content = content.replace(
  `grad.addColorStop(0.25, "rgba(255, 255, 255, 0.85)");\n    grad.addColorStop(0.6, "rgba(255, 255, 255, 0.25)");`,
  `grad.addColorStop(0.2, "rgba(255, 255, 255, 0.65)");\n    grad.addColorStop(0.5, "rgba(255, 255, 255, 0.18)");`
);

// Update PointsMaterial size and opacity
content = content.replace(
  `size: 4.2,\n      map: createGlowSprite(),\n      vertexColors: true,\n      blending: 2, // AdditiveBlending\n      depthTest: false,\n      transparent: true,\n      opacity: 0.88`,
  `size: 2.2,\n      map: createGlowSprite(),\n      vertexColors: true,\n      blending: 2, // AdditiveBlending\n      depthTest: false,\n      transparent: true,\n      opacity: 0.80`
);

fs.writeFileSync(jsPath, content, "utf8");
console.log("Updated scene3d.js successfully");
