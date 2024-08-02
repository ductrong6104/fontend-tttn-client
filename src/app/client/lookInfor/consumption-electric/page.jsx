'use client'
import { useAuth } from "@/components/context/authContext";
import { useForm } from "@/components/context/frmNameContext";
import NavLookupInfor from "@/components/navbar/navLookupInfor";
import { useEffect } from "react";

export default function PageConsumptionElectric() {
    const {isLoggedIn} = useAuth();
    const { setFormName } = useForm();

    useEffect(() => {
      // Thiết lập formName khi component được mount
      if (isLoggedIn) {
        setFormName("PageConsumptionElectric");
      } else {
        setFormName("PageNotLoggedIn");
      }
    }, [isLoggedIn]);
    return (
        <NavLookupInfor label="Điện năng sử dụng"></NavLookupInfor>
    )
}