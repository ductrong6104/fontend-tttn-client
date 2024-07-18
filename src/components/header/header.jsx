'use client'
import Navbar from "@/components/navbar/navbar";
import SubformLogin from "@/components/subform/SubformLogin";
import { useState } from "react";
import { SubformLoginProvider, useSubformLogin } from "../context/subformLoginContext";
export default function HeaderPage() {
    const {subformLoginIsOpen, setSubformLoginIsOpen} = useSubformLogin();
    const [selectedNav, setSelectedNav] = useState(false);
    const openSubform = () => {
        setSubformLoginIsOpen(true);
    }
    const closeSubform = () => {
        setSubformLoginIsOpen(false);
    }
    return (
        <div className="">
            <Navbar openSubForm={setSubformLoginIsOpen} selectedNav={selectedNav} setSelectedNav={setSelectedNav}></Navbar>
            <SubformLogin isOpen={subformLoginIsOpen} onClose={closeSubform} openSubformLogin={openSubform} setSelectedNav={setSelectedNav}></SubformLogin>
        </div>
    );
}