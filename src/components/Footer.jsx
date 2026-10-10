import React from 'react';
import { Zap, MapPin, Mail, Phone, Instagram, Youtube, Github, MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="modern-footer">
      <div className="footer-top">
        {/* Column 1: Brand & About */}
        <div className="footer-col brand-col">
          <div className="footer-logo-row">
            <Zap size={20} color="var(--neon-cyan)" />
            <h2 className="footer-brand-name">
              VORTEX <span className="footer-year">2026</span>
            </h2>
          </div>
          
          <h3 className="footer-tagline">Your Campus, Your Matrix.</h3>
          
          <p className="footer-description">
            Annual National Cultural & Tech Festival hosted by Vortex Institute of Technology & Arts. 
            An open platform celebrating student innovation, gaming, competitive programming, and digital arts.
          </p>
          
          <div className="social-row">
            <a href="#" className="social-btn"><Instagram size={18} /></a>
            <a href="#" className="social-btn"><Youtube size={18} /></a>
            <a href="#" className="social-btn"><MessageSquare size={18} /></a>
            <a href="#" className="social-btn"><Github size={18} /></a>
          </div>
        </div>

        {/* Column 2: Navigation */}
        <div className="footer-col nav-col">
          <h3 className="footer-heading">Fest Navigation</h3>
          <ul className="footer-links">
            <li><a href="#">Festival Home & Countdown</a></li>
            <li><a href="#">All Events & Discovery</a></li>
            <li><a href="#">My Local Registrations</a></li>
            <li><a href="#">Schedule & Highlights</a></li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div className="footer-col contact-col">
          <h3 className="footer-heading">Campus & Inquiries</h3>
          <ul className="footer-contact-list">
            <li>
              <MapPin size={18} className="contact-icon" />
              <span>
                Vortex Institute of Technology & Arts<br/>
                Cyber Valley Boulevard, Innovation Campus,<br/>
                Bangalore, Karnataka - 560100
              </span>
            </li>
            <li>
              <Mail size={18} className="contact-icon" />
              <a href="mailto:support@vortexfest.edu" className="contact-link">support@vortexfest.edu</a>
            </li>
            <li>
              <Phone size={18} className="contact-icon" />
              <span>+91 (080) 4567-8900</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}