import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CursorEffect: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed w-8 h-8 rounded-full border-2 border-deep-rose pointer-events-none z-50"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        scale: [1, 1.2, 1],
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
      }}
    />
  );
};