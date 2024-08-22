import { getAmountEveryMonthInEveryYear, getElectricityUsedInYearByClientId } from "@/modules/statisticals/service"
import AccountSession from "@/utils/account"
import { useEffect, useState } from "react"
import TableComponent from "../table/tableComponent";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import PieChartComponent from "../chart/pieChart";
import BarChartComponent from "../chart/barChart";
import MultiLineChartComponent from "../chart/multiLineChart";

export default function PageConsumptionElectric() {
    const accountSession = AccountSession.getInstance();
    const [formData, setFormData] = useState({
        "clientId": accountSession.getClientId(),
        "year": 2024,
        "startYear": "",
        "endYear": ""
    })
    const [electricUseds, setElectricUseds] = useState([]);
    const [amounts, setAmounts] = useState([]);
    useEffect(() => {
        console.log(`formData`, formData)
        getElectricityUsedInYearByClientId(formData).then((res) => {
            if (res.status === 200){
                
                setElectricUseds(res.data.map((item) => ({
                    value: item.electricUsed,
                    label: item.month
                })));
            }
            else{
                console.log(`res`, res)
            }
        })
        
    }, [formData.year])
    useEffect(()=>{
        getAmountEveryMonthInEveryYear(formData).then((res)=>{
            if (res.status === 200){
                setAmounts(res.data)
                console.log(amounts);
            }
        })
    },[formData.startYear, formData.endYear])
    const handleChange = (event) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [event.target.name]: event.target.value,
        }));
    };
 
    const years = [
        { value: 2022, label: "2022" },
        { value: 2023, label: "2023" },
        { value: 2024, label: "2024" },
    ]

    

    return (
        <div className="border-2 w-screen p-2 pl-8 pr-8">
            <FormControl fullWidth margin="normal">
          <InputLabel>Chọn năm</InputLabel>
          <Select
            name="year"
            value={formData.year}
            onChange={handleChange}
            label="Chọn năm"
            required
          >
           
            {years.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className="text-center text-blue-500">Điện năng sử dụng</div>
        <BarChartComponent data={electricUseds} label="Điện năng sử dụng (kWh)"></BarChartComponent>
        <div className="text-center text-blue-500">Số tiền thanh toán</div>
        <div className="flex">

            <FormControl fullWidth margin="normal">
            <InputLabel>Chọn từ năm</InputLabel>
            <Select
                name="startYear"
                value={formData.startYear}
                onChange={handleChange}
                label="Chọn từ năm"
                required
            >
            
                {years.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
                ))}
            </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" sx={{marginLeft: 2}}>
            <InputLabel>Chọn đến năm</InputLabel>
            <Select
                name="endYear"
                value={formData.endYear}
                onChange={handleChange}
                label="Chọn đến năm"
                required
            >
            
                {years.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
                ))}
            </Select>
            </FormControl>
        </div >
        
        <MultiLineChartComponent data={amounts} label="(VND)" ></MultiLineChartComponent>
        </div>
    )
}