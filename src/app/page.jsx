"use client";
import ButtonCustome from "@/components/button/button";
import BarChartComponent from "@/components/chart/barChart";
import DateRangePickerField from "@/components/date-range/date-range";
import { getConsumptionFromDateToDate, getElectricityUsedInYearByClientId } from "@/modules/statisticals/service";
import { Button, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import dayjs from 'dayjs';
import { formatDateForDisplay } from "@/utils/formatDate";
import { useRouter } from "next/navigation";
export default function PageHome() {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      allowedRange: [null, null],
    },
  });

  const [electricUseds, setElectricUseds] = useState([]);
  const [amounts, setAmounts] = useState([]);
  const [sumElectricUsed, setSumElectricUsed] = useState(0);
  const [fromDateDisplay, setFromDateDisplay] = useState("");
  const [toDateDisplay, setToDateDisplay] = useState("");
  const router = useRouter();

  const onSubmit = (data) => {
    const formattedData = {
        allowedRange: data.allowedRange.map(date => 
          date ? dayjs(date).format('YYYY-MM-DD') : null
        ),
      };
  
      console.log('Formatted Form Data:', formattedData.allowedRange[1]);
      const formData = {fromDate: formattedData.allowedRange[0], toDate: formattedData.allowedRange[1]}
      setFromDateDisplay(formattedData.allowedRange[0]);
      setToDateDisplay(formattedData.allowedRange[1]);
      getConsumptionFromDateToDate(formData).then((res) => {
        if (res.status === 200) {
          setElectricUseds(
            res.data.map((item) => ({
              value: item.consumption,
              label: item.dayMonth,
            }))
          );
          const totalConsumption = res.data.reduce((total, item) => total + item.consumption, 0);
          setSumElectricUsed(totalConsumption);
          
        } else {
          console.log(`res`, res);
        }
      });
  };
  return (
    <>
      <Image
        src="/anh_nen_dien.png"
        width={1920}
        height={300}
        alt="anh nen dien"
      />
      <div className="w-full rounded-md border-2 mt-8 p-4 flex justify-between shadow-md">
        <div className="flex items-center relative">
          <Image
            className="absolute mb-6"
            src="/anh_dien_thoai.svg"
            width={50}
            height={50}
            alt="anh dien thoai"
          ></Image>
          <div className="text-xl font-bold text-purple-950 ml-14">
            Thanh toán nhanh chóng và an toàn
          </div>
        </div>

        <ButtonCustome className="bg-blue-500 text-white" onClick={() => router.push("/client/onlineTrading/electricityService/billPayment")}>
          Thanh toán ngay
        </ButtonCustome>
      </div>
      <div className="w-full rounded-md border-2 mt-8 p-4 flex flex-col shadow-md">
        <div className="flex justify-between">
          <div>
            <div className="flex items-center">
              <Image
                src="/icon_dien_luc.svg"
                width={30}
                height={30}
                alt="anh dien luc"
              ></Image>
              <div className="text-xl font-bold text-purple-950 ml-14">
                Tổng công ty điện lực thành phố Hồ Chí Minh
              </div>
            </div>
            <div>Sản lượng điện EVNHCMC từ {fromDateDisplay!='' && formatDateForDisplay(fromDateDisplay)} đến {toDateDisplay!='' && formatDateForDisplay(toDateDisplay)}</div>
            <div>Tổng sản lượng</div>
            <div>{sumElectricUsed} kWh</div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <DateRangePickerField control={control} name="allowedRange" />
            <ButtonCustome className="bg-blue-500 text-white" type="submit">
              Áp dụng
            </ButtonCustome>
          </form>
        </div>
        <BarChartComponent data={electricUseds}
        label="Điện năng sử dụng"
        ></BarChartComponent>
      </div>
    </>
  );
}
