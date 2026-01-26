import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  logout: () => api.get('/auth/logout')
};

// Progress APIs
export const progressAPI = {
  getAllProgress: () => api.get('/progress'),
  getCourseProgress: (courseId) => api.get(`/progress/${courseId}`),
  completeLesson: (courseId, lessonId) => api.post(`/progress/${courseId}/lesson/${lessonId}`),
  submitProject: (courseId, projectUrl) => api.post(`/progress/${courseId}/project`, { projectUrl })
};

// User APIs
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  getStreak: () => api.get('/users/streak')
};

export default api;