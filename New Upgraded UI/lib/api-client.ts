import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/atao';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-app-locator': 'ConsolidatedJAFTestClientdsiRAT'
  },
  withCredentials: true, // Keep for legacy compatibility
  validateStatus: function (status: number) {
    return status >= 200 && status < 500; // Accept all status codes less than 500
  }
});

// Request interceptor - removed authentication checks
apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    console.log('🌐 API Request (authentication bypassed):', config.url);
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - simplified error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('✅ API Response (authentication bypassed):', response.config.url, response.status);
    return response;
  },
  (error: AxiosError) => {
    console.error('❌ API Error (authentication bypassed):', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
