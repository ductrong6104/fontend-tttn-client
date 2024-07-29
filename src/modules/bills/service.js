import api from "@/utils/api";
export const getBillByClientId = async (clientId) => {
    try{
        const res = await api.get(`/bills/client/${clientId}`);
        return res.data;
    }catch(err){
        console.log(err);
    }
}
export const updateStatusBill = async (billId, status) => {
    try{
        const res = await api.put(`/bills/${billId}/status`, status);
        return res.data;
    }catch(err){
        console.log(err);
    }
}

export const getBillToGeneratePdf = async (billId, clientId) => {
    try{
        const res = await api.get(`/bills/${billId}/client/${clientId}/pdf`);
        return res.data;
    }catch(err){
        console.log(err);
    }
}