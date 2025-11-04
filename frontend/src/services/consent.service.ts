import axios from '../lib/axios';

export const consentService = {
  async getConsent() {
    const response = await axios.get('/consent');
    return response.data;
  },

  async updateConsent(data: {
    termsOfService?: boolean;
    privacyPolicy?: boolean;
    marketingEmails?: boolean;
    dataSharing?: boolean;
  }) {
    const response = await axios.put('/consent', data);
    return response.data;
  },
};

