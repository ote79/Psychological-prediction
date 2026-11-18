(function atlasApp(){
'use strict';
const {events, students, zones} = window.ATLAS_DATA;
const zoneNames = ['居住区', '学习区', '餐饮区', '社交区', '休闲区'];
const $ = id => document.getElementById(id);
const number = value => value.toLocaleString('zh-CN');
const dayLabel = d => 'D' + String(d).padStart(2, '0');
const iconPaths = {
  brand:'<path d="M2 10c3-4.5 6.4-6.8 10-6.8s7 2.3 10 6.8c-3 4.5-6.4 6.8-10 6.8S5 14.5 2 10Z"/><circle cx="12" cy="10" r="3.5"/><path d="m4.5 18 7.5 3.3 7.5-3.3"/>',
  back:'<path d="M20 12H4m7-7-7 7 7 7"/>', arrowUpRight:'<path d="M5 19 19 5M7 5h12v12"/>',
  search:'<circle cx="10" cy="10" r="6.7"/><path d="m15 15 6 6"/>', menu:'<path d="M3 6h18M3 12h18M3 18h18"/>',
  close:'<path d="m5 5 14 14m0-14L5 19"/>', filter:'<path d="M3 4h18v2l-7.3 8v6l-3.4 1v-7L3 6z"/>',
  book:'<path d="M2 4c4-1.5 7-1.1 10 .6 3-1.7 6-2.1 10-.6v15c-4-1.5-7-1.1-10 .6-3-1.7-6-2.1-10-.6zM12 5v14"/>',
  database:'<ellipse cx="12" cy="5" rx="8.5" ry="3"/><path d="M3.5 5v13c0 4 17 4 17 0V5M3.5 11c0 4 17 4 17 0"/>',
  download:'<path d="M12 2v13m-5-5 5 5 5-5M4 16v5h16v-5"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.2"/>',
  home:'<path d="m2 11 10-8 10 8M5 9v12h14V9m-9 12v-7h4v7"/>',
  fit:'<path d="M3 9V3h6m6 0h6v6m0 6v6h-6m-6 0H3v-6"/>',
  area:'<rect x="2.5" y="4" width="19" height="16" stroke-dasharray="4 3"/>', play:'<path fill="currentColor" d="m6 3 14 9-14 9z"/>',pause:'<path d="M8 4v16m8-16v16" stroke-width="4"/>'
};
function icon(name){return `<svg aria-hidden="true" viewBox="0 0 24 24">${iconPaths[name]}</svg>`;}
document.querySelectorAll('[data-icon]').forEach(el => el.innerHTML=icon(el.dataset.icon));
const methods = {
  rhythm:['行为与节律均值通道','睡眠、夜间解锁、移动活动与设备交互分别取观察期均值。每一名学生形成一组可对照的日常行为指标。','睡眠时长、夜间解锁次数、步行时长等指标在训练折内完成插补和标准化。'],
  spatial:['空间驻留与环境熵通道','先把居住、学习、餐饮、社交、休闲五类地点的驻留时长换算成占比，再用香农熵描述活动地点的多样性。','空间通道还纳入居住占比、分布离散度、移动距离、到访地点数与距校园最远距离。单通道实验的平均 ROC-AUC 为 0.632。'],
  latent:['行为隐因子通道','在每个训练折内统一各类行为均值的量纲，再用截断奇异值分解提取四个共同变化的维度。','四维表征与节律、空间特征一同进入融合模型。单独使用四维表征时，平均 ROC-AUC 为 0.581。'],
  quality:['三通道融合与质量加权','三条通道的特征拼接后进入 L2 正则化逻辑回归。训练时按采集天数与覆盖比例对学生样本加权。','加权融合模型的平均 ROC-AUC 为 0.540。实验采用五折交叉验证并重复十次。工作台使用第一轮五折的折外筛查分数。']
};
const sources = {
  location:['地点驻留','按日汇总居住、学习、餐饮、社交和休闲地点的驻留时长。各区域的时长及其占比进入空间表征。'],
  sleep:['睡眠与夜间活动','观察期内的平均睡眠时长、夜间解锁次数和解锁时长用于描述作息节律。'],
  activity:['移动活动','静止、步行、乘车和骑行的时长均值用于描述日常活动构成。'],
  device:['设备交互','设备解锁频次及在学习、居住地点的解锁时长用于描述不同场景中的设备使用。']
};
const state = {zone:-1,group:'all',hourBin:-1,first:1,last:56,area:null,areaMode:false,person:-1,event:-1,panel:'filters',sideOpen:true,search:''};
let map, visible=[], timer, brushing, studentPool=[], stats, lastMapHash='', pendingObservation=null;
const durationNames=['不足 2 小时','2 至不足 4 小时','4 至不足 6 小时','6 至不足 8 小时','8 至不足 10 小时','10 至不足 12 小时','12 至不足 14 小时','14 至不足 16 小时','16 至不足 18 小时','18 至不足 20 小时','20 至不足 22 小时','22 小时及以上'];
const durationBin=h=>Math.min(11,Math.floor(h/2));
function clearSelection(){state.person=-1;state.event=-1;if(state.panel==='profile')state.panel='filters';}
function resetFilters(){Object.assign(state,{zone:-1,group:'all',hourBin:-1,first:1,last:56,area:null,areaMode:false});clearSelection();}
function filterRecords(){
  visible=[];
  const counts=Array(5).fill(0), days=Array(56).fill(0), hours=Array(12).fill(0), people=new Set();
  for(let i=0;i<events.length;i++){
    const [s,d,z,h]=events[i];
    if(state.area && !state.area.has(i))continue;
    if(state.group!=='all' && students[s].high!==(state.group==='high'))continue;
    const zoneMatch=state.zone<0 || state.zone===z;
    const hourMatch=state.hourBin<0 || durationBin(h)===state.hourBin;
    const dayMatch=d>=state.first && d<=state.last;
    if(zoneMatch && hourMatch)days[d-1]++;
    if(dayMatch && zoneMatch)hours[durationBin(h)]++;
    if(dayMatch && hourMatch)counts[z]++;
    if(dayMatch && zoneMatch && hourMatch){visible.push(i);people.add(s);}
  }
  stats={counts,days,hours,people};
}
function tip(i,x,y){
  const el=$('hoverTip');el.hidden=i==null;
  if(i==null)return;
  const [s,d,z,h]=events[i];
  el.textContent=`${students[s].id} · 第 ${d} 天 · ${zoneNames[z]} · ${h.toFixed(2)} h`;
  el.style.left=Math.max(4,Math.min(x+12,$('plot').clientWidth-el.offsetWidth-4))+'px';
  el.style.top=Math.max(4,Math.min(y+12,$('plot').clientHeight-el.offsetHeight-4))+'px';
}
function ensureMap(){
  if(map)return;
  map=window.createPointMap($('points'),{events,students,onEvent:selectRecord,onZone:setZone,onHover:tip,onArea(indices){
    state.area=new Set(indices);state.areaMode=false;clearSelection();state.sideOpen=true;render();
  }});
}
function dialog(title,body){
  $('dialogContent').innerHTML=`<h2>${title}</h2>${body}`;
  if(!$('dialog').open)$('dialog').showModal();
}
function showMethod(key){
  window.Workbench.openMethod(key);
}
function showSource(key){
  const [title,description]=sources[key];
  dialog(title,`<p>${description}</p><button class="dialog-cta" data-channel="${key==='location'?'spatial':'rhythm'}">查看对应研究通道 →</button>`);
}
function showMethods(){
  dialog('研究方法与数据',`<p>观微使用 CES 队列最初 56 天的行为观测，研究随后 56 天内的 PHQ-4 筛查结果。</p><div class="method-list">${Object.entries(methods).map(([k,v])=>`<button data-channel="${k}">${v[0]} <span>↗</span></button>`).join('')}</div>`);
}
function showMapInfo(){
  dialog('校园行为地图',`<p>每个点代表一名学生在一个观察日、一个功能区的有效驻留记录。五片点群对应五类地点，区内点位按观察日和匿名学生序号排布。</p><p>金色表示常规与中分组记录，紫色表示融合筛查分数达到 0.70 的展示组。点选记录可查看该生日均行为、观察覆盖及筛查分数。</p><div class="method-fact">模型队列 209 人，其中 206 人有五类地点驻留数据。观察窗共 23,341 条驻留记录，高分组占 1,067 条。</div>`);
}
function stop(){clearInterval(timer);timer=null;$('play').innerHTML=icon('play');$('play').setAttribute('aria-label','按日播放');$('play').title='按日播放';}
function setDays(a,b){
  state.first=Math.max(1,Math.min(56,a));state.last=Math.max(state.first,Math.min(56,b));
  if(state.event>=0 && (events[state.event][1]<state.first || events[state.event][1]>state.last))state.event=-1;
  render();
}
function setZone(z){state.zone=z;state.area=null;clearSelection();state.sideOpen=true;render();}
function selectStudent(i,event=-1){
  state.person=i;state.event=event;state.panel='profile';state.sideOpen=true;
  tip(null);render();
}
function selectRecord(i){selectStudent(events[i][0],i);}
function gotoMap(z='all'){
  if($('dialog').open)$('dialog').close();
  const hash=z==='all'?'#map':'#map/'+z;
  if(location.hash!==hash) location.hash=hash;else route();
}
function route(){
  const parts=location.hash.slice(1).split('/');
  const active=parts[0]==='map';
  const workbenchActive=window.Workbench.route();
  const observationActive=window.ObservationView.route();
  const extended=workbenchActive||observationActive;
  $('workspace').hidden=!active;$('home').hidden=active||extended;
  if($('dialog').open)$('dialog').close();
  stop();
  if(extended)return;
  document.title=active?'校园行为地图 · 观微':'观微 · 多通道校园行为研究';
  document.body.style.background=active?'#20262c':'white';
  if(!active)return;
  const restore=map && location.hash===lastMapHash && !pendingObservation;
  if(!restore){
    resetFilters();state.zone=zones.indexOf(parts[1]);state.panel=parts[1]==='students'?'students':'filters';state.search='';
    state.sideOpen=!matchMedia('(max-width:650px)').matches || state.panel==='students';
    if(parts[1]==='student'){
      const person=students.findIndex(s=>s.id===parts[2]);
      if(person>=0){state.person=person;state.panel='profile';state.sideOpen=true;state.event=events.findIndex(e=>e[0]===person&&e[1]===1&&e[2]===1);}
    }
  }
  if(pendingObservation){
    const p=pendingObservation;state.first=p.first;state.last=p.last;state.zone=p.zone;state.group=p.group;
    if(p.id){state.person=students.findIndex(s=>s.id===p.id);state.panel='profile';state.sideOpen=true;state.event=events.findIndex(e=>e[0]===state.person&&e[1]>=p.first&&e[1]<=p.last&&(p.zone<0||e[2]===p.zone));}
    pendingObservation=null;
  }
  lastMapHash=location.hash;
  ensureMap();render();map.resize();if(!restore)map.fit();
  if(state.panel==='students')$('studentSearch').focus();
}
function renderTimeline(){
  const max=Math.max(1,...stats.days);
  $('timelineBars').innerHTML=stats.days.map((v,i)=>`<i class="${i+1>=state.first && i+1<=state.last?'in':''}" style="height:${v?Math.max(7,100*v/max):0}%" title="第 ${i+1} 天 · ${v} 条"></i>`).join('');
  $('dayReadout').textContent=dayLabel(state.first)+'–'+dayLabel(state.last);
}
function filterPanel(){
  const counts=stats.counts;
  const weeks=Array(8).fill(0);
  stats.days.forEach((count,i)=>weeks[Math.floor(i/7)]+=count);
  const weekBars=weeks.map((count,i)=>`<button data-week="${i}" aria-label="观察第 ${i+1} 周" title="第 ${i+1} 周 · ${number(count)} 条" class="${state.first===i*7+1 && state.last===i*7+7?'on':''}" style="height:${Math.max(3,100*count/Math.max(1,...weeks))}%"></button>`).join('');
  return `<div class="intro-row"><span>驻留记录</span><b>${number(visible.length)} 条</b></div>
  <button class="panel-btn" data-action="students">${icon('search')} 查找学生</button>
  <section class="filter-card"><div class="card-head">驻留时长 <small>小时 / 日</small></div><div class="small-row"><span>0</span><span>22+</span></div><div class="bars">${stats.hours.map((c,i)=>`<button data-hours="${i}" class="${state.hourBin===i?'on':''}" style="height:${Math.max(4,c/Math.max(1,...stats.hours)*100)}%" title="${durationNames[i]} · ${c} 条" aria-label="${durationNames[i]}"></button>`).join('')}</div><div class="small-row"><span>${durationNames[state.hourBin]||'全部时长'}</span><button class="text-link" data-hours="-1">全部</button></div></section>
  <section class="filter-card"><div class="card-head">观察窗口 <small>第 ${state.first}–${state.last} 天</small></div><div class="small-row"><span>第 1 周</span><span>第 8 周</span></div><div class="bars">${weekBars}</div><div class="days"><input id="dayStart" type="number" min="1" max="56" value="${state.first}" aria-label="起始观察日"> 至 <input id="dayEnd" type="number" min="1" max="56" aria-label="结束观察日" value="${state.last}"></div></section>
  <section class="filter-card"><div class="card-head">地点类别 <small>5 个功能区</small></div><div class="zone-list">${zoneNames.map((name,i)=>`<button data-filter-zone="${i}" class="${state.zone===i?'on':''}"><i style="width:${counts[i]*100/Math.max(1,...counts)}%"></i><span>${name}</span><small>${number(counts[i])}</small></button>`).join('')}</div><div class="small-row"><span></span><button data-filter-zone="-1" class="text-link">全部地点</button></div></section>
  <section class="filter-card"><div class="card-head"><label for="group">筛查分数组别</label></div><select id="group">${[['all','全部组别'],['standard','常规与中分组'],['high','高分组 · 紫色']].map(([k,v])=>`<option value="${k}" ${k===state.group?'selected':''}>${v}</option>`).join('')}</select></section>
  <div class="scope-line"><span>${stats.people.size} 名学生有匹配记录</span><button data-action="reset" class="text-link">重置筛选</button></div>${visible.length?`<button class="panel-btn" data-record="${visible[0]}">查看首条记录 →</button>`:''}`;
}
function listStudents(){
  const query=state.search.trim().toLowerCase();
  $('studentList').innerHTML=studentPool.filter(i=>students[i].id.toLowerCase().includes(query)).map(i=>`<button data-person="${i}"><span><i class="key-dot ${students[i].high?'purple':'gold'}"></i>${students[i].id}</span><small>${students[i].score.toFixed(3)} ↗</small></button>`).join('')||'<p>没有匹配的学生编号。</p>';
}
function studentPanel(){
  const filtered=state.zone>=0 || state.group!=='all' || state.first!==1 || state.last!==56 || state.hourBin>=0 || state.area;
  studentPool=students.map((_,i)=>i).filter(i=>!filtered || stats.people.has(i));
  return `<div class="scope-line"><span>${filtered?'符合筛选条件':'研究队列'}</span><span>${studentPool.length} 人</span></div><input id="studentSearch" class="search-box" placeholder="搜索匿名编号，如 GW-001" aria-label="搜索匿名学生编号" autocomplete="off"><div class="student-list" id="studentList"></div>`;
}
function profilePanel(){
  const s=students[state.person], record=events[state.event];
  const personEvents=events.filter(e=>e[0]===state.person), total=Array(5).fill(0);
  for(const e of personEvents)total[e[2]]+=e[3];
  const sum=total.reduce((a,b)=>a+b,0);
  const summary=[['日均居住驻留',s.residenceHours,'h'],['日均学习驻留',s.studyHours,'h'],['夜间日均解锁',s.nightUnlocks,'次'],['有效采集天数',s.sensingDays,'天']];
  const recent=visible.filter(i=>events[i][0]===state.person);
  return `<div class="scope-line"><button class="text-link" data-action="students">← 学生索引</button><button data-action="filters">返回筛选</button></div>
  <section class="profile-card"><div class="small-row"><span>匿名学生</span><span>${s.quality}</span></div><h2 class="profile-title">${s.id}</h2><div><i class="key-dot ${s.high?'purple':'gold'}"></i>${s.high?'高分组':s.score>=.5?'中分组':'常规组'}</div><div class="detail-datum"><span>融合筛查分数</span><b>${s.score.toFixed(3)}</b></div></section>
  ${record?`<section class="profile-card"><h3>选中驻留记录</h3><div class="detail-datum"><span>观察日 / 地点</span><b>${dayLabel(record[1])} · ${zoneNames[record[2]]}</b></div><div class="detail-datum"><span>当日驻留时长</span><b>${record[3].toFixed(3)} h</b></div></section>`:''}
  <section class="profile-card"><h3>五类地点驻留占比</h3><div class="zone-list">${total.map((v,i)=>`<div class="detail-datum"><span>${zoneNames[i]}</span><b>${sum?(100*v/sum).toFixed(1)+'%':'—'}</b></div>`).join('')}</div></section>
  <section class="profile-card"><h3>56 天行为摘要</h3>${summary.map(([name,value,unit])=>`<div class="detail-datum"><span>${name}</span><b>${value==null?'未记录':value+' '+unit}</b></div>`).join('')}</section>
  <a class="panel-btn" href="#observations/${s.id}">查看时间图与驻留构成 ↗</a>
  <button class="panel-btn profile-method" data-channel="quality">这个分数怎样得到？ ↗</button>
  <details><summary class="side-section">当前范围内的驻留记录 · ${recent.length} 条</summary>${recent.map(i=>`<button class="record-btn" data-record="${i}">${dayLabel(events[i][1])} · ${zoneNames[events[i][2]]}<span>${events[i][3].toFixed(2)} h</span></button>`).join('')}</details>`;
}
function render(){
  filterRecords();
  $('side').hidden=!state.sideOpen;
  const title={filters:'筛选条件 / FILTERS',students:'学生索引 / STUDENTS',profile:'学生详情 / PROFILE'};
  $('sideTitle').textContent=title[state.panel];
  const content=$('sideContent');
  if(state.sideOpen){
    content.innerHTML=state.panel==='filters'?filterPanel():state.panel==='students'?studentPanel():profilePanel();
    if(state.panel==='students'){$('studentSearch').value=state.search;listStudents();}
  }
  document.querySelectorAll('.rail button').forEach(b=>b.classList.toggle('active',state.sideOpen && b.dataset.action===(state.panel==='profile'?'students':state.panel)));
  $('mapCount').textContent=`${number(visible.length)} 条驻留 · ${stats.people.size} 名学生`;
  $('areaBtn').setAttribute('aria-pressed',String(state.areaMode));$('clearArea').hidden=!state.area;$('noEvents').hidden=visible.length!==0;
  map.setState({visibleIndices:visible,studentIndex:state.person,selectedIndex:state.event,areaMode:state.areaMode});
  renderTimeline();
}
function openPanel(panel){
  clearSelection();state.panel=panel;state.sideOpen=true;render();$('side').scrollTop=0;
  if(panel==='students')$('studentSearch').focus();
}
function exportRecords(){
  const lines=['匿名编号,观察日,功能区,驻留小时,筛查分数组别'];
  for(const i of visible){
    const [s,d,z,h]=events[i],student=students[s];
    lines.push([student.id,d,zoneNames[z],h,student.high?'高分组':student.score>=.5?'中分组':'常规组'].join(','));
  }
  const url=URL.createObjectURL(new Blob(['\ufeff'+lines.join('\r\n')],{type:'text/csv;charset=utf-8'}));
  const link=document.createElement('a');link.href=url;link.download='观微_当前范围驻留记录.csv';link.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}
const actions={
  methods:showMethods,'map-info':showMapInfo,dismiss:()=>$('dialog').close(),search:()=>location.hash='map/students',
  students:()=>openPanel('students'),filters:()=>openPanel('filters'),'close-side':()=>{state.sideOpen=false;render();},
  reset:()=>{stop();resetFilters();state.panel='filters';render();},fit:()=>map.fit(),'zoom-in':()=>map.zoom(1.35),'zoom-out':()=>map.zoom(1/1.35),
  area:()=>{state.areaMode=!state.areaMode;render();},'clear-area':()=>{state.area=null;render();},export:exportRecords,
  'all-days':()=>{stop();setDays(1,56);},
  enlarge:()=>{const expanded=document.querySelector('.diagram-scroll').classList.toggle('enlarged');document.querySelector('[data-action=enlarge]').textContent=expanded?'适应屏幕':'展开架构图';},
  play:()=>{
    if(timer){stop();return;}
    let d=state.first===state.last && state.last<56?state.last:1;
    setDays(d,d);$('play').innerHTML=icon('pause');$('play').title='暂停';$('play').setAttribute('aria-label','暂停');
    timer=setInterval(()=>{if(d===56){stop();return;}d++;setDays(d,d);},650);
  }
};
document.addEventListener('click',e=>{
  const item=e.target.closest('[data-action],[data-channel],[data-source],[data-zone],[data-go],[data-filter-zone],[data-hours],[data-week],[data-record],[data-person]');
  if(!item)return;
  const a=item.dataset;
  if(a.action){actions[a.action]();return;}
  if(a.channel){showMethod(a.channel);return;}
  if(a.source){showSource(a.source);return;}
  if(a.zone||a.go){gotoMap(a.zone||a.go);return;}
  if('filterZone' in a){setZone(Number(a.filterZone));return;}
  if('hours' in a){state.hourBin=Number(a.hours);clearSelection();render();return;}
  if('week' in a){stop();const start=Number(a.week)*7+1;setDays(start,start+6);return;}
  if('record' in a)selectRecord(Number(a.record));
  if('person' in a)selectStudent(Number(a.person));
  $('side').scrollTop=0;
});
document.addEventListener('keydown',e=>{
  if(['Enter',' '].includes(e.key) && e.target.closest('#architecture [role="button"]')){
    e.preventDefault();e.target.dispatchEvent(new MouseEvent('click',{bubbles:true}));
  }
});
document.addEventListener('input',e=>{
  if(e.target.id==='studentSearch'){state.search=e.target.value;listStudents();}
});
document.addEventListener('change',e=>{
  if(e.target.id==='group'){state.group=e.target.value;clearSelection();render();}
  if(['dayStart','dayEnd'].includes(e.target.id)){
    stop();const d=e.target.valueAsNumber;
    if(!Number.isInteger(d)){render();return;}
    if(e.target.id==='dayStart')setDays(d,Math.max(d,state.last));
    else setDays(Math.min(d,state.first),d);
  }
});
$('dialog').addEventListener('click',e=>{if(e.target===$('dialog'))$('dialog').close();});
const track=$('timelineBars');
function dayAt(e){
  const bounds=track.getBoundingClientRect();
  return Math.min(56,Math.max(1,Math.floor((e.clientX-bounds.left)/bounds.width*56)+1));
}
track.addEventListener('pointerdown',e=>{stop();brushing=dayAt(e);track.setPointerCapture(e.pointerId);setDays(brushing,brushing);});
track.addEventListener('pointermove',e=>{
  if(brushing==null)return;
  const d=dayAt(e);if(Math.min(d,brushing)!==state.first || Math.max(d,brushing)!==state.last)setDays(Math.min(d,brushing),Math.max(d,brushing));
});
for(const name of ['pointerup','pointercancel'])track.addEventListener(name,()=>brushing=null);
track.addEventListener('dblclick',()=>setDays(1,56));
window.AtlasNavigation={
  openObservation(scope){pendingObservation=scope;const hash='#map/observations';if(location.hash===hash)route();else location.hash=hash;},
  openStudent(id){const hash='#map/student/'+id;if(location.hash===hash)route();else location.hash=hash;},
  context(){return {student:state.person>=0?students[state.person]:null,event:state.event>=0?events[state.event]:null};},
  resume(){location.hash=lastMapHash||'#map';}
};
window.addEventListener('hashchange',route);
route();
})();

