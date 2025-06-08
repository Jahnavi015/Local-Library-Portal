i// src/api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',  // your backend URL
});

// Add JWT token automatically to every request if exists
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');  // assuming you store JWT here after login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API calls

export const fetchBooks = (filters = {}) => api.get('/books', { params: filters });

export const register = (userData) => api.post('/register', userData);

export const login = (credentials) => api.post('/login', credentials);

export const borrowBook = (bookId) => api.post(`/borrow/${bookId}`);

export const fetchProfile = () => api.get('/profile');
