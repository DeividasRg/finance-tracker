"use client";
import { createContext, useContext, useState } from "react";

const BurgerMenuContext = createContext();

export function BurgerMenuProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openBurgerMenu = () => setIsOpen(true);
  const closeBurgerMenu = () => setIsOpen(false);

  return (
    <BurgerMenuContext.Provider
      value={{ isOpen, openBurgerMenu, closeBurgerMenu }}
    >
      {children}
    </BurgerMenuContext.Provider>
  );
}

export const useBurgerMenu = () => {
  const context = useContext(BurgerMenuContext);
  if (!context) throw new Error("Context outside reach");
  return context;
};
