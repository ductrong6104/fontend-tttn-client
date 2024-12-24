import Modal from "react-modal";
import { customStyles } from "./customStyles";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";
import { RequestStatus } from "@/types/enums/requestStatus";
import { IoPersonOutline } from "react-icons/io5";
import InputCustome from "../input/input";
import { formatDateForDatabase, formatDateForDisplay, getCurrentDate } from "@/utils/formatDate";
import { getAllElectricTypes } from "@/modules/electricTypes/service";
import { getClientById } from "@/modules/clients/service";
import AccountSession from "@/utils/account";
import { updateInforForReject } from "@/modules/contracts/service";
import { notifyError, notifySuccess } from "../toastify/toastify";
import { useEffect, useState } from "react";
import Divider from "../divider/divider";
import Map from "../map/Map";
import ComboBox from "../combobox/combobox";
import ButtonCustome from "../button/button";
import { FaAngleRight } from "react-icons/fa6";
import { customStylesAddInfor } from "./customStylesAddInfor";
const SubfrmAddInformation = ({ isOpen, onClose, row, reload, setReload }) => {
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    birthday: "",
    identityCard: "",
    phone: "",
    email: "",
    clientId: "",
    address: "",
    electricTypeId: "",
    startDate: "",
  });
  const accountSession = AccountSession.getInstance();
  const [addresses, setAddresses] = useState([]);
  const [position, setPosition] = useState({
    lat: 10.8535886,
    lng: 106.7878561,
  });
  const [electricTypes, setElectricTypes] = useState([]);
  const handleSelect = (value) => {
    console.log("Selected value:", value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      electricTypeId: value,
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleChangeAddress = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ["address"]: value,
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
          address: res.data.address,
          clientId: accountSession.getClientId(),
          startDate: formatDateForDatabase(getCurrentDate()),
        });
      }
    });
  }, [accountSession]);
  useEffect(() => {
    getAllElectricTypes().then((res) => {
      console.log(`electric types`, res.data);
      if (res.status === 200) {
        setElectricTypes(
          res.data.map((item) => ({
            label: item.name,
            value: item.id,
          }))
        );
      }
    });
  }, [accountSession]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateClient = {
      fullName: formData.fullName,
      birthday: formData.birthday,
      phone: formData.phone,
      email: formData.email,
      identityCard: formData.identityCard
    };
    console.log(`updateClient`, updateClient);

    updateInforForReject(
      row.id,
      accountSession.getClientId(),
      updateClient
    ).then((res) => {
      if (res.status === 200) {
        notifySuccess("Gửi yêu cầu bổ sung thông tin đơn đăng ký thành công");
        setReload(!reload);
      } else {
        notifyError("Gửi yêu cầu bổ sung thông tin đơn đăng ký thất bại");
        console.log(res.data);
      }
    });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} style={customStylesAddInfor}>
      <div className="mb-2 cursor-pointer flex justify-between">
        <Typography variant="h6" align="left">
          Bổ sung thông tin
        </Typography>
        <CloseIcon onClick={onClose} className="hover:bg-red-500" />
      </div>
      <div className="border-2 p-2 pl-8 pr-8">
        <div className="flex justify-between items-center">
          <div>Bổ sung thông tin đơn đăng ký</div>
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
          <div className="w-full mb-4">
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
              required={true}
              readOnly={!isReadOnly}
            ></InputCustome>
            <Map
              addresses={addresses}
              onChangeAddress={handleChangeAddress}
              onChangePosition={setPosition}
              defaultPosition={position}
            ></Map>
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
                value={formData.electricTypeId}
              />
            </div>
            <div className="w-1/2 ml-4"></div>
          </div>

          <div className="flex justify-end items-center">
            <ButtonCustome className="bg-gray-400 text-white" type="submit">
              Bổ sung thông tin
            </ButtonCustome>
            <FaAngleRight className="absolute text-white" />
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default SubfrmAddInformation;
