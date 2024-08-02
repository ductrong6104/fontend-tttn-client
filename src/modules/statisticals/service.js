import api from "@/utils/api";
export const getElectricityUsedInYearByClientId = async (electricityUsedInYearRequestDto) => {

    try{
        const res = await api.post(`/statisticals/electricity-used`, electricityUsedInYearRequestDto);
        return res.data;
    }catch(err){
        console.log(err);
    }
}

export const getAmountEveryMonthInEveryYear = async (amountEveryMonthInEveryYearRequestDto) => {
    try{
        const res = await api.post(`/statisticals/amount-month-year`, amountEveryMonthInEveryYearRequestDto);
        return res.data;
    }catch(err){
        console.log(err);
    }
}