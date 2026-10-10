import React, { useState, useEffect } from 'react';

export default function CountdownTimer() {
  // Fest starts on Oct 24, 2026
  const targetDate = new Date('2026-10-24T09:00:00').getTime();
  
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => num.toString().padStart(2, '0');

  return (
    <div className="countdown-wrapper">
      <div className="countdown-container">
        <div className="time-block">
          <span className="time-value">{formatNumber(timeLeft.days)}</span>
          <span className="time-label">Days</span>
        </div>
        <div className="time-block divider">:</div>
        <div className="time-block">
          <span className="time-value">{formatNumber(timeLeft.hours)}</span>
          <span className="time-label">Hours</span>
        </div>
        <div className="time-block divider">:</div>
        <div className="time-block">
          <span className="time-value">{formatNumber(timeLeft.minutes)}</span>
          <span className="time-label">Mins</span>
        </div>
        <div className="time-block divider">:</div>
        <div className="time-block">
          <span className="time-value">{formatNumber(timeLeft.seconds)}</span>
          <span className="time-label">Secs</span>
        </div>
      </div>
    </div>
  );
}