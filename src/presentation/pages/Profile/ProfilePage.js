import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../../../presentation/styles/main.css';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="header-content">
          <div className="logo-section">
            <h1>Smart Parking</h1>
            <p className="welcome-text">My Profile</p>
          </div>
          <div className="nav">
            <button onClick={handleLogout} className="btn btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-avatar">
            <span>{user?.username?.charAt(0).toUpperCase()}</span>
          </div>
          <div className="profile-info">
            <h2>{user?.username}</h2>
            <p className="profile-email">{user?.email}</p>
          </div>
        </div>

        <div className="profile-sections">
          <div className="section-card">
            <h2>My Reservations</h2>
            <div className="reservation-list">
              <div className="reservation-item">
                <div className="reservation-info">
                  <h3>Parking Space A12</h3>
                  <p>North Wing, Level 1</p>
                  <p className="reservation-time">Today, 2:30 PM - 4:30 PM</p>
                </div>
                <div className="reservation-status active">Active</div>
              </div>
              <div className="reservation-item">
                <div className="reservation-info">
                  <h3>Parking Space B05</h3>
                  <p>South Wing, Level 2</p>
                  <p className="reservation-time">Tomorrow, 10:00 AM - 12:00 PM</p>
                </div>
                <div className="reservation-status upcoming">Upcoming</div>
              </div>
            </div>
          </div>

          <div className="section-card">
            <h2>Quick Actions</h2>
            <div className="action-buttons">
              <button className="btn btn-primary" onClick={() => navigate('/easy-parking')}>
                Find Parking
              </button>
              <button className="btn btn-secondary">
                View History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 