import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        try {
          const res = await api.get('/auth/profile');
          setUser(res.data.data.user);
        } catch (err) {
          console.log('Auto-login failed:', err.response?.data || err.message);
          await AsyncStorage.removeItem('accessToken');
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const signUp = async (name, email, password) => {
    const res = await api.post('/auth/signup', { name, email, password });
    const { session, user } = res.data.data;
    await AsyncStorage.setItem('accessToken', session.access_token);
    if (session.refresh_token) {
      await AsyncStorage.setItem('refreshToken', session.refresh_token);
    }
    setUser(user);
    return user;
  };

  const signIn = async (email, password) => {
    const res = await api.post('/auth/signin', { email, password });
    const { session, user } = res.data.data;
    await AsyncStorage.setItem('accessToken', session.access_token);
    if (session.refresh_token) {
      await AsyncStorage.setItem('refreshToken', session.refresh_token);
    }
    setUser(user);
    return user;
  };

  const signOut = async () => {
    try {
      await api.post('/auth/signout');
    } catch {}
    await AsyncStorage.removeItem('accessToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
