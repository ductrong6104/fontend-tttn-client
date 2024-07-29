'use client'
import { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formName, setFormName] = useState();

  return (
    <FormContext.Provider value={{ formName, setFormName }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);
