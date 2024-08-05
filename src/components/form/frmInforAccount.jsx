"use client";
import { useEffect, useState } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import ButtonCustome from "../button/button";
import ItemInforAccount from "../item/itemInforAccount";
import SubfrmUpdateItemInforAccount from "../subform/subfrmUpdateItemInforAccount";
import { getClientById } from "@/modules/clients/service";
import AccountSession from "@/utils/account";
import { useAuth } from "../context/authContext";
export default function FrmInforAccount() {
  const [formData, setFormData] = useState({
    "username": "",
    "updateAt": "",
    "firstName": "",
    "lastName": "",
    "phone": "",
    "identityCard": "",
    "birthday": "",
    "address": "",
    "email": "",
  });

  const [selectedItemUpdate, setSelectedItemUpdate] = useState({
    "type": "", 
    "name": "", 
    "value": "",  
    "placeholder": "", 
    "labelInput": "",
  });
  const accountSession = AccountSession.getInstance();
  const [subfrmUpdateItemIsOpen, setSubfrmUpdateItemIsOpen] = useState(false);
  const {isLoggedIn} = useAuth();
  const [checkUpdate, setCheckUpdate] = useState(false);
  const changeCheckUpdate = () => {
    setCheckUpdate(!checkUpdate);
  }
  const openSubfrmUpdateItem = () => {
    setSubfrmUpdateItemIsOpen(true);
  }
  const closeSubfrmUpdateItem = () => {
    setSubfrmUpdateItemIsOpen(false);
  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleClickButtonUpdate = (type, name, value, placeholder, labelInput) => {
    setSelectedItemUpdate({type, name, value, placeholder, labelInput});
    openSubfrmUpdateItem();
  }

  useEffect(() => {
      getClientById(accountSession.getClientId()).then((res) => {
        if (res.status === 200){
          // ...formData: Sao chép tất cả các thuộc tính hiện có của formData.
          // ...res.data: Sao chép tất cả các thuộc tính từ res.data và ghi đè lên các thuộc tính trùng lặp trong formData.
          // "username": accountSession.getUsername(): Thiết lập giá trị mới cho thuộc tính username, ghi đè lên bất kỳ giá trị nào có cùng tên từ formData hoặc res.data.
          setFormData({
            ...formData, 
            ...res.data, 
            "username": accountSession.getUsername()});
        
          console.log(res.data)
        }
        
      })
  },[isLoggedIn, checkUpdate])
  const handleSubmit = (e) =>{
    e.preventDefault();
  }
  return (
    <>
    
    <div className="w-screen h-screen">
      <div className="fond-bold">Thông tin tài khoản</div>
      <form  onSubmit={handleSubmit}>
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
          placeholder="********"
          labelInput="Mật khẩu"
          labelButton="Đổi mật khẩu"
          onUpdate={handleClickButtonUpdate}
        />
        <ItemInforAccount
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Số điện thoại"
          labelInput="Số điện thoại"
          labelButton="Cập nhật"
          onUpdate={handleClickButtonUpdate}
        />
        <ItemInforAccount
          type="text"
          name="identityCard"
          value={formData.identityCard}
          onChange={handleChange}
          placeholder="CCCD"
          labelInput="Căn cước công dân"
          labelButton="Cập nhật"
          onUpdate={handleClickButtonUpdate}
        />
        <ItemInforAccount
          type="date"
          name="birthday"
          value={formData.birthday}
          onChange={handleChange}
          placeholder="Ngày sinh"
          labelInput="Ngày sinh"
          labelButton="Cập nhật"
          onUpdate={handleClickButtonUpdate}
        />
        <ItemInforAccount
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Địa chỉ"
          labelInput="Địa chỉ"
          labelButton="Cập nhật"
          onUpdate={handleClickButtonUpdate}
        />
        <ItemInforAccount
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          labelInput="Email"
          labelButton="Cập nhật"
          onUpdate={handleClickButtonUpdate}
        />
        <div></div>
      </form>
    </div>
    <SubfrmUpdateItemInforAccount isOpen={subfrmUpdateItemIsOpen} onClose={closeSubfrmUpdateItem} item={selectedItemUpdate} onCheckUpdate={changeCheckUpdate} />
    </>
  );
}
