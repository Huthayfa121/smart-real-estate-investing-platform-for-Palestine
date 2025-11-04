import axios from '../lib/axios';

export const recommendationService = {
  async getRecommendations(status?: string) {
    const params = status ? { status } : {};
    const response = await axios.get('/recommendations', { params });
    return response.data;
  },

  async getRecommendationById(id: string) {
    const response = await axios.get(`/recommendations/${id}`);
    return response.data;
  },

  async generateRecommendations() {
    const response = await axios.post('/recommendations/generate');
    return response.data;
  },

  async updateRecommendationStatus(id: string, status: string) {
    const response = await axios.put(`/recommendations/${id}`, { status });
    return response.data;
  },

  async deleteRecommendation(id: string) {
    const response = await axios.delete(`/recommendations/${id}`);
    return response.data;
  },
};

