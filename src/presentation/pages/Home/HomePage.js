import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../../../presentation/styles/main.css';

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-content">
          <div className="logo-section">
            <h1>Smart Parking</h1>
            <p className="welcome-text">Welcome to Smart Parking System</p>
          </div>
          <nav className="nav">
            {isAuthenticated ? (
              <button onClick={handleLogout} className="btn btn-secondary">
                Logout
              </button>
            ) : (
              <>
                <button onClick={() => navigate('/login')} className="btn btn-primary">
                  Login
                </button>
                <button onClick={() => navigate('/register')} className="btn btn-secondary">
                  Register
                </button>
              </>
            )}
          </nav>
          <div className="mobile-menu">
            <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}>
              {isAuthenticated ? (
                <button onClick={handleLogout} className="btn btn-secondary">
                  Logout
                </button>
              ) : (
                <>
                  <button onClick={() => navigate('/login')} className="btn btn-primary">
                    Login
                  </button>
                  <button onClick={() => navigate('/register')} className="btn btn-secondary">
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <div className="hero-section">
        <h1>Smart Parking System</h1>
        <p className="hero-subtitle">Find and reserve parking spaces with ease</p>
      </div>

      <div className="features-section">
        <Link to="/easy-parking" className="feature-card">
          <div className="feature-icon">🚗</div>
          <h3>Easy Parking</h3>
          <p>Find available parking spaces in real-time</p>
        </Link>
        <Link to="/mobile-friendly" className="feature-card">
          <div className="feature-icon">📱</div>
          <h3>Mobile Friendly</h3>
          <p>Book parking spaces from your smartphone</p>
        </Link>
        <Link to="/smart-pricing" className="feature-card">
          <div className="feature-icon">💰</div>
          <h3>Smart Pricing</h3>
          <p>Pay only for the time you park</p>
        </Link>
      </div>

      <div className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Find a Space</h3>
            <p>Search for available parking spaces near your destination</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Book Online</h3>
            <p>Reserve your spot with just a few clicks</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Park & Go</h3>
            <p>Park your car and enjoy your day</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 