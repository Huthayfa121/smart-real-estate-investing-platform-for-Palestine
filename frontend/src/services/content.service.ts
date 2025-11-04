import axios from '../lib/axios';

export const contentService = {
  async getContent(params?: { type?: string; category?: string; status?: string }) {
    const response = await axios.get('/content', { params });
    return response.data;
  },

  async getContentById(id: string) {
    const response = await axios.get(`/content/${id}`);
    return response.data;
  },

  async createContent(data: any) {
    const response = await axios.post('/content', data);
    return response.data;
  },

  async updateContent(id: string, data: any) {
    const response = await axios.put(`/content/${id}`, data);
    return response.data;
  },

  async deleteContent(id: string) {
    const response = await axios.delete(`/content/${id}`);
    return response.data;
  },
};

