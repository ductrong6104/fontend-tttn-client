import api from "../../utils/api";
export const checkContractExists = async (clientId) => {
    try {
      const response = await api.get(`/contracts/check-contract?clientId=${clientId}`);
      return response.data;
    } catch (error) {
      console.error('Error checking check contract:', error);
      throw error;
    }
  } 
export const createContract = async (newContract) => {
    try {
      const response = await api.post(`/contracts`, newContract);
      return response.data;
    } catch (error) {
      console.error('Error checking check contract:', error);
      throw error;
    }
  } 