import fs from "node:fs";
import path from "node:path";

const targetBase = "E:\\心理预警\\外部参考网页源码";
if (!fs.existsSync(targetBase)) {
  fs.mkdirSync(targetBase, { recursive: true });
}

function sanitizePath(pathname) {
  let p = pathname.split("?")[0].replace(/^\/+/, "");
  p = p.replace(/[:*?"<>|]/g, "_");
  if (!p || p.endsWith("/")) p += "index.html";
  return p;
}

async function fetchWithRetry(url, options = {}, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
          ...options.headers
        },
        ...options
      });
      if (res.ok) return res;
      console.warn(`[HTTP ${res.status}] ${url}`);
    } catch (e) {
      console.warn(`[Attempt ${i+1}] Error fetching ${url}: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 600));
  }
  return null;
}

// ---------------------------------------------------------
// 1. COSMOGRAPH.APP
// ---------------------------------------------------------
async function downloadCosmograph() {
  console.log("=== Downloading Cosmograph.app ===");
  const outDir = path.join(targetBase, "Cosmograph_App");
  fs.mkdirSync(outDir, { recursive: true });

  const rootUrl = "https://cosmograph.app/";
  const res = await fetchWithRetry(rootUrl);
  if (!res) {
    console.error("Failed to fetch cosmograph.app");
    return;
  }
  const html = await res.text();
  fs.writeFileSync(path.join(outDir, "index_raw.html"), html, "utf8");

  // Extract all assets
  const assetRegex = /(?:src|href)=["']([^"']+)["']/gi;
  const matches = [...html.matchAll(assetRegex)];
  const rawUrls = new Set(matches.map(m => m[1]));

  console.log(`Found ${rawUrls.size} raw asset links in Cosmograph HTML.`);

  let rewrittenHtml = html;
  const downloadedPaths = new Set();

  for (const raw of rawUrls) {
    if (raw.startsWith("data:") || raw.startsWith("#") || raw.startsWith("mailto:")) continue;
    try {
      const u = new URL(raw, rootUrl);
      const cleanRel = sanitizePath(u.pathname);
      const localFile = path.join(outDir, cleanRel);
      fs.mkdirSync(path.dirname(localFile), { recursive: true });

      if (!downloadedPaths.has(localFile)) {
        downloadedPaths.add(localFile);
        console.log(`Downloading Cosmo asset: ${u.pathname}`);
        const aRes = await fetchWithRetry(u.href);
        if (aRes) {
          const buf = Buffer.from(await aRes.arrayBuffer());
          fs.writeFileSync(localFile, buf);

          // Deep crawl inside JS/CSS files for additional chunks / fonts / wasm
          if (cleanRel.endsWith(".js") || cleanRel.endsWith(".mjs") || cleanRel.endsWith(".css")) {
            const textContent = buf.toString("utf8");
            const subMatches = [...textContent.matchAll(/["']([/_a-zA-Z0-9\-\.]+\.(?:js|mjs|wasm|css|woff2|woff|ttf|png|svg))["']/g)];
            for (const sm of subMatches) {
              const subRaw = sm[1];
              try {
                const subU = new URL(subRaw, u.href);
                if (subU.hostname === u.hostname) {
                  const subCleanRel = sanitizePath(subU.pathname);
                  const subLocalFile = path.join(outDir, subCleanRel);
                  if (!downloadedPaths.has(subLocalFile)) {
                    downloadedPaths.add(subLocalFile);
                    console.log(`  Downloading Cosmo sub-asset: ${subU.pathname}`);
                    const subRes = await fetchWithRetry(subU.href);
                    if (subRes) {
                      fs.mkdirSync(path.dirname(subLocalFile), { recursive: true });
                      fs.writeFileSync(subLocalFile, Buffer.from(await subRes.arrayBuffer()));
                    }
                  }
                }
              } catch (e) {}
            }
          }
        }
      }
      rewrittenHtml = rewrittenHtml.split(raw).join(cleanRel.replace(/\\/g, "/"));
    } catch (e) {}
  }

  fs.writeFileSync(path.join(outDir, "index.html"), rewrittenHtml, "utf8");
  console.log("Cosmograph download complete!");
}

// ---------------------------------------------------------
// 2. PALANTIR FOUNDRY
// ---------------------------------------------------------
async function downloadPalantir() {
  console.log("\n=== Downloading Palantir Foundry ===");
  const outDir = path.join(targetBase, "Palantir_Foundry");
  fs.mkdirSync(outDir, { recursive: true });

  const rootUrl = "https://www.palantir.com/platforms/foundry/";
  const res = await fetchWithRetry(rootUrl);
  if (!res) {
    console.error("Failed to fetch Palantir Foundry");
    return;
  }
  const html = await res.text();
  fs.writeFileSync(path.join(outDir, "index_raw.html"), html, "utf8");

  // Extract all assets
  const assetRegex = /(?:src|href|srcset)=["']([^"']+)["']/gi;
  const matches = [...html.matchAll(assetRegex)];
  const rawUrls = new Set();

  for (const m of matches) {
    const val = m[1];
    if (val.includes(",")) {
      val.split(",").forEach(part => {
        const item = part.trim().split(" ")[0];
        if (item) rawUrls.add(item);
      });
    } else {
      rawUrls.add(val);
    }
  }

  // Also find any quoted asset paths like "/_next/static/..." or images
  const quoteMatches = [...html.matchAll(/["'](\/(?:_next|images|assets|static|media)[^"']+)["']/gi)];
  for (const q of quoteMatches) {
    rawUrls.add(q[1]);
  }

  console.log(`Found ${rawUrls.size} potential assets in Palantir HTML.`);

  let rewrittenHtml = html;
  const downloadedPaths = new Set();

  for (const raw of rawUrls) {
    if (raw.startsWith("data:") || raw.startsWith("#") || raw.startsWith("mailto:")) continue;
    try {
      const u = new URL(raw, rootUrl);
      if (!u.hostname.includes("palantir.com")) continue;

      const cleanRel = sanitizePath(u.pathname);
      const localFile = path.join(outDir, cleanRel);
      fs.mkdirSync(path.dirname(localFile), { recursive: true });

      if (!downloadedPaths.has(localFile)) {
        downloadedPaths.add(localFile);
        console.log(`Downloading Palantir asset: ${u.pathname}`);
        const aRes = await fetchWithRetry(u.href);
        if (aRes) {
          const buf = Buffer.from(await aRes.arrayBuffer());
          fs.writeFileSync(localFile, buf);

          // Deep crawl inside CSS/JS for additional fonts/images/chunks
          if (cleanRel.endsWith(".css") || cleanRel.endsWith(".js")) {
            const textContent = buf.toString("utf8");
            const subMatches = [...textContent.matchAll(/url\(["']?([^"')]+)["']?\)/gi)];
            for (const sm of subMatches) {
              const subRaw = sm[1];
              if (subRaw.startsWith("data:")) continue;
              try {
                const subU = new URL(subRaw, u.href);
                if (subU.hostname.includes("palantir.com")) {
                  const subCleanRel = sanitizePath(subU.pathname);
                  const subLocalFile = path.join(outDir, subCleanRel);
                  if (!downloadedPaths.has(subLocalFile)) {
                    downloadedPaths.add(subLocalFile);
                    console.log(`  Downloading Palantir sub-asset: ${subU.pathname}`);
                    const subRes = await fetchWithRetry(subU.href);
                    if (subRes) {
                      fs.mkdirSync(path.dirname(subLocalFile), { recursive: true });
                      fs.writeFileSync(subLocalFile, Buffer.from(await subRes.arrayBuffer()));
                    }
                  }
                }
              } catch (e) {}
            }
          }
        }
      }
      rewrittenHtml = rewrittenHtml.split(raw).join(cleanRel.replace(/\\/g, "/"));
    } catch (e) {}
  }

  fs.writeFileSync(path.join(outDir, "index.html"), rewrittenHtml, "utf8");
  console.log("Palantir Foundry download complete!");
}

async function main() {
  await downloadCosmograph();
  await downloadPalantir();
}

main();
