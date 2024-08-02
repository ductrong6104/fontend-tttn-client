import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";

import { useForm } from "../context/frmNameContext";
import PageNotLoggedIn from "../page/pageNotLoggedIn";
import FrmBillPayment from "../form/frmBillPayment";
import FrmContractRegis from "../form/frmContractRegis";
import FrmBillList from "../form/frmBillList";


export default function NavOnlineTrading({label}){
    const {formName} = useForm()

    return (
        <div className="p-4">
            <div className="flex items-center">
                <div className="text-blue-500">Trang chủ</div>
                <FaChevronRight />
                <div className="text-blue-500">Giao dịch trực tuyến</div>
                <FaChevronRight />
                <div className="text-blue-500">{label}</div>
            </div>
                
            <div className="flex flex-row">
                <div className="w-1/3 mr-20">
                <div className={``}>
                    <ul className="flex flex-col">
                        <li className='font-bold'>Thanh toán trực tuyến</li>
                        <Link href="/client/onlineTrading/electricityService/billPayment" className="cursor-pointer">Thanh toán hóa đơn điện</Link>
                        <Link href="/client/onlineTrading/electricityService/billList" className="cursor-pointer">Danh sách hóa đơn</Link>
                    </ul>
                    <ul>
                        <li className='font-bold'>Hợp đồng mua bán điện</li>
                        <Link href="/client/onlineTrading/electricityService/contractRegis" className="cursor-pointer">Đăng ký hợp đồng sử dụng điện</Link>
                    </ul>
                    <ul>
                        <li className='font-bold'>CÁC LOẠI YÊU CẦU KHÁC</li>
                    </ul>
                </div>
                </div>
                {formName === "FrmContractRegis" && <FrmContractRegis />}
                {formName === "FrmBillPayment" && <FrmBillPayment />}
                {formName === "FrmBillList" && <FrmBillList />}
                {formName === "PageNotLoggedIn" && <PageNotLoggedIn />}
            </div>
        </div>
    )
}