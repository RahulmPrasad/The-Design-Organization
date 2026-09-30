"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/media";

/** Three rows of dots drifting across the footer; they speed up while the page scrolls. */
export function FooterParticles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let disposed = false;
    let cleanup = () => {};

    import("three")
      .then((THREE) => {
        if (disposed) return;
        const isMobile = window.innerWidth < 768;
        const config = {
          lineCount: 3,
          dotsPerLine: isMobile ? 18 : 35,
          rowSpacing: 0.75,
          depthRange: 6,
          dotColor: "#524F4B",
          dotSize: isMobile ? 0.15 : 0.25,
          dotSpeed: 0.15,
        };

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
        camera.position.z = 20;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor("#000000", 0);
        Object.assign(renderer.domElement.style, { width: "100%", height: "100%", display: "block" });
        container.appendChild(renderer.domElement);

        const dots: { y: number; z: number; progress: number; speed: number; offset: number }[] = [];
        for (let line = 0; line < config.lineCount; line++) {
          const y = (line - (config.lineCount - 1) / 2) * config.rowSpacing;
          const z = (Math.random() - 0.5) * config.depthRange;
          for (let dot = 0; dot < config.dotsPerLine; dot++) {
            dots.push({ y, z, progress: dot / config.dotsPerLine, speed: 0.5 + Math.random(), offset: Math.random() });
          }
        }

        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(dots.length * 3);
        dots.forEach((dot, i) => {
          positions[i * 3 + 1] = dot.y;
          positions[i * 3 + 2] = dot.z;
        });
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

        // Round dot sprite.
        const sprite = document.createElement("canvas");
        sprite.width = sprite.height = 64;
        const ctx = sprite.getContext("2d");
        if (!ctx) throw new Error("2D canvas unavailable");
        ctx.beginPath();
        ctx.arc(32, 32, 30, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        const texture = new THREE.CanvasTexture(sprite);

        const material = new THREE.PointsMaterial({
          color: config.dotColor,
          size: config.dotSize,
          transparent: true,
          map: texture,
          alphaMap: texture,
          depthWrite: false,
        });
        scene.add(new THREE.Points(geometry, material));

        let visibleWidth = 100;
        const updateVisibleWidth = () => {
          const visibleHeight = 2 * Math.tan((camera.fov * Math.PI) / 360) * Math.abs(camera.position.z);
          visibleWidth = visibleHeight * camera.aspect;
        };

        const reducedMotion = prefersReducedMotion();
        let lastScrollY = window.scrollY;
        let smoothVelocity = 0;
        let time = 0;
        let frameId = 0;

        const render = () => {
          const scrollY = window.scrollY;
          smoothVelocity += (Math.abs(scrollY - lastScrollY) - smoothVelocity) * 0.1;
          lastScrollY = scrollY;
          time += (0.016 * config.dotSpeed) / (visibleWidth / 35) + smoothVelocity * 0.0015;

          const position = geometry.attributes.position;
          dots.forEach((dot, i) => {
            const progress = (((dot.progress + dot.offset - time * 0.1 * dot.speed) % 1) + 1) % 1;
            position.setXYZ(i, (progress - 0.5) * visibleWidth, dot.y, dot.z);
          });
          position.needsUpdate = true;
          renderer.render(scene, camera);
        };

        const loop = () => {
          render();
          frameId = requestAnimationFrame(loop);
        };

        const resizeObserver = new ResizeObserver(([entry]) => {
          const { width, height } = entry.contentRect;
          if (width === 0 || height === 0) return;
          renderer.setSize(width, height);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          updateVisibleWidth();
          if (reducedMotion) render();
        });
        resizeObserver.observe(container);
        updateVisibleWidth();
        if (reducedMotion) render();
        else loop();

        cleanup = () => {
          cancelAnimationFrame(frameId);
          resizeObserver.disconnect();
          geometry.dispose();
          material.dispose();
          texture.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
      })
      .catch((error) => {
        console.warn("Footer particles unavailable, showing fallback image.", error);
        if (!disposed) setFailed(true);
      });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div className="footer_bg">
      <div
        ref={containerRef}
        id="particles-footer-canvas"
        className="footer_bg-wrapper"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 0,
          overflow: "hidden",
          display: failed ? "none" : undefined,
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative fallback, shown only if WebGL fails */}
      <img
        src="/images/footer-lines.svg"
        loading="lazy"
        alt=""
        className="footer_bg-wrapper is-fallback"
        style={failed ? { display: "block" } : undefined}
      />
    </div>
  );
}
