import React from 'react';
import { useEffect, useRef } from 'react';

export const ParticlesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      rotation: number;
      type: 'heart' | 'leaf' | 'flower1' | 'flower2'
    }> = [];

    const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      ctx.moveTo(0, size / 4);
      ctx.bezierCurveTo(size / 4, -size / 4, size, -size / 4, size, size / 4);
      ctx.bezierCurveTo(size, size / 2, 0, size, 0, size / 4);
      ctx.bezierCurveTo(0, size / 2, -size, size / 2, -size, size / 4);
      ctx.bezierCurveTo(-size, -size / 4, -size / 4, -size / 4, 0, size / 4);
      ctx.fill();
      ctx.restore();
    };

    const drawLeaf = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.bezierCurveTo(size, -size/2, size/2, size/2, 0, size);
      ctx.bezierCurveTo(-size/2, size/2, -size, -size/2, 0, -size);
      ctx.fill();
      ctx.restore();
    };

    // Add flower drawing functions
    const drawFlower1 = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.ellipse(0, -size/2, size/3, size/2, (i * Math.PI * 2) / 5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    const drawFlower2 = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        ctx.arc(size/2, 0, size/3, 0, Math.PI * 2);
        ctx.fill();
        ctx.rotate(Math.PI / 3);
      }
      ctx.restore();
    };

    // Create particles (12 hearts, 8 leaves, 5 of each flower type)
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 6 + 4, // Reduced size
        speedX: Math.random() * 0.4 - 0.2,
        speedY: Math.random() * 0.4 - 0.2,
        opacity: Math.random() * 0.3 + 0.3,
        rotation: Math.random() * Math.PI * 2,
        type: i < 12 ? 'heart' : 
              i < 20 ? 'leaf' : 
              i < 25 ? 'flower1' : 'flower2'
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        switch (particle.type) {
          case 'heart':
            ctx.fillStyle = `rgba(255, 105, 180, ${particle.opacity})`; // Hot pink
            drawHeart(ctx, particle.x, particle.y, particle.size, particle.rotation);
            break;
          case 'leaf':
            ctx.fillStyle = `rgba(144, 238, 144, ${particle.opacity})`; // Light green
            drawLeaf(ctx, particle.x, particle.y, particle.size, particle.rotation);
            break;
          case 'flower1':
            ctx.fillStyle = `rgba(255, 223, 0, ${particle.opacity})`; // Golden yellow
            drawFlower1(ctx, particle.x, particle.y, particle.size, particle.rotation);
            break;
          case 'flower2':
            ctx.fillStyle = `rgba(147, 112, 219, ${particle.opacity})`; // Purple
            drawFlower2(ctx, particle.x, particle.y, particle.size, particle.rotation);
            break;
        }

        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.rotation += particle.type === 'leaf' ? 0.02 : 0.01;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-50"
    />
  );
};