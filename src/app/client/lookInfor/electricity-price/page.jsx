
'use client'

import ButtonCustome from "@/components/button/button";
import { GeneratePDFBilPayment } from "@/utils/pdf";
import { useState } from "react";


export default function ExportPage() {
    const [formData, setFormData] = useState({});
  const handleClick = () => {
    GeneratePDFBilPayment(formData);
  }

 
  return (
    <>
        <ButtonCustome onClick={handleClick}>Generate bill</ButtonCustome>
    </>
  );
}
