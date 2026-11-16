(() => {
  "use strict";

  const T = window.THREE;
  const data = window.PREVIEW_DATA;
  const records = [...data.records].sort((a, b) => (b.scoreExact ?? b.score) - (a.scoreExact ?? a.score));
  const names = { red: "高分区间", orange: "中分区间", green: "常态观察" };
  const colors = { red: 0x292929, orange: 0x777777, green: 0xb9b9b9 };
  const filters = { red: "high", orange: "medium", green: "normal" };
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const pending = new Map();
  const active = new Set();
  let sequence = 0;
  const modules = [
    { id: "population", name: "群体分布", type: "globe", position: [0, 0, 0], value: "209 份匿名记录", description: "看看每份记录在群体中的位置", kind: "analysis", target: "population" },
    { id: "scores", name: "分数分布", type: "bars", position: [-4.1, 0, -2.1], value: "76 份进入关注区间", description: "按分数区间查看人数和名单", kind: "analysis", target: "distribution" },
    { id: "behavior", name: "行为分布", type: "waves", position: [0, 0, -3.5], value: "3 项行为指标", description: "对照居住、学习和夜间点亮记录", kind: "analysis", target: "behavior" },
    { id: "research", name: "研究说明", type: "orbit", position: [4.1, 0, -2.1], value: "3 个方案对照", description: "了解数据来源和模型结果", kind: "page", target: "research" },
    { id: "quality", name: "数据质量", type: "shield", position: [-4.1, 0, 2.1], value: "199 份记录充分", description: "先确认采集记录是否足够", kind: "analysis", target: "quality" },
    { id: "profile", name: "个案画像", type: "person", position: [0, 0, 3.5], value: "从一份记录开始", description: "查看行为画像，再记录下一步", kind: "case", target: data.metadata.showcaseUid },
    { id: "care", name: "跟进流程", type: "flow", position: [4.1, 0, 2.1], value: "4 个演练阶段", description: "查看待复核、沟通和跟进进度", kind: "page", target: "overview" }
  ];
  const number = (value, digits = 3) => Number(value).toFixed(digits);
  const send = (kind, value) => document.dispatchEvent(new CustomEvent("workbench:navigate", { detail: { kind, value } }));
  const vector = values => new T.Vector3(...values);
  const material = (color = 0xeeeeee, extra = {}) => new T.MeshStandardMaterial({ color, roughness: .42, metalness: .18, ...extra });
  const basic = (color, opacity = 1) => new T.MeshBasicMaterial({ color, transparent: opacity < 1, opacity, depthWrite: opacity === 1, side: T.DoubleSide });

  function mesh(parent, geometry, mat, position = [0, 0, 0]) {
    const object = new T.Mesh(geometry, mat);
    object.position.set(...position);
    parent.add(object);
    return object;
  }

  function box(parent, size, position, color = 0xe9e9e9) {
    const object = mesh(parent, new T.BoxGeometry(...size), material(color), position);
    const outline = new T.LineSegments(new T.EdgesGeometry(object.geometry), new T.LineBasicMaterial({ color: 0x8c8c8c, transparent: true, opacity: .28 }));
    object.add(outline);
    return object;
  }

  function line(parent, points, color = 0x8c8c8c, opacity = .6) {
    const geometry = new T.BufferGeometry().setFromPoints(points.map(vector));
    const object = new T.Line(geometry, new T.LineBasicMaterial({ color, transparent: true, opacity }));
    parent.add(object);
    return object;
  }

  function tube(parent, points, radius = .035, color = 0x777777) {
    const curve = new T.CatmullRomCurve3(points.map(vector));
    return mesh(parent, new T.TubeGeometry(curve, 40, radius, 6, false), material(color));
  }

  function text(parent, value, position, size = .28, color = "#5d5d5d") {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = 768;
    canvas.height = 128;
    context.font = '80px "Microsoft YaHei", sans-serif';
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = color;
    context.fillText(value, 384, 64);
    const texture = new T.CanvasTexture(canvas);
    texture.colorSpace = T.SRGBColorSpace;
    const sprite = new T.Sprite(new T.SpriteMaterial({ map: texture, depthTest: false, transparent: true }));
    sprite.position.set(...position);
    sprite.scale.set(size * 6, size, 1);
    parent.add(sprite);
    return sprite;
  }

  function ring(parent, radius, thickness, color, position = [0, 0, 0], arc = Math.PI * 2) {
    return mesh(parent, new T.TorusGeometry(radius, thickness, 8, 72, arc), material(color), position);
  }

  function pedestal(parent, radius = 1.15) {
    mesh(parent, new T.CylinderGeometry(radius, radius, .14, 48), material(0xf5f5f5), [0, -.02, 0]);
    mesh(parent, new T.CylinderGeometry(radius * .94, radius, .08, 48), material(0xc8c8c8), [0, -.12, 0]);
    const halo = mesh(parent, new T.RingGeometry(radius + .07, radius + .10, 64), basic(0x343434, .14), [0, .07, 0]);
    halo.rotation.x = -Math.PI / 2;
    return halo;
  }

  function platform(parent, width = 12.9, depth = 9.7) {
    box(parent, [width, .27, depth], [0, -.43, 0], 0xd8d8d8);
    box(parent, [width + .16, .10, depth + .16], [0, -.63, 0], 0xebebeb);
    box(parent, [width - .1, .05, depth - .1], [0, -.27, 0], 0xf7f7f7);
    const grid = new T.GridHelper(width - .25, 20, 0xb5b5b5, 0xdadada);
    grid.position.y = -.23;
    grid.scale.z = depth / width;
    grid.material.transparent = true;
    grid.material.opacity = .5;
    parent.add(grid);
  }

  function miniature(type, parent) {
    const bright = material(0xf7f7f7);
    const dark = material(0x535353);
    if (type === "globe") {
      const cage = mesh(parent, new T.SphereGeometry(.95, 20, 12), material(0x888888, { wireframe: true, transparent: true, opacity: .14 }), [0, 1.18, 0]);
      cage.scale.y = 1.05;
      records.forEach((record, index) => {
        const phi = Math.acos(1 - 2 * (index + .5) / records.length);
        const theta = index * Math.PI * (3 - Math.sqrt(5));
        const radius = .89 + (record.scoreExact ?? record.score) * .17;
        mesh(parent, new T.SphereGeometry(record.tier === "red" ? .055 : .035, 7, 5), material(colors[record.tier]), [radius * Math.sin(phi) * Math.cos(theta), 1.18 + radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta)]);
      });
      const orbit = ring(parent, 1.13, .018, 0x777777, [0, 1.18, 0]);
      orbit.rotation.x = 1.1;
      orbit.rotation.y = .4;
    } else if (type === "bars") {
      const bins = Array.from({ length: 10 }, (_, index) => records.filter(record => Math.min(9, Math.floor((record.scoreExact ?? record.score) * 10)) === index).length);
      bins.forEach((value, index) => {
        const height = .15 + value / 49 * 1.35;
        box(parent, [.14, height, .4], [(index - 4.5) * .18, height / 2 + .15, 0], index >= 7 ? 0x454545 : index >= 5 ? 0x898989 : 0xc4c4c4);
      });
    } else if (type === "waves") {
      ["residence_hours_daily", "study_hours_daily", "night_unlock_times"].forEach((key, index) => {
        const values = records.map(record => record.behavior[key]).sort((a, b) => a - b);
        const maximum = Math.max(...values);
        const points = Array.from({ length: 13 }, (_, n) => [-.85 + n / 12 * 1.7, .25 + values[Math.round(n / 12 * (values.length - 1))] / maximum * 1.25, (index - 1) * .5]);
        tube(parent, points, .045, [0xbebebe, 0x565656, 0x969696][index]);
        points.filter((_, n) => n % 3 === 0).forEach(point => mesh(parent, new T.SphereGeometry(.065, 8, 6), bright, point));
      });
      line(parent, [[-.95, .15, -.7], [-.95, .15, .7], [.95, .15, .7]]);
    } else if (type === "orbit") {
      [0, 1, 2].forEach(index => {
        const object = ring(parent, .84, .065, [0xc7c7c7, 0x727272, 0xb0b0b0][index], [0, 1.1, 0]);
        object.rotation.set(index * .8, index * .9, .3);
      });
      mesh(parent, new T.IcosahedronGeometry(.38, 0), dark, [0, 1.1, 0]);
    } else if (type === "shield") {
      const core = box(parent, [.85, 1.1, .24], [0, .95, 0], 0xeeeeee);
      core.rotation.z = Math.PI / 4;
      tube(parent, [[-.35, .98, .3], [-.08, .72, .3], [.45, 1.35, .3]], .07, 0x595959);
      const frame = ring(parent, 1.02, .028, 0x9b9b9b, [0, 1.0, 0]);
      frame.rotation.y = .45;
      [0, 1, 2].forEach(index => box(parent, [.36, .08, .65], [(index - 1) * .42, .25, .15], 0xd0d0d0));
    } else if (type === "person") {
      mesh(parent, new T.SphereGeometry(.3, 24, 16), bright, [0, 1.45, .1]);
      mesh(parent, new T.CylinderGeometry(.28, .48, .7, 24), bright, [0, .78, .1]);
      const card = box(parent, [1.2, 1.5, .10], [0, .95, -.35], 0xbebebe);
      card.rotation.y = -.2;
      [0, 1, 2].forEach(index => box(parent, [.55 - index * .09, .025, .025], [.12, 1.45 - index * .19, -.265], 0x666666));
    } else {
      const points = [[-.7, .45, .15], [0, 1.4, -.1], [.7, .7, .1]];
      tube(parent, [points[0], [-.45, 1.1, .1], points[1], [.45, 1.35, .05], points[2]], .065, 0x989898);
      points.forEach((point, index) => {
        mesh(parent, new T.IcosahedronGeometry(.24, index === 1 ? 1 : 0), index === 1 ? dark : bright, point);
        const base = ring(parent, .29, .022, 0x8c8c8c, [point[0], .19, point[2]]);
        base.rotation.x = Math.PI / 2;
      });
    }
  }

  class View {
    constructor(element, type, config) {
      this.element = element;
      this.type = type;
      this.config = config;
      this.root = new T.Group();
      this.scene = new T.Scene();
      this.scene.add(this.root);
      this.scene.background = new T.Color(type === "home" ? 0xf3f3f1 : 0xfafafa);
      this.scene.add(new T.HemisphereLight(0xffffff, 0x8c8c8c, 2.8));
      const key = new T.DirectionalLight(0xffffff, 3.2);
      key.position.set(-7, 12, 8);
      this.scene.add(key);
      const fill = new T.DirectionalLight(0xffffff, 1.2);
      fill.position.set(8, 5, -8);
      this.scene.add(fill);
      this.camera = new T.OrthographicCamera(-8, 8, 6, -6, .1, 100);
      this.camera.position.set(11, 14, 18);
      this.camera.lookAt(0, type === "home" ? .2 : 1.0, 0);
      this.renderer = new T.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "low-power", preserveDrawingBuffer: true });
      this.renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
      this.renderer.outputColorSpace = T.SRGBColorSpace;
      this.renderer.toneMapping = T.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = .92;
      this.renderer.domElement.setAttribute("aria-label", type === "home" ? "可拖动旋转的 3D 功能展台" : "可拖动旋转的 3D 图表");
      this.renderer.domElement.setAttribute("role", "img");
      this.renderer.domElement.tabIndex = 0;
      element.querySelector(".scene-canvas").append(this.renderer.domElement);
      this.raycaster = new T.Raycaster();
      this.pointer = new T.Vector2();
      this.objects = [];
      this.models = [];
      this.labels = [];
      this.paused = motion.matches;
      this.inside = false;
      this.dragging = false;
      this.angle = type === "home" ? -.18 : -.12;
      this.tilt = 0;
      this.zoom = 1;
      this.hovered = null;
      this.elapsed = 0;
      this.resizeObserver = new ResizeObserver(() => this.resize());
      this.resizeObserver.observe(element);
      this.build();
      this.bind();
      this.resize();
      this.element.dataset.sceneReady = "true";
      this.element.dataset.sceneType = type;
      this.syncPause();
      active.add(this);
    }

    resize() {
      const { width, height } = this.element.querySelector(".scene-canvas").getBoundingClientRect();
      if (!width || !height) return;
      const aspect = width / height;
      const extent = this.type === "home" ? Math.max(4.9, 8.2 / aspect) : Math.max(3.8, 4.8 / aspect);
      this.camera.left = -extent * aspect;
      this.camera.right = extent * aspect;
      this.camera.top = extent;
      this.camera.bottom = -extent;
      this.camera.zoom = this.zoom;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height, false);
    }

    resetView() {
      this.angle = this.type === "home" ? -.18 : -.12;
      this.tilt = 0;
      this.zoom = 1;
      this.models.forEach(model => model.model.rotation.set(0, 0, 0));
      if (this.type === "home") this.focusModule(null);
      this.resize();
    }

    pick(object, info, action) {
      object.userData.info = info;
      object.userData.action = action;
      this.objects.push(object);
      return object;
    }

    build() {
      if (this.type === "home") return this.home();
      if (this.type === "distribution") return this.distribution();
      if (this.type === "scatter") return this.scatter();
      if (this.type === "quality") return this.quality();
      if (this.type === "care") return this.care();
      if (this.type === "research") return this.research();
      if (this.type === "deviation") return this.deviation();
    }

    home() {
      platform(this.root);
      modules.forEach((module, index) => {
        const anchor = new T.Group();
        anchor.position.set(...module.position);
        this.root.add(anchor);
        const halo = pedestal(anchor, module.id === "population" ? 1.45 : 1.10);
        const model = new T.Group();
        anchor.add(model);
        miniature(module.type, model);
        const proxy = mesh(anchor, new T.CylinderGeometry(1.02, 1.02, 2.25, 16), basic(0xffffff, 0), [0, 1.05, 0]);
        this.pick(proxy, module, () => send(module.kind, module.target));
        const button = this.element.querySelector(`[data-module="${module.id}"]`);
        button.addEventListener("pointerenter", () => this.focusModule(module.id));
        button.addEventListener("pointerleave", () => this.focusModule(null));
        button.addEventListener("focus", () => this.focusModule(module.id, true));
        button.addEventListener("blur", () => this.focusModule(null, true));
        button.addEventListener("click", () => send(module.kind, module.target));
        this.models.push({ id: module.id, anchor, model, halo, phase: index * 1.13, lift: 0, velocity: 0 });
        this.labels.push({ button, anchor, offset: new T.Vector3(0, -.15, .3) });
        if (index) {
          const [x, , z] = module.position;
          tube(this.root, [[x, -.18, z], [x * .58, -.18, z * .85], [0, -.18, 0]], .012, 0xb9b9b9);
        }
      });
      const particles = [];
      for (let index = 0; index < 70; index++) {
        const x = Math.sin(index * 61.7) * 6;
        const z = Math.cos(index * 23.1) * 4.3;
        particles.push(x, .2 + (Math.sin(index * 7.9) + 1) * 1.25, z);
      }
      const geometry = new T.BufferGeometry();
      geometry.setAttribute("position", new T.Float32BufferAttribute(particles, 3));
      this.particles = new T.Points(geometry, new T.PointsMaterial({ color: 0x999999, size: .025, transparent: true, opacity: .35, depthWrite: false }));
      this.root.add(this.particles);
      this.defaultInfo();
    }

    floor(width = 8, depth = 4) {
      box(this.root, [width, .12, depth], [0, -.12, 0], 0xe7e7e7);
      const grid = new T.GridHelper(width, 10, 0xc8c8c8, 0xe0e0e0);
      grid.scale.z = depth / width;
      grid.position.y = -.045;
      this.root.add(grid);
    }

    distribution() {
      this.floor(8.5, 3.1);
      const bins = Array.from({ length: 10 }, (_, index) => records.filter(record => Math.min(9, Math.floor((record.scoreExact ?? record.score) * 10)) === index).length);
      bins.forEach((value, index) => {
        const height = Math.max(.07, value / 50 * 3.6);
        const x = (index - 4.5) * .72;
        const object = box(this.root, [.48, height, .7], [x, height / 2, 0], index >= 7 ? 0x414141 : index >= 5 ? 0x858585 : 0xbababa);
        this.pick(object, { name: `${number(index / 10, 1)}–${number((index + 1) / 10, 1)} 分`, value: `${value} 人`, description: "点击查看这个分数段的名单" }, () => send("bin", String(index)));
        text(this.root, String(value), [x, height + .23, 0], .28, "#333333");
        text(this.root, number(index / 10, 1), [x, .02, 1.0], .22);
      });
      text(this.root, "分数", [0, -.03, 1.65], .26);
      [0, 10, 20, 30, 40, 50].forEach(value => {
        line(this.root, [[-3.9, value / 50 * 3.6, -.65], [3.8, value / 50 * 3.6, -.65]], 0xc9c9c9, .5);
        text(this.root, String(value), [-4.15, value / 50 * 3.6, -.65], .22);
      });
      this.defaultInfo("分数分布", "柱高表示人数，点击柱形查看名单");
    }

    scatter() {
      this.floor(8.1, 4.6);
      const key = this.config.metric || "residence_hours_daily";
      const depthKey = key === "night_unlock_times" ? "residence_hours_daily" : "night_unlock_times";
      const maximum = Math.max(...records.map(record => record.behavior[key]));
      const depthMaximum = Math.max(...records.map(record => record.behavior[depthKey]));
      const labels = { residence_hours_daily: "居住驻留", study_hours_daily: "学习驻留", night_unlock_times: "夜间点亮" };
      const sphere = new T.SphereGeometry(.065, 10, 8);
      records.forEach(record => {
        const point = mesh(this.root, sphere, material(colors[record.tier]), [(record.scoreExact ?? record.score) * 7 - 3.5, record.behavior[key] / maximum * 3.8 + .12, record.behavior[depthKey] / depthMaximum * 3.4 - 1.7]);
        if (record.uid === this.config.selected) point.scale.setScalar(1.8);
        this.pick(point, { name: record.uid, value: `${names[record.tier]} · ${number(record.score)} 分`, description: `${labels[key]} ${number(record.behavior[key], 2)} · ${labels[depthKey]} ${number(record.behavior[depthKey], 2)}` }, () => {
          if (this.selectedPoint) this.selectedPoint.scale.setScalar(1);
          point.scale.setScalar(1.8);
          this.selectedPoint = point;
          document.dispatchEvent(new CustomEvent("workbench:record", { detail: record.uid }));
        });
        if (record.uid === this.config.selected) this.selectedPoint = point;
      });
      line(this.root, [[-3.7, 0, 1.9], [3.7, 0, 1.9]]);
      line(this.root, [[-3.7, 0, 1.9], [-3.7, 4.2, 1.9]]);
      line(this.root, [[-3.7, 0, 1.9], [-3.7, 0, -2.1]]);
      text(this.root, "分数 0 → 1", [0, -.04, 2.35], .25);
      text(this.root, `${labels[key]} 0–${number(maximum, 1)}`, [-3.6, 4.45, 1.8], .25);
      text(this.root, `${labels[depthKey]} 0–${number(depthMaximum, 1)}`, [-3.7, -.1, -2.45], .23);
      this.defaultInfo("行为分布", "拖动查看不同角度，点击圆点选择记录");
    }

    quality() {
      this.floor(8.2, 4.2);
      const left = [{ key: "HIGH_CONFIDENCE", label: "记录充分", position: [-2.9, 2.6, -.6], filter: "qualityHigh" }, { key: "MEDIUM_CONFIDENCE", label: "基本可用", position: [-2.9, .7, .8], filter: "quality" }];
      const right = ["red", "orange", "green"].map((key, index) => ({ key, label: names[key], position: [2.9, 3.1 - index * 1.15, index * .45 - .45] }));
      left.forEach(source => {
        const value = records.filter(record => record.quality === source.key).length;
        const object = mesh(this.root, new T.IcosahedronGeometry(.36, 1), material(source.key === "HIGH_CONFIDENCE" ? 0x777777 : 0xb9b9b9), source.position);
        text(this.root, `${source.label} ${value}`, [source.position[0], source.position[1] + .65, source.position[2]], .27);
        this.pick(object, { name: source.label, value: `${value} 人`, description: "点击查看对应质量的记录" }, () => send("filter", source.filter));
        right.forEach(target => {
          const total = records.filter(record => record.quality === source.key && record.tier === target.key).length;
          if (!total) return;
          const a = source.position;
          const b = target.position;
          const object = tube(this.root, [a, [-1.1, a[1], a[2] - .35], [1.1, b[1], b[2] + .35], b], Math.sqrt(total) * .018 + .014, colors[target.key]);
          this.pick(object, { name: `${source.label} · ${target.label}`, value: `${total} 人`, description: "点击查看这组交叉名单" }, () => send("cross", `${target.key}:${source.key}`));
        });
      });
      right.forEach(target => {
        const total = records.filter(record => record.tier === target.key).length;
        const object = mesh(this.root, new T.SphereGeometry(.29, 18, 14), material(colors[target.key]), target.position);
        text(this.root, `${target.label} ${total}`, [target.position[0], target.position[1] + .55, target.position[2]], .27);
        this.pick(object, { name: target.label, value: `${total} 人`, description: "点击查看这个区间的记录" }, () => send("filter", filters[target.key]));
      });
      this.defaultInfo("采集质量", "线管粗细表示交叉人数，点击查看名单");
    }

    care() {
      this.floor(8.2, 4.5);
      const stages = Object.entries(this.config.stages);
      const points = stages.map(([, info], index) => [Math.cos(Math.PI * .8 - index * 1.25) * 2.65, .7 + index * .12, Math.sin(Math.PI * .8 - index * 1.25) * 1.3]);
      points.forEach((point, index) => {
        const [stage, info] = stages[index];
        const group = new T.Group();
        group.position.set(...point);
        this.root.add(group);
        const total = this.config.counts[stage] || 0;
        const object = mesh(group, new T.CylinderGeometry(.56, .67, .24, 40), material(total ? 0x727272 : 0xc9c9c9));
        ring(group, .48, .04, 0xe4e4e4, [0, .3, 0]).rotation.x = Math.PI / 2;
        text(group, String(total), [0, .8, 0], .4, "#333333");
        text(group, info.label, [0, -.35, .35], .28);
        this.pick(object, { name: info.label, value: `${total} 份记录`, description: info.description }, () => send("stage", stage));
        if (index < 3) tube(this.root, [point, [(point[0] + points[index + 1][0]) / 2, 1.3, (point[2] + points[index + 1][2]) / 2], points[index + 1]], .045, 0xb1b1b1);
      });
      this.defaultInfo("跟进流程", "点击阶段查看本次演练的记录");
    }

    research() {
      this.floor(8.2, 4.1);
      const variants = [["baseline_25", "原始特征"], ["fusion_all_weighted", "融合方案"], ["ch2_spatial", "空间单通道"]];
      variants.forEach(([variant, label], index) => {
        const value = data.repeatedMetrics.find(item => item.variant === variant).roc_auc_mean;
        const group = new T.Group();
        group.position.set((index - 1) * 2.5, 1.4, 0);
        group.rotation.y = index * .2 - .2;
        this.root.add(group);
        ring(group, .84, .035, 0xd3d3d3);
        const object = ring(group, .84, .09, index === 1 ? 0x414141 : 0x858585, [0, 0, 0], Math.PI * 2 * value);
        object.rotation.z = Math.PI / 2;
        mesh(group, new T.IcosahedronGeometry(.25, index), material(0xb8b8b8));
        text(group, number(value), [0, -.02, .18], .32, "#262626");
        text(group, label, [0, -1.25, .2], .29);
        this.pick(object, { name: label, value: `ROC-AUC ${number(value)}`, description: "重复实验均值，完整指标见下方表格" }, () => {});
      });
      this.defaultInfo("模型对照", "圆环长度表示 ROC-AUC，整圈为 1");
    }

    deviation() {
      this.floor(7.4, 4.1);
      const items = this.config.items;
      const bound = Math.max(3, ...items.map(item => Math.ceil(Math.abs(item.z))));
      const axes = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
      const center = [0, 1.8, 0];
      mesh(this.root, new T.SphereGeometry(.12, 16, 10), material(0x444444), center);
      items.forEach((item, index) => {
        const axis = axes[index];
        const a = center.map((value, n) => value - axis[n] * 1.6);
        const b = center.map((value, n) => value + axis[n] * 1.6);
        line(this.root, [a, b], 0xb9b9b9);
        const point = center.map((value, n) => value + axis[n] * item.z / bound * 1.6);
        tube(this.root, [center, point.map((value, n) => (value + center[n]) / 2), point], .04, 0x777777);
        const object = mesh(this.root, new T.SphereGeometry(.12, 16, 10), material([0x444444, 0x888888, 0xaaaaaa][index]), point);
        text(this.root, `${item.short} ${item.z > 0 ? "+" : ""}${number(item.z, 2)}`, b.map((value, n) => value + axis[n] * .4), .27);
        this.pick(object, { name: item.short, value: `${item.z > 0 ? "+" : ""}${number(item.z, 2)} 个标准差`, description: "中心点是队列均值，沿轴查看偏离方向" }, () => {});
      });
      text(this.root, "队列均值", [0, 1.4, 0], .24);
      this.defaultInfo("行为差异", "三根轴分别表示三项行为，中心是队列均值");
    }

    defaultInfo(name, description) {
      this.updateInfo(this.type === "home" ? { name: "从一个模块开始", value: "7 个入口 · 同一批研究数据", description: "移到模型上查看介绍，点击进入详情" } : { name, description, value: "拖动旋转 · 滚轮缩放" });
    }

    updateInfo(info) {
      const panel = this.element.querySelector(".scene-info");
      if (!panel || !info) return;
      panel.querySelector(".scene-info-title").textContent = info.name || "";
      panel.querySelector(".scene-info-value").textContent = info.value || "";
      panel.querySelector(".scene-info-description").textContent = info.description || "";
      this.element.dataset.activeModule = info.id || "";
    }

    focusModule(id, keyboard = false) {
      if (this.hovered === id && !keyboard) return;
      this.hovered = id;
      this.labels.forEach(({ button }) => button.classList.toggle("is-active", button.dataset.module === id));
      const module = modules.find(item => item.id === id);
      if (module) this.updateInfo(module);
      else this.defaultInfo();
      if (keyboard) this.models.forEach(model => { model.lift = model.id === id ? .38 : 0; model.velocity = 0; });
    }

    hit(event) {
      const bounds = this.renderer.domElement.getBoundingClientRect();
      this.pointer.set((event.clientX - bounds.left) / bounds.width * 2 - 1, -(event.clientY - bounds.top) / bounds.height * 2 + 1);
      this.raycaster.setFromCamera(this.pointer, this.camera);
      const result = this.raycaster.intersectObjects(this.objects, false)[0];
      return result?.object;
    }

    bind() {
      const canvas = this.renderer.domElement;
      canvas.addEventListener("pointerdown", event => {
        if (event.button !== 0 || this.pointerId !== undefined) return;
        this.pointerId = event.pointerId;
        const hit = this.type === "home" ? this.hit(event) : null;
        this.dragModel = this.models.find(model => model.id === hit?.userData.info?.id);
        this.down = { x: event.clientX, y: event.clientY, angle: this.angle, tilt: this.tilt, modelY: this.dragModel?.model.rotation.y || 0, modelX: this.dragModel?.model.rotation.x || 0 };
        this.dragging = false;
        canvas.setPointerCapture(event.pointerId);
      });
      canvas.addEventListener("pointermove", event => {
        this.inside = true;
        if (this.pointerId === event.pointerId) {
          const dx = event.clientX - this.down.x;
          const dy = event.clientY - this.down.y;
          if (Math.hypot(dx, dy) > 6) this.dragging = true;
          if (this.dragging) {
            if (this.dragModel) {
              this.dragModel.model.rotation.y = this.down.modelY + dx * .012;
              this.dragModel.model.rotation.x = Math.max(-.7, Math.min(.7, this.down.modelX + dy * .008));
              this.focusModule(this.dragModel.id);
            } else {
              this.angle = this.down.angle + dx * .008;
              this.tilt = Math.max(-.28, Math.min(.75, this.down.tilt + dy * .006));
              if (this.type === "home") this.focusModule(null);
            }
            this.element.dataset.rotated = "true";
            canvas.style.cursor = "grabbing";
            return;
          }
        }
        if (event.pointerType === "touch") return;
        const hit = this.hit(event);
        canvas.style.cursor = hit ? "pointer" : "grab";
        if (this.type === "home") this.focusModule(hit?.userData.info?.id || null);
        else if (hit) this.updateInfo(hit.userData.info);
      });
      const release = event => {
        if (this.pointerId !== event.pointerId) return;
        if (!this.dragging && event.type === "pointerup") this.hit(event)?.userData.action?.();
        if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
        this.pointerId = undefined;
        this.dragging = false;
        this.dragModel = null;
        canvas.style.cursor = "grab";
      };
      canvas.addEventListener("pointerup", release);
      canvas.addEventListener("pointercancel", release);
      canvas.addEventListener("lostpointercapture", () => { this.pointerId = undefined; this.dragging = false; this.dragModel = null; });
      canvas.addEventListener("pointerleave", () => {
        this.inside = false;
        if (this.type === "home" && !this.dragging) this.focusModule(null);
      });
      canvas.addEventListener("wheel", event => {
        if (!event.ctrlKey && !event.shiftKey && matchMedia("(pointer: coarse)").matches) return;
        event.preventDefault();
        this.zoom = Math.max(.65, Math.min(1.8, this.zoom * Math.exp(-event.deltaY * .0008)));
        this.resize();
      }, { passive: false });
      canvas.addEventListener("keydown", event => {
        if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home"].includes(event.key)) return;
        event.preventDefault();
        if (event.key === "Home") this.resetView();
        else if (event.key === "ArrowLeft") this.angle -= .12;
        else if (event.key === "ArrowRight") this.angle += .12;
        else this.tilt = Math.max(-.28, Math.min(.75, this.tilt + (event.key === "ArrowUp" ? -.08 : .08)));
        this.element.dataset.rotated = "true";
      });
      this.element.querySelector("[data-scene-pause]")?.addEventListener("click", () => { this.paused = !this.paused; this.syncPause(); });
      this.element.querySelector("[data-scene-reset]")?.addEventListener("click", () => this.resetView());
    }

    syncPause() {
      const button = this.element.querySelector("[data-scene-pause]");
      if (!button) return;
      button.textContent = this.paused ? "开始旋转" : "暂停旋转";
      button.setAttribute("aria-pressed", String(!this.paused));
      this.element.dataset.autoRotate = String(!this.paused);
    }

    frame(dt) {
      if (this.element.closest("[hidden]") || document.hidden || !this.visible) return;
      this.elapsed += dt;
      const moving = !this.paused && !motion.matches && !this.dragging;
      if (moving && !this.inside && !this.hovered) this.angle += dt * (this.type === "home" ? .025 : .07);
      this.root.rotation.set(this.tilt, this.angle, 0);
      this.models.forEach(model => {
        const target = model.id === this.hovered ? (motion.matches ? .07 : .38) : 0;
        const acceleration = 100 * (target - model.lift) - 18 * model.velocity;
        model.velocity += acceleration * dt;
        model.lift += model.velocity * dt;
        const bob = moving && !this.hovered ? Math.sin(this.elapsed * .85 + model.phase) * .045 : 0;
        model.model.position.y = model.lift + bob;
        if (moving && !this.hovered) model.model.rotation.y += dt * .10;
        model.halo.material.opacity = model.id === this.hovered ? .6 : .14;
      });
      if (this.particles && moving) this.particles.rotation.y += dt * .012;
      this.root.updateMatrixWorld(true);
      this.renderer.render(this.scene, this.camera);
      const bounds = this.renderer.domElement.getBoundingClientRect();
      this.labels.forEach(({ button, anchor, offset }) => {
        const position = anchor.localToWorld(offset.clone()).project(this.camera);
        button.style.transform = `translate(-50%, -50%) translate(${(position.x + 1) / 2 * bounds.width}px, ${(-position.y + 1) / 2 * bounds.height}px)`;
        button.style.zIndex = String(Math.round((1 - position.z) * 100));
      });
    }

    dispose() {
      this.resizeObserver.disconnect();
      visibility.unobserve(this.element);
      const geometries = new Set();
      const materials = new Set();
      this.scene.traverse(object => {
        if (object.geometry) geometries.add(object.geometry);
        if (object.material) (Array.isArray(object.material) ? object.material : [object.material]).forEach(mat => materials.add(mat));
      });
      geometries.forEach(geometry => geometry.dispose());
      materials.forEach(mat => { mat.map?.dispose(); mat.dispose(); });
      this.renderer.dispose();
      this.renderer.forceContextLoss();
      active.delete(this);
    }
  }

  const visibility = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const item = pending.get(entry.target.id);
      if (!item) return;
      if (entry.isIntersecting && !item.view) {
        try { item.view = new View(entry.target, item.type, item.config); }
        catch (error) {
          entry.target.dataset.sceneReady = "false";
          entry.target.querySelector(".scene-canvas").innerHTML = '<div class="scene-fallback">当前浏览器无法显示 3D 场景<br>可使用下方模块入口和数据表继续查看</div>';
          console.error("3D 场景初始化失败", error);
        }
      }
      if (item.view) item.view.visible = entry.isIntersecting;
    });
  }, { rootMargin: "80px" });

  function viewMarkup(type, config = {}) {
    const id = `scene-view-${++sequence}`;
    pending.set(id, { type, config });
    queueMicrotask(() => {
      const element = document.getElementById(id);
      if (element) visibility.observe(element);
      else pending.delete(id);
    });
    return `<div id="${id}" class="three-view ${type === "home" ? "three-home" : "three-chart"}" data-scene="${type}"><div class="scene-canvas"></div>${type === "home" ? `<div class="module-labels">${modules.map((module, index) => `<button class="module-label" data-module="${module.id}" aria-label="${module.name}：${module.description}"><small>0${index + 1}</small><span>${module.name}</span><i>↗</i></button>`).join("")}</div>` : ""}<div class="scene-controls"><button data-scene-pause aria-pressed="false">开始旋转</button><button data-scene-reset>复位视角</button></div><div class="scene-info" aria-live="polite"><div class="scene-info-kicker">${type === "home" ? "探索模块" : "图表信息"}</div><strong class="scene-info-title"></strong><span class="scene-info-value"></span><p class="scene-info-description"></p></div><div class="scene-gesture">拖动旋转 <span>·</span> 滚轮缩放</div></div>`;
  }

  let last = performance.now();
  function animate(now) {
    const dt = Math.min((now - last) / 1000, .034);
    last = now;
    active.forEach(view => { if (!view.element.isConnected) view.dispose(); else view.frame(dt); });
    pending.forEach((item, id) => {
      if (!document.getElementById(id)) {
        if (item.view) item.view.dispose();
        pending.delete(id);
      }
    });
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
  motion.addEventListener("change", () => active.forEach(view => { if (motion.matches) view.paused = true; view.syncPause(); }));
  window.WORKBENCH_3D = { viewMarkup, modules };
})();
