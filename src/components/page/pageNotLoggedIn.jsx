'use client'
import { useSubformLogin } from "../context/subformLoginContext";
import ButtonCustome from "../button/button";
import Divider from "../divider/divider";
import Image from "next/image";
import {MdOutlineArrowCircleRight} from "react-icons/md";
export default function PageNotLoggedIn() {
    const {subformLoginIsOpen, setSubformLoginIsOpen} = useSubformLogin();
    return (
        <div className="w-screen">
            <div className="fond-bold">Thông tin tài khoản</div>
            <Divider width="100%"></Divider>
            <Image width={300} height={300} src="/Login-Advice.png" alt="LoginAdvice image"></Image>
            <div className="flex">Quý khách cần phải <p className="font-bold ml-1 mr-1">đăng nhập</p> để sử dụng chức năng này</div>
            <div className="flex items-center">
                <ButtonCustome className="bg-red-600 text-white pl-14 pr-14" onClick={() => setSubformLoginIsOpen(true)}>Đăng nhập ngay</ButtonCustome>
                <MdOutlineArrowCircleRight className="absolute text-white ml-48"/>
            </div>
        </div>
    );
}