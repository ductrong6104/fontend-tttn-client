// components/Navbar.js
"use client";
import Link from "next/link";
import styles from "./navbar.module.css";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const listLabel = ["Giao dịch trực tuyến", "Tra cứu thông tin", "Đăng nhập"];
  const router = useRouter();
  const pathname = usePathname();
  const isActive = (href) => {
    return pathname === href ? true : false;
  };
  const [selectedNav, setSelectedNav] = useState(false);
  const handleClickNav = () => {};
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        {listLabel.map((value, index) => (
          <div key={index} className={styles.wrapper}>
            <li
              className={`cursor-pointer ${
                selectedNav === index ? styles.active : styles.navItem
              }`}
              onClick={() => setSelectedNav(index)}
            >
              {value}
            </li>
            {selectedNav === 0 && (
              <div className={styles.submenu}>
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
              <div className={styles.submenu}>
                <li className='text-sky-500 italic'>Tra cứu các thông tin liên quan đến hoá đơn hoặc thông tin điện sử dụng... </li>
                <li className="cursor-pointer">Điện năng sử dụng</li>
                <li className="cursor-pointer">Giá bán điện</li>
              </div>
            )}
          </div>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
