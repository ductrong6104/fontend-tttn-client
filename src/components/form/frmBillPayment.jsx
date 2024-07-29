import { getBillByClientId, getBillToGeneratePdf, updateStatusBill } from '@/modules/bills/service';
import {formatDateForDisplay} from '@/utils/formatDate'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/authContext';
import AccountSession from '../../utils/account';
import ButtonCustome from '../button/button';
import { notifyError, notifySuccess } from '../toastify/toastify';
import { GeneratePDF } from '@/utils/pdf';
export default function FrmBillPayment(){
    const [bill, setBill] = useState({
         id: "",
      invoiceDate: "",
      paymentDueDate: "",
      totalAmount: "",
      paymentDate: "",
      status: "",
    });
    const [reload, setReload] = useState(false);
    const accountSession = AccountSession.getInstance();
    useEffect(() => {
        getBillByClientId(accountSession.getClientId()).then((res) => {
            if (res.status === 200) {
                setBill(res.data);
                
            }
        })

    }, [reload])
    const handleClickPayment = () => {
        
        if (bill.status){
            console.log("xuat pdf")
            getBillToGeneratePdf(bill.id, accountSession.getClientId()).then((res)=>{
                if (res.status === 200){
                    GeneratePDF(res.data);
                    notifySuccess("Xuất pdf thành công");
                }
                else{
                    notifyError("Xuất pdf thất bại");
                    console.log(res.data)
                }
            })
        }
        else{
            updateStatusBill(bill.id, {"status": true}).then((res)=>{
                if (res.status === 200){
                    notifySuccess("Thanh toán hóa đơn thành công");
                    setReload(!reload);
                }
                else{
                    notifyError("Thanh toán hóa đơn thất bại");
                    console.log(res.data)
                }
            })
        }
    }
    if (bill == null)
        return 
            (<div className="border-2 w-screen p-2 pl-8 pr-8">
                <div>Không có hóa đơn nào</div>
            </div>
            )
         
    return (
        <div className="border-2 w-screen p-2 pl-8 pr-8">
            <div className="flex justify-center">
                <div>Thanh toán hóa đơn ngày {formatDateForDisplay(new Date())}</div>
            </div>
            <div className="flex justify-between w-1/3">
                <div className="mr-4">Ngày lập hóa đơn:</div>
                <div>{bill.invoiceDate}</div>
            </div>
            <div className="flex justify-between w-1/3">
                <div className="mr-4">Ngày hạn thanh toán:</div>
                <div>{bill.paymentDueDate}</div>
            </div>
            <div className="flex justify-between w-1/3">
                <div className="mr-4">Tổng tiền:</div>
                <div>{bill.totalAmount}</div>
            </div>
            <div className="flex justify-between w-1/3">
                <div className="mr-4">Ngày đóng tiền:</div>
                <div>{bill.paymentDate}</div>
            </div>
            <div className="flex justify-between w-1/3">
                <div className="mr-4">Trạng thái:</div>
                <div className={`${bill.status ? "text-green-500" : "text-red-500"}`}>{bill.status ? "Đã đóng" : "Chưa đóng"}</div>
            </div>
            <ButtonCustome className="bg-gray-400 text-white" onClick={handleClickPayment}>
            {bill.status ? "Xuất file pdf" : "Thanh toán"}
          </ButtonCustome>
        </div>
    )
}