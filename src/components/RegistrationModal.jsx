import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function RegistrationModal({ event, onClose, onSubmit, registrations }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    } else if (registrations) {
      // Prevent duplicate registrations for the same event using the email address
      const isDuplicate = registrations.some(
        (r) => r.eventId === event.id && r.email && r.email.toLowerCase() === formData.email.toLowerCase()
      );
      if (isDuplicate) {
        newErrors.email = 'This email is already registered for this event.';
      }
    }
    
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  if (!event) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        
        <h2 className="modal-title">Register for <span className="text-neon">{event.name}</span></h2>
        
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className={errors.name ? 'error-input' : ''}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className={errors.email ? 'error-input' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input 
              type="text" 
              placeholder="9876543210"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className={errors.phone ? 'error-input' : ''}
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>

          <button type="submit" className="submit-btn">Confirm Registration</button>
        </form>
      </div>
    </div>
  );
}