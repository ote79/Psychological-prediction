/* Each mark is one observed student/day/zone record. The five islands are a
   categorical layout, not geographic coordinates. Within each island the day
   progresses horizontally and the anonymous student index vertically. */
(() => {
  'use strict';

  const zones = [
    { name: '居住地点', x: .28, y: .30, w: .31, h: .25, angle: -.30 },
    { name: '学习地点', x: .72, y: .28, w: .25, h: .22, angle: .28 },
    { name: '餐饮地点', x: .48, y: .67, w: .26, h: .23, angle: .17 },
    { name: '社交地点', x: .82, y: .71, w: .16, h: .16, angle: -.56 },
    { name: '休闲地点', x: .16, y: .74, w: .14, h: .13, angle: .40 }
  ];
  const gold = ['#625d51', '#82765a', '#a2936b', '#c7af75', '#e0c780', '#f2d997'];
  const violet = ['#624b73', '#785e8b', '#9774a8', '#af86bb', '#c39ac9', '#d9b3dc'];
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  // Stable local offsets keep marks apart when many students share a day.
  function sample(seed) {
    let n = Math.imul(seed ^ (seed >>> 16), 0x21f0aaad);
    n = Math.imul(n ^ (n >>> 15), 0x735a2d97);
    return ((n ^ (n >>> 15)) >>> 0) / 4294967296;
  }

  function layout(event, count) {
    const [student, day, zone] = event;
    const region = zones[zone];
    const seed = (student * 57 + day) * 5 + zone + 1;
    const a = (day - .5) / 56 * 2 - 1;
    const b = (student + .5) / count * 2 - 1;
    // Rounded contours with local compression produce legible density ridges.
    let x = a * Math.sqrt(1 - .50 * b * b) + (sample(seed) - .5) * .22;
    let y = b * Math.sqrt(1 - .50 * a * a) + (sample(seed + 38211) - .5) * .21;
    const phase = zone * 2.16;
    x += .15 * Math.sin(4.7 * y + phase) + .075 * Math.sin(7.5 * y + 2.5 * x);
    y += .19 * Math.sin(3.9 * x - phase) + .11 * Math.sin(8.4 * x + 1.9 * y + phase);
    const wave = y + .28 * Math.sin(x * 4.8 + phase) - .06 * Math.sin(x * 9.6);
    y += .049 * Math.sin(17 * wave + phase);
    x += .055 * Math.sin(13 * x - 5.6 * y);
    const cos = Math.cos(region.angle);
    const sin = Math.sin(region.angle);
    return {
      x: region.x + region.w * (x * cos - y * sin),
      y: region.y + region.h * (x * sin + y * cos),
      size: .76 + Math.min(1, Math.log1p(event[3]) / 3.2) * .67 + sample(seed + 90357) * .31,
      shade: Math.min(5, Math.floor(sample(seed + 84619) ** 1.5 * 6))
    };
  }

  window.createPointMap = function createPointMap(canvas, options) {
    const { events, students, onEvent, onZone, onArea, onHover } = options;
    const ctx = canvas.getContext('2d', { alpha: false });
    const points = events.map(event => layout(event, students.length));
    const allIndices = events.map((_, i) => i);
    const colors = [...gold, ...violet];
    const byClass = colors.map(() => []);
    const visible = new Uint8Array(events.length);
    const counts = Array(zones.length).fill(0);
    const spatialGrid = new Map();
    const cellSize = .025;
    const cellKey = (x, y) => x + 200 * y;
    points.forEach((point, i) => {
      const key = cellKey(Math.floor(point.x / cellSize), Math.floor(point.y / cellSize));
      if (!spatialGrid.has(key)) spatialGrid.set(key, []);
      spatialGrid.get(key).push(i);
    });

    let indices = allIndices;
    let focusStudent = null;
    let focusEvent = null;
    let focusPoints = [];
    let hovered = null;
    let areaMode = false;
    let width = 1, height = 1, pixelScale = 1;
    let view = { zoom: 1, x: .5, y: .5 };
    let target = { ...view };
    let frame = 0;
    let labels = [];
    let gesture = null;
    let pinch = null;
    const touches = new Map();
    canvas.style.touchAction = 'none';
    canvas.style.cursor = 'grab';
    if (!canvas.hasAttribute('aria-label')) {
      canvas.setAttribute('aria-label', '五类校园功能区驻留点图。点位按观察日和匿名学生排列。');
    }

    const projectX = x => (x - view.x) * width * view.zoom + width / 2;
    const projectY = y => (y - view.y) * height * view.zoom + height / 2;
    const worldX = x => (x - width / 2) / (width * view.zoom) + view.x;
    const worldY = y => (y - height / 2) / (height * view.zoom) + view.y;
    const location = e => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const labelAt = (x, y) => labels.find(label =>
      x >= label.x && y >= label.y && x <= label.x + label.w && y <= label.y + label.h);

    function schedule() {
      if (!frame) frame = requestAnimationFrame(draw);
    }
    function updateFocus() {
      focusPoints = focusStudent == null ? [] : indices.filter(i => events[i][0] === focusStudent);
    }
    function indexVisible(next) {
      indices = next ?? allIndices;
      visible.fill(0);
      counts.fill(0);
      byClass.forEach(group => { group.length = 0; });
      for (const i of indices) {
        visible[i] = 1;
        counts[events[i][2]]++;
        const bucket = points[i].shade + (students[events[i][0]].high ? gold.length : 0);
        byClass[bucket].push(i);
      }
      updateFocus();
    }
    function setState(state) {
      if ('studentIndex' in state) focusStudent = state.studentIndex >= 0 ? state.studentIndex : null;
      if ('selectedIndex' in state) focusEvent = state.selectedIndex;
      if ('visibleIndices' in state) indexVisible(state.visibleIndices);
      else updateFocus();
      if ('areaMode' in state) areaMode = state.areaMode;
      canvas.style.cursor = areaMode ? 'crosshair' : 'grab';
      schedule();
    }

    function pointAt(x, y) {
      const radius = window.matchMedia('(pointer: coarse)').matches ? 14 : 8;
      let nearest = null;
      let distance = radius * radius;
      const minX = Math.floor(worldX(x - radius) / cellSize);
      const maxX = Math.floor(worldX(x + radius) / cellSize);
      const minY = Math.floor(worldY(y - radius) / cellSize);
      const maxY = Math.floor(worldY(y + radius) / cellSize);
      for (let cx = minX; cx <= maxX; cx++) {
        for (let cy = minY; cy <= maxY; cy++) {
          for (const i of spatialGrid.get(cellKey(cx, cy)) || []) {
            if (!visible[i]) continue;
            const point = points[i];
            const dx = projectX(point.x) - x;
            const dy = projectY(point.y) - y;
            const d = dx * dx + dy * dy;
            if (d < distance) {
              distance = d;
              nearest = i;
            }
          }
        }
      }
      return nearest;
    }
    function clearHover() {
      if (hovered != null) {
        hovered = null;
        onHover?.(null, 0, 0);
        schedule();
      }
    }
    function zoom(factor, atX = width / 2, atY = height / 2) {
      clearHover();
      const newZoom = clamp(target.zoom * factor, .55, 18);
      const rx = (atX / width - .5);
      const ry = (atY / height - .5);
      target.x += rx / target.zoom - rx / newZoom;
      target.y += ry / target.zoom - ry / newZoom;
      target.zoom = newZoom;
      schedule();
    }
    function fit() {
      target = { zoom: 1, x: .5, y: .5 };
      if (indices.length) {
        let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
        for (const i of indices) {
          const p = points[i];
          x0 = Math.min(x0, p.x); x1 = Math.max(x1, p.x);
          y0 = Math.min(y0, p.y); y1 = Math.max(y1, p.y);
        }
        target = { zoom: clamp(.86 / Math.max(.08, x1 - x0, y1 - y0), .55, 8),
          x: (x0 + x1) / 2, y: (y0 + y1) / 2 };
      }
      clearHover();
      schedule();
    }
    function resize() {
      const bounds = canvas.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      width = bounds.width; height = bounds.height;
      pixelScale = Math.min(3, window.devicePixelRatio || 1);
      canvas.width = Math.round(width * pixelScale);
      canvas.height = Math.round(height * pixelScale);
      schedule();
    }

    function marker(i, color, radius) {
      if (i == null || !visible[i]) return;
      const p = points[i];
      const x = projectX(p.x), y = projectY(p.y);
      ctx.fillStyle = color;
      ctx.strokeStyle = '#292c34';
      ctx.lineWidth = .8;
      ctx.beginPath(); ctx.arc(x, y, radius, 0, 2 * Math.PI); ctx.fill(); ctx.stroke();
    }
    function drawLabels() {
      labels = [];
      ctx.font = '13px CGInter, "Microsoft YaHei", sans-serif';
      ctx.textBaseline = 'middle';
      for (const [zone, region] of zones.entries()) {
        if (!counts[zone]) continue;
        const title = region.name + ' · ' + counts[zone].toLocaleString('en-US');
        const w = ctx.measureText(title).width + 20, h = 24;
        const x = Math.round(projectX(region.x) - w / 2);
        const y = Math.round(projectY(region.y + region.h * .24));
        if (x + w < 0 || x > width || y + h < 0 || y > height) continue;
        if (labels.some(r => x < r.x + r.w + 3 && x + w + 3 > r.x && y < r.y + h + 3 && y + h + 3 > r.y)) continue;
        labels.push({ x, y, w, h, zone });
        ctx.fillStyle = 'rgba(53,58,70,.92)';
        ctx.beginPath(); ctx.roundRect(x, y, w, h, 5); ctx.fill();
        ctx.fillStyle = '#f4e9cd';
        ctx.fillText(title, x + 10, y + h / 2 + .5);
      }
      // Keep several actual observations directly accessible from the overview.
      const candidates = focusPoints.length ? focusPoints : indices;
      const slots = width > 670 ? 4 : 2;
      for (let slot = 0; slot < slots && candidates.length; slot++) {
        const start = Math.floor(candidates.length * (slot + .42) / slots);
        for (let offset = 0; offset < Math.min(45, candidates.length); offset++) {
          const index = candidates[(start + offset * 17) % candidates.length];
          const [student, day, zone] = events[index], point = points[index];
          const title = students[student].id + ' · D' + String(day).padStart(2,'0') + ' · ' + zones[zone].name;
          const w = ctx.measureText(title).width + 17, h = 22;
          const x = Math.round(projectX(point.x) + 5), y = Math.round(projectY(point.y) - h / 2);
          if (x < 4 || x+w > width-5 || y < 46 || y+h > height-45) continue;
          if (labels.some(r => x < r.x+r.w+12 && x+w+12 > r.x && y < r.y+r.h+12 && y+h+12 > r.y)) continue;
          labels.push({x, y, w, h, eventIndex:index});
          ctx.fillStyle = 'rgba(53,58,70,.93)';
          ctx.beginPath(); ctx.roundRect(x,y,w,h,4); ctx.fill();
          ctx.fillStyle = students[student].high ? '#e4c5eb' : '#efe0bc';
          ctx.fillText(title,x+8,y+h/2);
          break;
        }
      }
    }
    function draw() {
      frame = 0;
      const moving = Math.abs(view.zoom - target.zoom) > .001 ||
        Math.abs(view.x - target.x) > .0001 || Math.abs(view.y - target.y) > .0001;
      if (moving) {
        for (const k of ['zoom', 'x', 'y']) view[k] += (target[k] - view[k]) * .32;
        schedule();
      } else view = { ...target };
      ctx.setTransform(pixelScale, 0, 0, pixelScale, 0, 0);
      ctx.fillStyle = '#2d313a';
      ctx.fillRect(0, 0, width, height);
      const sizeScale = clamp(Math.sqrt(width * height / 640000), .76, 1.28) *
        clamp(Math.sqrt(view.zoom), .78, 2.8);
      ctx.globalAlpha = focusPoints.length ? .26 : 1;
      for (const [bucket, group] of byClass.entries()) {
        ctx.fillStyle = colors[bucket];
        for (const i of group) {
          const p = points[i], x = projectX(p.x), y = projectY(p.y);
          if (x < -4 || x > width + 4 || y < -4 || y > height + 4) continue;
          const size = p.size * sizeScale * (bucket >= gold.length ? 1.28 : 1);
          if (size > 3.1) {
            ctx.beginPath(); ctx.arc(x, y, size / 2, 0, 2 * Math.PI); ctx.fill();
          } else ctx.fillRect(x - size / 2, y - size / 2, size, size);
        }
      }
      ctx.globalAlpha = 1;
      if (focusPoints.length) {
        const color = students[focusStudent].high ? '#e3b3ef' : '#ffe2a0';
        for (const i of focusPoints) marker(i, color, 2.4 * Math.sqrt(sizeScale));
      }
      drawLabels();
      const active = hovered ?? focusEvent;
      if (active != null && visible[active]) {
        const p = points[active];
        marker(active, '#fff5db', 3);
        ctx.beginPath(); ctx.arc(projectX(p.x), projectY(p.y), 7, 0, Math.PI * 2);
        ctx.strokeStyle = '#fff4d5'; ctx.lineWidth = 1.3; ctx.stroke();
      }
      if (gesture?.mode === 'area') {
        const { start, last } = gesture;
        ctx.fillStyle = '#e0c78018';
        ctx.strokeStyle = '#e0c780';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 3]);
        ctx.fillRect(start.x, start.y, last.x - start.x, last.y - start.y);
        ctx.strokeRect(start.x, start.y, last.x - start.x, last.y - start.y);
        ctx.setLineDash([]);
      }
    }

    canvas.addEventListener('wheel', e => {
      e.preventDefault();
      const p = location(e);
      zoom(Math.exp(-clamp(e.deltaY * (e.deltaMode === 1 ? 16 : 1), -180, 180) * .0025), p.x, p.y);
    }, { passive: false });
    canvas.addEventListener('pointerdown', e => {
      if (e.button !== 0) return;
      const p = location(e);
      touches.set(e.pointerId, p);
      canvas.setPointerCapture(e.pointerId);
      clearHover();
      target = { ...view };
      if (touches.size === 2) {
        const [a, b] = touches.values();
        const x = (a.x + b.x) / 2, y = (a.y + b.y) / 2;
        pinch = { distance: Math.max(1, Math.hypot(a.x - b.x, a.y - b.y)), zoom: view.zoom,
          anchorX: worldX(x), anchorY: worldY(y) };
        gesture = null;
      } else if (touches.size === 1) {
        gesture = { start: p, last: p, moved: false, mode: areaMode || e.shiftKey ? 'area' : 'pan' };
        canvas.style.cursor = gesture.mode === 'area' ? 'crosshair' : 'grabbing';
      }
    });
    canvas.addEventListener('pointermove', e => {
      const p = location(e);
      if (touches.has(e.pointerId)) touches.set(e.pointerId, p);
      if (pinch && touches.size >= 2) {
        const [a, b] = touches.values();
        const z = clamp(pinch.zoom * Math.hypot(a.x - b.x, a.y - b.y) / pinch.distance, .55, 18);
        view = { zoom: z, x: pinch.anchorX - ((a.x + b.x) / 2 / width - .5) / z,
          y: pinch.anchorY - ((a.y + b.y) / 2 / height - .5) / z };
        target = { ...view }; schedule(); return;
      }
      if (gesture) {
        if (Math.hypot(p.x - gesture.start.x, p.y - gesture.start.y) > 3) gesture.moved = true;
        if (gesture.mode === 'pan' && gesture.moved) {
          view.x -= (p.x - gesture.last.x) / (width * view.zoom);
          view.y -= (p.y - gesture.last.y) / (height * view.zoom);
          target = { ...view };
        }
        gesture.last = p;
        schedule(); return;
      }
      if (touches.size || e.pointerType === 'touch') return;
      const label = labelAt(p.x, p.y);
      const i = label || areaMode ? null : pointAt(p.x, p.y);
      canvas.style.cursor = areaMode ? 'crosshair' : (label || i != null ? 'pointer' : 'grab');
      if (i !== hovered || i != null) {
        hovered = i; onHover?.(i, p.x, p.y); schedule();
      }
    });
    function release(e) {
      const p = location(e);
      const completed = gesture;
      touches.delete(e.pointerId);
      pinch = null; gesture = null;
      canvas.style.cursor = areaMode ? 'crosshair' : 'grab';
      if (e.type === 'pointerup' && completed) {
        if (completed.mode === 'area' && completed.moved) {
          const x0 = Math.min(worldX(completed.start.x), worldX(p.x));
          const x1 = Math.max(worldX(completed.start.x), worldX(p.x));
          const y0 = Math.min(worldY(completed.start.y), worldY(p.y));
          const y1 = Math.max(worldY(completed.start.y), worldY(p.y));
          onArea?.(indices.filter(i => {
            const { x, y } = points[i]; return x >= x0 && x <= x1 && y >= y0 && y <= y1;
          }));
        } else if (!completed.moved) {
          const label = labelAt(p.x, p.y);
          if (label?.eventIndex != null) onEvent?.(label.eventIndex);
          else if (label) onZone?.(label.zone);
          else {
            const i = pointAt(p.x, p.y);
            if (i != null) onEvent?.(i);
          }
        }
      }
      schedule();
    }
    canvas.addEventListener('pointerup', release);
    canvas.addEventListener('pointercancel', release);
    canvas.addEventListener('pointerleave', clearHover);
    canvas.addEventListener('dblclick', e => {
      const p = location(e); zoom(1.6, p.x, p.y);
    });
    indexVisible(allIndices);
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    return { setState, fit, zoom, resize };
  };
})();
