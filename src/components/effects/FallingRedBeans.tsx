/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

interface BeanParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  angle: number;
  angularSpeed: number;
  swayFreq: number;
  swayAmp: number;
  opacity: number;
  color: string;
}

export const FallingRedBeans: React.FC<{ count?: number; className?: string }> = ({
  count = 35,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const colors = ['#dc2626', '#b91c1c', '#991b1b', '#7f1d1d', '#ef4444'];

    const createBean = (): BeanParticle => ({
      x: Math.random() * width,
      y: Math.random() * -height - 20,
      size: 7 + Math.random() * 8, // Bean length
      speedY: 1.2 + Math.random() * 1.8,
      speedX: (Math.random() - 0.5) * 0.8,
      angle: Math.random() * Math.PI * 2,
      angularSpeed: (Math.random() - 0.5) * 0.04,
      swayFreq: 0.02 + Math.random() * 0.03,
      swayAmp: 1.5 + Math.random() * 2.5,
      opacity: 0.55 + Math.random() * 0.45,
      color: colors[Math.floor(Math.random() * colors.length)]
    });

    const beans: BeanParticle[] = Array.from({ length: count }, () => {
      const b = createBean();
      b.y = Math.random() * height; // Spread across screen initially
      return b;
    });

    let time = 0;
    let animId: number;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      beans.forEach((b) => {
        b.y += b.speedY;
        b.x += Math.sin(time + b.y * b.swayFreq) * b.swayAmp * 0.4 + b.speedX;
        b.angle += b.angularSpeed;

        // Pointer wind turbulence
        if (pointerRef.current.active) {
          const dx = b.x - pointerRef.current.x;
          const dy = b.y - pointerRef.current.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 140) {
            const force = (1 - dist / 140) * 3;
            b.x += (dx / dist) * force;
            b.y += (dy / dist) * force;
          }
        }

        // Recycle if below canvas
        if (b.y > height + 30) {
          b.y = -20;
          b.x = Math.random() * width;
        }
        if (b.x < -30) b.x = width + 20;
        if (b.x > width + 30) b.x = -20;

        // Draw Organic Red Bean Shape (相思红豆，微弯椭圆，光洁温润)
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.angle);
        ctx.globalAlpha = b.opacity;

        // Bean Body
        ctx.beginPath();
        // Slightly curved oval kidney bean silhouette
        const rw = b.size * 0.6;
        const rh = b.size;
        ctx.ellipse(0, 0, rw, rh, 0, 0, Math.PI * 2);

        // Gradient for glossy botanical bean volume
        const grad = ctx.createRadialGradient(-rw * 0.3, -rh * 0.3, 1, 0, 0, rh);
        grad.addColorStop(0, '#f87171');
        grad.addColorStop(0.35, b.color);
        grad.addColorStop(1, '#450a0a');
        ctx.fillStyle = grad;
        ctx.shadowColor = 'rgba(185, 28, 28, 0.4)';
        ctx.shadowBlur = 6;
        ctx.fill();

        // White Hilum (豆脐微白斑点，红豆特有特征)
        ctx.beginPath();
        ctx.ellipse(-rw * 0.4, 0, rw * 0.22, rh * 0.35, 0.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(254, 242, 242, 0.75)';
        ctx.shadowBlur = 0;
        ctx.fill();

        // Glossy Specular Highlight Dot
        ctx.beginPath();
        ctx.arc(rw * 0.2, -rh * 0.35, rw * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fill();

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = {
        x: clientX - rect.left,
        y: clientY - rect.top,
        active: true
      };
    };

    const handlePointerLeave = () => {
      pointerRef.current.active = false;
    };

    const el = canvas.parentElement;
    if (el) {
      el.addEventListener('mousemove', handlePointerMove);
      el.addEventListener('touchmove', handlePointerMove);
      el.addEventListener('mouseleave', handlePointerLeave);
      el.addEventListener('touchend', handlePointerLeave);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (el) {
        el.removeEventListener('mousemove', handlePointerMove);
        el.removeEventListener('touchmove', handlePointerMove);
        el.removeEventListener('mouseleave', handlePointerLeave);
        el.removeEventListener('touchend', handlePointerLeave);
      }
      cancelAnimationFrame(animId);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-20 ${className}`}
    />
  );
};
