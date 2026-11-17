/**
 * COSMOGRAPH 3D POINT CLOUD ENGINE (THREE.JS)
 * Visualizes 11,850 Spatio-Temporal Trajectory Points across Campus Functional Zones
 */
(() => {
  "use strict";

  const T = window.THREE;
  if (!T) {
    console.error("Three.js runtime not found");
    return;
  }

  // Global handle for Cosmograph 3D Scene
  window.COSMOGRAPH_3D = {
    init,
    resize,
    filterByDay,
    filterByPhenotype,
    filterByScoreRange,
    focusStudent,
    resetView,
    toggleOrbit,
    setHoverCallback,
    setSelectCallback
  };

  let container = null;
  let renderer = null;
  let scene = null;
  let camera = null;
  let pointsMesh = null;
  let geometry = null;
  let raycaster = null;
  let mouse = new T.Vector2(-999, -999);

  let rawPoints = [];
  let centers = {};
  let originalPositions = null;
  let originalColors = null;
  let pointAlphaArray = null;

  let isOrbiting = true;
  let orbitSpeed = 0.0012;
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let targetRotation = { x: 0.45, y: -0.35 };
  let currentRotation = { x: 0.45, y: -0.35 };
  let cameraDistance = 145;
  let targetDistance = 145;

  let activeFilters = {
    maxDay: 56,
    phenotypes: new Set(["normal_mobility", "retreat_high_risk", "wavering_mid_risk"]),
    minScore: 0.0,
    maxScore: 1.0,
    focusedUid: null
  };

  let onHoverCb = null;
  let onSelectCb = null;

  // Create high-efficiency circular glow particle sprite
  function createGlowSprite() {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");

    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0.0, "rgba(255, 255, 255, 1.0)");
    grad.addColorStop(0.25, "rgba(255, 255, 255, 0.85)");
    grad.addColorStop(0.6, "rgba(255, 255, 255, 0.25)");
    grad.addColorStop(1.0, "rgba(0, 0, 0, 0.0)");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new T.CanvasTexture(canvas);
    texture.colorSpace = T.SRGBColorSpace;
    return texture;
  }

  function init(targetContainerId = "cg-canvas-container") {
    container = document.getElementById(targetContainerId);
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    // 1. Scene & Camera
    scene = new T.Scene();
    scene.background = new T.Color(0x07090e);

    camera = new T.PerspectiveCamera(48, width / height, 1, 2000);
    camera.position.set(0, 95, cameraDistance);
    camera.lookAt(0, 0, 0);

    // 2. WebGL Renderer
    renderer = new T.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = T.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    raycaster = new T.Raycaster();
    raycaster.params.Points.threshold = 3.0;

    // 3. Ambient Lighting & Ground Campus Footprints
    setupCampusGround();

    // 4. Load & Populate 11,850 Trajectory Points
    setupPointCloud();

    // 5. Setup Interactive Event Listeners (Drag, Zoom, Click)
    setupInteractionEvents();

    // 6. Start 60 FPS Render Loop
    requestAnimationFrame(renderLoop);
  }

  function setupCampusGround() {
    // Subtle campus boundary ground ring & functional zones
    const groundGroup = new T.Group();

    // Grid plane (subtle cosmic coordinates)
    const grid = new T.GridHelper(300, 30, 0x161b22, 0x0d1117);
    grid.position.y = -6;
    grid.material.transparent = true;
    grid.material.opacity = 0.25;
    groundGroup.add(grid);

    // Add glowing footprint circles for each campus zone
    const trajectoryData = window.CAMPUS_TRAJECTORIES;
    if (trajectoryData && trajectoryData.metadata && trajectoryData.metadata.centers) {
      centers = trajectoryData.metadata.centers;
      const zoneColors = {
        dorm: 0xc084fc,      // Purple
        library: 0xfacc15,   // Yellow
        canteen: 0x38bdf8,   // Blue
        sports: 0x4ade80,    // Green
        offcampus: 0x94a3b8  // Gray
      };

      for (const [key, c] of Object.entries(centers)) {
        const ringGeo = new T.RingGeometry(c.radius * 0.9, c.radius, 32);
        const ringMat = new T.MeshBasicMaterial({
          color: zoneColors[key] || 0x38bdf8,
          side: T.DoubleSide,
          transparent: true,
          opacity: key === "dorm" ? 0.35 : 0.18
        });
        const ring = new T.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        ring.position.set(c.x, c.y - 4, c.z);
        groundGroup.add(ring);
      }
    }

    // Connecting transit pathways (subtle dashed lines)
    const dorm = centers.dorm || { x: -48, y: 0, z: 32 };
    const lib = centers.library || { x: 38, y: 4, z: -32 };
    const can = centers.canteen || { x: 8, y: -1, z: 18 };
    const spo = centers.sports || { x: -22, y: -2, z: -42 };

    const roadPoints = [
      [dorm, can],
      [can, lib],
      [dorm, spo],
      [spo, lib]
    ];

    roadPoints.forEach(([p1, p2]) => {
      const geo = new T.BufferGeometry().setFromPoints([
        new T.Vector3(p1.x, -4, p1.z),
        new T.Vector3(p2.x, -4, p2.z)
      ]);
      const mat = new T.LineBasicMaterial({ color: 0x334155, transparent: true, opacity: 0.3 });
      groundGroup.add(new T.Line(geo, mat));
    });

    scene.add(groundGroup);
  }

  function setupPointCloud() {
    const trajectoryData = window.CAMPUS_TRAJECTORIES;
    if (!trajectoryData || !trajectoryData.points) {
      console.warn("No trajectory points found in window.CAMPUS_TRAJECTORIES");
      return;
    }

    rawPoints = trajectoryData.points;
    const count = rawPoints.length;

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    pointAlphaArray = new Float32Array(count);

    const tempColor = new T.Color();

    for (let i = 0; i < count; i++) {
      const p = rawPoints[i];

      positions[i * 3 + 0] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;

      tempColor.set(p.color || "#facc15");
      colors[i * 3 + 0] = tempColor.r;
      colors[i * 3 + 1] = tempColor.g;
      colors[i * 3 + 2] = tempColor.b;

      pointAlphaArray[i] = 1.0;
    }

    originalPositions = positions.slice();
    originalColors = colors.slice();

    geometry = new T.BufferGeometry();
    geometry.setAttribute("position", new T.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("color", new T.Float32BufferAttribute(colors, 3));

    const material = new T.PointsMaterial({
      size: 4.2,
      map: createGlowSprite(),
      vertexColors: true,
      blending: 2, // AdditiveBlending
      depthTest: false,
      transparent: true,
      opacity: 0.88
    });

    pointsMesh = new T.Points(geometry, material);
    scene.add(pointsMesh);
  }

  function updatePointFilters() {
    if (!pointsMesh || !geometry || !rawPoints.length) return;

    const colorsAttr = geometry.getAttribute("color");
    const posAttr = geometry.getAttribute("position");
    const colorArray = colorsAttr.array;
    const posArray = posAttr.array;
    const tempColor = new T.Color();

    let visibleCount = 0;

    for (let i = 0; i < rawPoints.length; i++) {
      const p = rawPoints[i];
      let visible = true;

      // 1. Day filter (Timeline)
      if (p.day > activeFilters.maxDay) {
        visible = false;
      }

      // 2. Phenotype filter
      if (!activeFilters.phenotypes.has(p.phenotype)) {
        visible = false;
      }

      // 3. Score range
      if (p.score < activeFilters.minScore || p.score > activeFilters.maxScore) {
        visible = false;
      }

      // 4. Student focus
      let isFocused = false;
      if (activeFilters.focusedUid) {
        if (p.uid === activeFilters.focusedUid) {
          isFocused = true;
          visible = true;
        } else {
          // Dim others
          visible = false;
        }
      }

      const idx = i * 3;
      if (visible) {
        visibleCount++;
        // Restore original position
        posArray[idx + 0] = originalPositions[idx + 0];
        posArray[idx + 1] = originalPositions[idx + 1];
        posArray[idx + 2] = originalPositions[idx + 2];

        if (isFocused) {
          // Highlight focused student in brilliant neon
          colorArray[idx + 0] = 1.0;
          colorArray[idx + 1] = 0.4;
          colorArray[idx + 2] = 1.0;
        } else {
          colorArray[idx + 0] = originalColors[idx + 0];
          colorArray[idx + 1] = originalColors[idx + 1];
          colorArray[idx + 2] = originalColors[idx + 2];
        }
      } else {
        // Move invisible points to infinity
        posArray[idx + 1] = -99999;
      }
    }

    posAttr.needsUpdate = true;
    colorsAttr.needsUpdate = true;

    // Update UI readout
    const counterElem = document.getElementById("active-points-count");
    if (counterElem) {
      counterElem.textContent = visibleCount.toLocaleString();
    }
  }

  function filterByDay(maxDay) {
    activeFilters.maxDay = Number(maxDay);
    updatePointFilters();
  }

  function filterByPhenotype(phenotypeSet) {
    activeFilters.phenotypes = phenotypeSet;
    updatePointFilters();
  }

  function filterByScoreRange(minScore, maxScore) {
    activeFilters.minScore = minScore;
    activeFilters.maxScore = maxScore;
    updatePointFilters();
  }

  function focusStudent(uid) {
    activeFilters.focusedUid = uid;
    updatePointFilters();

    if (uid) {
      // Find centroid of this student's trajectory points
      let sx = 0, sy = 0, sz = 0, count = 0;
      for (const p of rawPoints) {
        if (p.uid === uid) {
          sx += p.x;
          sy += p.y;
          sz += p.z;
          count++;
        }
      }
      if (count > 0) {
        const cx = sx / count;
        const cz = sz / count;
        // Smoothly orient camera towards student centroid
        targetDistance = 90;
        targetRotation.y = -Math.atan2(cz, cx) + 0.3;
      }
    } else {
      targetDistance = 145;
    }
  }

  function resetView() {
    activeFilters.focusedUid = null;
    activeFilters.maxDay = 56;
    activeFilters.minScore = 0.0;
    activeFilters.maxScore = 1.0;
    activeFilters.phenotypes = new Set(["normal_mobility", "retreat_high_risk", "wavering_mid_risk"]);
    targetDistance = 145;
    targetRotation = { x: 0.45, y: -0.35 };
    updatePointFilters();
  }

  function toggleOrbit() {
    isOrbiting = !isOrbiting;
    return isOrbiting;
  }

  function setHoverCallback(cb) {
    onHoverCb = cb;
  }

  function setSelectCallback(cb) {
    onSelectCb = cb;
  }

  function setupInteractionEvents() {
    const el = renderer.domElement;

    el.addEventListener("mousedown", (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener("mouseup", () => {
      isDragging = false;
    });

    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        targetRotation.y += deltaX * 0.005;
        targetRotation.x = Math.max(-0.2, Math.min(1.2, targetRotation.x + deltaY * 0.005));

        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    });

    el.addEventListener("wheel", (e) => {
      e.preventDefault();
      targetDistance = Math.max(45, Math.min(320, targetDistance + e.deltaY * 0.12));
    }, { passive: false });

    // Click on canvas to select nearest point/student
    el.addEventListener("click", () => {
      if (!pointsMesh) return;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(pointsMesh);
      if (intersects.length > 0) {
        const pointIndex = intersects[0].index;
        const p = rawPoints[pointIndex];
        if (p && onSelectCb) {
          onSelectCb(p.uid);
        }
      }
    });
  }

  function updateAnnotationPositions() {
    // Project 3D campus zone positions to 2D screen positions for floating paper cards
    if (!camera || !container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const tags = [
      { id: "tag-dorm", pos: new T.Vector3(-48, 8, 32) },
      { id: "tag-library", pos: new T.Vector3(38, 12, -32) },
      { id: "tag-canteen", pos: new T.Vector3(8, 6, 18) },
      { id: "tag-night", pos: new T.Vector3(-45, 18, 25) }
    ];

    tags.forEach(t => {
      const el = document.getElementById(t.id);
      if (!el) return;

      const p = t.pos.clone();
      p.project(camera);

      // Check if in front of camera
      if (p.z > 1.0) {
        el.style.display = "none";
        return;
      }

      el.style.display = "flex";
      const screenX = (p.x * 0.5 + 0.5) * width;
      const screenY = (-p.y * 0.5 + 0.5) * height;

      el.style.left = `${screenX - 70}px`;
      el.style.top = `${screenY - 30}px`;
    });
  }

  function renderLoop() {
    requestAnimationFrame(renderLoop);

    if (!renderer || !scene || !camera) return;

    // Smooth inertia camera movement
    currentRotation.x += (targetRotation.x - currentRotation.x) * 0.08;
    currentRotation.y += (targetRotation.y - currentRotation.y) * 0.08;
    cameraDistance += (targetDistance - cameraDistance) * 0.08;

    if (isOrbiting && !isDragging) {
      targetRotation.y += orbitSpeed;
    }

    // Position camera on spherical orbit around (0, 0, 0)
    const phi = Math.max(0.1, Math.min(Math.PI * 0.48, Math.PI / 2 - currentRotation.x));
    const theta = currentRotation.y;

    camera.position.x = cameraDistance * Math.sin(phi) * Math.sin(theta);
    camera.position.y = cameraDistance * Math.cos(phi) + 10;
    camera.position.z = cameraDistance * Math.sin(phi) * Math.cos(theta);
    camera.lookAt(0, 5, 0);

    // Update screen annotation cards
    updateAnnotationPositions();

    renderer.render(scene, camera);
  }

  function resize() {
    if (!container || !renderer || !camera) return;
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  window.addEventListener("resize", resize);

})();
