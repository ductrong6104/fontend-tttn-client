"use client";
import { customStyles } from "./customStyles";
import Modal from "react-modal";
import ButtonCustome from "../button/button";
import InputCustome from "../input/input";
import { IoPersonOutline } from "react-icons/io5";
import { IoMdSave } from "react-icons/io";
import AccountSession from "../../utils/account";
import { updateEmailClient } from "@/modules/clients/service";
import { useState } from "react";
const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const identityCardRegex = /^(0)([0-9]{11})$/;
export default function SubfrmUpdateItemInforAccount({
  isOpen,
  onClose,
  item,
  onCheckUpdate,
}) {
  const { type, name, value, placeholder, labelInput } = item;
  const accountSession = AccountSession.getInstance();
  const [formData, setFormData] = useState({});
  const [valueError, setValueError] = useState();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setValueError("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      switch (name) {
        case "email":
          if (!emailRegex.test(value)) {
            setValueError("Email không hợp lệ, ví dụ: trong@gmail.com");
            return;
          }
          updateEmailClient(accountSession.getClientId(), formData).then(
            (res) => {
              if (res.status === 200) {
                alert("Cập nhật email thành công");
                // Đóng modal sau khi cập nhật thành công
                onCheckUpdate();
                onClose();
              } else {
                alert("Cập nhật email thất bại");
                setValueError("Email đã được sử dụng");
              }
            }
          );
          break;
        case "phone":
          if (!phoneRegex.test(value)) {
            setValueError(
              "Điện thoại chứa 10 số có đầu 03, 09; ví dụ: 0962522522"
            );
            return;
          }
          break;
        case "identityCard":
          if (!identityCardRegex.test(identityCard)) {
            setValueError(
              "Căn cước công dân có 12 số, đầu 0, ví dụ: 052226217914"
            );
            return;
          }
          break;
        case "birthday":
          break;
        case "address":
          break;
        // Thêm các trường khác nếu cần
        default:
          throw new Error(`Unsupported field: ${name}`);
      }
    } catch (error) {
      console.error("Error updating information:", error.message);
      // Xử lý lỗi, ví dụ hiển thị thông báo lỗi cho người dùng
    }
  };
  return (
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
        <div className="text-xl text-black font-bold">Thông tin tài khoản</div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Các trường dữ liệu nhập */}

        <div className="mb-4">
          <div className="flex items-center">
            <IoPersonOutline className="text-red-500 mr-2" />
            <label htmlFor="" className="text-black font-bold">
              {labelInput}
            </label>
          </div>
          <InputCustome
            type={type}
            name={name}
            value={formData.name}
            onChange={handleChange}
            placeholder={placeholder}
            required
            className="w-full"
          ></InputCustome>
        </div>
        <div className="mb-4 text-red-500">{valueError}</div>
        <div className="flex mb-4 items-center">
          <IoMdSave className="absolute text-white ml-24" />
          <ButtonCustome type="submit" className="bg-red-500 w-full text-white">
            Lưu thông tin
          </ButtonCustome>
        </div>
      </form>
    </Modal>
  );
}
