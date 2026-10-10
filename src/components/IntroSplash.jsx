import React, { useState, useEffect } from 'react';

export default function IntroSplash({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 5) + 2; 
      currentProgress = Math.min(currentProgress + increment, 100);
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsLoaded(true);
      }
    }, 80);

    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 800); 
  };

  return (
    <div className={`cyber-splash-container ${isExiting ? 'fade-exit' : ''}`}>
      {/* Background Radiating Burst */}
      <div className="bg-burst"></div>
      <div className="bg-grid"></div>

      {/* --- HUD: TOP LEFT --- */}
      <div className="hud-top-left">
        <div className="hud-text-row">
          <span>INITIALIZING FESTIVAL MATRIX...</span>
          <span className="hud-percent">{progress}%</span>
        </div>
        <div className="hud-progress-track">
          <div className="hud-progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="hud-subtext">CONNECTING COGNITIVE MODULES...</div>
      </div>

      {/* --- HUD: TOP RIGHT --- */}
      <div className="hud-top-right">
        <div className="mock-code">
          <div className="code-line w-100"></div>
          <div className="code-line w-75"></div>
          <div className="code-line w-50"></div>
          <div className="code-line w-80"></div>
          <div className="code-line w-60"></div>
        </div>
        <div className="cyber-ring-widget">
          <div className="ring-outer"></div>
          <div className="ring-inner"></div>
        </div>
      </div>

      {/* --- HUD: BOTTOM LEFT --- */}
      <div className="hud-bottom-left">
        <div className="cyber-ring-widget small">
          <div className="ring-outer"></div>
          <div className="ring-inner"></div>
        </div>
        <div className="mock-code">
          <div className="code-line w-60"></div>
          <div className="code-line w-80"></div>
          <div className="code-line w-40"></div>
          <div className="code-line w-90"></div>
          <div className="code-line w-50"></div>
        </div>
      </div>

      {/* --- HUD: BOTTOM RIGHT (SOUNDWAVE) --- */}
      <div className="hud-bottom-right">
        <div className="soundwave-box">
          <div className="soundwave-bars">
            {[...Array(30)].map((_, i) => (
              <div key={i} className="bar" style={{ animationDelay: `${Math.random() * 0.5}s` }}></div>
            ))}
          </div>
          <div className="soundwave-label">SOUNDWAVE VISUILE:</div>
        </div>
      </div>

      {/* --- CENTERPIECE: MECHANICAL CREST & NAMEPLATE --- */}
      <div className="center-showcase">
        
        {/* Massive Background Rings */}
        <div className="crest-rings">
          <div className="crest-ring purple-glow pulse-rotate"></div>
          <div className="crest-ring cyan-dash counter-rotate"></div>
          <div className="crest-ring cyan-solid"></div>
          
          {/* Inner mechanical 'V' gear structure */}
          <div className="inner-gear">
            <div className="gear-teeth"></div>
            <div className="crest-v">V</div>
          </div>
        </div>

        {/* Overlapping Tech Nameplate */}
        <div className="tech-nameplate">
          <div className="nameplate-bracket left"></div>
          <div className="nameplate-bracket right"></div>
          
          <h1 className="nameplate-title">VORTEX '26</h1>
          <h2 className="nameplate-subtitle">THE ULTIMATE NEON CYBER-FEST</h2>
        </div>
      </div>

      {/* --- BOTTOM CENTER: CTA BUTTON --- */}
      <div className="cta-wrapper">
        {isLoaded ? (
          <button className="cyber-outline-btn" onClick={handleEnter}>
            ENTER THE VOID
          </button>
        ) : (
          <div className="system-locking">SYSTEM LOCK ENGAGED</div>
        )}
      </div>

    </div>
  );
}