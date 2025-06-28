import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to <span>Urban Home</span></h1>
          <p>Your trusted platform to rent, buy, or list verified properties across Ghana.</p>
          <div className="hero-buttons">
            <button className="btn primary" onClick={() => navigate('/register')}>Get Started</button>
            <button className="btn outline" onClick={() => navigate('/properties')}>Browse Properties</button>
          </div>
        </div>
        <div className="hero-image">
          <img src="/assets/house-banner.jpg" alt="Urban Home Banner" />
        </div>
      </header>

      <section className="features-section">
        <h2>Why Choose Urban Home?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>✅ Verified Listings</h3>
            <p>Every listing is reviewed and verified to avoid scams and fake properties.</p>
          </div>
          <div className="feature-card">
            <h3>🔒 Secure ID Verification</h3>
            <p>Users upload valid Ghana Cards, licenses, or passports for trust and security.</p>
          </div>
          <div className="feature-card">
            <h3>🛡️ Admin Oversight</h3>
            <p>Admins monitor activities, block malicious users, and ensure platform safety.</p>
          </div>
        </div>
      </section>

      <footer className="homepage-footer">
        <p>© 2025 Urban Home. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
