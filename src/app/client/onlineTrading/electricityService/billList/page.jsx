'use client'
import { useAuth } from "@/components/context/authContext";
import { useForm } from "@/components/context/frmNameContext";
import FrmBillPayment from "@/components/form/frmBillPayment";
import NavOnlineTrading from "@/components/navbar/navOnlineTrading";
import PageNotLoggedIn from "@/components/page/pageNotLoggedIn";
import { useEffect, useState } from "react";
export default function PageBillList(){
    const {isLoggedIn} = useAuth();
    const { setFormName } = useForm();

    useEffect(() => {
      // Thiết lập formName khi component được mount
      if (isLoggedIn) {
        setFormName("FrmBillList");
      } else {
        setFormName("PageNotLoggedIn");
      }
    }, [isLoggedIn]);
    return (
        <NavOnlineTrading label="Danh sách hóa đơn"></NavOnlineTrading>
    )
}