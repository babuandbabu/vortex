import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FilterBar from './components/FilterBar';
import EventCard from './components/EventCard';
import RegistrationModal from './components/RegistrationModal';
import SuccessModal from './components/SuccessModal';
import CountdownTimer from './components/CountdownTimer';
import IntroSplash from './components/IntroSplash';
import { dummyEvents } from './data/events';
import { Calendar, Clock, MapPin, Trash2 } from 'lucide-react';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('vortex_events');
    return saved ? JSON.parse(saved) : dummyEvents;
  });

  const [registrations, setRegistrations] = useState(() => {
    const saved = localStorage.getItem('vortex_registrations');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('vortex_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('vortex_registrations', JSON.stringify(registrations));
  }, [registrations]);

  const [view, setView] = useState('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [registeringEvent, setRegisteringEvent] = useState(null);
  const [successData, setSuccessData] = useState(null);

  const categories = useMemo(() => {
    const cats = new Set(events.map(e => e.category));
    return ['All', ...Array.from(cats)];
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [events, searchQuery, selectedCategory]);

  const handleRegistrationSubmit = (formData) => {
    setEvents(prevEvents => 
      prevEvents.map(evt => {
        if (evt.id === registeringEvent.id && evt.availableSeats > 0) {
          return { ...evt, availableSeats: evt.availableSeats - 1 };
        }
        return evt;
      })
    );

    const ticketId = 'VTX-' + Math.random().toString(36).substr(2, 6).toUpperCase();
    
    setRegistrations(prev => [
      {
        ticketId,
        eventId: registeringEvent.id,
        eventName: registeringEvent.name,
        date: registeringEvent.date,
        time: registeringEvent.time,
        venue: registeringEvent.venue,
        attendeeName: formData.name,
        email: formData.email,
        phone: formData.phone
      },
      ...prev
    ]);

    setSuccessData({
      studentName: formData.name,
      eventName: registeringEvent.name
    });
    
    setRegisteringEvent(null);
  };

  // NEW: Cancel Ticket Logic
  const handleCancelTicket = (ticketId, eventId) => {
    if (window.confirm("Are you sure you want to cancel this ticket?")) {
      // 1. Remove from registrations
      setRegistrations(prev => prev.filter(ticket => ticket.ticketId !== ticketId));
      
      // 2. Add the seat back to the event
      setEvents(prevEvents => 
        prevEvents.map(evt => {
          if (evt.id === eventId) {
            return { ...evt, availableSeats: evt.availableSeats + 1 };
          }
          return evt;
        })
      );
    }
  };

  if (showSplash) {
    return <IntroSplash onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="app-container">
      <Header view={view} setView={setView} />
      
      <main className="main-content">
        {view === 'browse' ? (
          <>
            <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              Welcome to the Fest. <span className="text-neon">Find your vibe.</span>
            </h2>
            
            <CountdownTimer />
            
            <FilterBar 
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            {filteredEvents.length > 0 ? (
              <div className="event-grid">
                {filteredEvents.map(event => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    onRegisterClick={setRegisteringEvent} 
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <h3>No events found</h3>
                <p>Try adjusting your search or category filter.</p>
              </div>
            )}
          </>
        ) : (
          <>
            <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>
              Your <span className="text-neon">Tickets</span>
            </h2>
            
            {registrations.length > 0 ? (
              <div className="tickets-grid">
                {registrations.map(ticket => (
                  <div key={ticket.ticketId} className="ticket-card">
                    <div className="ticket-header">
                      <span className="attendee-name">{ticket.attendeeName}</span>
                      <span className="ticket-id">{ticket.ticketId}</span>
                    </div>
                    <h3 className="event-title">{ticket.eventName}</h3>
                    <div className="event-details" style={{ background: 'transparent', padding: 0 }}>
                      <div className="detail-item"><Calendar size={16} /> {ticket.date}</div>
                      <div className="detail-item"><Clock size={16} /> {ticket.time}</div>
                      <div className="detail-item"><MapPin size={16} /> {ticket.venue}</div>
                    </div>
                    {/* NEW: Cancel Button Area */}
                    <div className="ticket-actions">
                      <button 
                        className="cancel-ticket-btn"
                        onClick={() => handleCancelTicket(ticket.ticketId, ticket.eventId)}
                      >
                        <Trash2 size={14} /> Cancel Ticket
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <h3>No tickets yet</h3>
                <p>Head back to the events page and register for something awesome!</p>
                <button 
                  className="submit-btn" 
                  style={{ marginTop: '1rem' }}
                  onClick={() => setView('browse')}
                >
                  Browse Events
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />

      {registeringEvent && (
        <RegistrationModal 
          event={registeringEvent} 
          onClose={() => setRegisteringEvent(null)}
          onSubmit={handleRegistrationSubmit}
          registrations={registrations}
        />
      )}

      {successData && (
        <SuccessModal 
          studentName={successData.studentName}
          eventName={successData.eventName}
          onClose={() => setSuccessData(null)}
        />
      )}
    </div>
  );
}

export default App;