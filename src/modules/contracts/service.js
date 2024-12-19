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

export const getContractStatusByClientId = async (clientId) => {
    try {
      const response = await api.get(`/contracts/client/${clientId}/status`);
      return response.data;
    } catch (error) {
      console.error('Error checking check contract:', error);
      throw error;
    }
  }

  export const terminateContract = async (contractId) => {
    try {
      const response = await api.put(`/contracts/${contractId}/terminate`);
      return response.data;
    } catch (error) {
      console.error('Error checking check contract:', error);
      throw error;
    }
  }

  export const cancelRegisterByClientId = async (clientId) => {
    try {
      const response = await api.delete(`/contracts/cancel-registers/${clientId}`);
      return response.data;
    } catch (error) {
      console.error('Error checking check contract:', error);
      throw error;
    }
  }
  export const updateInforForReject = async (contractId, clientId, clientUpdateReasonRejectDto) => {
    try {
      const response = await api.put(`/contracts/${contractId}/update-rejection-info/${clientId}`, clientUpdateReasonRejectDto);
      return response.data;
    } catch (error) {
      console.error('Error checking check contract:', error);
      throw error;
    } 
  }

  export const getRegistrationFormByClientId = async (clientId) => {
    try {
      const response = await api.get(`/contracts/client/${clientId}/registration-form`);
      return response.data;
    } catch (error) {
      console.error('Error checking check contract:', error);
      throw error;
    }
  }