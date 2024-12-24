import {
  getBillByClientId,
  getBillToGeneratePdf,
  getUnpaidInvoicesByClientId,
  updateStatusBill,
} from "@/modules/bills/service";
import { formatDateForDisplay } from "@/utils/formatDate";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import AccountSession from "../../utils/account";
import ButtonCustome from "../button/button";
import { notifyError, notifySuccess } from "../toastify/toastify";
import { GeneratePDF } from "@/utils/pdf";
import TableComponent from "../table/tableComponent";
import YesNoDialog from "../dialog/yesNoDialog";
import { useDisclosure } from "@nextui-org/modal";
import SubFrmYesNoDialog from "../subform/subfrmYesNoDialog";

export default function FrmBillPayment() {
  // const [bill, setBill] = useState({
  //      id: "",
  //   invoiceDate: "",
  //   paymentDueDate: "",
  //   totalAmount: "",
  //   paymentDate: "",
  //   status: "",
  // });

  const [isOpenSubfrmYesNoDialog, setIsOpenSubfrmYesNoDialog] = useState(false);
  const openSubfrmYesNoDialog = () => setIsOpenSubfrmYesNoDialog(true);
  const closeSubfrmYesNoDialog = () => setIsOpenSubfrmYesNoDialog(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({
    title: "",
    bodyText: "",
    onYes: () => {},
  });

  useEffect(() => {
    console.log(`titel config dialog: ${dialogConfig.title}`);
  }, [dialogConfig]);
  const [reload, setReload] = useState(false);
  const [unpaidInvoices, setUnpaidInvoices] = useState([]);
  const accountSession = AccountSession.getInstance();

  const [selected, setSelected] = useState([]);
  const handleClickPayment = (row, action) => {
    const bill = row;

    // action = 1: cho xem thông báo, action = 0: chua thanh toan nên thực hiện thanh toán
    if (action === 1) {
      console.log("xuat pdf");
      getBillToGeneratePdf(bill.id, accountSession.getClientId()).then(
        (res) => {
          if (res.status === 200) {
            GeneratePDF(res.data);
            notifySuccess("Xuất pdf thành công");
          } else {
            notifyError("Xuất pdf thất bại");
            console.log(res.data);
          }
        }
      );
    } else {
      setDialogConfig({
        title: "Thanh toán hóa đơn",
        bodyText: `Bạn có muốn thanh toán hóa đơn với số tiền: ${bill.totalAmount} ?`,
        onYes: () => {
          updateStatusBill(bill.id, { status: true }).then((res) => {
            if (res.status === 200) {
              notifySuccess("Thanh toán thành công");
              setReload(!reload);
            } else {
              notifyError("Thanh toán thất bại");
              console.log(res.data);
            }
          });
          closeSubfrmYesNoDialog();
        },
      });
      openSubfrmYesNoDialog();
      // if (window.confirm(`Xác nhận thanh toán số tiền: ${bill.totalAmount}`)) {

      // }
    }
  };

  useEffect(() => {
    getUnpaidInvoicesByClientId(accountSession.getClientId()).then((res) => {
      if (res.status === 200) {
        setUnpaidInvoices(res.data);
      }
    });
  }, [accountSession.getClientId(), reload]);

  return (
    <div className="w-screen p-2 pl-8 pr-8">
      <TableComponent
        data={unpaidInvoices}
        columns={[
          { id: "id", label: "Mã hóa đơn" },
          { id: "invoiceDate", label: "Ngày xuất hóa đơn" },
          { id: "paymentDueDate", label: "Ngày hạn thanh toán" },
          { id: "totalAmount", label: "Tổng tiền" },
          { id: "paymentStatus", label: "Trạng thái" },
        ]}
        presentName="unpaid-bill"
        selected={selected}
        setSelected={setSelected}
        onEdit={handleClickPayment}
      ></TableComponent>

      <SubFrmYesNoDialog
        isOpen={isOpenSubfrmYesNoDialog}
        onClose={closeSubfrmYesNoDialog}
        title={dialogConfig.title}
        onYes={dialogConfig.onYes}
        bodyText={dialogConfig.bodyText}
      ></SubFrmYesNoDialog>
    </div>
  );
}
