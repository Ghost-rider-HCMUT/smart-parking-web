import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../presentation/styles/main.css';

const MobileFriendlyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="header">
        <div className="header-content">
          <h1>Mobile Friendly</h1>
          <div className="nav">
            <button onClick={() => navigate('/')} className="btn btn-secondary">
              Back to Home
            </button>
          </div>
        </div>
      </div>

      <div className="mobile-features">
        <div className="feature-grid">
          <div className="feature-item">
            <div className="feature-icon">📱</div>
            <h3>Mobile App</h3>
            <p>Download our mobile app for iOS and Android</p>
            <button className="btn btn-primary">Download App</button>
          </div>

          <div className="feature-item">
            <div className="feature-icon">🔔</div>
            <h3>Push Notifications</h3>
            <p>Get instant alerts about parking availability</p>
          </div>

          <div className="feature-item">
            <div className="feature-icon">📍</div>
            <h3>Location Services</h3>
            <p>Find parking spots near your current location</p>
          </div>

          <div className="feature-item">
            <div className="feature-icon">⏰</div>
            <h3>Time Management</h3>
            <p>Set reminders for your parking duration</p>
          </div>
        </div>

        <div className="app-preview">
          <h2>App Preview</h2>
          <div className="preview-container">
            <div className="phone-frame">
              <div className="phone-screen">
                <img src="https://via.placeholder.com/300x600" alt="App Preview" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileFriendlyPage; 