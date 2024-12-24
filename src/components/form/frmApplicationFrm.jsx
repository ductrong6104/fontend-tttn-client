import { useEffect, useState } from "react";
import TableComponent from "../table/tableComponent";
import {
  cancelRegisterByClientId,
  getContractStatusByClientId,
  getRegistrationFormByClientId,
  terminateContract,
  updateInforForReject,
} from "@/modules/contracts/service";
import AccountSession from "@/utils/account";

import { RequestStatus, RequestStatusMap } from "@/types/enums/requestStatus";
import SubFrmYesNoDialog from "../subform/subfrmYesNoDialog";
import SubfrmAddInformation from "../subform/subfrmAddInformation";
import { notifyError, notifySuccess } from "../toastify/toastify";

const FrmApplicationFrm = () => {
  const [applicationFrms, setApplicationFrms] = useState([]);
  const [reload, setReload] = useState(false);
  const [configDialog, setConfigDialog] = useState({
    title: "",
    bodyText: "",
    onYes: {},
  });
  const [configAddInformation, setConfigAddInformation] = useState({
    row: null,
  });
  const accountSession = AccountSession.getInstance();
  const [isOpenSubfrmAddInformation, setIsOpenSubfrmAddInformation] =
    useState(false);
  const openSubfrmAddInformation = () => setIsOpenSubfrmAddInformation(true);
  const closeSubfrmAddInformation = () => setIsOpenSubfrmAddInformation(false);

  const [isOpenSubfrmYesNoDialog, setIsOpenSubfrmYesNoDialog] = useState(false);
  const openSubfrmYesNoDialog = () => setIsOpenSubfrmYesNoDialog(true);
  const closeSubfrmYesNoDialog = () => setIsOpenSubfrmYesNoDialog(false);
  useEffect(() => {
    getRegistrationFormByClientId(accountSession.getClientId()).then((res) => {
      setApplicationFrms(res.data);
    });
  }, [reload]);

  const handleChangeRegistration = (row, requestStatus) => {
    if (requestStatus === RequestStatus.HuyYeuCau) {
      openSubfrmYesNoDialog();
      setConfigDialog({
        title: "Hủy đăng ký",
        bodyText: "Bạn muốn hủy đơn đăng ký sử dụng điện?",
        onYes: () => {
          cancelRegisterByClientId(accountSession.getClientId()).then((res) => {
            if ((res.status = 200)) {
              notifySuccess("Hủy đăng ký thành công");
              setReload(!reload);
            } else {
              notifyError("Hủy đăng ký thất bại");
            }
            closeSubfrmYesNoDialog();
          });
        },
      });
    } else if (requestStatus === RequestStatus.KetThuc) {
      openSubfrmYesNoDialog();
      // setTextButton("Kết thúc hợp đồng");
      setConfigDialog({
        title: "Kết thúc hợp đồng",
        bodyText: "Bạn muốn kết thúc hợp đồng sử dụng điện này?",
        onYes: () => {
          terminateContract(row.id).then((res) => {
            if (res.status === 204) {
              if (res.data != null) {
                notifyError("Nhân viên ghi điện trước khi kết thúc");
              } else {
                notifySuccess("Kết thúc hợp đồng thành công");
              }
              setReload(!reload);
              closeSubfrmYesNoDialog();
            }
          });
        },
      });
    } else if (requestStatus === RequestStatus.BoSung) {
     setConfigAddInformation({
       row: row
     })
      openSubfrmAddInformation();
    }
  };
  return (
    <div className="w-screen p-2 pl-8 pr-8">
      <TableComponent
        data={applicationFrms}
        columns={[
          { id: "id", label: "Mã đơn đăng ký" },
          { id: "idAndFullName", label: "Mã - họ tên khách hàng" },
          { id: "startDate", label: "Ngày đăng ký" },
          { id: "electricitySupplyAddress", label: "Vị trí cấp điện" },
          { id: "electricTypeName", label: "Loại điện sử dụng" },
          { id: "reasonForRejection", label: "Lý do từ chối" },
          { id: "nameStatus", label: "Trạng thái" },
        ]}
        presentName="registration-form"
        onEdit={handleChangeRegistration}
      ></TableComponent>
      <SubFrmYesNoDialog
        isOpen={isOpenSubfrmYesNoDialog}
        onClose={closeSubfrmYesNoDialog}
        title={configDialog.title}
        bodyText={configDialog.bodyText}
        onYes={configDialog.onYes}
      ></SubFrmYesNoDialog>
      <SubfrmAddInformation
        isOpen={isOpenSubfrmAddInformation}
        onClose={closeSubfrmAddInformation}
        row={configAddInformation.row}
        reload={reload}
        setReload={setReload}
      ></SubfrmAddInformation>
    </div>
  );
};

export default FrmApplicationFrm;
