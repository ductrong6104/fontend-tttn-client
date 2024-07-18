// components/Navbar.js
"use client";
import Link from "next/link";
import styles from "./navbar.module.css";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import AccountSession from "@/utils/account";
import Divider from "../divider/divider";
import ButtonCustome from "../button/button";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/authContext";
const Navbar = ({openSubForm, selectedNav, setSelectedNav} ) => {
  const listLabel = ["Giao dịch trực tuyến", "Tra cứu thông tin", "Đăng nhập"];
  const router = useRouter();
  const pathname = usePathname();
  const accountSession = AccountSession.getInstance();
  const {isLoggedIn, logout} = useAuth();
  const isActive = (href) => {
    return pathname === href ? true : false;
  };
  
  const handleClickNav = (index) => {
    setSelectedNav(index);
    if (index === 2 && !isLoggedIn) {
      openSubForm(true);
    }
    else{
      return
    }
  };
  const handleLogout = () => {
    logout();
    setSelectedNav(false);
   
  }

  const getPathnameSlice = () => {
    return pathname.split("/").slice(0,1).join('/');
   
    
  };
  return (
    <nav className={`${styles.navbar} shadow-lg`}>
      <ul className={styles.navList}>
        {listLabel.map((value, index) => (
          <div key={index} className={styles.wrapper}>
            <li
              className={`cursor-pointer ${
                selectedNav === index ? styles.active : styles.navItem
              }`}
              onClick={() => handleClickNav(index)}
            >
              {index === 2 && accountSession.getUsername() ? accountSession.getUsername() : value}
            </li>
            {selectedNav === 0 && (
              <div className={`${styles.submenu} left-1/4`}>
                <ul>
                  <li className='text-sky-500 font-bold'>HỆ THỐNG ĐO ĐẾM</li>
                </ul>

                <ul>
                  <li className='text-sky-500 font-bold'>YÊU CẦU THAY ĐỔI THÔNG TIN</li>
                </ul>
                <ul>
                  <li className='text-sky-500 font-bold'>THANH TOÁN ONLINE</li>
                  <li className="cursor-pointer">Thanh toán tiền điện</li>
                </ul>
                <ul>
                  <li className='text-sky-500 font-bold'>HỢP ĐỒNG MUA BÁN ĐIỆN</li>
                  <li className="cursor-pointer">Đăng ký hồ sơ sử dụng điện</li>
                </ul>
                <ul>
                  <li className='text-sky-500 font-bold'>CÁC LOẠI YÊU CẦU KHÁC</li>
                </ul>
              </div>
            )}
            {selectedNav === 1 && (
              <div className={`${styles.submenu} left-1/2`}>
                <ul>
                  <li className='text-sky-500 italic'>Tra cứu các thông tin liên quan đến hoá đơn hoặc thông tin điện sử dụng... </li>
                  <li className="cursor-pointer">Điện năng sử dụng</li>
                  <li className="cursor-pointer">Giá bán điện</li>
                </ul>
                
              </div>
            )}
            {selectedNav === 2 && isLoggedIn && (
              <div className={`${styles.submenu} left-3/4`}>
                <Link href={`/client/account/inforAccount`}>Thông tin tài khoản</Link>
                <Divider></Divider>
                <div className="flex justify-center items-center">
                <FiLogOut className="absolute left-0 ml-8"/>
                <ButtonCustome className="bg-indigo-100 pl-10" onClick={handleLogout}>Đăng xuất</ButtonCustome>
                </div>
                
                
              </div>
            )}
          </div>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
