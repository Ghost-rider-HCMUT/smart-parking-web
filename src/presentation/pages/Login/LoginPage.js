import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../../../presentation/styles/main.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/profile');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Login</h2>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <p className="register-link">
          Don't have an account?<Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage; 