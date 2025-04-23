import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './presentation/contexts/AuthContext';
import ProtectedRoute from './presentation/components/auth/ProtectedRoute';
import HomePage from './presentation/pages/Home/HomePage';
import LoginPage from './presentation/pages/Login/LoginPage';
import RegisterPage from './presentation/pages/Register/RegisterPage';
import ProfilePage from './presentation/pages/Profile/ProfilePage';
import EasyParkingPage from './presentation/pages/EasyParking/EasyParkingPage';
import MobileFriendlyPage from './presentation/pages/MobileFriendly/MobileFriendlyPage';
import SmartPricingPage from './presentation/pages/SmartPricing/SmartPricingPage';
import './presentation/styles/main.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/easy-parking" element={<EasyParkingPage />} />
          <Route path="/mobile-friendly" element={<MobileFriendlyPage />} />
          <Route path="/smart-pricing" element={<SmartPricingPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
