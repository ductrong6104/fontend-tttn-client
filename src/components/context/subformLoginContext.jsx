// SubformContext.js
'use client'
import { createContext, useContext, useState } from "react";

const SubformLoginContext = createContext();

export function SubformLoginProvider({ children }) {
    const [subformLoginIsOpen, setSubformLoginIsOpen] = useState(false);
    return (
        <SubformLoginContext.Provider value={{ subformLoginIsOpen, setSubformLoginIsOpen }}>
            {children}
        </SubformLoginContext.Provider>
    );
}

export function useSubformLogin() {
    return useContext(SubformLoginContext);
}
