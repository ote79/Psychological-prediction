import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const sourceDirectory = path.dirname(fileURLToPath(import.meta.url));
const destination = path.join(path.dirname(sourceDirectory), "交付包", "观微工作台_3D全景版_2026-11-16");
const sourceOutput = path.join(destination, "源码");
fs.mkdirSync(sourceOutput, { recursive: true });
const read = name => fs.readFileSync(path.join(sourceDirectory, name), "utf8");
const scriptNames = ["data.js", "trajectories.js", "three-runtime.js", "scene3d.js", "visuals.js", "app.js"];
const escapeScript = value => value.replace(/<\/script/gi, "<\\/script");
let html = read("index.html").replace('  <link rel="stylesheet" href="ui.css">', "<style>\n" + read("ui.css") + "\n</style>");
html = html.replace(/  <script defer src="[^"]+"><\/script>\r?\n/g, "");
html = html.replace("</body>", scriptNames.map(name => "<script>\n" + escapeScript(read(name)) + "\n</script>").join("\n") + "\n</body>");
if (/<(?:script|link|img)\b[^>]*(?:src|href)\s*=/i.test(html)) throw new Error("离线入口仍有外部资源引用");
fs.writeFileSync(path.join(destination, "打开工作台.html"), html, "utf8");
const sources = ["index.html", "ui.css", ...scriptNames, "serve.mjs", "预览说明.md", "THREE-LICENSE.txt"];
for (const name of sources) fs.copyFileSync(path.join(sourceDirectory, name), path.join(sourceOutput, name));
const screenshots = [
  ["world-home-desktop.jpg", "首页_3D全景.jpg"],
  ["world-home-mobile.jpg", "首页_手机.jpg"],
  ["world-analysis-desktop.jpg", "分布分析_3D图表.jpg"],
  ["world-profile-desktop.jpg", "个案_3D行为差异.jpg"],
  ["world-overview-desktop.jpg", "跟进_3D流程.jpg"],
  ["world-research-desktop.jpg", "研究_3D模型对照.jpg"]
];
fs.mkdirSync(path.join(destination, "效果截图"), { recursive: true });
for (const [source, target] of screenshots) fs.copyFileSync(path.join(sourceDirectory, "screenshots", source), path.join(destination, "效果截图", target));
const instructions = [
  "观微工作台 · 3D 全景版",
  "日期：2026-11-16",
  "",
  "一、打开方式",
  "完整解压后，用 Edge 或 Chrome 打开“打开工作台.html”。无需联网或安装依赖。",
  "3D 场景需要浏览器支持 WebGL 2；运行库、图标和数据均已内置。",
  "",
  "二、首页操作",
  "展台上有群体分布、分数分布、行为分布、研究说明、数据质量、个案画像和跟进流程 7 个入口。",
  "鼠标移到模型或标签上，会显示介绍并抬起模型；移开后复位。点击即可进入对应页面。",
  "拖动模型可转动单个模型，拖动空白可转动整个展台；滚轮缩放，拖动超过 6 像素后不会跳转。",
  "模型有轻微浮动和低密度粒子；展台与模型会缓慢旋转，可用右上角按钮暂停或复位。",
  "键盘聚焦模块标签也会显示介绍；聚焦画布后，方向键旋转，Home 复位。",
  "首页下方保留直接入口，手机可横向拖动旋转，并通过页面滚动查看内容。",
  "",
  "三、详细页面",
  "分布分析：3D 柱形图、3D 行为点云、3D 质量关系图；柱形和质量节点可进入名单。",
  "分数图可切回平面数据，质量图可展开精确交叉表。行为图可切换指标并选择记录。",
  "跟进总览：3D 阶段流程，点击阶段查看本次演练的名单。",
  "个案工作台：3D 行为偏离坐标及精确数值，保留筛选、质量、跟进和模板摘要。",
  "研究说明：3D 圆环展示三种方案的 ROC-AUC，完整指标仍在表格中。",
  "",
  "四、数据与演练",
  "仍为原有 209 份匿名研究记录；高分 14、中分 62、常态 133；记录充分 199、基本可用 10。",
  "首页模型是功能入口，形状和位置不表示院系、地理位置、社交关系或心理原因。",
  "行为点云使用真实分数和行为字段，质量连线表示交叉人数，不表示因果或时间流动。",
  "分数分组按同轮未舍入分数计算。演示分级不是诊断，本次没有重新训练模型。",
  "跟进与备注仅在当前会话中保留，刷新清空；不表示真实访谈、干预或危机解除。",
  "",
  "五、运行与维护",
  "可在“源码”目录执行 node serve.mjs，再访问 http://127.0.0.1:4173/。",
  "端口占用时执行 node serve.mjs 4174。运行本机服务需要 Node.js 18 或更新版本。",
  "scene3d.js 统一管理建模、射线选取、旋转、粒子和资源释放；ui.css 为重写后的样式。",
  "Three.js 0.180.0 已打包进 three-runtime.js，许可证见 THREE-LICENSE.txt。",
  "",
  "六、验证",
  "已检查脚本语法、数据一致性、模块跳转、旋转控制、拖动防误触、筛选、流程和窄屏布局。",
  "单文件通过本机 HTTP 验证；具体设备的 WebGL 支持取决于浏览器和显卡环境。",
  "启用系统“减少动态效果”时，自动旋转与漂浮会停止；仍可手动旋转。"
].join("\r\n");
fs.writeFileSync(path.join(destination, "使用说明.txt"), instructions, "utf8");
console.log(JSON.stringify({ destination, entryBytes: Buffer.byteLength(html, "utf8"), sourceFiles: sources.length }));
