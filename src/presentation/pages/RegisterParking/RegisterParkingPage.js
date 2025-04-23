import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import API_CONFIG from '../../../core/infrastructure/config/api.config';
import '../../../presentation/styles/main.css';

const RegisterParkingPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    licensePlateNumber: '',
    months: 1,
    rentalLocation: ''
  });

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    setLoading(false);
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/users/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          username: token ? JSON.parse(atob(token.split('.')[1])).sub : ''
        })
      });

      const data = await response.json();
      if (data.code === 1000) {
        navigate('/profile');
      } else {
        setError(data.message || 'Failed to register parking');
      }
    } catch (err) {
      console.error('Register parking error:', err);
      setError('Failed to register parking');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="register-parking-container">
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <h1>Smart Parking</h1>
            <p className="welcome-text">Register Parking Spot</p>
          </div>
          <div className="nav">
            <button onClick={() => navigate('/')} className="btn btn-primary">
              Home
            </button>
            <button onClick={() => navigate('/profile')} className="btn btn-secondary">
              Profile
            </button>
          </div>
        </div>
      </header>

      <div className="form-container">
        <h2>Register Parking Spot</h2>
        <p className="form-description">
          Please fill in your parking details to register for a parking spot.
        </p>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="licensePlateNumber" className="form-label">License Plate Number</label>
            <input
              type="text"
              id="licensePlateNumber"
              name="licensePlateNumber"
              className="form-input"
              value={formData.licensePlateNumber}
              onChange={handleChange}
              required
              placeholder="Enter your license plate number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="months" className="form-label">Number of Months</label>
            <select
              id="months"
              name="months"
              className="form-input"
              value={formData.months}
              onChange={handleChange}
              required
            >
              <option value={1}>1 Month</option>
              <option value={3}>3 Months</option>
              <option value={6}>6 Months</option>
              <option value={12}>12 Months</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="rentalLocation" className="form-label">Parking Location</label>
            <select
              id="rentalLocation"
              name="rentalLocation"
              className="form-input"
              value={formData.rentalLocation}
              onChange={handleChange}
              required
            >
              <option value="">Select a location</option>
              <option value="A">Location A</option>
              <option value="B">Location B</option>
              <option value="C">Location C</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Registering...' : 'Register Parking Spot'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterParkingPage; 