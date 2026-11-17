import fs from "node:fs";
import path from "node:path";

const dir = "E:\\心理预警\\Psychological-prediction\\workbench-preview";

// 1. Read existing index.html to extract the Cosmograph view, cases view, benchmark view, and scripts
const existingHtml = fs.readFileSync(path.join(dir, "index.html"), "utf8");

// We keep the header and view-cosmograph, view-cases, view-research intact, but replace view-foundry with the dense 18-building map & tight viewport layout
const foundrySection = `
  <!-- ================= VIEW 1: PALANTIR FOUNDRY ARCHITECTURE ================= -->
  <main class="view-panel active" id="view-foundry" aria-label="Palantir Foundry 架构">
    <div class="palantir-canvas">

      <!-- Top Row: Three Monitor Displays -->
      <section class="monitors-row">
        
        <!-- Monitor 1: Analytics + Workflows -->
        <div class="monitor-wrapper">
          <div class="monitor-screen">
            <div class="screen-chrome">
              <span class="dots"><i></i><i></i><i></i></span>
              <span class="chrome-title">CAMPUS SPATIO-TEMPORAL DASHBOARD</span>
              <span class="chrome-badge">PASSIVE SENSING</span>
            </div>
            <div class="screen-viewport">
              <svg class="monitor-svg" viewBox="0 0 260 76">
                <line x1="20" y1="62" x2="240" y2="62" stroke="#cbd5e1" stroke-width="1"/>
                <line x1="20" y1="12" x2="20" y2="62" stroke="#cbd5e1" stroke-width="1"/>
                <path d="M 20 50 Q 60 20, 100 38 T 160 20 T 220 42 T 240 14" fill="none" stroke="#0284c7" stroke-width="1.8"/>
                <path d="M 20 58 Q 70 45, 120 52 T 180 32 T 240 28" fill="none" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3 3"/>
                <circle cx="160" cy="20" r="3" fill="#0284c7"/>
                <line x1="160" y1="12" x2="160" y2="62" stroke="#0284c7" stroke-width="1" stroke-dasharray="2 2"/>
                <rect x="25" y="14" width="56" height="15" rx="2" fill="#f1f5f9" stroke="#e2e8f0"/>
                <text x="29" y="24" font-size="7" fill="#475569" font-family="monospace">N=209 COHORT</text>
              </svg>
            </div>
          </div>
          <div class="monitor-stand"></div>
          <div class="monitor-base"></div>
          <div class="monitor-title-box">
            <h3>ANALYTICS + WORKFLOWS</h3>
          </div>
        </div>

        <!-- Monitor 2: Agent Building -->
        <div class="monitor-wrapper">
          <div class="monitor-screen">
            <div class="screen-chrome">
              <span class="dots"><i></i><i></i><i></i></span>
              <span class="chrome-title">AUTONOMOUS LLM TRIAGE PIPELINE</span>
              <span class="chrome-badge live">MCP LIVE</span>
            </div>
            <div class="screen-viewport">
              <svg class="monitor-svg" viewBox="0 0 260 76">
                <rect x="22" y="24" width="52" height="24" rx="3" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2"/>
                <text x="28" y="38" font-size="7.5" font-weight="700" fill="#0f172a" font-family="sans-serif">CA-Gate</text>
                
                <line x1="74" y1="36" x2="102" y2="36" stroke="#0284c7" stroke-width="1.5"/>
                
                <rect x="102" y="18" width="58" height="34" rx="3" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.5"/>
                <text x="110" y="34" font-size="8" font-weight="700" fill="#0369a1" font-family="sans-serif">LLM Agent</text>
                <text x="114" y="44" font-size="6" fill="#64748b" font-family="monospace">Counselor</text>

                <line x1="160" y1="36" x2="188" y2="36" stroke="#0284c7" stroke-width="1.5"/>

                <rect x="188" y="24" width="52" height="24" rx="3" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2"/>
                <text x="194" y="38" font-size="7.5" font-weight="700" fill="#0f172a" font-family="sans-serif">Triage Care</text>

                <path d="M 86 31 L 90 36 L 85 38 L 88 43" stroke="#eab308" stroke-width="1.4" fill="none"/>
                <path d="M 172 31 L 176 36 L 171 38 L 174 43" stroke="#eab308" stroke-width="1.4" fill="none"/>
              </svg>
            </div>
          </div>
          <div class="monitor-stand"></div>
          <div class="monitor-base"></div>
          <div class="monitor-title-box">
            <h3>AGENT BUILDING</h3>
          </div>
        </div>

        <!-- Monitor 3: Products & SDKs -->
        <div class="monitor-wrapper">
          <div class="monitor-screen">
            <div class="screen-chrome">
              <span class="dots"><i></i><i></i><i></i></span>
              <span class="chrome-title">REST API & SAFETY ENCLAVE</span>
              <span class="chrome-badge">ZERO-RAW-GPS</span>
            </div>
            <div class="screen-viewport">
              <svg class="monitor-svg" viewBox="0 0 260 76">
                <!-- Mobile Mockup -->
                <rect x="36" y="10" width="34" height="56" rx="3.5" fill="#ffffff" stroke="#64748b" stroke-width="1.2"/>
                <line x1="46" y1="15" x2="60" y2="15" stroke="#94a3b8" stroke-width="1.2"/>
                <rect x="41" y="21" width="24" height="10" rx="1.5" fill="#e0f2fe"/>
                <rect x="41" y="35" width="24" height="5" rx="1" fill="#f1f5f9"/>
                <rect x="41" y="44" width="24" height="5" rx="1" fill="#f1f5f9"/>

                <!-- Isometric 3D Security Cube -->
                <g transform="translate(130, 36)">
                  <polygon points="0,-14 13,-7 0,0 -13,-7" fill="#60a5fa" stroke="#2563eb" stroke-width="1"/>
                  <polygon points="-13,-7 0,0 0,14 -13,7" fill="#3b82f6" stroke="#1d4ed8" stroke-width="1"/>
                  <polygon points="13,-7 0,0 0,14 13,7" fill="#1d4ed8" stroke="#1e40af" stroke-width="1"/>
                </g>

                <!-- API Hierarchy Tree -->
                <line x1="185" y1="22" x2="215" y2="22" stroke="#94a3b8" stroke-width="1"/>
                <line x1="200" y1="22" x2="200" y2="58" stroke="#94a3b8" stroke-width="1"/>
                <line x1="200" y1="38" x2="225" y2="38" stroke="#94a3b8" stroke-width="1"/>
                <line x1="200" y1="58" x2="235" y2="58" stroke="#94a3b8" stroke-width="1"/>
                <circle cx="215" cy="22" r="2.2" fill="#0284c7"/>
                <circle cx="225" cy="38" r="2.2" fill="#0284c7"/>
                <circle cx="235" cy="58" r="2.2" fill="#0284c7"/>
              </svg>
            </div>
          </div>
          <div class="monitor-stand"></div>
          <div class="monitor-base"></div>
          <div class="monitor-title-box">
            <h3>PRODUCTS & SDKs</h3>
          </div>
        </div>

      </section>

      <!-- Connecting Cables Fanning Downward -->
      <section class="cables-fanning">
        <svg viewBox="0 0 1100 32" preserveAspectRatio="none">
          <path d="M 200 0 C 200 20, 480 14, 480 32" stroke="#1e293b" stroke-width="1.2" fill="none"/>
          <path d="M 220 0 C 220 18, 500 14, 500 32" stroke="#1e293b" stroke-width="1.2" fill="none"/>
          <path d="M 240 0 C 240 16, 520 14, 520 32" stroke="#1e293b" stroke-width="1.2" fill="none"/>
          <path d="M 900 0 C 900 20, 620 14, 620 32" stroke="#1e293b" stroke-width="1.2" fill="none"/>
          <path d="M 880 0 C 880 18, 600 14, 600 32" stroke="#1e293b" stroke-width="1.2" fill="none"/>
          <path d="M 860 0 C 860 16, 580 14, 580 32" stroke="#1e293b" stroke-width="1.2" fill="none"/>
          <text x="310" y="16" font-size="8" font-weight="700" fill="#0f172a" font-family="sans-serif">↑ READS + WRITES ↓</text>
          <text x="690" y="16" font-size="8" font-weight="700" fill="#0f172a" font-family="sans-serif">↑ READS + WRITES ↓</text>
        </svg>
        <div class="mcp-badges-row">
          <span class="mcp-pill">MCP</span>
          <span class="mcp-pill">MCP</span>
          <span class="mcp-pill">MCP</span>
          <span class="mcp-pill">MCP</span>
          <span class="mcp-pill">SDK</span>
          <span class="mcp-pill">SDK</span>
          <span class="mcp-pill">API</span>
        </div>
      </section>

      <!-- Center: The 2.5D Isometric CAMPUS GIS ONTOLOGY SYSTEM Platform -->
      <section class="ontology-master-stage" id="ontology-master-stage" title="点击下钻进入 Cosmograph 深空轨迹星图">
        
        <!-- Left Floating Card: # ZONE 04A (Dormitory) -->
        <div class="palantir-float-card card-left">
          <div class="f-card-header">
            <span class="f-card-tag"># ZONE 04A</span>
            <span class="f-card-pill-blue">Campus Object</span>
          </div>
          <table class="f-card-table">
            <tr><td>Status</td><td class="bold red-dot">● Anomalous Retreat</td></tr>
            <tr><td>Residence Hours (Avg)</td><td class="bold">18.34h</td></tr>
            <tr><td>Spatial Entropy</td><td class="bold">0.42 (Stagnant)</td></tr>
            <tr><td>Flagged Positives</td><td class="bold red-dot">● 14 Students</td></tr>
            <tr><td>CA-Gate Uptime</td><td class="bold">● 99.90%</td></tr>
            <tr><td>Efficiency Score</td><td class="bold">● 88</td></tr>
          </table>
          <div class="f-card-hint">
            <span>点击中央平台进入微观星图 ↘</span>
          </div>
        </div>

        <!-- The 2.5D Isometric Platform SVG Drawing (DENSE FULL CAMPUS MAP - 18 NODES) -->
        <div class="isometric-canvas-wrap">
          <svg class="isometric-svg" viewBox="0 0 1000 375">
            <defs>
              <radialGradient id="node-halo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.55"/>
                <stop offset="70%" stop-color="#0284c7" stop-opacity="0.22"/>
                <stop offset="100%" stop-color="#0284c7" stop-opacity="0"/>
              </radialGradient>
              <radialGradient id="node-halo-purple" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#c084fc" stop-opacity="0.6"/>
                <stop offset="70%" stop-color="#9333ea" stop-opacity="0.25"/>
                <stop offset="100%" stop-color="#9333ea" stop-opacity="0"/>
              </radialGradient>
              <marker id="arrow-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0284c7"/>
              </marker>
              <marker id="arrow-red" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#ef4444"/>
              </marker>
            </defs>

            <!-- 2.5D Isometric Platform Top Surface -->
            <polygon points="90,16 910,16 980,325 20,325" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
            
            <!-- Platform 3D Front Extrusion Slab Thickness -->
            <polygon points="20,325 980,325 980,336 20,336" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <polygon points="20,325 20,336 15,330" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
            <polygon points="980,325 980,336 985,330" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1"/>

            <!-- Campus Grid lines -->
            <g stroke="#f1f5f9" stroke-width="1">
              <line x1="75" y1="65" x2="925" y2="65"/>
              <line x1="60" y1="115" x2="940" y2="115"/>
              <line x1="45" y1="165" x2="955" y2="165"/>
              <line x1="35" y1="215" x2="965" y2="215"/>
              <line x1="28" y1="265" x2="975" y2="265"/>
              <line x1="200" y1="16" x2="140" y2="325"/>
              <line x1="320" y1="16" x2="280" y2="325"/>
              <line x1="440" y1="16" x2="420" y2="325"/>
              <line x1="560" y1="16" x2="580" y2="325"/>
              <line x1="680" y1="16" x2="720" y2="325"/>
              <line x1="800" y1="16" x2="860" y2="325"/>
            </g>

            <!-- Campus Perimeter Ring Avenue & Cross Roads (Asphalt + White Dash) -->
            <polygon points="135,32 865,32 925,295 75,295" fill="none" stroke="#e2e8f0" stroke-width="6"/>
            <polygon points="135,32 865,32 925,295 75,295" fill="none" stroke="#94a3b8" stroke-width="4"/>
            <polygon points="135,32 865,32 925,295 75,295" fill="none" stroke="#ffffff" stroke-width="1" stroke-dasharray="5 3"/>

            <line x1="500" y1="32" x2="500" y2="295" stroke="#94a3b8" stroke-width="3.5"/>
            <line x1="500" y1="32" x2="500" y2="295" stroke="#ffffff" stroke-width="1" stroke-dasharray="5 3"/>

            <line x1="105" y1="165" x2="895" y2="165" stroke="#94a3b8" stroke-width="3.5"/>
            <line x1="105" y1="165" x2="895" y2="165" stroke="#ffffff" stroke-width="1" stroke-dasharray="5 3"/>

            <!-- Campus Landscaping Trees -->
            <g>
              <g transform="translate(155, 45)"><ellipse cx="1" cy="2" rx="4" ry="2" fill="#94a3b8" opacity="0.3"/><circle cx="0" cy="0" r="3.5" fill="#16a34a"/><circle cx="-0.8" cy="-0.8" r="2.8" fill="#22c55e"/></g>
              <g transform="translate(225, 40)"><ellipse cx="1" cy="2" rx="4" ry="2" fill="#94a3b8" opacity="0.3"/><circle cx="0" cy="0" r="3.5" fill="#16a34a"/><circle cx="-0.8" cy="-0.8" r="2.8" fill="#22c55e"/></g>
              <g transform="translate(775, 40)"><ellipse cx="1" cy="2" rx="4" ry="2" fill="#94a3b8" opacity="0.3"/><circle cx="0" cy="0" r="3.5" fill="#16a34a"/><circle cx="-0.8" cy="-0.8" r="2.8" fill="#22c55e"/></g>
              <g transform="translate(845, 45)"><ellipse cx="1" cy="2" rx="4" ry="2" fill="#94a3b8" opacity="0.3"/><circle cx="0" cy="0" r="3.5" fill="#16a34a"/><circle cx="-0.8" cy="-0.8" r="2.8" fill="#22c55e"/></g>
              <g transform="translate(275, 150)"><ellipse cx="1" cy="2" rx="4" ry="2" fill="#94a3b8" opacity="0.3"/><circle cx="0" cy="0" r="3.5" fill="#16a34a"/><circle cx="-0.8" cy="-0.8" r="2.8" fill="#22c55e"/></g>
              <g transform="translate(425, 145)"><ellipse cx="1" cy="2" rx="4" ry="2" fill="#94a3b8" opacity="0.3"/><circle cx="0" cy="0" r="3.5" fill="#16a34a"/><circle cx="-0.8" cy="-0.8" r="2.8" fill="#22c55e"/></g>
              <g transform="translate(565, 145)"><ellipse cx="1" cy="2" rx="4" ry="2" fill="#94a3b8" opacity="0.3"/><circle cx="0" cy="0" r="3.5" fill="#16a34a"/><circle cx="-0.8" cy="-0.8" r="2.8" fill="#22c55e"/></g>
              <g transform="translate(735, 150)"><ellipse cx="1" cy="2" rx="4" ry="2" fill="#94a3b8" opacity="0.3"/><circle cx="0" cy="0" r="3.5" fill="#16a34a"/><circle cx="-0.8" cy="-0.8" r="2.8" fill="#22c55e"/></g>
              <g transform="translate(105, 275)"><ellipse cx="1" cy="2" rx="4" ry="2" fill="#94a3b8" opacity="0.3"/><circle cx="0" cy="0" r="3.5" fill="#16a34a"/><circle cx="-0.8" cy="-0.8" r="2.8" fill="#22c55e"/></g>
              <g transform="translate(285, 275)"><ellipse cx="1" cy="2" rx="4" ry="2" fill="#94a3b8" opacity="0.3"/><circle cx="0" cy="0" r="3.5" fill="#16a34a"/><circle cx="-0.8" cy="-0.8" r="2.8" fill="#22c55e"/></g>
              <g transform="translate(485, 275)"><ellipse cx="1" cy="2" rx="4" ry="2" fill="#94a3b8" opacity="0.3"/><circle cx="0" cy="0" r="3.5" fill="#16a34a"/><circle cx="-0.8" cy="-0.8" r="2.8" fill="#22c55e"/></g>
              <g transform="translate(620, 275)"><ellipse cx="1" cy="2" rx="4" ry="2" fill="#94a3b8" opacity="0.3"/><circle cx="0" cy="0" r="3.5" fill="#16a34a"/><circle cx="-0.8" cy="-0.8" r="2.8" fill="#22c55e"/></g>
              <g transform="translate(865, 270)"><ellipse cx="1" cy="2" rx="4" ry="2" fill="#94a3b8" opacity="0.3"/><circle cx="0" cy="0" r="3.5" fill="#16a34a"/><circle cx="-0.8" cy="-0.8" r="2.8" fill="#22c55e"/></g>
            </g>

            <!-- ================= DENSE CAMPUS FACILITIES (18 NODES) ================= -->

            <!-- 1. South Dorm Block 1 (High-Risk Retreat Epicenter) -->
            <g transform="translate(155, 230)">
              <ellipse cx="0" cy="0" rx="56" ry="26" fill="url(#node-halo-purple)"/>
              <ellipse cx="0" cy="0" rx="46" ry="20" fill="none" stroke="#a855f7" stroke-width="1.6"/>
              <!-- Building 1 (4-story) -->
              <polygon points="-22,-22 0,-34 22,-22 0,-10" fill="#f8fafc" stroke="#1e293b" stroke-width="1.2"/>
              <polygon points="-22,-22 0,-10 0,22 -22,10" fill="#e2e8f0" stroke="#1e293b" stroke-width="1.2"/>
              <polygon points="22,-22 0,-10 0,22 22,10" fill="#cbd5e1" stroke="#1e293b" stroke-width="1.2"/>
              <!-- Lit Windows -->
              <rect x="-16" y="-4" width="4" height="4" rx="0.5" fill="#fef08a"/>
              <rect x="-8" y="0" width="4" height="4" rx="0.5" fill="#fef08a"/>
              <rect x="-16" y="5" width="4" height="4" rx="0.5" fill="#fef08a"/>
              <rect x="-8" y="9" width="4" height="4" rx="0.5" fill="#fef08a"/>
              <rect x="5" y="-1" width="4" height="4" rx="0.5" fill="#fef08a"/>
              <rect x="13" y="-5" width="4" height="4" rx="0.5" fill="#fef08a"/>
              <rect x="5" y="8" width="4" height="4" rx="0.5" fill="#fef08a"/>
              <rect x="13" y="4" width="4" height="4" rx="0.5" fill="#fef08a"/>
              <!-- Entrance canopy -->
              <polygon points="-6,14 4,8 10,12 0,18" fill="#0284c7"/>
              <!-- Dorm 2 annex behind -->
              <polygon points="-36,-32 -20,-40 -8,-32 -24,-24" fill="#f1f5f9" stroke="#334155" stroke-width="1"/>
              <polygon points="-36,-32 -24,-24 -24,-8 -36,-16" fill="#cbd5e1" stroke="#334155" stroke-width="1"/>
              <!-- Badges -->
              <rect x="-42" y="26" width="84" height="15" rx="7.5" fill="#0284c7"/>
              <text x="0" y="36.5" font-size="7.5" font-weight="700" fill="#ffffff" text-anchor="middle">South Dorm Hub</text>
              <rect x="-56" y="-46" width="112" height="15" rx="7.5" fill="#1e293b"/>
              <circle cx="-45" cy="-38.5" r="2.8" fill="#ef4444"/>
              <text x="5" y="-36" font-size="6.8" font-weight="700" fill="#fca5a5" text-anchor="middle">Flag Risk Retreat (14)</text>
            </g>

            <!-- 2. North Graduate Residence -->
            <g transform="translate(165, 105)">
              <ellipse cx="0" cy="0" rx="46" ry="22" fill="url(#node-halo)"/>
              <!-- 6-story high-rise tower -->
              <polygon points="-16,-28 0,-38 16,-28 0,-18" fill="#f8fafc" stroke="#334155" stroke-width="1.2"/>
              <polygon points="-16,-28 0,-18 0,20 -16,10" fill="#e2e8f0" stroke="#334155" stroke-width="1.2"/>
              <polygon points="16,-28 0,-18 0,20 16,10" fill="#cbd5e1" stroke="#334155" stroke-width="1.2"/>
              <!-- Glass corner strips -->
              <line x1="-12" y1="-20" x2="-12" y2="12" stroke="#38bdf8" stroke-width="1.5"/>
              <line x1="12" y1="-20" x2="12" y2="12" stroke="#38bdf8" stroke-width="1.5"/>
              <rect x="-35" y="24" width="70" height="14" rx="7" fill="#0284c7"/>
              <text x="0" y="33.5" font-size="7" font-weight="700" fill="#ffffff" text-anchor="middle">North Residence</text>
              <rect x="-40" y="-48" width="80" height="14" rx="7" fill="#047857"/>
              <text x="0" y="-39" font-size="6.5" font-weight="700" fill="#ffffff" text-anchor="middle">Audit Late Night</text>
            </g>

            <!-- 3. Central Academic Library (Neoclassical Grand Library) -->
            <g transform="translate(315, 80)">
              <ellipse cx="0" cy="0" rx="58" ry="26" fill="url(#node-halo)"/>
              <!-- Stepped podium -->
              <polygon points="-30,-4 0,-18 30,-4 0,10" fill="#e2e8f0" stroke="#334155" stroke-width="1"/>
              <!-- Main Library Block -->
              <polygon points="-24,-16 0,-28 24,-16 0,-4" fill="#ffffff" stroke="#334155" stroke-width="1.2"/>
              <polygon points="-24,-16 0,-4 0,16 -24,4" fill="#e2e8f0" stroke="#334155" stroke-width="1.2"/>
              <polygon points="24,-16 0,-4 0,16 24,4" fill="#cbd5e1" stroke="#334155" stroke-width="1.2"/>
              <!-- Columns / Entrance Pillars -->
              <line x1="-14" y1="-10" x2="-14" y2="6" stroke="#334155" stroke-width="1.5"/>
              <line x1="-6" y1="-6" x2="-6" y2="10" stroke="#334155" stroke-width="1.5"/>
              <line x1="6" y1="-6" x2="6" y2="10" stroke="#334155" stroke-width="1.5"/>
              <line x1="14" y1="-10" x2="14" y2="6" stroke="#334155" stroke-width="1.5"/>
              <!-- Skylight Dome -->
              <polygon points="-10,-30 0,-36 10,-30 0,-24" fill="#38bdf8" stroke="#0284c7" stroke-width="1"/>
              <rect x="-38" y="20" width="76" height="15" rx="7.5" fill="#0284c7"/>
              <text x="0" y="30.5" font-size="7.5" font-weight="700" fill="#ffffff" text-anchor="middle">Central Library</text>
              <rect x="-44" y="-46" width="88" height="14" rx="7" fill="#047857"/>
              <text x="0" y="-37" font-size="6.8" font-weight="700" fill="#ffffff" text-anchor="middle">Study Engagement</text>
            </g>

            <!-- 4. Main Teaching Complex A (Clock Tower) -->
            <g transform="translate(485, 55)">
              <ellipse cx="0" cy="0" rx="52" ry="24" fill="url(#node-halo)"/>
              <!-- Lecture Hall Block -->
              <polygon points="-22,-14 0,-24 22,-14 0,-4" fill="#f8fafc" stroke="#334155" stroke-width="1.2"/>
              <polygon points="-22,-14 0,-4 0,16 -22,6" fill="#e2e8f0" stroke="#334155" stroke-width="1.2"/>
              <polygon points="22,-14 0,-4 0,16 22,6" fill="#cbd5e1" stroke="#334155" stroke-width="1.2"/>
              <!-- Clock Tower Spire -->
              <polygon points="-6,-30 0,-44 6,-30 0,-20" fill="#f8fafc" stroke="#334155" stroke-width="1.2"/>
              <polygon points="-6,-30 0,-20 0,-8 -6,-18" fill="#e2e8f0" stroke="#334155" stroke-width="1"/>
              <polygon points="6,-30 0,-20 0,-8 6,-18" fill="#cbd5e1" stroke="#334155" stroke-width="1"/>
              <circle cx="0" cy="-28" r="3" fill="#ffffff" stroke="#334155" stroke-width="0.8"/>
              <rect x="-38" y="20" width="76" height="14" rx="7" fill="#0284c7"/>
              <text x="0" y="29.5" font-size="7.2" font-weight="700" fill="#ffffff" text-anchor="middle">Teaching Hall A</text>
              <rect x="-32" y="-54" width="64" height="14" rx="7" fill="#7c3aed"/>
              <text x="0" y="-45" font-size="6.5" font-weight="700" fill="#ffffff" text-anchor="middle">Automation</text>
            </g>

            <!-- 5. Science & Computing Labs -->
            <g transform="translate(645, 48)">
              <ellipse cx="0" cy="0" rx="50" ry="24" fill="url(#node-halo)"/>
              <!-- Modern glass lab block -->
              <polygon points="-20,-14 0,-24 20,-14 0,-4" fill="#f8fafc" stroke="#334155" stroke-width="1.2"/>
              <polygon points="-20,-14 0,-4 0,16 -20,6" fill="#e2e8f0" stroke="#334155" stroke-width="1.2"/>
              <polygon points="20,-14 0,-4 0,16 20,6" fill="#cbd5e1" stroke="#334155" stroke-width="1.2"/>
              <!-- Rooftop HVAC chillers & Antenna -->
              <rect x="-10" y="-22" width="6" height="5" fill="#64748b"/>
              <path d="M 6 -22 Q 12 -28, 18 -22" stroke="#334155" stroke-width="1.4" fill="none"/>
              <rect x="-35" y="18" width="70" height="14" rx="7" fill="#0284c7"/>
              <text x="0" y="27.5" font-size="7.2" font-weight="700" fill="#ffffff" text-anchor="middle">Science Labs</text>
              <rect x="-26" y="-36" width="52" height="13" rx="6.5" fill="#e0f2fe" stroke="#38bdf8"/>
              <text x="0" y="-27.5" font-size="6.5" font-weight="700" fill="#0369a1" text-anchor="middle">f Function</text>
            </g>

            <!-- 6. Lecture Theater B & Skybridge -->
            <g transform="translate(565, 75)">
              <polygon points="-14,-8 0,-16 14,-8 0,0" fill="#f8fafc" stroke="#334155" stroke-width="1"/>
              <polygon points="-14,-8 0,0 0,10 -14,2" fill="#e2e8f0" stroke="#334155" stroke-width="1"/>
              <polygon points="14,-8 0,0 0,10 14,2" fill="#cbd5e1" stroke="#334155" stroke-width="1"/>
              <!-- Skybridge connecting to Hall A -->
              <line x1="-14" y1="-4" x2="-45" y2="-12" stroke="#64748b" stroke-width="2.5"/>
              <rect x="-28" y="12" width="56" height="13" rx="6.5" fill="#0284c7"/>
              <text x="0" y="21" font-size="6.5" font-weight="700" fill="#ffffff" text-anchor="middle">Lecture Hall B</text>
            </g>

            <!-- 7. First Student Dining Hall & Cafe Terrace -->
            <g transform="translate(325, 180)">
              <ellipse cx="0" cy="0" rx="54" ry="25" fill="url(#node-halo)"/>
              <!-- Food pavilion -->
              <polygon points="-22,-12 0,-22 22,-12 0,-2" fill="#f8fafc" stroke="#334155" stroke-width="1.2"/>
              <polygon points="-22,-12 0,-2 0,14 -22,4" fill="#e2e8f0" stroke="#334155" stroke-width="1.2"/>
              <polygon points="22,-12 0,-2 0,14 22,4" fill="#cbd5e1" stroke="#334155" stroke-width="1.2"/>
              <!-- Outdoor Terrace Parasols (Orange, Blue, Green) -->
              <circle cx="-16" cy="18" r="4" fill="#f97316"/>
              <circle cx="-4" cy="21" r="4" fill="#0284c7"/>
              <circle cx="8" cy="19" r="4" fill="#16a34a"/>
              <!-- Campus supply van at side -->
              <rect x="18" y="10" width="14" height="7" rx="1.5" fill="#64748b"/>
              <rect x="-35" y="24" width="70" height="15" rx="7.5" fill="#0284c7"/>
              <text x="0" y="34.5" font-size="7.5" font-weight="700" fill="#ffffff" text-anchor="middle">Dining Hall 1</text>
              <rect x="-42" y="-34" width="84" height="14" rx="7" fill="#047857"/>
              <text x="0" y="-25" font-size="6.8" font-weight="700" fill="#ffffff" text-anchor="middle">Schedule Meal Flow</text>
            </g>

            <!-- 8. Campus Logistics & Supply Delivery Vans -->
            <g transform="translate(255, 205)">
              <rect x="-12" y="-5" width="12" height="7" rx="1.5" fill="#475569"/>
              <rect x="2" y="-3" width="12" height="7" rx="1.5" fill="#475569"/>
              <!-- Pallet boxes stacked -->
              <polygon points="-4,-14 2,-18 8,-14 2,-10" fill="#d97706" stroke="#92400e" stroke-width="0.8"/>
              <rect x="-24" y="6" width="48" height="13" rx="6.5" fill="#1e293b"/>
              <text x="0" y="15" font-size="6.5" font-weight="700" fill="#f8fafc" text-anchor="middle">Supplies</text>
            </g>

            <!-- 9. Campus Life Commercial Plaza & Pedestrian Street -->
            <g transform="translate(485, 155)">
              <ellipse cx="0" cy="0" rx="52" ry="25" fill="url(#node-halo)"/>
              <!-- Storefronts & cafe pavilion -->
              <polygon points="-18,-10 0,-18 18,-10 0,-2" fill="#f8fafc" stroke="#334155" stroke-width="1.2"/>
              <polygon points="-18,-10 0,-2 0,12 -18,4" fill="#e2e8f0" stroke="#334155" stroke-width="1.2"/>
              <polygon points="18,-10 0,-2 0,12 18,4" fill="#cbd5e1" stroke="#334155" stroke-width="1.2"/>
              <!-- Central Fountain / Campus Sculpture -->
              <ellipse cx="0" cy="14" rx="6" ry="3" fill="#38bdf8" stroke="#0284c7" stroke-width="0.8"/>
              <line x1="0" y1="14" x2="0" y2="8" stroke="#0284c7" stroke-width="1.5"/>
              <rect x="-35" y="20" width="70" height="14" rx="7" fill="#0284c7"/>
              <text x="0" y="29.5" font-size="7.2" font-weight="700" fill="#ffffff" text-anchor="middle">Campus Plaza</text>
              <rect x="-40" y="-30" width="80" height="14" rx="7" fill="#047857"/>
              <text x="0" y="-21" font-size="6.8" font-weight="700" fill="#ffffff" text-anchor="middle">Social Gatherings</text>
            </g>

            <!-- 10. Second Dining Center & Night Market -->
            <g transform="translate(365, 255)">
              <polygon points="-15,-10 0,-18 15,-10 0,-2" fill="#f8fafc" stroke="#334155" stroke-width="1.2"/>
              <polygon points="-15,-10 0,-2 0,12 -15,4" fill="#e2e8f0" stroke="#334155" stroke-width="1.2"/>
              <polygon points="15,-10 0,-2 0,12 15,4" fill="#cbd5e1" stroke="#334155" stroke-width="1.2"/>
              <rect x="-28" y="14" width="56" height="13" rx="6.5" fill="#0284c7"/>
              <text x="0" y="23" font-size="6.8" font-weight="700" fill="#ffffff" text-anchor="middle">Dining Hall 2</text>
            </g>

            <!-- 11. Central Sports Stadium & Running Track (Realistic 3D Stadium) -->
            <g transform="translate(685, 110)">
              <ellipse cx="0" cy="0" rx="58" ry="27" fill="url(#node-halo)"/>
              <!-- Red Tartan Running Track Oval -->
              <ellipse cx="0" cy="0" rx="46" ry="21" fill="#dc2626" stroke="#b91c1c" stroke-width="1.5"/>
              <!-- White Track Lane Lines -->
              <ellipse cx="0" cy="0" rx="40" ry="18" fill="none" stroke="#ffffff" stroke-width="0.8" opacity="0.8"/>
              <!-- Green Soccer Field -->
              <ellipse cx="0" cy="0" rx="34" ry="15" fill="#16a34a" stroke="#15803d" stroke-width="1"/>
              <!-- Field markings -->
              <line x1="0" y1="-15" x2="0" y2="15" stroke="#ffffff" stroke-width="0.8" opacity="0.7"/>
              <ellipse cx="0" cy="0" rx="8" ry="3.5" fill="none" stroke="#ffffff" stroke-width="0.8" opacity="0.7"/>
              <!-- Grandstand Canopy on North Curve -->
              <path d="M -28 -10 Q 0 -24, 28 -10" stroke="#334155" stroke-width="3" fill="#cbd5e1"/>
              <!-- 4 Corner Floodlight Pylons -->
              <line x1="-38" y1="-10" x2="-38" y2="-20" stroke="#475569" stroke-width="1.2"/>
              <circle cx="-38" cy="-20" r="1.5" fill="#fef08a"/>
              <line x1="38" y1="-10" x2="38" y2="-20" stroke="#475569" stroke-width="1.2"/>
              <circle cx="38" cy="-20" r="1.5" fill="#fef08a"/>
              <rect x="-36" y="24" width="72" height="15" rx="7.5" fill="#0284c7"/>
              <text x="0" y="34.5" font-size="7.5" font-weight="700" fill="#ffffff" text-anchor="middle">Sports Stadium</text>
              <rect x="-38" y="-36" width="76" height="14" rx="7" fill="#047857"/>
              <text x="0" y="-27" font-size="6.8" font-weight="700" fill="#ffffff" text-anchor="middle">Activity Entropy</text>
            </g>

            <!-- 12. Indoor Gymnasium & Basketball Arena -->
            <g transform="translate(825, 90)">
              <ellipse cx="0" cy="0" rx="48" ry="23" fill="url(#node-halo)"/>
              <!-- Curved Barrel Vault Dome -->
              <path d="M -18 4 Q 0 -24, 18 4" fill="#f8fafc" stroke="#334155" stroke-width="1.2"/>
              <polygon points="-18,4 0,12 18,4 0,-4" fill="#e2e8f0" stroke="#334155" stroke-width="1"/>
              <rect x="-30" y="16" width="60" height="14" rx="7" fill="#0284c7"/>
              <text x="0" y="25.5" font-size="7" font-weight="700" fill="#ffffff" text-anchor="middle">Gymnasium</text>
              <rect x="-25" y="-32" width="50" height="13" rx="6.5" fill="#e0f2fe" stroke="#38bdf8"/>
              <text x="0" y="-23.5" font-size="6.5" font-weight="700" fill="#0369a1" text-anchor="middle">f Function</text>
            </g>

            <!-- 13. Campus Clinic & Mental Health Counseling Center -->
            <g transform="translate(695, 220)">
              <ellipse cx="0" cy="0" rx="54" ry="26" fill="url(#node-halo)"/>
              <ellipse cx="0" cy="0" rx="44" ry="20" fill="none" stroke="#0284c7" stroke-width="1.5"/>
              <!-- 3-story hospital block -->
              <polygon points="-18,-12 0,-20 18,-12 0,-4" fill="#f8fafc" stroke="#334155" stroke-width="1.2"/>
              <polygon points="-18,-12 0,-4 0,14 -18,6" fill="#e2e8f0" stroke="#334155" stroke-width="1.2"/>
              <polygon points="18,-12 0,-4 0,14 18,6" fill="#cbd5e1" stroke="#334155" stroke-width="1.2"/>
              <!-- Green Medical Cross -->
              <rect x="-2" y="-13" width="4" height="12" fill="#16a34a"/>
              <rect x="-6" y="-9" width="12" height="4" fill="#16a34a"/>
              <!-- Ambulatory Consultation Bay -->
              <rect x="-14" y="6" width="10" height="8" rx="1" fill="#ffffff" stroke="#94a3b8" stroke-width="0.8"/>
              <rect x="-42" y="18" width="84" height="15" rx="7.5" fill="#0284c7"/>
              <text x="0" y="28.5" font-size="7.5" font-weight="700" fill="#ffffff" text-anchor="middle">Mental Health Hub</text>
              <rect x="-48" y="-36" width="96" height="15" rx="7.5" fill="#991b1b"/>
              <text x="0" y="-26.5" font-size="6.8" font-weight="700" fill="#fca5a5" text-anchor="middle">Emergency Referral</text>
            </g>

            <!-- 14. Student Activity Hub (BLE Proximity Mesh) -->
            <g transform="translate(570, 240)">
              <polygon points="-15,-10 0,-18 15,-10 0,-2" fill="#f8fafc" stroke="#334155" stroke-width="1.2"/>
              <polygon points="-15,-10 0,-2 0,12 -15,4" fill="#e2e8f0" stroke="#334155" stroke-width="1.2"/>
              <polygon points="15,-10 0,-2 0,12 15,4" fill="#cbd5e1" stroke="#334155" stroke-width="1.2"/>
              <!-- BLE Wave rings -->
              <ellipse cx="0" cy="-6" rx="8" ry="4" fill="none" stroke="#a855f7" stroke-width="0.8" opacity="0.6"/>
              <rect x="-30" y="14" width="60" height="13" rx="6.5" fill="#0284c7"/>
              <text x="0" y="23" font-size="6.8" font-weight="700" fill="#ffffff" text-anchor="middle">Activity Hub</text>
              <rect x="-32" y="-28" width="64" height="13" rx="6.5" fill="#7c3aed"/>
              <text x="0" y="-19.5" font-size="6" font-weight="700" fill="#ffffff" text-anchor="middle">BLE Proximity</text>
            </g>

            <!-- 15. East Campus Gate & Transit Terminal (Off-Campus Roaming) -->
            <g transform="translate(845, 220)">
              <ellipse cx="0" cy="0" rx="52" ry="25" fill="url(#node-halo)"/>
              <ellipse cx="0" cy="0" rx="42" ry="19" fill="none" stroke="#0284c7" stroke-width="1.5"/>
              <!-- Monumental Stone Archway -->
              <rect x="-14" y="-16" width="5" height="18" fill="#64748b"/>
              <rect x="9" y="-16" width="5" height="18" fill="#64748b"/>
              <polygon points="-18,-18 0,-24 18,-18 0,-12" fill="#0284c7"/>
              <!-- Yellow Campus Shuttle Bus -->
              <rect x="-8" y="6" width="16" height="8" rx="2" fill="#eab308"/>
              <rect x="-36" y="18" width="72" height="15" rx="7.5" fill="#0284c7"/>
              <text x="0" y="28.5" font-size="7.5" font-weight="700" fill="#ffffff" text-anchor="middle">East Gate (Off)</text>
              <rect x="-42" y="-34" width="84" height="14" rx="7" fill="#047857"/>
              <text x="0" y="-25" font-size="6.8" font-weight="700" fill="#ffffff" text-anchor="middle">Roaming Entropy</text>
            </g>

            <!-- 16. Campus Telemetry Pipeline & Robotic Arm (Palantir Authentic) -->
            <g transform="translate(785, 165)">
              <!-- 3 Stacked White Server Packages -->
              <polygon points="-12,-4 0,-10 12,-4 0,2" fill="#ffffff" stroke="#334155" stroke-width="1"/>
              <polygon points="-12,-4 0,2 0,8 -12,2" fill="#e2e8f0" stroke="#334155" stroke-width="1"/>
              <polygon points="12,-4 0,2 0,8 12,2" fill="#cbd5e1" stroke="#334155" stroke-width="1"/>
              <polygon points="-8,-12 0,-16 8,-12 0,-8" fill="#ffffff" stroke="#334155" stroke-width="1"/>
              <!-- Articulated Robotic Arm -->
              <polygon points="14,0 22,0 20,-4 16,-4" fill="#64748b"/>
              <line x1="18" y1="-4" x2="12" y2="-14" stroke="#334155" stroke-width="1.8"/>
              <line x1="12" y1="-14" x2="20" y2="-20" stroke="#334155" stroke-width="1.8"/>
              <circle cx="20" cy="-20" r="2" fill="#0284c7"/>
              <rect x="-26" y="12" width="52" height="13" rx="6.5" fill="#e0f2fe" stroke="#38bdf8"/>
              <text x="0" y="21" font-size="6.5" font-weight="700" fill="#0369a1" text-anchor="middle">f Function</text>
              <rect x="-25" y="-30" width="50" height="13" rx="6.5" fill="#7c3aed"/>
              <text x="0" y="-21.5" font-size="6" font-weight="700" fill="#ffffff" text-anchor="middle">Automation</text>
            </g>

            <!-- 17. WiFi BSSID / IoT Sensor Relay Mast -->
            <g transform="translate(230, 280)">
              <line x1="0" y1="0" x2="0" y2="-20" stroke="#475569" stroke-width="1.8"/>
              <circle cx="0" cy="-20" r="2.5" fill="#0284c7"/>
              <circle cx="0" cy="-20" r="6" fill="none" stroke="#38bdf8" stroke-width="0.8" opacity="0.6"/>
              <circle cx="0" cy="-20" r="10" fill="none" stroke="#38bdf8" stroke-width="0.8" opacity="0.3"/>
              <rect x="-24" y="2" width="48" height="12" rx="6" fill="#e0f2fe" stroke="#38bdf8"/>
              <text x="0" y="10.5" font-size="6.2" font-weight="700" fill="#0369a1" text-anchor="middle">Sensor Relay</text>
            </g>

            <!-- 18. Campus Road Vehicles & Pedestrian Students (Cohort) -->
            <!-- White delivery van on avenue -->
            <g transform="translate(420, 245)">
              <rect x="-7" y="-3.5" width="14" height="7" rx="1.5" fill="#475569"/>
            </g>
            <!-- Walking students -->
            <g transform="translate(280, 110)">
              <circle cx="0" cy="-4" r="1.5" fill="#0f172a"/>
              <line x1="0" y1="-2.5" x2="0" y2="2" stroke="#0f172a" stroke-width="1"/>
            </g>
            <g transform="translate(530, 195)">
              <circle cx="0" cy="-4" r="1.5" fill="#0f172a"/>
              <line x1="0" y1="-2.5" x2="0" y2="2" stroke="#0f172a" stroke-width="1"/>
            </g>
            <g transform="translate(615, 175)">
              <circle cx="0" cy="-4" r="1.5" fill="#0f172a"/>
              <line x1="0" y1="-2.5" x2="0" y2="2" stroke="#0f172a" stroke-width="1"/>
            </g>

            <!-- ================= DIRECTIONAL DATA FLOW PATHWAYS WITH BADGES ================= -->
            
            <!-- Dorm1 -> Library (Transit) -->
            <path d="M 180 205 Q 230 120, 275 90" stroke="#0284c7" stroke-width="1.6" fill="none" marker-end="url(#arrow-blue)"/>
            <rect x="205" y="135" width="34" height="13" rx="6.5" fill="#64748b"/>
            <text x="222" y="144" font-size="6.5" font-weight="700" fill="#ffffff" text-anchor="middle">Transit</text>

            <!-- Library -> Teaching (Study Flow) -->
            <path d="M 355 75 L 440 65" stroke="#0284c7" stroke-width="1.6" fill="none" marker-end="url(#arrow-blue)"/>
            <rect x="380" y="62" width="38" height="13" rx="6.5" fill="#64748b"/>
            <text x="399" y="71" font-size="6.5" font-weight="700" fill="#ffffff" text-anchor="middle">Study Flow</text>

            <!-- Teaching -> Science (Updates) -->
            <path d="M 525 55 L 605 50" stroke="#0284c7" stroke-width="1.6" fill="none" marker-end="url(#arrow-blue)"/>
            <rect x="550" y="44" width="36" height="13" rx="6.5" fill="#64748b"/>
            <text x="568" y="53" font-size="6.5" font-weight="700" fill="#ffffff" text-anchor="middle">Updates</text>

            <!-- Dorm1 -> Dining1 (Supplies) -->
            <path d="M 195 220 Q 250 195, 290 190" stroke="#a855f7" stroke-width="1.8" stroke-dasharray="3 2" fill="none" marker-end="url(#arrow-blue)"/>
            <rect x="230" y="198" width="36" height="13" rx="6.5" fill="#1e293b"/>
            <text x="248" y="207" font-size="6.5" font-weight="700" fill="#fca5a5" text-anchor="middle">Supplies</text>

            <!-- Dining1 -> Plaza (Dining Rush) -->
            <path d="M 360 175 L 445 165" stroke="#0284c7" stroke-width="1.6" fill="none" marker-end="url(#arrow-blue)"/>
            <rect x="385" y="162" width="40" height="13" rx="6.5" fill="#64748b"/>
            <text x="405" y="171" font-size="6.5" font-weight="700" fill="#ffffff" text-anchor="middle">Dining Rush</text>

            <!-- Plaza -> Stadium (Moves) -->
            <path d="M 520 145 Q 580 125, 640 120" stroke="#0284c7" stroke-width="1.6" fill="none" marker-end="url(#arrow-blue)"/>
            <rect x="562" y="126" width="32" height="13" rx="6.5" fill="#64748b"/>
            <text x="578" y="135" font-size="6.5" font-weight="700" fill="#ffffff" text-anchor="middle">Moves</text>

            <!-- Stadium -> Gym (Generates) -->
            <path d="M 725 105 L 785 98" stroke="#0284c7" stroke-width="1.6" fill="none" marker-end="url(#arrow-blue)"/>
            <rect x="740" y="94" width="36" height="13" rx="6.5" fill="#64748b"/>
            <text x="758" y="103" font-size="6.5" font-weight="700" fill="#ffffff" text-anchor="middle">Generates</text>

            <!-- ★ RED DASHED CRITICAL CRISIS REFERRAL ARTERY: Dorm1 -> Mental Health Center -->
            <path d="M 210 235 C 360 265, 530 250, 650 225" stroke="#ef4444" stroke-width="2" stroke-dasharray="4 3" fill="none" marker-end="url(#arrow-red)"/>
            <rect x="415" y="246" width="56" height="14" rx="7" fill="#991b1b"/>
            <text x="443" y="256" font-size="6.8" font-weight="700" fill="#ffffff" text-anchor="middle">Care Referral</text>

            <!-- Mental Health Center -> East Gate (Entropy) -->
            <path d="M 735 225 L 805 225" stroke="#0284c7" stroke-width="1.6" fill="none" marker-end="url(#arrow-blue)"/>
            <rect x="755" y="218" width="34" height="13" rx="6.5" fill="#64748b"/>
            <text x="772" y="227" font-size="6.5" font-weight="700" fill="#ffffff" text-anchor="middle">Entropy</text>

            <!-- Pointer lines from floating cards into nodes -->
            <path d="M 25 210 L 115 225" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3 3" fill="none"/>
            <path d="M 975 190 L 745 220" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3 3" fill="none"/>
          </svg>
        </div>

        <!-- Right Floating Card: Granular Access Controls -->
        <div class="palantir-float-card card-right">
          <div class="f-card-header">
            <span class="f-card-tag">SECURITY ENCLAVE</span>
            <span class="f-card-pill-blue">Granular Access</span>
          </div>
          <table class="access-table">
            <thead>
              <tr><th>ACTOR</th><th>ACCESS</th><th>POLICY</th></tr>
            </thead>
            <tbody>
              <tr><td class="bold">Counselor</td><td>View</td><td class="policy-tag">Purpose: Care Triage</td></tr>
              <tr><td class="bold">Clinician</td><td>Edit</td><td class="policy-tag">Role: Medical Channel</td></tr>
              <tr><td class="bold">Sensor Agent</td><td>Query</td><td class="policy-tag">Marking: Zero-Raw-GPS</td></tr>
            </tbody>
          </table>
          <div class="f-card-hint">
            <span>* 符合高校数据安全与隐私合规要求</span>
          </div>
        </div>

        <!-- Slab Center Bottom: [ ONTOLOGY SYSTEM ] and Platform Slabs -->
        <div class="ontology-platform-slabs">
          <div class="ontology-title-pill">
            <span>ONTOLOGY SYSTEM</span>
          </div>
          <div class="slab-layer slab-1">
            <div class="slab-col left">Objects · Properties · Links · Campus Graph Topologies...</div>
            <div class="slab-col right">Scenarios · Proposals · Risk Ensembles · Branches...</div>
          </div>
          <div class="slab-layer slab-2">
            <div class="slab-col left">Function-backed Actions · CA-Gate Webhooks · Real-time Triage Notifications...</div>
            <div class="slab-col right">Full-spectrum Access Controls · Granular Policy Management · Auditing...</div>
          </div>
          <div class="slab-footer-caption">
            <span>ANY SENSING STREAM · ANY FEDERATED COMPUTE</span>
          </div>
        </div>

      </section>

      <!-- Connecting Bus Cables Downward -->
      <section class="cables-to-base">
        <svg viewBox="0 0 1100 20" preserveAspectRatio="none">
          <line x1="140" y1="0" x2="140" y2="20" stroke="#1e293b" stroke-width="1.2" stroke-dasharray="2 2"/>
          <line x1="410" y1="0" x2="410" y2="20" stroke="#1e293b" stroke-width="1.2" stroke-dasharray="2 2"/>
          <line x1="680" y1="0" x2="680" y2="20" stroke="#1e293b" stroke-width="1.2" stroke-dasharray="2 2"/>
          <line x1="950" y1="0" x2="950" y2="20" stroke="#1e293b" stroke-width="1.2" stroke-dasharray="2 2"/>
        </svg>
      </section>

      <!-- Bottom Row: Four Foundation Chassis Units (DATA, LOGIC, MODELS, ACTIONS) -->
      <section class="chassis-row">
        
        <!-- Chassis 1: DATA -->
        <div class="chassis-wrapper">
          <div class="chassis-box">
            <div class="chassis-switches-grid">
              <div class="chassis-item"><span class="toggle-icon active">●─</span><span class="label">TRANSACTIONS</span></div>
              <div class="chassis-item"><span class="toggle-icon active">●─</span><span class="label">IOT / SENSOR</span></div>
              <div class="chassis-item"><span class="toggle-icon active">●─</span><span class="label">GEOSPATIAL</span></div>
              <div class="chassis-item"><span class="toggle-icon active">●─</span><span class="label">UNSTRUCTURED</span></div>
              <div class="chassis-item"><span class="toggle-icon active">●─</span><span class="label">RELATIONAL</span></div>
              <div class="chassis-item"><span class="toggle-icon">●─</span><span class="label">MORE..</span></div>
            </div>
          </div>
          <div class="chassis-legs"></div>
          <div class="chassis-title">DATA</div>
        </div>

        <!-- Chassis 2: LOGIC -->
        <div class="chassis-wrapper">
          <div class="chassis-box">
            <div class="chassis-switches-grid">
              <div class="chassis-item"><span class="toggle-icon active">●─</span><span class="label">FUNCTIONS / CODE</span></div>
              <div class="chassis-item"><span class="toggle-icon active">●─</span><span class="label">SCENARIOS</span></div>
              <div class="chassis-item"><span class="toggle-icon active">●─</span><span class="label">EVENT TRIGGERS</span></div>
              <div class="chassis-item"><span class="toggle-icon active">●─</span><span class="label">RULES</span></div>
              <div class="chassis-item"><span class="toggle-icon active">●─</span><span class="label">SCHEDULES</span></div>
              <div class="chassis-item"><span class="toggle-icon">●─</span><span class="label">MORE..</span></div>
            </div>
          </div>
          <div class="chassis-legs"></div>
          <div class="chassis-title">LOGIC</div>
        </div>

        <!-- Chassis 3: MODELS -->
        <div class="chassis-wrapper">
          <div class="chassis-box highlight-chassis">
            <div class="chassis-switches-grid">
              <div class="chassis-item"><span class="toggle-icon active">●─</span><span class="label">OPEN WEIGHT</span></div>
              <div class="chassis-item"><span class="toggle-icon active">●─</span><span class="label">PERCEPTION</span></div>
              <div class="chassis-item"><span class="toggle-icon active">●─</span><span class="label">CLOSED WEIGHT</span></div>
              <div class="chassis-item"><span class="toggle-icon active">●─</span><span class="label">TRADITIONAL ML</span></div>
              <div class="chassis-item"><span class="toggle-icon active">●─</span><span class="label">MULTIMODAL</span></div>
              <div class="chassis-item"><span class="toggle-icon active">●─</span><span class="label">MORE..</span></div>
            </div>
          </div>
          <div class="chassis-legs"></div>
          <div class="chassis-title">MODELS</div>
        </div>

        <!-- Chassis 4: ACTIONS -->
        <div class="chassis-wrapper">
          <div class="chassis-box">
            <div class="chassis-switches-grid">
              <div class="chassis-item"><span class="toggle-icon active">●─</span><span class="label">ERP</span></div>
              <div class="chassis-item"><span class="toggle-icon active">●─</span><span class="label">SCM</span></div>
              <div class="chassis-item"><span class="toggle-icon active">●─</span><span class="label">MES</span></div>
              <div class="chassis-item"><span class="toggle-icon active">●─</span><span class="label">SCHEDULING</span></div>
              <div class="chassis-item"><span class="toggle-icon active">●─</span><span class="label">EDGE</span></div>
              <div class="chassis-item"><span class="toggle-icon">●─</span><span class="label">MORE..</span></div>
            </div>
          </div>
          <div class="chassis-legs"></div>
          <div class="chassis-title">ACTIONS</div>
        </div>

      </section>

    </div>
  </main>
`;

// Replace view-foundry in index.html
const startFoundry = existingHtml.indexOf('<!-- ================= VIEW 1: PALANTIR FOUNDRY ARCHITECTURE ================= -->');
const startCosmograph = existingHtml.indexOf('<!-- ================= VIEW 2: COSMOGRAPH TRAJECTORY GALAXY ================= -->');

if (startFoundry !== -1 && startCosmograph !== -1) {
  const newHtml = existingHtml.slice(0, startFoundry) + foundrySection + "\n\n  " + existingHtml.slice(startCosmograph);
  fs.writeFileSync(path.join(dir, "index.html"), newHtml, "utf8");
  console.log("Updated index.html successfully");
} else {
  console.error("Could not find startFoundry or startCosmograph in index.html");
}
