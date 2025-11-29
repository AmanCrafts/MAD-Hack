import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Update this for your environment:
const API_URL = 'http://10.0.2.2:4000/api'; // Android emulator. Use your IP for real device.

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Add token to every request
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
