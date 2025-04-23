import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../../../presentation/styles/main.css';

const EasyParkingPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedSpace, setSelectedSpace] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleSpaceSelect = (spaceId) => {
    setSelectedSpace(spaceId);
  };

  const handleReserve = () => {
    if (selectedSpace) {
      // TODO: Implement reservation logic
      alert(`Reserved space ${selectedSpace}`);
      navigate('/profile');
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="easy-parking-container">
      <div className="profile-header">
        <div className="header-content">
          <div className="logo-section">
            <h1>Find Parking</h1>
            <p className="welcome-text">Select a parking space</p>
          </div>
          <div className="nav">
            <button onClick={() => navigate('/profile')} className="btn btn-secondary">
              Back to Profile
            </button>
          </div>
        </div>
      </div>

      <div className="parking-view">
        <div className="parking-grid">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className={`parking-space ${i % 3 === 0 ? 'occupied' : 'available'} ${
                selectedSpace === `A${i + 1}` ? 'selected' : ''
              }`}
              onClick={() => i % 3 !== 0 && handleSpaceSelect(`A${i + 1}`)}
            >
              <span className="space-number">A{i + 1}</span>
              <span className="space-status">{i % 3 === 0 ? 'Occupied' : 'Available'}</span>
            </div>
          ))}
        </div>

        <div className="reservation-panel">
          <h2>Selected Space</h2>
          {selectedSpace ? (
            <>
              <div className="selected-space-info">
                <p className="space-number">{selectedSpace}</p>
                <p className="space-location">North Wing, Level 1</p>
              </div>
              <button className="btn btn-primary reserve-btn" onClick={handleReserve}>
                Reserve Now
              </button>
            </>
          ) : (
            <p className="no-selection">Please select a parking space</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EasyParkingPage; 