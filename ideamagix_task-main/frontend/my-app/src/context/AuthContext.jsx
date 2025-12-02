import { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          console.log('📦 Initial user from localStorage:', parsedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password, role = null) => {
    try {
      console.log('🔐 Frontend: Attempting login:', { email, role });
      
      const { data } = await api.post('/auth/login', { email, password, role });
      
      console.log('✅ Frontend: Login response:', data);
      
      localStorage.setItem('token', data. token);
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      
      return data;
    } catch (error) {
      console.error('❌ Frontend: Login error:', error. response?.data);
      throw error. response?.data?. message || 'Login failed';
    }
  };

  const signup = async (formData) => {
    try {
      const { data } = await api.post('/auth/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      localStorage.setItem('token', data. token);
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      return data;
    } catch (error) {
      throw error.response?.data?.message || 'Signup failed';
    }
  };

  const register = async (userData) => {
    try {
      const { data } = await api.post('/auth/register', userData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      return data;
    } catch (error) {
      throw error.response?. data?.message || 'Registration failed';
    }
  };

  // ✅ Update user function
  const updateUser = (updatedData) => {
    console.log('🔄 updateUser called with:', updatedData);
    
    // Merge with existing user data
    const updatedUser = { ...user, ... updatedData };
    
    console.log('✅ New user state:', updatedUser);
    
    // Update state
    setUser(updatedUser);
    
    // Update localStorage
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    console.log('💾 Saved to localStorage');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  const value = {
    user,
    loading,
    login,
    signup,
    register,
    logout,
    updateUser,
    isAdmin: user?.role === 'admin',
    isInstructor: user?.role === 'instructor',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};