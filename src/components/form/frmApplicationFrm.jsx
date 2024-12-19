import { useEffect, useState } from "react";
import TableComponent from "../table/tableComponent";
import { getContractStatusByClientId, getRegistrationFormByClientId } from "@/modules/contracts/service";
import AccountSession from "@/utils/account";

const FrmApplicationFrm = () => {
    const [applicationFrms, setApplicationFrms] = useState([]);
    const [reload, setReload] = useState(false);
    const accountSession = AccountSession.getInstance();
    useEffect(() => {
      getRegistrationFormByClientId(accountSession.getClientId()).then((res) => {
          setApplicationFrms(res.data);
        })
    }, [reload]);
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
        // onEdit={handleClickPayment}
      ></TableComponent>
    </div>
  );
};

export default FrmApplicationFrm;
