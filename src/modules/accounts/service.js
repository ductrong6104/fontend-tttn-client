import api from '@/utils/api'

export const createAccount = async (newAccount) => {
    try{
        const response = await api.post(`/accounts`, newAccount)
        return response.data;
    }
    catch (error) {
        console.error("Call API Error: ", error);
        throw error;
    }
}

export const sigin = async (account) => {
    try{
        const response = await api.post(`/accounts/sigin`, account)
        return response.data;
    }
    catch (error) {
        console.error("Call API Error: ", error);
        throw error;
    }
}

