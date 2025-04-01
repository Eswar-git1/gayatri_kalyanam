import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CountdownTime, Language, translations } from '../types';

interface Props {
  language: Language;
}

const WEDDING_DATE = new Date('2025-05-15T00:00:00');

export const CountdownTimer: React.FC<Props> = ({ language }) => {
  const [time, setTime] = useState<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +WEDDING_DATE - +new Date();
      
      if (difference > 0) {
        setTime({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const t = translations[language];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
      {Object.entries(time).map(([key, value], index) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center"
        >
          <div className="text-4xl md:text-5xl font-serif text-deep-rose mb-2">
            {String(value).padStart(2, '0')}
          </div>
          <div className="text-sm md:text-base text-gray-600 font-medium">
            {t[key as keyof typeof time]}
          </div>
        </motion.div>
      ))}
    </div>
  );
};