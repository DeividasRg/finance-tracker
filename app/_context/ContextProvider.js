"use client";
import { createContext, useContext, useState } from "react";

const Context = createContext();

export function ContextProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModuleOpen, setIsModuleOpen] = useState(false);
  const [moduleData, setModuleData] = useState(null);

  const openBurgerMenu = () => setIsOpen(true);
  const closeBurgerMenu = () => setIsOpen(false);
  const openModule = () => setIsModuleOpen(true);
  const closeModule = () => setIsModuleOpen(false);
  const setData = (data) => setModuleData(data);

  return (
    <Context.Provider
      value={{
        isOpen,
        openBurgerMenu,
        closeBurgerMenu,
        isModuleOpen,
        openModule,
        closeModule,
        setData,
        moduleData,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useContextProvider = () => {
  const context = useContext(Context);
  if (!context) throw new Error("Context outside reach");
  return context;
};
