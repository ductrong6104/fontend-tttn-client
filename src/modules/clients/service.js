import api from "@/utils/api"
import { debounce } from 'lodash';
export const createClient = async (newClient) => {
    try{
        const response = await api.post(`/clients`, newClient)
        return response.data;
    }
    catch (error) {
        console.error("Call API Error: ", error);
        throw error;
    }
}

// debounce không nên được sử dụng trực tiếp trên hàm async khi export ra vì nó có thể gây ra lỗi khi sử dụng.
export const checkEmailExists = async (updateEmailRequest) => {
    try {
      const response = await api.post(`/clients/check-email`, updateEmailRequest);
      return response.data;
    } catch (error) {
      console.error('Error checking email:', error);
      throw error;
    }
  } 
  
export const checkPhoneExists = async (phone) => {
    try {
      const response = await api.get(`/clients/check-phone?phone=${phone}`);
      return response.data;
    } catch (error) {
      console.error('Error checking phone:', error);
      throw error;
    }
  } 
  
export const checkIdentityCardExists = async (identityCard) => {
    try {
      const response = await api.get(`/clients/check-identityCard?identityCard=${identityCard}`);
      return response.data;
    } catch (error) {
      console.error('Error checking identityCard:', error);
      throw error;
    }
  } 

  export const updateEmailClient = async (clientId, email) => {
    try {
      const response = await api.put(`/clients/${clientId}/email`, email);
      return response.data;
    } catch (error) {
      console.error('Error checking identityCard:', error);
      throw error;
    }
  } 

  export const getClientById = async (clientId) => {
    try {
      const response = await api.get(`/clients/${clientId}`);
      return response.data;
    } catch (error) {
      console.error('Error checking identityCard:', error);
      throw error;
    }
  } 