import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import API_CONFIG from '../../core/infrastructure/config/api.config';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to validate token
  const validateToken = useCallback(async (token) => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PROFILE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.code === 1000) {
        // Update user data with latest from server
        setUser(data.result);
        localStorage.setItem('user', JSON.stringify(data.result));
        return true;
      } else {
        console.error('Profile validation failed:', data.message);
        return false;
      }
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  }, []);

  // Function to refresh token
  const refreshToken = useCallback(async () => {
    try {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        return false;
      }

      const isValid = await validateToken(storedToken);
      if (isValid) {
        setToken(storedToken);
        return true;
      } else {
        // Clear invalid token
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        return false;
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      return false;
    }
  }, [validateToken]);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setError(null);
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (storedToken) {
          // Validate token before restoring
          const isValid = await validateToken(storedToken);
          if (isValid) {
            setToken(storedToken);
            if (storedUser) {
              try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
              } catch (error) {
                console.error('Error parsing stored user data:', error);
                localStorage.removeItem('user');
                setError('Failed to load user data');
              }
            }
          } else {
            // Clear invalid token
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setError('Session expired. Please login again.');
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setError('Failed to initialize authentication');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [validateToken]);

  // Add token refresh on route change
  useEffect(() => {
    const handleRouteChange = async () => {
      if (token) {
        await refreshToken();
      }
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [token, refreshToken]);

  const login = async (username, password) => {
    try {
      setError(null);
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.code === 1000) {
        const { token, user } = data.result;
        setToken(token);
        setUser(user);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        return { success: true };
      } else {
        setError(data.message || 'Login failed');
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
      return { success: false, message: 'Login failed' };
    }
  };

  const logout = async () => {
    try {
      setError(null);
      if (token) {
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGOUT}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }
    } catch (error) {
      console.error('Logout error:', error);
      setError('Logout failed. Please try again.');
    } finally {
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  };

  const value = {
    user,
    token,
    login,
    logout,
    loading,
    error,
    isAuthenticated: !!token,
    refreshToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 