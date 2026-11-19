"use client";

import { useEffect, useRef } from "react";

type ThreePhoneViewerProps = {
  color?: string;
  accent?: string;
  className?: string;
};

export default function ThreePhoneViewer({
  color = "#1b1b1d",
  accent = "#27272a",
  className = ""
}: ThreePhoneViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    const init = async () => {
      const THREE = await import("three");
      const container = containerRef.current;
      if (disposed || !container) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
      camera.position.set(0, 0, 8);

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      } catch {
        container.innerHTML =
          '<div class="grid h-full w-full place-items-center text-label-sm text-on-surface-variant">3D preview unavailable on this device.</div>';
        return;
      }

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      scene.add(new THREE.AmbientLight(0xffffff, 1.8));
      const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
      keyLight.position.set(3, 5, 5);
      scene.add(keyLight);
      const rimLight = new THREE.DirectionalLight(0x8ea6ff, 1.6);
      rimLight.position.set(-4, -2, -3);
      scene.add(rimLight);

      const phone = new THREE.Group();

      const body = new THREE.Mesh(
        new THREE.BoxGeometry(1.7, 3.4, 0.2),
        new THREE.MeshStandardMaterial({
          color,
          metalness: 0.85,
          roughness: 0.28
        })
      );
      phone.add(body);

      const phoneFrame = new THREE.Mesh(
        new THREE.BoxGeometry(1.76, 3.46, 0.16),
        new THREE.MeshStandardMaterial({
          color: accent,
          metalness: 0.95,
          roughness: 0.2
        })
      );
      phoneFrame.position.z = -0.02;
      phone.add(phoneFrame);

      const screen = new THREE.Mesh(
        new THREE.PlaneGeometry(1.5, 3.18),
        new THREE.MeshStandardMaterial({
          color: 0x050505,
          emissive: 0x16264f,
          emissiveIntensity: 0.65,
          metalness: 0.4,
          roughness: 0.15
        })
      );
      screen.position.z = 0.106;
      phone.add(screen);

      const cameraIsland = new THREE.Mesh(
        new THREE.CircleGeometry(0.24, 32),
        new THREE.MeshStandardMaterial({ color: 0x0a0a0a, metalness: 0.6, roughness: 0.2 })
      );
      cameraIsland.position.set(-0.48, 1.25, 0.108);
      phone.add(cameraIsland);

      const lensMaterial = new THREE.MeshStandardMaterial({
        color: 0x111827,
        metalness: 0.9,
        roughness: 0.05
      });
      const lensPositions: [number, number][] = [
        [-0.56, 1.34],
        [-0.4, 1.34],
        [-0.56, 1.17]
      ];
      lensPositions.forEach(([x, y]) => {
        const lens = new THREE.Mesh(new THREE.CircleGeometry(0.075, 24), lensMaterial);
        lens.position.set(x, y, 0.11);
        phone.add(lens);
      });

      scene.add(phone);

      let targetY = 0.35;
      let targetX = -0.08;
      let dragging = false;
      let lastX = 0;
      let lastY = 0;

      const onPointerDown = (event: PointerEvent) => {
        dragging = true;
        lastX = event.clientX;
        lastY = event.clientY;
        renderer.domElement.setPointerCapture(event.pointerId);
      };
      const onPointerMove = (event: PointerEvent) => {
        if (!dragging) return;
        targetY += (event.clientX - lastX) * 0.01;
        targetX += (event.clientY - lastY) * 0.006;
        targetX = Math.max(-0.45, Math.min(0.45, targetX));
        lastX = event.clientX;
        lastY = event.clientY;
      };
      const onPointerUp = () => {
        dragging = false;
      };

      renderer.domElement.addEventListener("pointerdown", onPointerDown);
      renderer.domElement.addEventListener("pointermove", onPointerMove);
      renderer.domElement.addEventListener("pointerup", onPointerUp);
      renderer.domElement.addEventListener("pointercancel", onPointerUp);

      const resize = () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        if (!width || !height) return;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };
      const observer = new ResizeObserver(resize);
      observer.observe(container);
      resize();

      let animationFrame = 0;
      const animate = () => {
        if (disposed) return;
        if (!dragging) targetY += 0.003;
        phone.rotation.y += (targetY - phone.rotation.y) * 0.08;
        phone.rotation.x += (targetX - phone.rotation.x) * 0.08;
        renderer.render(scene, camera);
        animationFrame = requestAnimationFrame(animate);
      };
      animate();

      cleanup = () => {
        cancelAnimationFrame(animationFrame);
        observer.disconnect();
        renderer.domElement.removeEventListener("pointerdown", onPointerDown);
        renderer.domElement.removeEventListener("pointermove", onPointerMove);
        renderer.domElement.removeEventListener("pointerup", onPointerUp);
        renderer.domElement.removeEventListener("pointercancel", onPointerUp);
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            const material = object.material;
            if (Array.isArray(material)) material.forEach((item) => item.dispose());
            else material.dispose();
          }
        });
        renderer.dispose();
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      };
    };

    init();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [color, accent]);

  return (
    <div
      id="threejs-container-ANIMATION_14"
      ref={containerRef}
      className={`relative h-full w-full cursor-grab active:cursor-grabbing ${className}`}
      aria-label="Interactive 3D phone preview"
    />
  );
}
