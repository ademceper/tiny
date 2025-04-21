import { OrganizationRequest } from "@/app/modules/schemas/organizationSchema";
import apiClient from "./apiClient";
import ENDPOINTS from "./endpoints";

export const OrganizationService = {
    create: async (data: OrganizationRequest) => {
      const res = await apiClient.post(ENDPOINTS.ORGANIZATION.CREATE, data);
      return res.data; 
    },
  
    update: async (id: string, data: OrganizationRequest) => {
      const res = await apiClient.put(`${ENDPOINTS.ORGANIZATION.UPDATE}/${id}`, data);
      return res.data;
    },
  
    delete: async (id: string) => {
      const res = await apiClient.delete(`${ENDPOINTS.ORGANIZATION.DELETE}/${id}`);
      return res.data;
    },
  
    getAll: async () => {
      const res = await apiClient.get(ENDPOINTS.ORGANIZATION.GET_ALL);
      return res.data;  
    },
  
    getById: async (id: string) => {
      const res = await apiClient.get(`${ENDPOINTS.ORGANIZATION.GET_BY_ID}/${id}`);
      return res.data;
    },
  };
  