/* The homepage is a single drawing. Its interactive groups use the same
   channel, zone and source identifiers as the research workbench. */
(() => {
  const ink = "#323c46";
  const faint = "#c2cbd3";
  const blue = "#3488ff";
  const purple = "#9983e8";
  const green = "#587e70";
  const repeat = (count, draw) => Array.from({ length: count }, (_, i) => draw(i)).join("");
  const group = (x, y, body, extra = "") => `<g transform="translate(${x} ${y})" ${extra}>${body}</g>`;
  const path = (d, stroke = ink, width = 1, fill = "none", extra = "") =>
    `<path d="${d}" stroke="${stroke}" stroke-width="${width}" fill="${fill}" ${extra}/>`;
  const rect = (x, y, w, h, fill = "white", stroke = ink, sw = 0.9, r = 0) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
  const circle = (x, y, radius, fill, stroke = "none", width = 0.8) =>
    `<circle cx="${x}" cy="${y}" r="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="${width}"/>`;
  const label = (x, y, value, size = 12, color = ink, anchor = "start", cls = "") =>
    `<text x="${x}" y="${y}" class="${cls}" fill="${color}" font-size="${size}" text-anchor="${anchor}">${value}</text>`;
  const pill = (x, y, name, w, fill, textColor = "white") =>
    rect(x - w / 2, y - 9, w, 18, fill, "none", 0, 9) + label(x, y + 3.5, name, 10, textColor, "middle");
  const control = (key, value, title, body) =>
    `<g class="diagram-action" role="button" tabindex="0" aria-label="${title}" data-${key}="${value}"><title>${title}</title>${body}</g>`;
  const frame = (x, y, w, h, title, content) => group(x, y,
    rect(0, 0, w, h) + rect(0, 0, w, 12, "#f5f8fb") + circle(6, 6, 1.7, "#95a8b9") +
    label(12, 8.6, title, 6.3, "#55616e", "start", "en") +
    path(`M${w - 17} 6h4 M${w - 8} 4l4 4m0 -4l-4 4`, "#65717e", 0.7) + content);
  const axis = (x, y, w, h) =>
    path(`M${x} ${y}v${h}h${w}`, "#7d8995", 0.8) +
    repeat(4, i => path(`M${x} ${y + i * h / 4}h${w}`, "#dae3ec", 0.55));
  function pulse(x, y, w, h, phase) {
    const points = Array.from({ length: 70 }, (_, i) => {
      const signal = (Math.sin(i * 0.37 + phase) + Math.cos(i * 0.95) * 0.5 + Math.sin(i * 2.3 + phase) * 0.55) / 4;
      return `${(x + i * w / 69).toFixed(1)},${(y + h * (0.5 + signal)).toFixed(1)}`;
    });
    return path("M" + points.join(" L"), blue, 0.95);
  }
  function rhythmScreens() {
    const scatter = axis(9, 20, 106, 45) +
      path("M12 60 29 42 47 50 63 30 76 40 98 27 111 35", ink, 0.9) +
      [[12,60],[29,42],[47,50],[63,30],[76,40],[98,27],[111,35]].map(([x,y],i) => circle(x,y,3.5,i%2?"white":"#84b5ff",ink)).join("") +
      label(10, 78, "DAILY MEAN", 6.5, "#708090", "start", "en");
    const sleep = axis(10, 20, 95, 36) + pulse(10, 20, 95, 36, 0.25) +
      repeat(14, i => rect(11 + i * 6.7, 64, 4, 6 + (i * 5) % 13, i % 4 === 0 ? blue : "#afcbf7", "none"));
    const movement = axis(10, 20, 86, 30) + pulse(10,20,86,29,3.2) +
      repeat(3, i => rect(10 + i * 29, 55, 24, 4, ["#b6cdfa","#c3bfdd","#b9ccc5"][i], "#677380", 0.45));
    return frame(14, 20, 127, 85, "MOBILITY", scatter) + frame(160, 16, 117, 86, "SLEEP / UNLOCK", sleep) +
      frame(93, 71, 112, 67, "CIRCADIAN PROFILE", movement);
  }
  function spatialScreens() {
    const cols = repeat(4, col => {
      const x = 8 + col * 26;
      return rect(x,17,22,5,["#78a9ef","#a6bbc8","#c0abd9","#8ab3a4"][col]) +
        repeat(3, row => rect(x,26+row*14,22,11) + circle(x+4,31+row*14,1.5,col%2?purple:blue) + path(`M${x+8} ${31+row*14}h10`, "#a1aab2", 0.8));
    });
    const bars = repeat(5, i => circle(10,23+i*10,2.3,i===0?blue:"#b4c6d3",ink,0.6) +
      path(`M16 ${23+i*10}h${50-i*5}`, "#8995a2",1) + rect(74,20+i*10,22,5,"#f2f5f7","#8995a2",0.5) +
      rect(74,20+i*10,[18,15,13,6,3][i],5,i===0?"#9f89e4":"#98bdf4","none"));
    const entropy = axis(10, 20, 86, 31) +
      [28,20,14,7,4].map((h,i) => rect(17+i*16,51-h,9,h,["#65a4ff","#8cb7f3","#afd1ee","#afc8c0","#c5b2df"][i],ink,0.65)).join("") +
      label(11,62,"H = − Σ p log p",8,ink,"start","en");
    return frame(12,4,120,82,"FUNCTIONAL ZONES",cols) + frame(172,5,110,78,"DWELL DISTRIBUTION",bars) +
      frame(97,57,108,70,"SPATIAL ENTROPY",entropy) +
      group(29,99,miniNetwork()) + group(212,99,miniNetwork());
  }
  function miniNetwork() {
    return rect(0,0,46,23) + path("M3 16h8l6-9 11 8 7-6h8","#8492a1",0.85) +
      [[10,16],[17,7],[28,15],[35,9]].map(([x,y],i)=>circle(x,y,2.5,i===1?"#e9a79a":"#7aabf5",ink,0.5)).join("");
  }
  function latentScreens() {
    const matrix = repeat(6, row => repeat(9, col => rect(9+col*10,20+row*7,8,5,
      ["#fff","#c3d8fb","#e2e7f0","#92b8ef","#cabde3"][(row*row+col*3+row*col)%5], "#a2acb6",0.35)));
    const tree = path("M52 19v8m-27 7v-7h54v7M25 42v7m-11 8v-8h24v8M79 42v7m-11 8v-8h24v8",ink,0.9) +
      [[40,15],[15,33],[69,33],[5,56],[28,56],[59,56],[83,56]].map(([x,y],i)=>rect(x,y,21,8,i<3?"#e8edf2":"#a9c9fa")).join("");
    const factors = repeat(4, i => rect(10+i*24,19,17,33,"#f9fafc","#768695",0.65) +
      rect(14+i*24,44-[16,10,8,5][i],9,[16,10,8,5][i],i<2?"#a2c5fa":"#c5b2e5",ink,0.65) +
      label(18+i*24,61,"F"+(i+1),6.5,ink,"middle","en"));
    return frame(12,19,108,76,"BEHAVIOR MATRIX",matrix) + frame(172,16,112,80,"TRUNCATED SVD",tree) +
      frame(89,70,112,68,"LATENT FACTORS",factors);
  }
  function workstation(cx, channel, name, caption, screens) {
    const x = cx - 156;
    let drawing = path("M-9 149 42 53H354l-31 96z", "#727d86",0.95,"#fff") +
      path("M323 149 354 53v12l-31 100z",ink,0.8,"url(#arch-hatch)") +
      group(11,0,screens()) + rect(-9,147,332,36,"#fff",ink,1) + rect(-9,183,332,15,"url(#arch-hatch)") +
      label(157,172,name,22,ink,"middle","heading") + label(157,194,caption,7.5,"#475463","middle","en arch-legend");
    return control("channel",channel,name,group(x,0,drawing));
  }
  function channelWires(cx, end, n, channel) {
    return `<g class="arch-wire-${channel}">` + repeat(n,i=>{
      const startX = cx + (i-(n-1)/2)*29;
      const endX = end + (i-(n-1)/2)*16;
      const d = `M${startX} 198 C${startX} 233 ${endX} 237 ${endX} 285`;
      return path(d,"#6e777e",0.72) + circle(startX,198,1.7,ink) +
        `<circle class="wire-signal" r="1.6" fill="#4c555f"><animateMotion dur="7s" begin="-${i*1.1}s" repeatCount="indefinite" path="${d}"/></circle>`;
    }) + "</g>";
  }
  const definitions = `<defs>
    <pattern id="arch-hatch" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#fff"/><path d="M-1 0l7 7 M5 0l7 7" stroke="#c3c9ce" stroke-width=".55"/></pattern>
    <radialGradient id="arch-halo"><stop stop-color="#ffffff"/><stop offset=".82" stop-color="#ffffff"/><stop offset="1" stop-color="#e6f0ff"/></radialGradient>
    <filter id="arch-glow" x="-40%" y="-55%" width="180%" height="210%"><feGaussianBlur stdDeviation="3.8"/></filter>
    <clipPath id="arch-plane"><path d="M402 282H1078L1328 536H152Z"/></clipPath>
  </defs>`;
  // Isometric objects share one projection, including their facade details.
  const project = (x,y,z) => [+(0.88*(x-y)).toFixed(2), +(0.39*(x+y)-z).toFixed(2)];
  const isoShape = (coordinates, fill, stroke = "#646e78", sw = 0.7) =>
    path("M"+coordinates.map(v=>project(...v).join(" ")).join("L")+"Z",stroke,sw,fill);
  const isoLine = (a,b,stroke = "#7f8c9a",sw = 0.7) => path("M"+project(...a).join(" ")+"L"+project(...b).join(" "),stroke,sw);
  function block(x,y,z,w,d,h,options = {}) {
    const { front="#f2f3f4", side="#d7dce0", roof="#fff", floors=0, bays=0 } = options;
    let faces = isoShape([[x+w,y,z],[x+w,y+d,z],[x+w,y+d,z+h],[x+w,y,z+h]],side) +
      isoShape([[x,y+d,z],[x+w,y+d,z],[x+w,y+d,z+h],[x,y+d,z+h]],front) +
      isoShape([[x,y,z+h],[x+w,y,z+h],[x+w,y+d,z+h],[x,y+d,z+h]],roof);
    for(let f=0; f<floors; f++) {
      const bottom = z+3+f*(h-4)/floors;
      const wh = Math.min((h-5)/floors*0.59,5);
      for(let b=0; b<bays; b++) {
        const bx = x+2+(w-3)*b/bays, bw = (w-3)/bays*0.57;
        faces += isoShape([[bx,y+d,bottom],[bx+bw,y+d,bottom],[bx+bw,y+d,bottom+wh],[bx,y+d,bottom+wh]],"#b4c3d1","#7c8997",0.45);
      }
      const sideBays = Math.max(2, Math.round(bays*d/w));
      for(let b=0; b<sideBays; b++) {
        const by = y+2+(d-3)*b/sideBays, bw = (d-3)/sideBays*0.54;
        faces += isoShape([[x+w,by,bottom],[x+w,by+bw,bottom],[x+w,by+bw,bottom+wh],[x+w,by,bottom+wh]],"#91a2b2","#778594",0.4);
      }
    }
    return faces;
  }
  function residence() {
    return block(-29,-12,0,35,17,37,{floors:5,bays:6}) +
      block(-26,-10,37,29,13,2) + block(-23,-7,39,6,4,3,{side:"#85a6ce"}) +
      block(3,-5,0,17,14,22,{floors:3,bays:3}) + block(-14,12,0,26,13,21,{floors:3,bays:4});
  }
  function library() {
    return block(-22,-14,0,44,29,3) + block(-20,-12,3,40,25,18,{floors:2,bays:7}) +
      block(-23,-15,21,46,30,3) + block(-18,-11,24,35,21,3) +
      repeat(4,i=>isoLine([-16+i*9,13,3],[-16+i*9,13,20],"#4d5a66",1.3)) +
      block(-5,14,0,11,6,2);
  }
  function foodHall() {
    return block(-26,-13,0,48,27,16,{floors:1,bays:7}) + block(-28,-15,16,52,31,2) +
      block(-18,-8,18,13,9,4) + repeat(4,i=>isoLine([-16+i*3,-7,22],[-16+i*3,0,22])) +
      block(-5,14,8,22,6,1,{roof:"#b5ccdc"});
  }
  function socialHall() {
    return block(-24,-15,0,37,23,21,{floors:2,bays:5}) +
      isoShape([[-26,-17,21],[15,-17,21],[15,-3.5,31],[-26,-3.5,31]],"#c9d4dd") +
      isoShape([[-26,-3.5,31],[15,-3.5,31],[15,10,21],[-26,10,21]],"#f4f7f9") +
      block(-9,10,0,16,8,11,{floors:1,bays:3});
  }
  function sportsGround() {
    let drawing = isoShape([[-28,-15,1],[29,-15,1],[29,15,1],[-28,15,1]],"#d2ddd7");
    drawing += isoShape([[-23,-11,1.2],[24,-11,1.2],[24,11,1.2],[-23,11,1.2]],"none","#fff",1.2) +
      isoLine([0,-11,1.2],[0,11,1.2],"white",1) +
      block(-22,-25,0,42,6,8,{side:"#9eaeb8"}) + block(-23,-27,8,44,10,1);
    return drawing;
  }
  function tree(x,y) {
    return group(x,y,path("M0 1v-8","#76828c",1.6) +
      path("M-5 -7c-3-1-3-5-1-7 0-5 7-7 10-3 4 1 5 7 1 10z","#88959a",0.65,"#e0e7e4"));
  }
  function mapZone(x,y,name,english,zone,draw,s) {
    const object = `<g transform="translate(0 -8) scale(${s})">${draw()}</g>`;
    return control("zone",zone,"查看"+name+"驻留记录",group(x,y,
      '<ellipse cx="0" cy="0" rx="51" ry="19" fill="none" stroke="#8ab9ff" stroke-width="5" filter="url(#arch-glow)"/>' +
      '<ellipse class="zone-base" cx="0" cy="0" rx="49" ry="18" fill="url(#arch-halo)" stroke="#75a8fa" stroke-width="1.1"/>' +
      object + pill(0,23,name,62,blue) + label(0,45,english,7.2,"#677889","middle","en")));
  }
  function measureNode(x,y,title,shape,tint) {
    return group(x,y,
      '<ellipse cy="0" rx="27" ry="10" fill="white" stroke="#78aaf2" stroke-width=".85"/>' +
      group(0,-2,shape) + pill(0,14,title,54,tint));
  }
  function measureBars() {
    return [8,12,17,23].map((h,i)=>block(-11+i*5,-2,0,3,5,h,{roof:"#c3dcfa",front:"#e2e9f1",side:"#99adc0"})).join("");
  }
  function measurePanel() {
    return block(-10,-4,0,20,7,15,{front:"#fff",side:"#cad3db"}) +
      repeat(3,i=>isoLine([-7,3,4+i*3],[7,3,4+i*3],"#7e94a8",0.8));
  }
  function campusMap() {
    const grid = repeat(34,i => {
      const t=i/33, x=402+t*676, x2=152+t*1176;
      return path(`M${x} 282L${x2} 536`,"#d6dce2",0.55);
    }) + repeat(18,i=>{
      const t=i/17, y=282+254*Math.pow(t,1.34);
      return path(`M150 ${y}h1180`,"#d8dde2",0.55);
    });
    const routes = [
      "M288 515h195l24-34h103l33-83h83l7-45h145l12-42h154",
      "M349 407h143l22-36h114l13-41h144l6-33h163",
      "M412 467h82l28-41h165l14-40h151l13 37h98l23 43h146",
      "M483 515h193l14-50h113l25 52h274",
      "M517 315h77l-14 35h102l-10 28h139l12 32h117",
      "M330 493h82l35-48h64l21-31h62",
      "M746 294v41h109l21 43h175l33 52h78",
      "M770 467h59l13 26h114l14 24h159",
      "M580 300l-7 16h-91l-24 32h-37",
      "M368 478h54l18-22h-71",
    ].map(d=>path(d,"#c5dcfe",3.5)+path(d,"#71a9fb",1.05)).join("");
    const auxiliary = measureNode(612,321,"居住占比",measureBars(),purple) +
      measureNode(855,318,"地点分布",measurePanel(),green) +
      measureNode(636,418,"驻留熵",measureBars(),green) +
      measureNode(795,489,"到访地点",measurePanel(),purple) +
      measureNode(1081,464,"移动距离",measureBars(),"#7198a9") +
      group(386,460,'<ellipse rx="22" ry="8" fill="#fff" stroke="#b1c6df"/>'+tree(-6,-1)+tree(4,2)) +
      group(1016,408,'<ellipse rx="20" ry="7" fill="#fff" stroke="#b1c6df"/>'+block(-7,-4,0,16,10,7,{floors:1,bays:3}));
    const title = control("zone","all","打开校园行为地图",group(740,280,
      rect(-81,-12,162,24,"white",blue,0.9) + label(0,4,"校园行为地图  ↗",14,blue,"middle","heading")));
    const map = path("M402 282H1078L1328 536H152Z","#77818c",1,"#f8fafb") +
      `<g clip-path="url(#arch-plane)">${grid}${routes}</g>` + auxiliary +
      mapZone(509,350,"居住地点","RESIDENCE","home",residence,1.13) +
      mapZone(744,362,"学习地点","STUDY","study",library,1.24) +
      mapZone(967,354,"餐饮地点","FOOD","food",foodHall,1.15) +
      mapZone(539,465,"社交地点","SOCIAL","social",socialHall,1.22) +
      mapZone(897,466,"休闲地点","LEISURE","leisure",sportsGround,1.32) +
      title;
    return map;
  }
  function chartInset(x,y,w,title,rows) {
    return group(x,y,rect(0,0,w,29+rows.length*19,"#fcfdfe","#8b959f",0.8) +
      rect(0,0,w,24,"#f5f7f9","#8b959f",0.8) +
      repeat(3,i=>circle(9+i*6,8,1.6,"#a0abb5")) + label(8,20,title,9.2,ink,"start","en arch-legend") +
      rows.map(([k,v],i)=>path(`M7 ${29+i*19+15}H${w-7}`,"#d8dee4",0.65)+
        label(9,39+i*19,k,10.2,"#4d5964") + label(w-9,39+i*19,v,10.5,ink,"end","digit")).join(""));
  }
  function layerRow(y,text,left,right,isMain) {
    return rect(152,y,1176,19,"white","#838d97",0.85) +
      path(`M170 ${y+9.5}H${isMain?556:565} M${isMain?924:915} ${y+9.5}H1311`, left,0.8) +
      repeat(4,i=>circle(165+i*5,y+9.5,1.4,left)) + repeat(4,i=>circle(1314-i*5,y+9.5,1.4,right)) +
      label(740,y+13,text,isMain?13:10.5,isMain?blue:ink,"middle",isMain?"heading":"");
  }
  function sourceStation(cx,key,name,english,color,items) {
    const width=257;
    const face = path("M-7 101 6 78h253v23z","#77818a",0.8,"#fff") +
      rect(-7,101,266,11,"url(#arch-hatch)","#78828b") + rect(4,0,width-7,96,"#f3f4f3","#78828b",0.9) +
      items.map((s,i)=>{
        const x=11+i%2*119,y=8+Math.floor(i/2)*27;
        return rect(x,y,114,22,"#fff","#9da4aa",0.8) +
          rect(x+7,y+8,15,7,color,"#68727c",0.7,3.5) + circle(x+17.5,y+11.5,2.6,"#fff") +
          label(x+28,y+15.5,s,10.7,ink);
      }).join("") + label(128,137,name,17,ink,"middle","heading") + label(128,152,english,8,"#62717e","middle","en arch-legend");
    return control("source",key,name,group(cx-128,677,face));
  }
  const sourceXs = [228,568,908,1248];
  const sourceWires = sourceXs.map((cx,index)=>repeat(7,i=>{
    const sx = 328+index*230+i*13, ex=cx+(i-3)*16;
    const d = `M${sx} 611C${sx} 638 ${ex} 649 ${ex} 681`;
    return path(d,"#a4abb1",0.7)+circle(ex,677,1.45,ink);
  })).join("");
  const body = channelWires(294,444,8,"rhythm") + channelWires(740,740,11,"spatial") + channelWires(1186,1036,8,"latent") +
    workstation(294,"rhythm","行为与节律","BEHAVIORAL & CIRCADIAN MEANS",rhythmScreens) +
    workstation(740,"spatial","空间驻留与环境熵","SPATIAL DWELLING ENTROPY",spatialScreens) +
    workstation(1186,"latent","行为隐因子","LATENT BEHAVIORAL FACTORS",latentScreens) +
    label(412,260,"↥ 观测均值",9.5,"#4b5762","end") + label(1073,260,"低秩投影 ↧",9.5,"#4b5762") +
    campusMap() +
    chartInset(43,377,168,"COHORT / 研究队列",[["学生","209 人"],["观察窗口","56 天"],["驻留记录","23,341 条"],["功能区","5 类"]]) +
    chartInset(1271,379,166,"SAMPLING / 驻留记录",[["居住地点","9,565"],["学习地点","5,627"],["餐饮地点","5,297"]]) +
    sourceWires +
    control("channel","quality","查看自适应门控研判",layerRow(542,"CA-Gate 2.0 空间锚定自适应门控研判    ↗","#79a9e7","#9ab8a9",true)) +
    layerRow(566,"空间主干锚定   ·   双向动态门控   ·   多模态残差协同研判","#b5a6dc","#a0b9ab",false) +
    layerRow(590,"CES  /  COLLEGE EXPERIENCE DATASET","#a8bcd2","#a8bcd2",false) +
    sourceStation(sourceXs[0],"location","地点与驻留","LOCATION",blue,["居住时长","学习时长","餐饮时长","社交时长","休闲时长","到访地点数"]) +
    sourceStation(sourceXs[1],"sleep","睡眠与夜间作息","SLEEP & RHYTHM","#b295db",["睡眠时长","入睡时间","醒来时间","夜间解锁","解锁时长","解锁次数"]) +
    sourceStation(sourceXs[2],"activity","移动与活动","ACTIVITY","#9786d5",["静止时长","步行时长","乘车时长","骑行时长","移动距离","活动分布"]) +
    sourceStation(sourceXs[3],"device","设备交互","DEVICE INTERACTION","#81a596",["解锁次数","解锁时长","居住地点","学习地点","设备使用","每日均值"]);
  document.getElementById("architecture").innerHTML = `<svg class="campus-architecture" xmlns="http://www.w3.org/2000/svg" viewBox="0 -7 1480 855" width="1480" height="855" role="group" aria-label="多通道校园行为研究架构">
    <style>
      .campus-architecture {display:block;width:100%;height:auto;overflow:visible;font-family:Alliance,"Microsoft YaHei UI","Microsoft YaHei",sans-serif}
      .campus-architecture .en {font-family:Alliance,Arial,sans-serif;letter-spacing:.4px}
      .campus-architecture .arch-legend {letter-spacing:1.1px}.campus-architecture .heading {font-weight:500;letter-spacing:1.2px}
      .campus-architecture .digit {font-variant-numeric:tabular-nums}
      .diagram-action {cursor:pointer;outline:none}
      .diagram-action:hover .heading,.diagram-action:focus-visible .heading {fill:#2672df}
      .diagram-action:hover .zone-base,.diagram-action:focus-visible .zone-base {fill:#deedff;stroke:#126afa;stroke-width:2}
      .diagram-action:focus-visible {outline:2px solid #3788f4;outline-offset:2px}
      .diagram-action:hover {filter:drop-shadow(0 1px 2px #547aa34a)}
      .campus-architecture:has([data-channel="rhythm"]:is(:hover,:focus-visible)) .arch-wire-rhythm path,
      .campus-architecture:has([data-channel="spatial"]:is(:hover,:focus-visible)) .arch-wire-spatial path,
      .campus-architecture:has([data-channel="latent"]:is(:hover,:focus-visible)) .arch-wire-latent path {stroke:#3488ff;stroke-width:1.4}
      @media (prefers-reduced-motion:reduce){.campus-architecture .wire-signal {visibility:hidden}}
    </style>${definitions}${body}</svg>`;
})();
