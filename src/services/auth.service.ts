// services/auth.service.ts

import { LoginRequest } from '@/app/modules/schemas/loginSchema';
import apiClient from './apiClient';
import ENDPOINTS from './endpoints';
import { RegisterRequest } from '@/app/modules/schemas/registerSchema';


export const AuthService = {
  login: async (data: LoginRequest) => {
    const res = await apiClient.post(ENDPOINTS.AUTH.LOGIN, data);
    return res.data;
  },

  register: async (data: RegisterRequest) => {
    const res = await apiClient.post(ENDPOINTS.AUTH.REGISTER, data);
    return res.data;
  },

};
