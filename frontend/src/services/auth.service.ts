import axios from '../lib/axios';

interface LoginResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
    };
    token: string;
  };
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  phoneNumber?: string;
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await axios.post<LoginResponse>('/auth/login', {
      email,
      password,
    });
    
    if (response.data.success && response.data.data.token) {
      localStorage.setItem('accessToken', response.data.data.token);
    }
    
    return response.data;
  },

  async register(data: RegisterData): Promise<LoginResponse> {
    const response = await axios.post<LoginResponse>('/auth/register', data);
    
    if (response.data.success && response.data.data.token) {
      localStorage.setItem('accessToken', response.data.data.token);
    }
    
    return response.data;
  },

  async logout(): Promise<void> {
    try {
      await axios.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  },

  async getCurrentUser() {
    const response = await axios.get('/auth/me');
    return response.data;
  },

  async updatePassword(currentPassword: string, newPassword: string) {
    const response = await axios.put('/auth/password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  },

  async forgotPassword(email: string) {
    const response = await axios.post('/auth/forgot-password', { email });
    return response.data;
  },
};

