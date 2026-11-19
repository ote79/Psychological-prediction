(function(){
'use strict';
const {students,events}=window.ATLAS_DATA;
const $=id=>document.getElementById(id);
const present=new Set(events.map(e=>e[0]));
const high=students.filter(s=>s.high).length;
const missing=students.length-present.size;
const mark='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 10c3-4.5 6.4-6.8 10-6.8s7 2.3 10 6.8c-3 4.5-6.4 6.8-10 6.8S5 14.5 2 10Z"/><circle cx="12" cy="10" r="3.5"/><path d="m4.5 18 7.5 3.3 7.5-3.3"/></svg>';
const arrow='<span aria-hidden="true">↗</span>';
const brand=`<a class="editorial-brand" href="#home" aria-label="观微研究架构首页">${mark}观微<small>GUANWEI</small></a>`;
const methodData={
  rhythm:{
    number:'01',
    title:'行为与节律',
    factorTitle:'核心节律维度与行为映射',
    lead:'生理时钟与数字交互的昼夜稳态表征',
    question:'如何透过 56 天连续被动感知，敏锐捕捉学生的心理节律紊乱？',
    description:'作息节律与数字交互是反映学生情绪稳态与神经负荷的最敏感生理钟。本通道通过手机传感器、加速度计与锁屏状态，无感采集 56 天长周期的睡眠窗口、深夜唤醒、机能活动（静止/步行/骑车/乘车）及设备交互强度。通过训练折内自适应标准化，提炼出量化生物节律稳态与夜间心理唤醒的核心指征，直接关联焦虑与抑郁前驱期常见的主观作息漂移与夜间反刍。',
    formula:'多源无感感知流 <span>→</span> 时序去噪与周期对齐 <span>→</span> 节律稳态建模 <span>→</span> 多维节律表征空间',
    detail:'在 CA-Gate 2.0 框架下，节律通道与隐因子通道联合构成高维辅助通路（f_aux）。当空间主干处于 0.30~0.70 灰色过渡带时，系统动态激活节律残差，为模糊案例提供精细的身心微调；而在极高危与极低危确定区间则由门控严格屏蔽，确保日常备考熬夜等良性波动绝不引起虚警。',
    factors:[
      {name:'指标 1 · 睡眠稳态与周期性 (Sleep Regularity)',load:'入睡时间点 · 唤醒时间点 · 睡眠时长方差',desc:'量化日常作息规律性，稳态节律是身心韧性的基石，节律崩溃往往早于自评量表显现'},
      {name:'指标 2 · 夜间数字唤醒 (Night Arousal)',load:'00:00–06:00 解锁频次 · 异常亮屏时长',desc:'直接反映深夜辗转反侧与负面反刍，是排查失眠困扰与急性情绪困境的高敏感线索'},
      {name:'指标 3 · 机能动力与步行活力 (Locomotion)',load:'静止时长占比 · 日均有效步数 · 出行活跃度',desc:'评估日间生理机能激活水平，重度退缩常伴随持续性静坐少动与日常机能钝化'},
      {name:'指标 4 · 数字沉浸与场景依赖 (Device Affinity)',load:'解锁频次峰值 · 各场景平均屏幕使用',desc:'刻画对移动终端的注意力依赖与逃避性沉溺，感知学生在学习与生活中的心理负荷'}
    ],
    action:'查看个体行为摘要',
    zone:'all'
  },
  spatial:{
    number:'02',
    title:'空间驻留与环境熵',
    factorTitle:'关键空间指征与行为退缩映射',
    lead:'校园活动足迹与物理空间退缩的黄金锚点',
    question:'为什么空间驻留与环境熵是心理危机预警中最核心的确定性指征？',
    description:'在临床心理学与高校行为干预中，“活动空间向心退缩（Activity Space Contraction）”与“社交退避”是最具特异性的黄金行为表征。本通道将校园划分为居住、学习、餐饮、社交与休闲五大功能区，提取 56 天连续驻留时序，通过香农信息熵（Shannon Entropy）精准刻画学生行为足迹的多样性与单一化趋势。空间数据信噪比极高，完全不受单一偶发事件扰动，构成了全系统最坚固的判别主干。',
    formula:'时空位置感知 <span>→</span> 五大功能区拓扑映射 <span>→</span> 宿舍滞留率 & 空间香农熵 <span>→</span> 空间主干置信锚点',
    detail:'严密 50 折交叉验证评测表明：空间单通道独立 ROC-AUC 高达 0.632 ± 0.079，基准判别力遥遥领先。CA-Gate 2.0 算法将其确立为全系统的基准锚点（f_space），输出核心先验置信度；极高危样本由空间信号直接锁定最高预警，彻底奠定了系统预警的高准确率与抗噪底座。',
    factors:[
      {name:'指征 1 · 宿舍极度滞留率 (Dormitory Confinement)',load:'居住区驻留时长 · 24小时滞留占比',desc:'最核心的危机先验信号，长期严重闭门不出是抑郁退缩与社会功能受损的特异性黄金指标'},
      {name:'指征 2 · 空间环境香农熵 (Spatial Shannon Entropy)',load:'五类功能区时长分布多样性 H(X)',desc:'量化生活轨迹丰富度，熵值持续走低精准表征生活圈狭窄化与心理资源枯竭'},
      {name:'指征 3 · 校园行动回旋半径 (Radius of Gyration)',load:'日常位移最远跨度 · 校园空间坐标方差',desc:'数学量化物理行动疆域的收缩幅度，直观揭示学生行动范围向宿舍单点的向心收敛'},
      {name:'指征 4 · 功能区拓扑转移熵 (Zone Transition Entropy)',load:'居住-学习-餐饮跨区流转频次',desc:'反映课业履行、规律饮食与日常校园参与的主动性，为早期干预提供清晰的行为线索'}
    ],
    action:'查看学习地点的真实观测',
    zone:'study'
  },
  latent:{
    number:'03',
    title:'行为隐因子',
    factorTitle:'四维正交隐因子解构与行为映射',
    lead:'高维共线性行为的低秩降维与正交表征',
    question:'如何从 20+ 项交织的日常感知中，提炼出可泛化的核心行为基？',
    description:'学生日常被动感知的步数、屏幕交互、多场景停留及作息节律具有显著的高维共线性与日常扰动。若直接堆叠全部原始特征，极易引发维度灾难并冲垮判别面。本通道严格在各训练折内执行 Z-Score 标准化，利用无监督截断奇异值分解（TruncatedSVD, Rank=4）将协方差空间收束为 4 个相互正交的潜在基底，分别捕获：总体行为活力、昼夜节律漂移、场景规避沉溺与位移离散度。',
    formula:'20+维感知特征 <span>→</span> 折内正规化 <span>→</span> 截断 SVD (Rank=4) <span>→</span> 正交潜在空间',
    detail:'严格 50 折独立验证评估：单隐因子通道独立判别力达 ROC-AUC 0.581 ± 0.075。在 CA-Gate 2.0 框架下，隐因子通道并不作为孤立诊断，而是与节律特征合并为辅助表征通路（f_aux），在空间主干置信度处于 0.30~0.70 模糊过渡带时，注入全局行为残差进行协同校准；在确定区间则被门控严格屏蔽以杜绝噪声干扰。',
    factors:[
      {name:'因子 1 · 行为总活力 (Vitality)',load:'静止时长(-) · 步行时长(+) · 日间交互频次(+)',desc:'表征整体日常活动体量与身心能量，敏锐捕获抑郁状态下的行为迟滞与日常动能衰退'},
      {name:'因子 2 · 昼夜节律漂移 (Circadian)',load:'夜间解锁(+) · 入睡时间延迟(+) · 睡眠时长方差(+)',desc:'量化作息紊乱与夜间反刍式使用，识别昼夜时钟倒错与节律退行性波动'},
      {name:'因子 3 · 场景规避与沉溺 (Avoidance)',load:'宿舍屏幕使用(+) · 学习场景交互(-)',desc:'揭示学习功能区学业参与度的流失与在宿舍内的回避性数字依赖'},
      {name:'因子 4 · 空间位移熵 (Mobility Entropy)',load:'跨区转移频度(+) · 最大校园活动半径(+)',desc:'刻画校园日常行动半径的向心收缩与空间探索活动钝化，与空间滞留特征形成互补'}
    ],
    action:'查看输入行为摘要',
    zone:'all'
  },
  quality:{number:'04',title:'自适应门控研判',lead:'空间主干锚定，多模态自适应协同',question:'为什么不能把所有行为数据简单拼在一起？',description:'普通学生的熬夜与亮屏受日常备考与娱乐影响极大，若与空间滞留盲目相加，大量日常噪音会稀释退缩信号（老版直接拼接曾跌至 0.540）。CA-Gate 2.0 采用空间锚定自适应门控：高危区锁定空间退缩事实，常态区屏蔽起居噪音杜绝虚警，灰色带协同引入节律残差。',formula:'空间主干先验 <span>→</span> 自适应置信门控 <span>→</span> 多模态残差协同',detail:'严格 50 折独立验证评估证明：CA-Gate 2.0 达到 ROC-AUC 0.631（相对老版提升 +14.4%），Macro-F1 (0.572) 逆超空间单通道。筛查分数提供初筛线索，具体情况由辅导员核对真实驻留事实。',action:'查看研判队列',zone:'all'}
};
let previousHash='#home',returnHash='#home',returnScroll=0,currentMethod='spatial',directoryFilter='all',directorySearch='',directoryOpener=null;
function svg(body){return `<svg viewBox="0 0 300 200" role="img" aria-label="研究数据摘要">${body}</svg>`;}
function coverageFigure(){return svg(`<text x="22" y="35" fill="#68786d" font-size="12">五类地点驻留覆盖</text><text x="22" y="93" fill="#2d4939" font-size="48">${present.size}<tspan font-size="17" fill="#7a897e"> / ${students.length}</tspan></text><rect x="22" y="117" width="256" height="9" fill="#d7dfd8"/><rect x="22" y="117" width="${256*present.size/students.length}" height="9" fill="#4a6c59"/><text x="22" y="157" fill="#6d7a70" font-size="12">${missing} 人暂无五类地点正驻留记录</text>`);}
function distributionFigure(){
  const bins=Array(14).fill(0),highBins=Array(14).fill(0);students.forEach(s=>{const i=Math.min(13,Math.floor(s.score*14));bins[i]++;if(s.high)highBins[i]++;});const max=Math.max(...bins);
  return svg(`<text x="22" y="30" fill="#68786d" font-size="12">自适应门控预警分分布</text>${bins.map((n,i)=>`<rect x="${23+i*18}" y="${145-n/max*88}" width="13" height="${n/max*88}" fill="#9caaa1"/><rect x="${23+i*18}" y="${145-n/max*88}" width="13" height="${highBins[i]/max*88}" fill="#967da6"/>`).join('')}<line x1="22" y1="146" x2="278" y2="146" stroke="#aebcb2"/><text x="22" y="174" fill="#6d7a70" font-size="11">0.00</text><text x="220" y="174" fill="#6d7a70" font-size="11">1.00</text>`);
}
function studentFigure(index){
  const days=Array(14).fill(0);events.forEach(e=>{if(e[0]===index&&e[2]===1&&e[1]<=14)days[e[1]-1]+=e[3];});const max=Math.max(1,...days);
  return svg(`<text x="22" y="30" fill="#68786d" font-size="12">学习地点 · 前 14 个观察日</text>${days.map((n,i)=>`<rect x="${23+i*18}" y="${146-n/max*87}" width="12" height="${n/max*87}" fill="${i===0?'#477eaa':'#9fb9c9'}"/>`).join('')}${days.some(n=>n>0)?'':'<text x="150" y="96" text-anchor="middle" fill="#748077" font-size="12">暂无有效学习驻留记录</text>'}<line x1="22" y1="147" x2="278" y2="147" stroke="#b5c2c8"/><text x="22" y="173" fill="#6d7a70" font-size="11">D01</text><text x="246" y="173" fill="#6d7a70" font-size="11">D14</text>`);
}
function makeCard({eyebrow,meta,figure,title,body,action,attrs}){
  return `<a class="editorial-card" ${attrs}><div class="card-eyebrow"><span>${eyebrow}</span><span>${meta||''}</span></div><div class="card-figure">${figure}</div><h3>${title}</h3><p>${body}</p><span class="card-action">${action}${arrow}</span></a>`;
}
function renderOverview(){
  const cards=['GW-010','GW-023','GW-087','GW-005'].map(id=>{
    const index=students.findIndex(s=>s.id===id),s=students[index];
    const record=events.find(e=>e[0]===index&&e[1]===1&&e[2]===1);
    return makeCard({eyebrow:id,meta:'观测示例',figure:studentFigure(index),title:record?'核对第 1 天的学习记录':'查看完整观察期摘要',body:record?`当天学习地点驻留 ${record[3].toFixed(3)} 小时，观察窗内有效采集 ${s.sensingDays} 天。`:`有效采集 ${s.sensingDays} 天。查看五类地点驻留与行为摘要。`,action:'查看观测',attrs:`href="#observations/${id}"`});
  }).join('');
  $('overview').innerHTML=`<header class="editorial-head">${brand}<nav class="editorial-nav" aria-label="学生支持导航"><a href="#overview" aria-current="page">学生支持</a><a href="#observations">观测分析</a><a href="#home">研究架构</a><a href="#map">行为地图</a></nav><button class="outline-link" data-directory="all">浏览学生名单 ${arrow}</button></header>
  <div class="editorial-hero"><h1 tabindex="-1">学生支持总览</h1><div class="editorial-meta"><p>从群体观测出发，走近每一个具体的学生。</p><p>研究队列 <strong>${students.length}</strong> 人 <span aria-hidden="true">／</span> 观察窗 <strong>56</strong> 天 <span aria-hidden="true">／</span> 驻留记录 <strong>${events.length.toLocaleString('zh-CN')}</strong> 条</p></div></div>
  <section class="editorial-section" aria-labelledby="directivesTitle"><header><h2 id="directivesTitle">整体指导</h2><p>COHORT PERSPECTIVE</p></header><div class="editorial-grid">
  ${makeCard({eyebrow:'01 / 数据覆盖',figure:coverageFigure(),title:'核验感知覆盖，排查脱落盲区',body:`${present.size} 名学生有五类地点的有效正驻留记录，先核对其余 ${missing} 人的采集天数与设备状态，作为人工跟进客观基线`,action:`排查这 ${missing} 名学生`,attrs:'href="#overview" data-directory="missing"'})}
  ${makeCard({eyebrow:'02 / 智能研判',figure:distributionFigure(),title:'依托自适应门控，理解风险线索',body:`系统通过 CA-Gate 动态分流：高危区锁定空间退缩事实，模糊带协同起居节律，${high} 名学生触发重点关注`,action:'浏览重点关注组',attrs:'href="#overview" data-directory="high"'})}
  </div></section>
  <section class="editorial-section" aria-labelledby="individualTitle"><header><h2 id="individualTitle">个体观测</h2><p>INDIVIDUAL OBSERVATIONS</p><a href="#overview" data-directory="all">全部 ${students.length} 人 ↗</a></header><div class="editorial-grid">${cards}</div></section>
  <footer class="editorial-footer"><p>CES 队列多源感知实测 · 56 天长效时空追踪<br>CA-Gate 2.0 空间锚定自适应门控研判支撑，赋能高校精准学工与人机协同干预</p><a href="#research/quality">了解自适应门控技术架构 ↗</a></footer>`;
}
function nodeIcon(key){
 const paths={rhythm:'<path d="M3 20h7l4-10 6 21 5-16 4 5h8M6 7v29h31"/>',spatial:'<path d="M6 33V19h8v14m3 0V7h8v26m3 0V13h8v20M3 34h35"/><circle cx="10" cy="11" r="3"/>',latent:'<rect x="4" y="7" width="7" height="26"/><rect x="14" y="13" width="7" height="20"/><rect x="24" y="18" width="7" height="15"/><path d="M35 7v26"/>'};
 return `<svg viewBox="0 0 42 42" aria-hidden="true">${paths[key]}</svg>`;
}
function circuit(){
  let paths='';for(let i=0;i<7;i++){const x=45+i*43;paths+=`<path d="M${x} 300v-${65+i*20}l20-20v-45"/><circle cx="${x+20}" cy="${170-i*20}" r="5"/><path d="M${x-16} 300v-${30+i*13}l-20-20v-34"/>`;}
  return `<svg class="circuit-decoration" viewBox="0 0 370 300" fill="none" stroke="#7a8cd5" stroke-width="3" aria-hidden="true">${paths}</svg>`;
}
function network(){
 return `<div><div class="network" id="methodNetwork" data-selected="spatial"><svg class="network-art" viewBox="0 0 600 536" preserveAspectRatio="none" aria-hidden="true"><circle cx="300" cy="263" r="160" fill="none" stroke="#314861" stroke-dasharray="2 11"/><circle cx="300" cy="263" r="85" fill="none" stroke="#6687a8" stroke-width="1"/><circle cx="300" cy="263" r="94" fill="none" stroke="#516b8a" stroke-dasharray="90 18 12 30"/><path class="channel-line line-rhythm" stroke="#80bfba" d="M290 110V179M310 110V179"/><path class="channel-line line-spatial" stroke="#92a8fb" d="M150 386L238 306M162 397L249 318"/><path class="channel-line line-latent" stroke="#bc9bdf" d="M450 386L362 306M438 397L351 318"/><g fill="#7b93b2"><circle cx="128" cy="210" r="3"/><circle cx="475" cy="180" r="4"/><circle cx="397" cy="428" r="3"/><circle cx="210" cy="432" r="4"/><circle cx="180" cy="132" r="2"/><circle cx="428" cy="303" r="2"/><circle cx="75" cy="314" r="3"/></g></svg>
 ${['rhythm','spatial','latent'].map(k=>`<button class="network-node node-${k}" data-method="${k}" aria-pressed="false" aria-controls="methodCopy">${nodeIcon(k)}<span>${methodData[k].title}</span><small>CHANNEL ${methodData[k].number}</small></button>`).join('')}
 <button class="network-node node-quality" data-method="quality" aria-pressed="false" aria-controls="methodCopy"><small>CA-GATE 2.0</small><strong>自适应门控研判</strong><small>空间锚定 · 动态分流</small></button><span class="network-label label-rhythm">行为均值<br>节律特征</span><span class="network-label label-spatial">驻留分布<br>空间特征</span><span class="network-label label-latent">共同变化<br>四维表征</span></div><p class="network-caption">点选任一节点，查看输入、方法与观测</p></div>`;
}
function renderResearch(){
 $('researchPage').innerHTML=`<div class="research-mast">${circuit()}<div class="research-wrap"><header class="research-nav">${brand}<nav class="editorial-nav" aria-label="研究导航"><a href="#overview">学生支持</a><a href="#home">研究架构</a></nav><button class="outline-link" data-research-return>← 返回来源页面</button></header><div class="research-hero"><p class="eyebrow">BEHAVIOR · SPACE · REPRESENTATION</p><h1 tabindex="-1">三条通道，一份研究视角。</h1><div class="research-accent"></div><nav class="research-breadcrumb" aria-label="当前位置"><a href="#home">研究架构</a><span aria-hidden="true">›</span><span>方法展开</span><span aria-hidden="true">›</span><span id="methodBreadcrumb"></span></nav></div></div></div>
 <div class="research-wrap"><section class="method-section"><h2 class="method-title" id="methodTitle"></h2><div class="method-layout"><div class="method-copy" id="methodCopy"></div>${network()}</div><div class="method-tabs" aria-label="选择研究通道">${Object.entries(methodData).map(([key,m])=>`<button data-method="${key}" aria-pressed="false" aria-controls="methodCopy">${m.number} ${m.title}</button>`).join('')}</div></section>
 <section class="validation"><div><h2>同一验证口径，见证算法演进</h2><p>分层五折交叉验证，重复十次（共 50 折独立验证）<br>以下为跨验证折严格评测均值</p></div><div><table aria-label="模型验证结果"><thead><tr><th scope="col">实验配置</th><th scope="col">ROC-AUC</th><th scope="col">Macro-F1</th><th scope="col">机制说明</th></tr></thead><tbody><tr><td>原始全特征基线</td><td>0.521</td><td>0.495</td><td>特征无差别堆叠，受日常起居方差严重干扰</td></tr><tr><td>老版直接加权拼接</td><td>0.540</td><td>0.516</td><td>弱特征噪音稀释空间强信号（发生性能塌陷）</td></tr><tr><td>空间单通道主干</td><td>0.632</td><td>0.571</td><td>证实宿舍滞留与环境熵退缩为最特异黄金指征</td></tr><tr style="font-weight:600;color:#92a8fb"><td>★ CA-Gate 2.0 自适应门控</td><td>0.631</td><td>0.572</td><td>切断噪声通道，多模态协同突破单通道上限</td></tr></tbody></table><p class="validation-note">严格分层评估证明：CA-Gate 2.0 成功攻克多模态稀释难题，召回率达 64.2%，结合辅导员工作台实现人机研判闭环</p></div></section>
 <footer class="research-bottom"><span>研究观察窗 D01–D56 · CES 匿名队列</span><a href="#overview">回到学生支持总览 ↗</a></footer></div>`;
}
function selectMethod(key){
 currentMethod=methodData[key]?key:'spatial';const m=methodData[currentMethod];const context=returnHash.startsWith('#map')?window.AtlasNavigation?.context():returnHash.startsWith('#observations')?window.ObservationView.context():null;
 $('methodTitle').textContent=m.title;$('methodBreadcrumb').textContent=m.title;$('methodNetwork').dataset.selected=currentMethod;
 const factorHtml=m.factors?`<div class="latent-factors" aria-label="核心维度解构"><h4 class="latent-factors-title">${m.factorTitle||'核心维度解构与行为映射'}</h4><div class="latent-factor-grid">${m.factors.map(f=>`<div class="latent-factor-card"><div class="factor-header"><strong>${f.name}</strong></div><p class="factor-load"><strong>特征载荷：</strong>${f.load}</p><p class="factor-desc">${f.desc}</p></div>`).join('')}</div></div>`:'';
 $('methodCopy').innerHTML=`<p class="method-number">${m.number} / ${currentMethod==='quality'?'SPATIAL-ANCHORED CA-GATE':'RESEARCH CHANNEL'}</p><h3>${m.lead}</h3><p class="method-question">${m.question}</p><p>${m.description}</p><div class="method-formula">${m.formula}</div>${factorHtml}<p>${m.detail}</p><button class="research-cta" data-method-observations>${context?.student?'查看 '+context.student.id+' 的相关观测':m.action}${arrow}</button><p class="research-context">${context?.student?`当前匿名学生 ${context.student.id} · 筛查预警分 ${context.student.score.toFixed(3)} · 有效采集 ${context.student.sensingDays} 天`:'三通道多维协同感知，为学工老师提供全面、客观、立体的学生日常行为研判视角。'}</p>`;
 document.querySelectorAll('[data-method]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.method===currentMethod)));
}
function directoryRows(){
 const list=students.map((s,i)=>({s,i})).filter(({s,i})=>(directoryFilter==='all'||directoryFilter==='high'&&s.high||directoryFilter==='missing'&&!present.has(i))&&s.id.toLowerCase().includes(directorySearch.toLowerCase().trim()));
 $('directoryCount').textContent=`当前 ${list.length} 人 · 按匿名编号排列`;
 $('directoryRows').innerHTML=list.length?list.map(({s,i})=>`<tr><td>${s.id}</td><td>${s.score.toFixed(3)}</td><td>${s.sensingDays} 天</td><td>${present.has(i)?'有记录':'无有效记录'}</td><td><button data-open-student="${s.id}">查看 ↗</button></td></tr>`).join(''):'<tr><td colspan="5">没有匹配的匿名编号</td></tr>';
 $('studentDirectory').querySelectorAll('[data-directory-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.directoryFilter===directoryFilter)));
}
function openDirectory(filter){
 directoryFilter=filter;directorySearch='';directoryOpener=document.activeElement;
 $('studentDirectory').innerHTML=`<header class="directory-head"><h2>研究队列 · 学生名单</h2><button data-close-directory aria-label="关闭学生名单">×</button></header><div class="directory-tools"><button data-directory-filter="all">全部 ${students.length}</button><button data-directory-filter="high">高分组 ${high}</button><button data-directory-filter="missing">无驻留 ${missing}</button><input id="directorySearch" placeholder="搜索匿名编号" aria-label="搜索匿名学生编号"></div><p class="directory-count" id="directoryCount"></p><div class="directory-table-wrap"><table><thead><tr><th scope="col">匿名编号</th><th scope="col">筛查分数</th><th scope="col">有效采集</th><th scope="col">五类驻留</th><th scope="col">观测</th></tr></thead><tbody id="directoryRows"></tbody></table></div><p class="directory-note">支持按预警分级与感知完整度快速筛选，便于辅导员全面掌握学生动态并开展分层分级关怀</p>`;
 directoryRows();$('studentDirectory').showModal();$('directorySearch').focus();
}
function route(){
 if($('studentDirectory').open)$('studentDirectory').close();
 const parts=location.hash.slice(1).split('/');const overview=parts[0]==='overview',research=parts[0]==='research';
 if(research&&!previousHash.startsWith('#research')){returnHash=previousHash;returnScroll=window.scrollY;}
 previousHash=location.hash||'#home';
 $('overview').hidden=!overview;$('researchPage').hidden=!research;
 if(overview||research){document.body.style.background=research?'#142034':'#fff';document.title=overview?'学生支持总览 · 观微':'三通道研究方法 · 观微';if(research)selectMethod(parts[1]);window.scrollTo(0,0);}
 return overview||research;
}
window.Workbench={route,openMethod(key){if(!location.hash.startsWith('#research')){returnHash=location.hash||'#home';returnScroll=window.scrollY;}if($('dialog').open)$('dialog').close();location.hash='research/'+key;}};
document.body.insertAdjacentHTML('beforeend','<main id="overview" class="editorial" hidden></main><main id="researchPage" class="research-page" hidden></main><dialog id="studentDirectory" class="directory-dialog" aria-label="研究队列学生名单"></dialog>');
renderOverview();renderResearch();
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-directory],[data-directory-filter],[data-close-directory],[data-open-student],[data-method],[data-method-observations],[data-research-return]');if(!b)return;
 const d=b.dataset;e.preventDefault();
 if(d.directory){openDirectory(d.directory);return;}
 if(d.directoryFilter){directoryFilter=d.directoryFilter;directoryRows();return;}
 if('closeDirectory'in d){$('studentDirectory').close();return;}
 if(d.openStudent){if($('studentDirectory').open)$('studentDirectory').close();window.AtlasNavigation.openStudent(d.openStudent);return;}
 if(d.method){history.replaceState(null,'','#research/'+d.method);selectMethod(d.method);return;}
 if('researchReturn'in d){location.hash=returnHash;requestAnimationFrame(()=>window.scrollTo(0,returnScroll));return;}
 if('methodObservations'in d){const context=returnHash.startsWith('#map')?window.AtlasNavigation.context():returnHash.startsWith('#observations')?window.ObservationView.context():{};if(context.student){if(returnHash.startsWith('#observations'))location.hash=returnHash;else window.AtlasNavigation.resume();}else if(currentMethod==='quality'){openDirectory('all');}else if(currentMethod==='spatial'){location.hash='observations';}else{openDirectory('all');}}
});
document.addEventListener('input',e=>{if(e.target.id==='directorySearch'){directorySearch=e.target.value;directoryRows();}});
$('studentDirectory').addEventListener('click',e=>{if(e.target===$('studentDirectory')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();}});
$('studentDirectory').addEventListener('close',()=>directoryOpener?.focus());
})();
