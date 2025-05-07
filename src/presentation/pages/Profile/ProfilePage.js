import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import API_CONFIG from '../../../core/infrastructure/config/api.config';
import '../../../presentation/styles/main.css';

const ProfilePage = () => {
  const { token, logout, refreshToken } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Try to refresh token first
        const isTokenValid = await refreshToken();
        if (!isTokenValid) {
          navigate('/login');
          return;
        }

        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PROFILE}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        if (data.code === 1000) {
          setProfileData(data.result);
        } else {
          setError(data.message || 'Failed to fetch profile data');
        }
      } catch (err) {
        console.error('Profile fetch error:', err);
        setError('Failed to fetch profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [token, navigate, refreshToken]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  function formatDateTime(input) {
    const date = new Date(input);
    const pad = n => String(n).padStart(2, '0');
  
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1); // tháng bắt đầu từ 0
    const year = date.getFullYear();
  
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
  
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }
  

  return (
    <div className="profile-container">
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <h1>Smart Parking</h1>
            <p className="welcome-text">Profile Information</p>
          </div>
          <div className="nav">
            <button onClick={() => navigate('/')} className="btn btn-primary">
              Home
            </button>
            <button onClick={handleLogout} className="btn btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="profile-content">
        <div className="profile-info">
          <h2>Personal Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Full Name:</label>
              <span>{profileData?.fullName || 'N/A'}</span>
            </div>
            <div className="info-item">
              <label>Username:</label>
              <span>{profileData?.username || 'N/A'}</span>
            </div>
            <div className="info-item">
              <label>Phone Number:</label>
              <span>{profileData?.phoneNumber || 'N/A'}</span>
            </div>
            <div className="info-item">
              <label>Start Time:</label>
              <span>{formatDateTime(profileData?.startTime)}</span>
            </div>
          </div>
        </div>

        {profileData?.status === 'ACTIVE' ? (
          <div className="parking-info">
            <h2>Parking Registration</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Rental Location:</label>
                <span>{profileData?.rentalLocation?.id || 'N/A'}</span>
              </div>
              <div className="info-item">
                <label>License Plate Number:</label>
                <span>{profileData?.licensePlateNumber || 'N/A'}</span>
              </div>
              <div className="info-item">
                <label>Months:</label>
                <span>{profileData?.months || 'N/A'}</span>
              </div>
              <div className="info-item">
                <label>Start Time:</label>
                <span>{formatDateTime(profileData?.startTime) || 'N/A'}</span>
              </div>
            </div>

            <div className="payment-history">
              <h3>Payment History</h3>
              {profileData?.payments && profileData.payments.length > 0 ? (
                <div className="payment-list">
                  {profileData.payments.map((payment, index) => (
                    <div key={index} className="payment-item">
                      <div className="payment-date">{payment.date}</div>
                      <div className="payment-amount">{payment.amount.toLocaleString()} VND</div>
                      <div className={`payment-status ${payment.status.toLowerCase()}`}>
                        {payment.status}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No payment history available</p>
              )}
            </div>
          </div>
        ) : (
          <div className="no-parking">
            <h2>No Active Parking Registration</h2>
            <p>You currently don't have an active parking registration.</p>
            <button 
              onClick={() => navigate('/easy-parking')} 
              className="btn btn-primary"
            >
              Register for Parking
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage; 