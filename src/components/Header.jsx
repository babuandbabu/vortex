import React from 'react';
import { Zap, Ticket, Home } from 'lucide-react';

export default function Header({ view, setView }) {
  return (
    <header className="header">
      <div className="header-content">
        <div 
          className="logo-container" 
          onClick={() => setView('browse')} 
          style={{ cursor: 'pointer' }}
        >
          <Zap className="logo-icon" size={32} />
          <h1 className="logo-text">VORTEX '26</h1>
        </div>
        
        <nav className="header-nav">
          <button 
            className={`nav-btn ${view === 'browse' ? 'active' : ''}`}
            onClick={() => setView('browse')}
          >
            <Home size={18} />
            <span className="nav-text">Events</span>
          </button>
          <button 
            className={`nav-btn ${view === 'tickets' ? 'active' : ''}`}
            onClick={() => setView('tickets')}
          >
            <Ticket size={18} />
            <span className="nav-text">My Tickets</span>
          </button>
        </nav>
      </div>
    </header>
  );
}