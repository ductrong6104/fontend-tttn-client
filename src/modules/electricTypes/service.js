import api from '@/utils/api'
export const getAllElectricTypes = async () => {
    try {
      const response = await api.get(`/electric-types`);
      return response.data;
    } catch (error) {
      console.error('Error API:', error);
      throw error;
    }
  } 