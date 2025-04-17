import axios from 'axios';
import { User } from '../types/user';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/auth';

// Configuration Axios globale
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization =`Bearer ${token}`;
  }
  return config;
});

export const authService = {
  async login(email: string, password: string): Promise<User> {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      const { user, token } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return user;
    } catch (error : any) {
      console.error('Login error:', error);
      throw new Error(error.response?.data?.message || 'Échec de la connexion');
    }
  },

  async register(userData: {
    fullName: string;
    email: string;
    password: string;
    phone: string;
  }): Promise<User> {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data.user;
    } catch (error : any) {
      console.error('Registration error:', error);
      throw new Error(error.response?.data?.message || 'Échec de l\'inscription');
    }
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser(): User | null {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  },

  async refreshToken(): Promise<string> {
    try {
      const response = await axios.post(`${API_URL}/refresh-token`);
      const { token } = response.data;
      localStorage.setItem('token', token);
      return token;
    } catch (error) {
      this.logout();
      throw new Error('Session expirée - Veuillez vous reconnecter');
    }
  }
};