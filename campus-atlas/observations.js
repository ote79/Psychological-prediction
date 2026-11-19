(function(){
'use strict';
const {students,events}=window.ATLAS_DATA;
const zones=['居住','学习','餐饮','社交','休闲'];
const colors=['#77a9bc','#9ebc84','#e0bc6d','#ad96bf','#de9e80'];
const $=id=>document.getElementById(id);
const state={person:-1,group:'all',first:1,last:56,zone:-1,selected:1};
let routeId='',rows=[],dayCounts=[],dayHours=[],weekCounts=[],people=new Set(),brushStart=null;
const day=d=>'D'+String(d).padStart(2,'0');
const num=n=>n.toLocaleString('zh-CN');
function baseMatch(e){return(state.person<0||e[0]===state.person)&&(state.group==='all'||students[e[0]].high===(state.group==='high'));}
function calculate(){
 dayCounts=Array(56).fill(0);dayHours=Array.from({length:56},()=>Array(5).fill(0));weekCounts=Array.from({length:5},()=>Array(8).fill(0));rows=[];people=new Set();
 for(const e of events){if(!baseMatch(e))continue;dayCounts[e[1]-1]++;dayHours[e[1]-1][e[2]]+=e[3];if(e[1]>=state.first&&e[1]<=state.last){rows.push(e);people.add(e[0]);weekCounts[e[2]][Math.floor((e[1]-1)/7)]++;}}
}
function skeleton(){
 $('observationsPage').innerHTML=`<aside class="obs-sidebar" id="obsSidebar" aria-label="观测分析筛选"><div class="obs-brand-row"><a class="editorial-brand" href="#home">观微</a><a href="#overview">支持总览 ↗</a><button class="obs-close-filters" data-obs-close-filters aria-label="收起筛选条件">×</button></div><h2>CES / 观测分析 / 56 天</h2><p class="obs-subtitle">校园行为研究 · 匿名队列</p><div class="obs-control"><h3>观察日范围</h3><div class="obs-range"><label>从 <input id="obsFirst" type="number" min="1" max="56" aria-label="分析起始观察日"></label><label>至 <input id="obsLast" type="number" min="1" max="56" aria-label="分析结束观察日"></label></div><div class="obs-mini-actions"><button data-obs-reset>↶ 恢复 56 天</button><button data-obs-map>打开行为地图 ↗</button></div></div><div class="obs-control"><label for="obsStudent">观察对象</label><select id="obsStudent"><option value="-1">全部匿名学生（209 人）</option>${students.map((s,i)=>`<option value="${i}">${s.id} · ${s.sensingDays} 天采集</option>`).join('')}</select></div><div class="obs-control"><label for="obsGroup">筛查分数组别</label><select id="obsGroup"><option value="all">全部组别</option><option value="high">高分组 · ≥ 0.70</option><option value="standard">常规与中分组 · &lt; 0.70</option></select></div><div class="obs-control"><h3>地点类别</h3><div class="obs-legend">${zones.map((z,i)=>`<button style="--zone-color:${colors[i]}" data-obs-zone="${i}" aria-pressed="false">${z}地点 <span>高亮</span></button>`).join('')}</div><div class="obs-mini-actions"><button data-obs-zone="-1">显示全部类别</button></div></div><p class="obs-side-note">五类颜色对应校园核心功能区。图表共享观察窗口；支持日粒度穿透与时空习惯还原。</p></aside>
 <div class="obs-content"><div class="obs-topline"><nav aria-label="观测页面导航"><a href="#overview">← 学生支持总览</a><a href="#home">研究架构</a></nav><button data-obs-filters aria-expanded="false" aria-controls="obsSidebar">筛选条件</button></div><header class="obs-heading"><h1 id="obsTitle">校园驻留观测与时间构成</h1><p>基于 CES 研究队列的五类地点正驻留记录 · 研究观察窗 D01–D56</p><p class="obs-summary" id="obsSummary"></p></header><div class="obs-scope"><span id="obsScope"></span><button data-obs-method>了解空间通道 ↗</button></div><p class="obs-mobile-hint">图表可左右滑动，查看完整 56 天与全部节点。</p><div id="obsEmpty"></div>
 <section class="obs-module"><header class="obs-module-head"><h2>每日有效驻留记录</h2><button data-obs-reset>恢复完整观察窗</button></header><div class="obs-chart-scroll" id="obsCountsChart"></div><div class="obs-chart-scroll" id="obsOverviewChart"></div><div class="obs-brush"><label>起始日<input id="obsStartRange" type="range" min="1" max="56" aria-label="拖动选择起始观察日"></label><label>结束日<input id="obsEndRange" type="range" min="1" max="56" aria-label="拖动选择结束观察日"></label></div><p class="obs-chart-note">上图：当前范围内的每日记录条数。下图：完整 56 天概览，可拖动框选；也可使用滑块精确选择。</p><div class="obs-selected" id="obsSelection"></div></section>
 <section class="obs-module"><header class="obs-module-head"><h2>每日驻留时长构成</h2><small>百分比 · 按地点类别着色</small></header><div class="obs-inline-legend">${zones.map((z,i)=>`<span style="--zone-color:${colors[i]}"><i></i>${z}</span>`).join('')}</div><div class="obs-chart-scroll" id="obsCompositionChart"></div><p class="obs-chart-note">直观展示学生在五类核心校园功能区的时间分配占比，敏锐洞察日常规律与时空退缩指征。</p></section>
 <section class="obs-module"><header class="obs-module-head"><h2>观测记录的汇总关系</h2><small>研究对象 → 地点类别 → 观察周</small></header><p class="obs-chart-note">分层汇总学生个体在各功能区、各观察周的时空驻留频次，支持点选周节点进行深度回溯。</p><div class="obs-chart-scroll" id="obsTreeChart"></div><div class="obs-week-controls" aria-label="按观察周筛选">${Array.from({length:8},(_,i)=>`<button data-obs-week="${i}" aria-pressed="false">第 ${i+1} 周</button>`).join('')}</div></section><footer class="obs-footer">客观行为感知数据沉淀，提供连续、多维的时空驻留轨迹，辅助学工开展精准关怀与核实。<br><a href="#research/spatial">查看空间驻留与环境熵技术说明 ↗</a></footer></div>`;
}
function dimensions(){const left=55,right=975,width=right-left,n=state.last-state.first+1;return{left,right,width,n,x:d=>left+(d-state.first+.5)*width/n};}
function axes(max,height,percent=false){
 const {left,right}=dimensions(),bottom=height,top=24;let s='';
 for(let i=0;i<=4;i++){const y=bottom-(bottom-top)*i/4;s+=`<line class="plot-grid" x1="${left}" y1="${y}" x2="${right}" y2="${y}"/><text class="plot-text" text-anchor="end" x="${left-10}" y="${y+4}">${percent?i*25+'%':Math.round(max*i/4)}</text>`;}
 s+=`<path class="plot-axis" fill="none" d="M${left} ${top}V${bottom}H${right}"/>`;
 const {x,n}=dimensions(),step=n>28?7:n>10?3:1;
 for(let d=state.first;d<=state.last;d++){if((d-state.first)%step===0||d===state.last&&n>3&&(d-state.first)%step>step/2)s+=`<text class="plot-text" text-anchor="middle" x="${x(d)}" y="${bottom+23}">${day(d)}</text>`;}
 return s;
}
function countsChart(){
 const {x,width,n}=dimensions(),max=Math.max(4,...dayCounts.slice(state.first-1,state.last)),ceiling=Math.ceil(max/4)*4,baseline=218,scale=194/ceiling;
 let bars='';for(let d=state.first;d<=state.last;d++){const v=dayCounts[d-1],w=Math.max(2,width/n*.64);bars+=`<rect x="${x(d)-w/2}" y="${baseline-v*scale}" width="${w}" height="${v*scale}" fill="${d===state.selected?'#4c95b2':'#525b60'}"/><rect class="day-hit" data-obs-day="${d}" role="button" tabindex="0" aria-label="${day(d)}，${v} 条记录" x="${x(d)-width/n/2}" y="24" width="${width/n}" height="195"><title>${day(d)} · ${v} 条记录</title></rect>`;}
 return `<svg class="obs-chart" viewBox="0 0 1000 253" role="img" aria-label="每日有效驻留记录柱状图">${axes(ceiling,218)}${bars}</svg>`;
}
function overviewChart(){
 const w=920/56,max=Math.max(1,...dayCounts);return `<svg class="obs-chart" id="obsOverviewSvg" viewBox="0 0 1000 62" aria-label="完整观察窗，拖动选择日期范围" style="touch-action:none"><rect x="55" y="4" width="920" height="39" fill="#eceff1"/>${dayCounts.map((v,i)=>`<rect x="${55+i*w+2}" y="${42-30*v/max}" width="${w-4}" height="${30*v/max}" fill="#a8b9c1"/>`).join('')}<rect id="obsBrushRect" x="${55+(state.first-1)*w}" y="4" width="${(state.last-state.first+1)*w}" height="39" fill="#61a2be16" stroke="#559ab8" stroke-width="1.5"/><text x="55" y="59" class="plot-text">D01</text><text x="975" y="59" text-anchor="end" class="plot-text">D56</text></svg>`;
}
function compositionChart(){
 const {x,left,right,width,n}=dimensions(),bottom=265,plotHeight=241;let s=axes(100,bottom,true);const cumulative=dayHours.map(values=>{const sum=values.reduce((a,b)=>a+b,0),c=[0];for(const v of values)c.push(sum?c[c.length-1]+v/sum:0);return c;});
 for(let z=0;z<5;z++){
  let run=[];const flush=()=>{if(!run.length)return;const first=run[0],last=run[run.length-1],points=[[x(first)-width/n/2,bottom-cumulative[first-1][z+1]*plotHeight],...run.map(d=>[x(d),bottom-cumulative[d-1][z+1]*plotHeight]),[x(last)+width/n/2,bottom-cumulative[last-1][z+1]*plotHeight],[x(last)+width/n/2,bottom-cumulative[last-1][z]*plotHeight],...run.slice().reverse().map(d=>[x(d),bottom-cumulative[d-1][z]*plotHeight]),[x(first)-width/n/2,bottom-cumulative[first-1][z]*plotHeight]];s+=`<polygon points="${points.map(p=>p.join(',')).join(' ')}" fill="${colors[z]}" opacity="${state.zone<0||state.zone===z?1:.23}" stroke="#ffffff55" stroke-width=".6"/>`;run=[];};
  for(let d=state.first;d<=state.last;d++){if(dayCounts[d-1])run.push(d);else flush();}flush();
 }
 for(let d=state.first;d<=state.last;d++){if(!dayCounts[d-1])s+=`<rect x="${x(d)-width/n/2}" y="24" width="${width/n}" height="${plotHeight}" fill="#f2f3f4"/>`;s+=`<rect class="day-hit" data-obs-day="${d}" tabindex="0" role="button" aria-label="查看 ${day(d)} 驻留构成" x="${x(d)-width/n/2}" y="24" width="${width/n}" height="${plotHeight}"><title>${day(d)} · ${dayHours[d-1].map((h,z)=>zones[z]+' '+h.toFixed(1)+' 小时').join(' / ')}</title></rect>`;}
 s+=`<line x1="${x(state.selected)}" y1="24" x2="${x(state.selected)}" y2="265" stroke="#3f647a" stroke-dasharray="3 4" opacity=".7"/>`;
 return `<svg class="obs-chart" viewBox="0 0 1000 304" role="img" aria-label="五类地点每日驻留时长百分比堆叠面积图">${s}</svg>`;
}
function treeChart(){
 let paths='',nodes='';const rootY=330;
 for(let z=0;z<5;z++){
  const y=75+z*125,total=weekCounts[z].reduce((a,b)=>a+b,0),opacity=state.zone<0||state.zone===z?1:.25;
  paths+=`<path d="M130 ${rootY}C270 ${rootY} 230 ${y} 370 ${y}" fill="none" stroke="#c9cfd2" stroke-width="1.3"/>`;
  nodes+=`<circle cx="370" cy="${y}" r="7" fill="${colors[z]}" opacity="${opacity}"/><text x="350" y="${y-15}" text-anchor="end" class="plot-text">${zones[z]} · ${num(total)} 条</text>`;
  for(let w=0;w<8;w++){
   const wy=28+z*125+w*14;
   paths+=`<path d="M377 ${y}C530 ${y} 560 ${wy} 750 ${wy}" fill="none" stroke="#cbd1d4" stroke-width="1" opacity="${opacity}"/>`;
   nodes+=`<g data-tree-week="${w}" role="button" tabindex="0" aria-label="查看第 ${w+1} 周"><circle cx="750" cy="${wy}" r="4.5" fill="${weekCounts[z][w]?colors[z]:'#d8dddf'}" opacity="${opacity}"/><text x="764" y="${wy+4}" class="plot-text">第 ${w+1} 周 · ${num(weekCounts[z][w])} 条</text></g>`;
  }
 }
 return `<svg class="obs-chart obs-tree-chart" viewBox="0 0 1000 665" role="img" aria-label="研究记录按地点和观察周分组的层级汇总图">${paths}<circle cx="130" cy="${rootY}" r="8" fill="#9eaaad"/><text x="115" y="${rootY-23}" class="plot-text" text-anchor="middle">${state.person<0?'当前队列':students[state.person].id}</text><text x="115" y="${rootY+29}" class="plot-text" text-anchor="middle">${num(rows.length)} 条</text>${nodes}<text x="500" y="653" text-anchor="middle" class="plot-text">地点类别与观察周的记录汇总 · 点选周节点可筛选范围</text></svg>`;
}
function selection(){
 const d=state.selected,values=dayHours[d-1],sum=values.reduce((a,b)=>a+b,0);
 $('obsSelection').innerHTML=`<span><strong>${day(d)}</strong> · ${dayCounts[d-1]} 条记录 · ${dayCounts[d-1]?sum.toFixed(2)+' 小时':'时长未记录'}${state.zone>=0?' · '+zones[state.zone]+' '+values[state.zone].toFixed(3)+' 小时':''}${!dayCounts[d-1]?' · 无有效驻留记录':''}</span><button data-obs-map-day>在地图中查看这一天 ↗</button>`;
}
function render(){
 calculate();const s=students[state.person],matchingStudents=students.filter((p,i)=>(state.person<0||state.person===i)&&(state.group==='all'||p.high===(state.group==='high'))).length;
 $('obsTitle').textContent=s?s.id+' · 驻留观测与时间构成':'校园驻留观测与时间构成';
 $('obsSummary').textContent=`当前展示 ${matchingStudents} 名候选学生中的 ${people.size} 人，共 ${num(rows.length)} 条驻留记录 · ${day(state.first)}–${day(state.last)}`;
 $('obsScope').textContent=s?`重点关注学生 ${s.id} · 连续有效采集 ${s.sensingDays} 天 · 自适应门控预警分 ${s.score.toFixed(3)}`:'展示 56 天长周期时空驻留与行为构成分布，支持拖动框选与日粒度交互穿透。';
 $('obsEmpty').innerHTML=rows.length?'':'<p class="obs-empty">当前条件下没有有效驻留记录。可恢复完整观察窗，或查看该生已有的分数与采集覆盖。</p>';
 $('obsFirst').value=state.first;$('obsLast').value=state.last;$('obsStartRange').value=state.first;$('obsEndRange').value=state.last;$('obsStudent').value=state.person;$('obsGroup').value=state.group;
 $('obsCountsChart').innerHTML=countsChart();$('obsOverviewChart').innerHTML=overviewChart();$('obsCompositionChart').innerHTML=compositionChart();$('obsTreeChart').innerHTML=treeChart();selection();
 document.querySelectorAll('[data-obs-zone]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.obsZone)===state.zone)));
 document.querySelectorAll('[data-obs-week]').forEach(b=>b.setAttribute('aria-pressed',String(state.first===Number(b.dataset.obsWeek)*7+1&&state.last===Number(b.dataset.obsWeek)*7+7)));
}
function setRange(first,last){state.first=Math.max(1,Math.min(56,first));state.last=Math.max(state.first,Math.min(56,last));state.selected=Math.max(state.first,Math.min(state.last,state.selected));render();}
function route(){
 const parts=location.hash.slice(1).split('/'),active=parts[0]==='observations';$('observationsPage').hidden=!active;if(!active)return false;
 if(location.hash!==routeId){state.person=students.findIndex(s=>s.id===parts[1]);state.group='all';state.first=1;state.last=56;state.selected=1;state.zone=-1;routeId=location.hash;}
 render();document.title='观测分析 · 观微';document.body.style.background='#fff';window.scrollTo(0,0);return true;
}
document.body.insertAdjacentHTML('beforeend','<main id="observationsPage" class="observation-page" hidden></main>');skeleton();
window.ObservationView={route,context(){return {student:students[state.person]||null};}};
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-obs-zone],[data-obs-week],[data-tree-week],[data-obs-day],[data-obs-reset],[data-obs-map],[data-obs-map-day],[data-obs-filters],[data-obs-close-filters],[data-obs-method]');if(!b)return;const a=b.dataset;
 if('obsZone'in a){state.zone=Number(a.obsZone);render();}
 if('obsWeek'in a||'treeWeek'in a){const w=Number(a.obsWeek??a.treeWeek);setRange(w*7+1,w*7+7);}
 if('obsDay'in a){state.selected=Number(a.obsDay);render();}
 if('obsReset'in a)setRange(1,56);
 if('obsMap'in a||'obsMapDay'in a){window.AtlasNavigation.openObservation({id:students[state.person]?.id,first:'obsMapDay'in a?state.selected:state.first,last:'obsMapDay'in a?state.selected:state.last,zone:state.zone,group:state.group});}
 if('obsMethod'in a)window.Workbench.openMethod('spatial');
 if('obsCloseFilters'in a){$('observationsPage').classList.remove('filters-open');document.querySelector('[data-obs-filters]').setAttribute('aria-expanded','false');document.querySelector('[data-obs-filters]').focus();}
 if('obsFilters'in a){const open=$('observationsPage').classList.toggle('filters-open');b.setAttribute('aria-expanded',String(open));if(open){window.scrollTo(0,0);$('obsFirst').focus();}}
});
document.addEventListener('change',e=>{
 const id=e.target.id,v=Number(e.target.value);
 if(['obsFirst','obsLast','obsStartRange','obsEndRange'].includes(id)){if(!Number.isInteger(v)){render();return;}if(id==='obsFirst'||id==='obsStartRange')setRange(v,Math.max(v,state.last));else setRange(Math.min(v,state.first),v);}
 if(id==='obsStudent'){state.person=v;routeId='#observations'+(v>=0?'/'+students[v].id:'');history.replaceState(null,'',routeId);render();}
 if(id==='obsGroup'){state.group=e.target.value;render();}
});
document.addEventListener('keydown',e=>{if(['Enter',' '].includes(e.key)&&e.target.matches('[data-obs-day],[data-tree-week]')){e.preventDefault();e.target.dispatchEvent(new MouseEvent('click',{bubbles:true}));}});
function brushDay(e,svg){const r=svg.getBoundingClientRect(),x=(e.clientX-r.left)*1000/r.width;return Math.max(1,Math.min(56,Math.floor((x-55)/920*56)+1));}
document.addEventListener('pointerdown',e=>{const svg=e.target.closest('#obsOverviewSvg');if(!svg)return;brushStart=brushDay(e,svg);svg.setPointerCapture(e.pointerId);});
document.addEventListener('pointermove',e=>{if(brushStart===null)return;const svg=$('obsOverviewSvg'),d=brushDay(e,svg),first=Math.min(d,brushStart),last=Math.max(d,brushStart);$('obsBrushRect').setAttribute('x',55+(first-1)*920/56);$('obsBrushRect').setAttribute('width',(last-first+1)*920/56);});
document.addEventListener('pointerup',e=>{if(brushStart===null)return;const d=brushDay(e,$('obsOverviewSvg')),start=brushStart;brushStart=null;setRange(Math.min(start,d),Math.max(start,d));});
document.addEventListener('pointercancel',()=>{if(brushStart!==null){brushStart=null;render();}});
})();
