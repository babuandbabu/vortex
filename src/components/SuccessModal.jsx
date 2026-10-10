import React, { useEffect, useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import Lottie from 'lottie-react';

export default function SuccessModal({ studentName, eventName, onClose }) {
  const [animationData, setAnimationData] = useState(null);
  const [lottieFailed, setLottieFailed] = useState(false);

  useEffect(() => {
    // Fetch a lightweight public success Lottie JSON
    // If it fails (CORS or network), we gracefully fallback to a standard icon
    fetch('https://assets3.lottiefiles.com/packages/lf20_touohxv0.json')
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch(() => setLottieFailed(true));
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content success-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="success-animation-container">
          {animationData && !lottieFailed ? (
            <Lottie 
              animationData={animationData} 
              loop={false} 
              style={{ width: 150, height: 150, margin: '0 auto' }} 
            />
          ) : (
            <CheckCircle size={80} color="var(--success)" style={{ margin: '2rem auto' }} />
          )}
        </div>

        <h2 className="modal-title" style={{ color: 'var(--success)', textAlign: 'center' }}>
          Registration Successful!
        </h2>
        
        <p className="success-message">
          Awesome, <span className="highlight-name">{studentName}</span>! 
          You are now registered for <span className="highlight-event">{eventName}</span>.
        </p>
        
        <button className="submit-btn" onClick={onClose} style={{ marginTop: '2rem' }}>
          Close
        </button>
      </div>
    </div>
  );
}