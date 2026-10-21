import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  active?: boolean;
}

export function ThreeBirthdayCanvas({ active = true }: ThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 32;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfff5f8, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffe8ea, 1.2);
    dirLight.position.set(10, 20, 15);
    scene.add(dirLight);

    const pinkLight = new THREE.PointLight(0xff85a1, 1.5, 60);
    pinkLight.position.set(-10, 0, 10);
    scene.add(pinkLight);

    const goldLight = new THREE.PointLight(0xfcd34d, 1.2, 50);
    goldLight.position.set(12, -10, 15);
    scene.add(goldLight);

    // Create 3D Heart Geometry
    const heartShape = new THREE.Shape();
    const x = 0, y = 0;
    heartShape.moveTo(x + 0.25, y + 0.25);
    heartShape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
    heartShape.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35);
    heartShape.bezierCurveTo(x - 0.3, y + 0.55, x - 0.1, y + 0.77, x + 0.25, y + 0.95);
    heartShape.bezierCurveTo(x + 0.6, y + 0.77, x + 0.8, y + 0.55, x + 0.8, y + 0.35);
    heartShape.bezierCurveTo(x + 0.8, y + 0.35, x + 0.8, y, x + 0.5, y);
    heartShape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);

    const extrudeSettings = {
      depth: 0.15,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    };
    const heartGeo = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    heartGeo.center();

    // Palette of romantic materials
    const colors = [0xff6b8b, 0xfca5a5, 0xfecdd3, 0xfb7185, 0xf59e0b, 0xf472b6];
    const materials = colors.map(
      (c) =>
        new THREE.MeshStandardMaterial({
          color: c,
          roughness: 0.3,
          metalness: 0.15,
          transparent: true,
          opacity: 0.72,
        })
    );

    // Floating heart meshes
    const heartsCount = prefersReducedMotion ? 12 : 28;
    const hearts: {
      mesh: THREE.Mesh;
      baseY: number;
      speedY: number;
      rotSpeedX: number;
      rotSpeedY: number;
      rotSpeedZ: number;
      amplitude: number;
      freq: number;
    }[] = [];

    const heartGroup = new THREE.Group();
    scene.add(heartGroup);

    for (let i = 0; i < heartsCount; i++) {
      const mat = materials[i % materials.length];
      const mesh = new THREE.Mesh(heartGeo, mat);
      const scale = THREE.MathUtils.randFloat(0.4, 1.1);
      mesh.scale.set(scale, scale, scale);

      mesh.position.x = THREE.MathUtils.randFloatSpread(40);
      const baseY = THREE.MathUtils.randFloatSpread(50);
      mesh.position.y = baseY;
      mesh.position.z = THREE.MathUtils.randFloatSpread(25);

      mesh.rotation.x = Math.PI + THREE.MathUtils.randFloat(0, Math.PI);
      mesh.rotation.y = THREE.MathUtils.randFloat(0, Math.PI * 2);
      mesh.rotation.z = THREE.MathUtils.randFloat(0, Math.PI);

      heartGroup.add(mesh);
      hearts.push({
        mesh,
        baseY,
        speedY: THREE.MathUtils.randFloat(0.003, 0.008),
        rotSpeedX: THREE.MathUtils.randFloat(-0.006, 0.006),
        rotSpeedY: THREE.MathUtils.randFloat(-0.008, 0.008),
        rotSpeedZ: THREE.MathUtils.randFloat(-0.005, 0.005),
        amplitude: THREE.MathUtils.randFloat(0.4, 1.2),
        freq: THREE.MathUtils.randFloat(0.5, 1.5),
      });
    }

    // Glistening stardust particle field
    const particlesCount = prefersReducedMotion ? 200 : 700;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);

    const starColor1 = new THREE.Color(0xfde047); // soft gold
    const starColor2 = new THREE.Color(0xfb7185); // soft rose
    const starColor3 = new THREE.Color(0xffffff); // pure light

    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = THREE.MathUtils.randFloatSpread(70);
      posArray[i + 1] = THREE.MathUtils.randFloatSpread(80);
      posArray[i + 2] = THREE.MathUtils.randFloatSpread(50);

      const choice = Math.random();
      const c = choice < 0.4 ? starColor1 : choice < 0.7 ? starColor2 : starColor3;
      colorArray[i] = c.r;
      colorArray[i + 1] = c.g;
      colorArray[i + 2] = c.b;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // Scroll and Mouse Tracking
    let targetScrollProgress = 0;
    let currentScrollProgress = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const onScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      targetScrollProgress = window.scrollY / maxScroll;
    };

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', onResize);
    onScroll();

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth scroll lerp
      currentScrollProgress += (targetScrollProgress - currentScrollProgress) * 0.07;
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Camera smoothly orbits & shifts along scroll
      camera.position.y = -currentScrollProgress * 32 + currentMouseY * 1.5;
      camera.position.x = Math.sin(currentScrollProgress * Math.PI * 2) * 4 + currentMouseX * 2;
      camera.position.z = 32 - Math.sin(currentScrollProgress * Math.PI) * 6;
      camera.lookAt(0, camera.position.y * 0.95, 0);

      // Rotate star field gently
      starField.rotation.y = elapsedTime * 0.02 + currentScrollProgress * 1.2;
      starField.rotation.x = currentScrollProgress * 0.5;

      // Animate each floating heart
      hearts.forEach((h, idx) => {
        h.mesh.rotation.x += h.rotSpeedX;
        h.mesh.rotation.y += h.rotSpeedY;
        h.mesh.rotation.z += h.rotSpeedZ;

        // Floating hover motion
        h.mesh.position.y =
          h.baseY + Math.sin(elapsedTime * h.freq + idx) * h.amplitude - currentScrollProgress * 15;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);

      // Dispose resources
      renderer.dispose();
      heartGeo.dispose();
      materials.forEach((m) => m.dispose());
      starGeo.dispose();
      starMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [active]);

  return (
    <div
      ref={containerRef}
      className="three-birthday-canvas"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: active ? 0.88 : 0,
        transition: 'opacity 0.8s ease',
      }}
    />
  );
}
