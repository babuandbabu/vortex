import React from 'react';
import { Calendar, Clock, MapPin, Ban, Terminal, Music, Gamepad2, Wrench, Sparkles, ChevronRight } from 'lucide-react';

export default function EventCard({ event, onRegisterClick }) {
  const isFull = event.availableSeats === 0;
  const isLow = event.availableSeats > 0 && event.availableSeats <= 10;
  const availabilityPercent = (event.availableSeats / event.totalSeats) * 100;

  const getCategoryTheme = (category) => {
    const cat = category.toLowerCase();
    if (cat.includes('tech') || cat.includes('code')) return 'tech';
    if (cat.includes('cultural') || cat.includes('music') || cat.includes('dance')) return 'cultural';
    if (cat.includes('gaming')) return 'gaming';
    if (cat.includes('workshop')) return 'workshop';
    return 'default';
  };

  const getCategoryIcon = (theme) => {
    switch(theme) {
      case 'tech': return <Terminal size={72} strokeWidth={1.2} />;
      case 'cultural': return <Music size={72} strokeWidth={1.2} />;
      case 'gaming': return <Gamepad2 size={72} strokeWidth={1.2} />;
      case 'workshop': return <Wrench size={72} strokeWidth={1.2} />;
      default: return <Sparkles size={72} strokeWidth={1.2} />;
    }
  };

  const theme = getCategoryTheme(event.category);

  return (
    <div className={`event-card op-card ${isFull ? 'full' : ''}`}>
      
      {/* TOP HALF: Cinematic Banner */}
      <div className={`card-banner banner-${theme}`}>
        <div className={`banner-art art-${theme}`}></div>
        <div className="banner-scanline-overlay"></div>
        
        <div className="banner-icon-wrapper">
          {getCategoryIcon(theme)}
        </div>
        
        <div className="banner-badges">
          <span className="badge-category op-badge">{event.category}</span>
          {isFull ? (
            <span className="badge-status sold-out">SYS: OFFLINE</span>
          ) : isLow ? (
            <span className="badge-status low-stock">CRITICAL: {event.availableSeats} LEFT</span>
          ) : null}
        </div>
      </div>
      
      {/* BOTTOM HALF: Upgraded Details */}
      <div className="card-content op-content">
        <div className="card-title-group">
          <span className="event-type-label">// {event.category} PROTOCOL</span>
          <h3 className="event-title op-title">{event.name}</h3>
          <p className="event-description op-desc">{event.description}</p>
        </div>
        
        <div className="event-details-minimal op-details">
          <div className="detail-item">
            <Calendar size={16} className="detail-icon" /> <span>{event.date}</span>
          </div>
          <div className="detail-item">
            <Clock size={16} className="detail-icon" /> <span>{event.time}</span>
          </div>
          <div className="detail-item">
            <MapPin size={16} className="detail-icon" /> <span>{event.venue}</span>
          </div>
        </div>
        
        {/* Laser Progress Bar */}
        <div className="availability-section op-avail">
          <div className="availability-text">
            <span>SEAT CAPACITY  </span>
            <span className={isFull ? 'text-danger' : isLow ? 'text-warning' : 'text-success'}>
              {isFull ? 'CAPACITY REACHED' : `${event.availableSeats} / ${event.totalSeats} ONLINE`}
            </span>
          </div>
          <div className="availability-track op-track">
            <div 
              className={`availability-fill op-fill ${isFull ? 'fill-danger' : isLow ? 'fill-warning' : 'fill-success'}`}
              style={{ width: `${availabilityPercent}%` }}
            ></div>
          </div>
        </div>
        
        {/* OP Highlighted Button */}
        <button 
          className="register-btn-full op-btn" 
          disabled={isFull}
          onClick={() => onRegisterClick(event)}
        >
          <div className="btn-shine"></div>
          {isFull ? (
            <span className="flex-center"><Ban size={18} /> ACCESS DENIED</span>
          ) : (
            <span className="flex-center btn-content">SECURE TICKET <ChevronRight size={18} className="btn-arrow" /></span>
          )}
        </button>
      </div>

    </div>
  );
}