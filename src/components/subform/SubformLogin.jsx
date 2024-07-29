// components/SubformModal.js
'use client'
import React, { useState } from "react";
import Modal from "react-modal";
import InputCustome from "../input/input";
import ButtonCustome from "../button/button";
import Divider from '../divider/divider';
import { FaEyeSlash } from "react-icons/fa";
import { LiaEyeSolid } from "react-icons/lia";
import SubformRegis from "./subformRegis";
import { customStyles } from "./customStyles";
import { sigin } from "@/modules/accounts/service";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/authContext";
import { notifySuccess, notifyError } from "../toastify/toastify";

const SubformLogin = ({ isOpen, onClose, openSubformLogin, setSelectedNav }) => {
  const [formData, setFormData] = useState({
      "username": "",
      "password": "",
      "roleId": "3",
  })

  const [isCheckedSavePass, setIsCheckedSavePass] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [subformRegisIsOpen, setSubformRegisIsOpen] = useState(false);
  const {login} = useAuth();
  const router = useRouter();
  const openSubformRegis = () => {
    setSubformRegisIsOpen(true);
  }
  const closeSubformRegis = () => {
    setSubformRegisIsOpen(false);
  }
  const handleCheckedSavePass = () => {
    setIsCheckedSavePass(!isCheckedSavePass);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic khi submit subform
    console.log("Form submitted:", formData);
  
    sigin(formData).then((res) => {
      if (res.status === 200) {
        notifySuccess('Đăng nhập thành công');
        login(res.data.username, res.data.accountId, res.data.clientId);
        setSelectedNav(false);
        onClose(); // Đóng modal sau khi submit thành công
      }
      else if (res.status === 701){
        notifyError("Tài khoản chưa được đăng ký");
      }
      else if (res.status === 702){
        notifyError("Mật khẩu sai");
      }
      else if (res.status === 703){
        notifyError("Tài khoản này không dành cho khách hàng");
      }
    });
    
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClickRegis = () => {
      onClose();
    setSubformRegisIsOpen(true);
  }
  return (
    <>
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Subform Modal"
    >
      <div className="flex justify-end">
        <button type="button" onClick={onClose}>
          Đóng
        </button>
      </div>
      <div className="mb-4">
        <div className="text-xl text-blue-600 font-bold">
          ĐĂNG NHẬP TÀI KHOẢN
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Các trường dữ liệu nhập */}
        
 
        <div className="mb-4">
          <label className="">Tài khoản:</label>
          <InputCustome
            type="text"
            name="username"
            value={formData.username}
            className="w-full"
            onChange={handleChange}
            required
          ></InputCustome>
        </div>
        <div className="mb-2">
          <label className="">Mật khẩu:</label>
          <div className="flex">

            <InputCustome
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full"
                placeholder={showPassword ? "Mật khẩu" : "********"}
                required
            ></InputCustome>
            <FaEyeSlash className={`cursor-pointer absolute end-0 mr-8 mt-3 ${showPassword ? "invisible" : "visible"}`} onClick={() => setShowPassword(true)}></FaEyeSlash>
            <LiaEyeSolid className={`cursor-pointer absolute end-0 mr-8 mt-3 ${showPassword ? "visible" : "invisible"}`} onClick={() => setShowPassword(false)}></LiaEyeSolid>
          </div>
        </div>
        <div className="flex justify-between mb-6">
            <label htmlFor="checkbox">
                <input type="checkbox" checked={isCheckedSavePass} onChange={handleCheckedSavePass} />
                Lưu mật khẩu
            </label>
            <div className="text-blue-600 cursor-pointer">Quên mật khẩu</div>
        </div>
        
        {/* Thêm các trường khác của subform */}
        <div className="flex justify-end mb-4">
          <ButtonCustome type="submit" className="bg-slate-500 w-full text-white">
            Đăng nhập
          </ButtonCustome>
        </div>
        <div className="flex justify-center items-center mb-2">
          <Divider width="10%"/>
          <div className="ml-2 mr-2">Quý khách chưa có tài khoản?</div>
          <Divider width="10%"/>
        </div>
        <div className="flex justify-end mb-4">
          <ButtonCustome className="bg-white border-blue-400 w-full" onClick={() => handleClickRegis()}>
            Đăng ký ngay
          </ButtonCustome>
        </div>
      
        
      </form>
    </Modal>
      <SubformRegis isOpen={subformRegisIsOpen} onClose={closeSubformRegis} openSubformLogin={openSubformLogin}></SubformRegis>
    
    </>
  );
};

export default SubformLogin;
