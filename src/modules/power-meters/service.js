import api from "@/utils/api";
export const getPowerMeterByContract  = async (contractId) => {
        try {
            const response = await api.get(`/power-meters/contract/${contractId}`);
            return response.data;
        } catch (error) {
            console.error('Error checking check contract:', error);
            throw error;
        }
    }