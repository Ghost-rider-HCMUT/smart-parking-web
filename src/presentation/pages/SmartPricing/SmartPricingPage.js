import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../presentation/styles/main.css';

const SmartPricingPage = () => {
  const navigate = useNavigate();
  const [hours, setHours] = useState(1);

  const calculatePrice = (hours) => {
    const baseRate = 5; // $5 per hour
    const discount = hours >= 4 ? 0.2 : hours >= 2 ? 0.1 : 0; // 20% off for 4+ hours, 10% for 2+ hours
    const total = baseRate * hours;
    const finalPrice = total - (total * discount);
    return finalPrice.toFixed(2);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="header-content">
          <h1>Smart Pricing</h1>
          <div className="nav">
            <button onClick={() => navigate('/')} className="btn btn-secondary">
              Back to Home
            </button>
          </div>
        </div>
      </div>

      <div className="pricing-section">
        <div className="pricing-calculator">
          <h2>Calculate Your Parking Cost</h2>
          <div className="calculator-form">
            <div className="form-group">
              <label className="form-label">Parking Duration (hours)</label>
              <input
                type="range"
                min="1"
                max="24"
                value={hours}
                onChange={(e) => setHours(parseInt(e.target.value))}
                className="form-range"
              />
              <div className="range-value">{hours} hours</div>
            </div>
            <div className="price-display">
              <h3>Estimated Cost</h3>
              <div className="price">${calculatePrice(hours)}</div>
            </div>
          </div>
        </div>

        <div className="pricing-features">
          <h2>Our Pricing Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⏰</div>
              <h3>Hourly Rates</h3>
              <p>Pay only for the time you park</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Bulk Discounts</h3>
              <p>Save up to 20% for longer stays</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Peak Pricing</h3>
              <p>Dynamic rates based on demand</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💳</div>
              <h3>Easy Payment</h3>
              <p>Multiple payment options available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartPricingPage; 