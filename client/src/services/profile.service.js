import api from './api.js';

const profileService = {
  getProfile: async () => {
    return api.get('/profile');
  },

  updateProfile: async (data) => {
    return api.put('/profile', data);
  }
};

export default profileService;
