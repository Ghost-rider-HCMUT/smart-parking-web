import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import API_CONFIG from '../../../core/infrastructure/config/api.config';
import '../../../presentation/styles/main.css';

const EasyParkingPage = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [parkingSpots, setParkingSpots] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [numberOfMonths, setNumberOfMonths] = useState(1);
  const [registrationLoading, setRegistrationLoading] = useState(false);

  useEffect(() => {
    const fetchParkingSpots = async () => {
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PARKING_LOT}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        if (data.code === 1000) {
          setParkingSpots(data.result);
        } else {
          setError(data.message || 'Failed to fetch parking spots');
        }
      } catch (err) {
        console.error('Parking spots fetch error:', err);
        setError('Failed to fetch parking spots');
      } finally {
        setLoading(false);
      }
    };

    fetchParkingSpots();
  }, [token, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleSpotSelection = (spot) => {
    if (spot.status === 'OPEN') {
      setSelectedSpot(spot);
    }
  };

  const handleMonthChange = (e) => {
    setNumberOfMonths(parseInt(e.target.value));
  };

  const handleRegister = async () => {
    if (!selectedSpot) return;
    
    setRegistrationLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REGISTER_PARKING}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          location: selectedSpot.id,
          numberOfMonths: numberOfMonths.toString()
        })
      });

      const data = await response.json();
      if (data.code === 1000 && data.result && data.result.linkQrPayment) {
        // Redirect to payment link
        window.location.href = data.result.linkQrPayment;
      } else {
        setError(data.message || 'Failed to register parking spot');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Failed to register parking spot');
    } finally {
      setRegistrationLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="easy-parking-container">
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <h1>Smart Parking</h1>
            <p className="welcome-text">Easy Parking Registration</p>
          </div>
          <div className="nav">
            <button onClick={() => navigate('/')} className="btn btn-primary">
              Home
            </button>
            <button onClick={() => navigate('/profile')} className="btn btn-primary">
              Profile
            </button>
            <button onClick={handleLogout} className="btn btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="parking-content">
        <h2>Available Parking Spots</h2>
        <div className="parking-grid">
          {parkingSpots.map((spot) => (
            <div
              key={spot.id}
              className={`parking-spot ${spot.status.toLowerCase()} ${selectedSpot?.id === spot.id ? 'selected' : ''}`}
              onClick={() => handleSpotSelection(spot)}
            >
              <div className="spot-id">{spot.id}</div>
              <div className="spot-price">{spot.price.toLocaleString()} VND</div>
              <div className="spot-status">{spot.status}</div>
            </div>
          ))}
        </div>

        {selectedSpot && (
          <div className="registration-section">
            <h3>Selected Spot: {selectedSpot.id}</h3>
            <p>Price: {selectedSpot.price.toLocaleString()} VND</p>
            
            <div className="month-selection">
              <label htmlFor="months">Number of Months:</label>
              <select 
                id="months" 
                value={numberOfMonths} 
                onChange={handleMonthChange}
                className="month-select"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
                  <option key={month} value={month}>{month} {month === 1 ? 'Month' : 'Months'}</option>
                ))}
              </select>
            </div>
            
            <div className="total-amount">
              <p>Total Amount: {(selectedSpot.price * numberOfMonths).toLocaleString()} VND</p>
            </div>
            
            <button 
              onClick={handleRegister} 
              className="btn btn-primary register-btn"
              disabled={registrationLoading}
            >
              {registrationLoading ? 'Processing...' : 'Register for this Spot'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EasyParkingPage; 