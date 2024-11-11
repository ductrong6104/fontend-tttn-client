'use client'

import { useAuth } from "@/components/context/authContext";
import PageNotLoggedIn from "@/components/page/pageNotLoggedIn";
import NavOnlineTrading from "@/components/navbar/navOnlineTrading";
import { useForm } from "@/components/context/frmNameContext";
import { useEffect } from "react";
import FrmContractRegis from "@/components/form/frmContractRegis";

export default function PageContractRegis() {
    const {isLoggedIn} = useAuth();
    const { setFormName } = useForm();
    
    useEffect(() => {
      // Thiết lập formName khi component được mount
      if (isLoggedIn) {
        setFormName("FrmContractRegis");
      } else {
        setFormName("PageNotLoggedIn");
      }
    }, [isLoggedIn]);
    return (
        <NavOnlineTrading label="Thay đổi hợp đồng mua bán điện"></NavOnlineTrading>
    )
}