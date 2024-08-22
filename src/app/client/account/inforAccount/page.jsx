'use client'
import { FaChevronRight } from "react-icons/fa6";
import AccountSession from '../../../../utils/account';
import PageNotLoggedIn from "@/components/page/pageNotLoggedIn";
import FrmInforAccount from "@/components/form/frmInforAccount";
import { useAuth } from "@/components/context/authContext";
export default function PageInforAccount() {
    const {isLoggedIn} = useAuth();

    return (
        <div className="p-4">
            <div className="flex items-center">
                <div className="text-blue-500">Trang chủ</div>
                <FaChevronRight />
                <div className="text-blue-500">Thông tin tài khoản</div>
            </div>
            <div className="flex flex-row">
                <div className="w-64 mr-20">
                    <div className="font-bold">Tài khoản</div>
                    <div>Thông tin tài khoản</div>
                </div>
                {!isLoggedIn ? <PageNotLoggedIn/>: <FrmInforAccount/>}
            </div>
        </div>
    )
}