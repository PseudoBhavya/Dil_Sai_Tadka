import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Only redirect if not already on login page
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// ========== AUTH ==========
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (data) => api.post('/auth/register', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

// ========== MENU ==========
export const menuAPI = {
  getAll: (params) => api.get('/menu', { params }),
  getById: (id) => api.get(`/menu/${id}`),
  create: (data) => api.post('/menu', data),
  update: (id, data) => api.put(`/menu/${id}`, data),
  delete: (id) => api.delete(`/menu/${id}`),
  getCategories: () => api.get('/menu/categories'),
  search: (query) => api.get('/menu/search', { params: { q: query } }),
};

// ========== ORDERS ==========
export const orderAPI = {
  getAll: (params) => api.get('/orders', { params }),
  getMyOrders: () => api.get('/orders/my'),
  getById: (id) => api.get(`/orders/${id}`),
  create: (data) => api.post('/orders', data),
  updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
};

// ========== ROOMS ==========
export const roomAPI = {
  getAll: (params) => api.get('/rooms', { params }),
  getById: (id) => api.get(`/rooms/${id}`),
  create: (data) => api.post('/rooms', data),
  update: (id, data) => api.put(`/rooms/${id}`, data),
  delete: (id) => api.delete(`/rooms/${id}`),
  getAvailable: (params) => api.get('/rooms/available', { params }),
};

// ========== BOOKINGS ==========
export const bookingAPI = {
  getAll: (params) => api.get('/bookings', { params }),
  getMyBookings: () => api.get('/bookings/my'),
  getById: (id) => api.get(`/bookings/${id}`),
  create: (data) => api.post('/bookings', data),
  updateStatus: (id, status) => api.put(`/bookings/${id}/status`, { status }),
  cancel: (id) => api.put(`/bookings/${id}/cancel`),
};

// ========== REVIEWS ==========
export const reviewAPI = {
  getAll: (params) => api.get('/reviews', { params }),
  getMyReviews: () => api.get('/reviews/my'),
  create: (data) => api.post('/reviews', data),
  delete: (id) => api.delete(`/reviews/${id}`),
};

// ========== COMPLAINTS ==========
export const complaintAPI = {
  getAll: (params) => api.get('/complaints', { params }),
  getMyComplaints: () => api.get('/complaints/my'),
  create: (data) => api.post('/complaints', data),
  updateStatus: (id, status) => api.put(`/complaints/${id}/status`, { status }),
};

// ========== DASHBOARD (Admin) ==========
export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
  getRevenueChart: (period) => api.get('/dashboard/revenue', { params: { period } }),
  getRecentOrders: () => api.get('/dashboard/recent-orders'),
  getRecentBookings: () => api.get('/dashboard/recent-bookings'),
};

// ========== USERS (Admin) ==========
export const userAPI = {
  getAll: (params) => api.get('/users', { params }),
  getById: (id) => api.get(`/users/${id}`),
  updateRole: (id, role) => api.put(`/users/${id}/role`, { role }),
  delete: (id) => api.delete(`/users/${id}`),
};

// ========== ANALYTICS (Admin) ==========
export const analyticsAPI = {
  getStats: () => api.get('/analytics/stats'),
  getLogs: () => api.get('/analytics/logs'),
  getIntegrations: () => api.get('/analytics/integrations'),
  createIntegration: (data) => api.post('/analytics/integrations', data),
};

// ========== AI SERVICE ==========
export const aiAPI = {
  getLatestInsights: () => api.get('/ai/reviews/latest-insights'),
  triggerSummarize: () => api.post('/ai/reviews/summarize'),
  getRecommendations: (query) => api.post('/ai/recommendations', { query }),
};

export default api;
