// src/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api', // Adjust with your backend base URL
  timeout: 5000, // Timeout duration in milliseconds
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers you might need
  },
});

export default axiosInstance;
