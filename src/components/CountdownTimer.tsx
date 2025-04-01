import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Language } from '../types';
import { translations } from '../types';

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-md"
      >
        <div className="text-4xl md:text-5xl font-serif text-deep-rose mb-2 font-bold">
          {String(time.days).padStart(2, '0')}
        </div>
        <div className="text-sm md:text-base text-gray-700 font-medium uppercase tracking-wide">
          {language === 'en' ? 'Days' : 'రోజులు'}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-md"
      >
        <div className="text-4xl md:text-5xl font-serif text-deep-rose mb-2 font-bold">
          {String(time.hours).padStart(2, '0')}
        </div>
        <div className="text-sm md:text-base text-gray-700 font-medium uppercase tracking-wide">
          {language === 'en' ? 'Hours' : 'గంటలు'}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-md"
      >
        <div className="text-4xl md:text-5xl font-serif text-deep-rose mb-2 font-bold">
          {String(time.minutes).padStart(2, '0')}
        </div>
        <div className="text-sm md:text-base text-gray-700 font-medium uppercase tracking-wide">
          {language === 'en' ? 'Minutes' : 'నిమిషాలు'}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-md"
      >
        <div className="text-4xl md:text-5xl font-serif text-deep-rose mb-2 font-bold">
          {String(time.seconds).padStart(2, '0')}
        </div>
        <div className="text-sm md:text-base text-gray-700 font-medium uppercase tracking-wide">
          {language === 'en' ? 'Seconds' : 'సెకన్లు'}
        </div>
      </motion.div>
    </div>
  );
};