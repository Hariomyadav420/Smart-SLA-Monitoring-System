import React, { useState, useEffect } from 'react';

const Timer = ({ ticket }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTime = () => {
      // Backend se aayi hui date ko parse karein
      const deadline = new Date(ticket.deadline).getTime();
      const now = new Date().getTime();
      const diff = deadline - now;

      if (diff <= 0) {
        setTimeLeft('BREACHED');
        return;
      }

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      // Agar values valid hain tabhi dikhayein
      if (isNaN(h)) {
        setTimeLeft('Calculating...');
      } else {
        setTimeLeft(`${h}h ${m}m ${s}s`);
      }
    };

    const timer = setInterval(calculateTime, 1000);
    calculateTime(); // Initial call
    return () => clearInterval(timer);
  }, [ticket.deadline]);

  return (
    <span style={{ 
      fontWeight: 'bold', 
      color: timeLeft === 'BREACHED' ? '#e53e3e' : '#2d3748',
      fontFamily: 'monospace'
    }}>
      {timeLeft}
    </span>
  );
};

export default Timer;