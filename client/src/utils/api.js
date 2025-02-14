import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
  timeout: 10000, // 10 seconds timeout
});

// Add request interceptor for JWT
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.request);
      return Promise.reject({ message: 'Network Error: Please check your internet connection.' });
    } else {
      console.error('Unexpected Error:', error.message);
      return Promise.reject({ message: 'An unexpected error occurred.' });
    }
  }
);

// Authentication API
export const authAPI = {
  login: (credentials) => api.post('/users/login', credentials),
  register: (userData) => api.post('/users/register', userData),
};

// Crop API
export const cropAPI = {
  predict: (data) => api.post('/predict_crop', data, {
    headers: {
      'Content-Type': 'application/json'
    }
  }),
  createCropData: (data) => api.post('/crops', data),
  getUserPredictions: (userId) => api.get(`/crops/user/${userId}`)
};

// Fertilizer API
export const fertilizerAPI = {
  predict: (data) => api.post('/predict_fertilizer', data, {
    headers: {
      'Content-Type': 'application/json'
    }
  }),
  createFertilizerData: (data) => api.post('/fertilizers', data), 
  getUserPredictions: (userId) => api.get(`/fertilizers/user/${userId}`)
};

// Disease API
export const diseaseAPI = {
  predict: (formData) =>
    api.post('/predict_disease', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  create: (formData) =>
    api.post('/diseases', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  getUserPredictions: (userId) => api.get(`/diseases/user/${userId}`)
};

// Forum API
export const forumAPI = {
  getPosts: (page = 1) => api.get(`/posts?page=${page}`),
  getPost: (id) => api.get(`/posts/${id}`),  // This now matches the route above
  createPost: (data) => api.post('/posts', data),
  addReply: (postId, data) => api.post(`/posts/${postId}/replies`, data),
  getUserPosts: (userId) => api.get(`/posts/user/${userId}`),
  deletePost: (postId) => api.delete(`/posts/${postId}`),
  updatePost: (postId, data) => api.put(`/posts/${postId}`, data),
};

// User API
export const userAPI = {
  get: (userId) => api.get(`/users/${userId}`),
  update: (userId, data) => api.put(`/users/${userId}`, data),
};

// Farm API
export const farmAPI = {
  get: (userId) => api.get(`/farms/${userId}`),
  create: (data) => api.post('/farms', data),
  update: (farmId, data) => api.put(`/farms/${farmId}`, data),
  delete: (farmId) => api.delete(`/farms/${farmId}`),
};

// Prediction API
export const predictionAPI = {
  create: (data) => api.post('/predictions', data),
  getHistory: () => api.get('/predictions/history')
};
