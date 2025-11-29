import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Update this for your environment:
// For iOS simulator: http://localhost:3000/api
// For Android emulator: http://10.0.2.2:3000/api
// For physical device: http://YOUR_IP_ADDRESS:3000/api
const API_URL = 'http://localhost:3000/api';

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
