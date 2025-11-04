import axios from '../lib/axios';

export const conversationService = {
  async getConversations() {
    const response = await axios.get('/conversations');
    return response.data;
  },

  async getConversationById(id: string) {
    const response = await axios.get(`/conversations/${id}`);
    return response.data;
  },

  async createConversation(participantId: string) {
    const response = await axios.post('/conversations', { participantId });
    return response.data;
  },

  async addMessage(conversationId: string, content: string) {
    const response = await axios.post(`/conversations/${conversationId}/messages`, {
      content,
    });
    return response.data;
  },

  async archiveConversation(conversationId: string) {
    const response = await axios.put(`/conversations/${conversationId}/archive`);
    return response.data;
  },
};

