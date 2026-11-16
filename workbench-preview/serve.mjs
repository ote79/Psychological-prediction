import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.argv[2] || 4173);
const files = new Set(["index.html", "ui.css", "app.js", "visuals.js", "scene3d.js", "three-runtime.js", "data.js"]);
const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript" };

const server = http.createServer(async (request, response) => {
  const pathname = new URL(request.url, "http://127.0.0.1").pathname;
  const file = pathname === "/" ? "index.html" : pathname.slice(1);
  if (!files.has(file)) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("未找到页面");
    return;
  }
  try {
    const content = await fs.readFile(path.join(directory, file));
    response.writeHead(200, { "Content-Type": `${types[path.extname(file)]}; charset=utf-8`, "Cache-Control": "no-store" });
    response.end(request.method === "HEAD" ? undefined : content);
  } catch {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("预览文件暂时不可用");
  }
});

server.on("error", error => {
  console.error(error.code === "EADDRINUSE" ? `端口 ${port} 已被占用，可在命令末尾指定其他端口。` : error.message);
  process.exitCode = 1;
});
server.listen(port, "127.0.0.1", () => console.log(`本地预览：http://127.0.0.1:${port}`));
