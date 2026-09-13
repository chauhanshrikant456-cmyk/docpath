import api from './api.js';

const authService = {
  register: async (data) => {
    const response = await api.post('/auth/register', data);
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    return response;
  },

  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    return response;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    return api.get('/auth/me');
  },

  getProfile: () => {
    return api.get('/profile');
  },

  updateProfile: (data) => {
    return api.put('/profile', data);
  }
};

export default authService;
