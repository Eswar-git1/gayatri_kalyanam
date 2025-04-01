import confetti from 'canvas-confetti';

export const triggerConfetti = () => {
  const duration = 3 * 1000;
  const end = Date.now() + duration;

  const colors = ['#FF69B4', '#FFB6C1', '#FFC0CB'];

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
};