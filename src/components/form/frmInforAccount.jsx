"use client";
import { useState } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import ButtonCustome from "../button/button";
import ItemInforAccount from "../item/itemInforAccount";
export default function FrmInforAccount() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    identityCard: "",
    birthday: "",
    address: "",
    email: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  return (
    <div className="w-screen">
      <div className="fond-bold">Thông tin tài khoản</div>
      <form>
        <div className="flex rounded-md border-2 p-2 mb-2">
          <div className="flex items-center w-1/5">
            <IoPersonOutline className="text-red-500 mr-2" />
            <label htmlFor="" className="text-blue-800 font-bold">
              Tài khoản
            </label>
          </div>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="tai khoan"
            readOnly
          />
        </div>
        <ItemInforAccount
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="mat khau"
          labelInput="Mật khau"
          labelButton="Đổi mật khẩu"
        />
        <ItemInforAccount
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Số điện thoại"
          labelInput="Số điện thoại"
          labelButton="Cập nhật"
        />
        <ItemInforAccount
          type="text"
          name="identityCard"
          value={formData.identityCard}
          onChange={handleChange}
          placeholder="CCCD"
          labelInput="Căn cước công dân"
          labelButton="Cập nhật"
        />
        <ItemInforAccount
          type="text"
          name="birthday"
          value={formData.birthday}
          onChange={handleChange}
          placeholder="ngay sinh"
          labelInput="Ngày sinh"
          labelButton="Cập nhật"
        />
        <ItemInforAccount
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="dia chi"
          labelInput="Địa chỉ"
          labelButton="Cập nhật"
        />
        <ItemInforAccount
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="email"
          labelInput="Email"
          labelButton="Cập nhật"
        />
        <div></div>
      </form>
    </div>
  );
}
