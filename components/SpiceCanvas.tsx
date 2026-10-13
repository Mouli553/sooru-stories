"use client";

import { useEffect, useRef } from "react";

export default function SpiceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      color: string;
      speedX: number;
      speedY: number;
      alpha: number;
    }> = [];

    const colors = [
      "rgba(212, 175, 55, 0.5)", // Gold
      "rgba(243, 212, 120, 0.4)", // Light Gold
      "rgba(200, 90, 50, 0.35)",  // Terracotta spice
      "rgba(255, 244, 205, 0.3)"  // Pale warm shimmer
    ];

    const count = Math.min(35, Math.floor(width / 35));

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.3 - 0.15, // Gentle upward drift like spice aroma
        alpha: Math.random() * 0.6 + 0.2
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(212, 175, 55, 0.4)";
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas id="spice-canvas" ref={canvasRef} aria-hidden="true" />;
}
