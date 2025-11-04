import axios from '../lib/axios';

export const advisorService = {
  async getAdvisors(params?: { specialization?: string; available?: boolean }) {
    const response = await axios.get('/advisors', { params });
    return response.data;
  },

  async getAdvisorById(id: string) {
    const response = await axios.get(`/advisors/${id}`);
    return response.data;
  },

  async createAdvisor(data: any) {
    const response = await axios.post('/advisors', data);
    return response.data;
  },

  async updateAdvisor(id: string, data: any) {
    const response = await axios.put(`/advisors/${id}`, data);
    return response.data;
  },

  async deleteAdvisor(id: string) {
    const response = await axios.delete(`/advisors/${id}`);
    return response.data;
  },
};

