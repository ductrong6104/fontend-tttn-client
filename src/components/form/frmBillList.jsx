import { useEffect, useState } from "react";
import TableComponent from "../table/tableComponent";
import { getAllInvoicesByClientId, getBillToGeneratePdf, getBillToGeneratePdfPayment, getUnpaidInvoicesByClientId, updateStatusBill } from "@/modules/bills/service";
import AccountSession from "@/utils/account";
import { GeneratePDF, GeneratePDFBilPayment } from "@/utils/pdf";
import { notifyError, notifySuccess } from "../toastify/toastify";

export default function FrmBillList(){
    const [allInvoices, setAllInvoices] = useState([])
    const accountSession = AccountSession.getInstance();
    useEffect(() => {
        getAllInvoicesByClientId(accountSession.getClientId()).then((res) => {
            if (res.status === 200){
                setAllInvoices(res.data);
            }
        })
    }, [])
  
    const handleClickPayment = (row) => {
        const bill = row
         // status = true: da thanh toan cho xuat hoa don, status = false: chua thanh toan cho in thong bao tien dien
         
        if (bill.paymentStatus === true){
            console.log("xuat pdf")
            getBillToGeneratePdfPayment(bill.id, accountSession.getClientId()).then((res)=>{
                if (res.status === 200){
                    GeneratePDFBilPayment(res.data);
                    notifySuccess("Xuất hóa đơn thành công");
                }
                else{
                    notifyError("Xuất hóa đơn thất bại");
                    console.log(res.data)
                }
            })
        }
        else{
            getBillToGeneratePdf(bill.id, accountSession.getClientId()).then((res)=>{
                if (res.status === 200){
                    GeneratePDF(res.data);
                    notifySuccess("Xuất thông báo thành công");
                }
                else{
                    notifyError("Xuất thông báo thất bại");
                    console.log(res.data)
                }
            })
        }
    }
  
   

    return (
        <div className="w-screen p-2 pl-8 pr-8">
            <TableComponent data={allInvoices} columns={[
                {id: "id", label: "Mã hóa đơn" },
                {id: "invoiceDate", label: "Ngày xuất hóa đơn" },
                {id: "paymentDueDate", label: "Ngày hạn thanh toán" },
                {id: "totalAmount", label: "Tổng tiền" },
                {id: "paymentStatus", label: "Trạng thái" },
            ]}
            presentName="bill"
            onEdit={handleClickPayment}
            ></TableComponent>
            
        </div>
    )
}