import api from "@/utils/api"
export const getAllElectricityPrices = async () => {
    try {
        const response = await api.get('/electricity-prices');
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
}