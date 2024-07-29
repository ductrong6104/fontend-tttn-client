'use client'
import Divider from "../divider/divider";
import { IoPersonOutline } from "react-icons/io5";
import InputCustome from "../input/input";
import { useEffect, useState } from "react";
import ButtonCustome from "../button/button";
import { FaAngleRight } from "react-icons/fa";
import AccountSession from "../../utils/account";
import { getClientById } from "@/modules/clients/service";
import ComboBox from "../combobox/combobox";
import { getAllElectricTypes } from "@/modules/electricTypes/service";
import { format } from 'date-fns';
import { checkContractExists, createContract } from "@/modules/contracts/service";
import { useRouter } from "next/navigation";
import { notifyError, notifySuccess } from "../toastify/toastify";
export default function FrmContractRegis() {
  const accountSession = AccountSession.getInstance();

  
  const [formData, setFormData] = useState({
    fullName: "",
    birthday: "",
    identityCard: "",
    phone: "",
    email: "",
    clientId: "",
    address: "",
    electricTypeId: "",
    startDate:"",
  });
  const [electricTypes, setElectricTypes] = useState([]);
  const [electricTypeIdSelected, setElectricTypeIdSelected] = useState(null);
  const [contractExists, setContractExists] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [regisSuccess, setRegisSuccess] = useState(false);
  const handleSelect = (value) => {
    console.log("Selected value:", value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      electricTypeId: value,
    }));
  };
  useEffect(() => {
    getClientById(accountSession.getClientId()).then((res) => {
      if (res.status === 200) {
        setFormData({
          ...formData,
          fullName: res.data.firstName + " " + res.data.lastName,
          email: res.data.email,
          phone: res.data.phone,
          identityCard: res.data.identityCard,
          birthday: res.data.birthday,
          clientId: accountSession.getClientId(),
          startDate: formatDateForDatabase(getCurrentDate()),
        });
      }
    });
  }, [accountSession.getClientId()]);
  useEffect(() => {
    getAllElectricTypes().then((res) => {
      if (res.status === 200) {
        setElectricTypes(
          res.data.map((item) => ({
            label: item.name,
            value: item.id,
          }))
        );
      }
    });
  }, []);
  useEffect(() => {
    
    checkContractExists(accountSession.getClientId()).then((res) => {
      if (res.status ===200){
        console.log(res.data);
        setContractExists(res.data.exists);
        setIsReadOnly(res.data.exists);
      }
    })
  }, [accountSession.getClientId()]);


  // Hàm để lấy ngày hiện tại
const getCurrentDate = () => {
  return new Date();
};

// Định dạng ngày tháng để hiển thị trên giao diện (dd-MM-yyyy)
const formatDateForDisplay = (date) => {
  return format(date, 'dd-MM-yyyy');
};

// Định dạng ngày tháng để lưu vào cơ sở dữ liệu (yyyy-MM-dd)
const formatDateForDatabase = (date) => {
  return format(date, 'yyyy-MM-dd');
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(formData));
    const newContract = {
      clientId: formData.clientId,
      electricTypeId: formData.electricTypeId,
      electricitySupplyAddress: formData.address,
      startDate: formData.startDate
    }
    console.log(newContract);
    createContract(newContract).then((res) => {
      if (res.status = 200){
        notifySuccess("Gửi yêu cầu đăng ký hợp đồng thành công, chờ xác nhận");
        setRegisSuccess(true);
      }
      else{
        notifyError("Đăng ký hợp đồng thất bại")
      }
    })
  };

  if (regisSuccess)
    return (
      <h1>Chờ xác nhận đăng ký hợp đồng từ công ty</h1>
      ) 
  return (
    <div className="border-2 w-screen p-2 pl-8 pr-8">
      <div className="flex justify-between items-center">
        <div>{contractExists ? 'Thông tin hợp đồng đã đăng ký': 'Đăng ký hợp đồng sử dụng điện'}</div>
        <dir>
          <div>Thời gian gửi yêu cầu</div>
          <div>{formatDateForDisplay(getCurrentDate())}</div>
        </dir>
      </div>
      <Divider width="100%"></Divider>

      <form onSubmit={handleSubmit} className="">
        <div>1. Nhập thông tin người yêu cầu</div>
        <div className="flex flex-row justify-between mb-4">
          <div className="w-1/2 mr-4">
            <div className="flex items-center">
              <IoPersonOutline className="text-red-500 mr-2" />
              <label htmlFor="" className="text-black font-bold">
                Họ và tên
              </label>
            </div>
            <InputCustome
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Họ và tên"
              className="w-full"
              required
              readOnly={isReadOnly}
              
            ></InputCustome>
          </div>

          <div className="w-1/2">
            <div className="flex items-center">
              <IoPersonOutline className="text-red-500 mr-2" />
              <label htmlFor="" className="text-black font-bold">
                Ngày sinh
              </label>
            </div>
            <InputCustome
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              placeholder="VD: 22/02/2002"
              className="w-full"
              required
              readOnly={isReadOnly}
            ></InputCustome>
          </div>
        </div>
        <div className="flex flex-row justify-between mb-4">
          <div className="w-1/2">
            <div className="flex items-center">
              <IoPersonOutline className="text-red-500 mr-2" />
              <label htmlFor="" className="text-black font-bold">
                Số căn cước
              </label>
            </div>
            <InputCustome
              type="text"
              name="identityCard"
              value={formData.identityCard}
              onChange={handleChange}
              placeholder="Nhập số căn cước công dân"
              className="w-full"
              required
              readOnly={isReadOnly}
            ></InputCustome>
          </div>
          <div className="w-1/2 ml-4"></div>
        </div>
        <div className="flex flex-row justify-between mb-4">
          <div className="w-1/2 mr-4">
            <div className="flex items-center">
              <IoPersonOutline className="text-red-500 mr-2" />
              <label htmlFor="" className="text-black font-bold">
                Số điện thoại
              </label>
            </div>
            <InputCustome
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="VD: 0962522522"
              className="w-full"
              required
              readOnly={isReadOnly}
            ></InputCustome>
          </div>

          <div className="w-1/2">
            <div className="flex items-center">
              <IoPersonOutline className="text-red-500 mr-2" />
              <label htmlFor="" className="text-black font-bold">
                Địa chỉ email
              </label>
            </div>
            <InputCustome
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="VD: trong@gmail.com"
              className="w-full"
              required
              readOnly={isReadOnly}
            ></InputCustome>
          </div>
        </div>
        <div>2. Thông tin cấp điện</div>
        <div className="w-full">
          <div className="flex items-center">
            <IoPersonOutline className="text-red-500 mr-2" />
            <label htmlFor="" className="text-black font-bold">
              Địa chỉ
            </label>
          </div>
          <InputCustome
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="VD: 97 Man Thiện, p.Hiệp Phú, quận 9, tp. Thủ Đức"
            className="w-full"
            required
            readOnly={isReadOnly}
          ></InputCustome>
        </div>
        <div className="flex flex-row justify-between mb-4">
          <div className="w-1/2">
            <div className="flex items-center">
              <IoPersonOutline className="text-red-500 mr-2" />
              <label htmlFor="" className="text-black font-bold">
                Loại điện
              </label>
            </div>
            <ComboBox
              options={electricTypes}
              onSelect={handleSelect}
              className="border-2 w-full rounded-md p-2 bg-white"
            />
          </div>
          <div className="w-1/2 ml-4"></div>
        </div>
        <div className="flex justify-end items-center">
          <ButtonCustome className="bg-gray-400 text-white" type="submit">
            {contractExists ? 'Cập nhật': 'Đăng ký'}
          </ButtonCustome>
          <FaAngleRight className="absolute text-white" />
        </div>
      </form>
    </div>
  );
}
