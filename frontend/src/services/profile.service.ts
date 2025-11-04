import axios from '../lib/axios';

export const profileService = {
  async getProfile() {
    const response = await axios.get('/profile');
    return response.data;
  },

  async updateProfile(data: any) {
    const response = await axios.put('/profile', data);
    return response.data;
  },

  async deleteProfile() {
    const response = await axios.delete('/profile');
    return response.data;
  },
};

