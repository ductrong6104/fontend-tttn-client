import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";

import { useForm } from "../context/frmNameContext";
import PageNotLoggedIn from "../page/pageNotLoggedIn";

import PageConsumptionElectric from "../page/pageConsumptionElectric";
import PageElectricPrice from "../page/pageElectricPrice";
import { useRouter } from "next/navigation";


export default function NavLookupInfor({label}){
    const {formName} = useForm()
    const router = useRouter();
    return (
        <div className="p-4 overflow-auto">
            <div className="flex items-center">
                <div className="text-blue-500 cursor-pointer" onClick={() => router.push("/")}>Trang chủ</div>
                <FaChevronRight />
                <div className="text-blue-500">Tra cứu thông tin</div>
                <FaChevronRight />
                <div className="text-blue-500">{label}</div>
            </div>
                
            <div className="flex flex-row">
                <div className="w-1/3 mr-20">
                <div className={``}>
                        <ul className="flex flex-col">
                        <li className='text-sky-500 italic'>Tra cứu các thông tin liên quan đến hoá đơn hoặc thông tin điện sử dụng... </li>
                        <Link href="/client/lookInfor/consumption-electric" className="cursor-pointer">Điện năng sử dụng</Link>
                        <Link href="/client/lookInfor/electricity-price" className="cursor-pointer">Giá bán điện</Link>
                        </ul>
                </div>
                </div>
                {formName === "PageConsumptionElectric" && <PageConsumptionElectric/>}
                {formName === "PageNotLoggedIn" && <PageNotLoggedIn />}
                {formName === "PageElectricPrice" && <PageElectricPrice />}
            </div>
        </div>
    )
}