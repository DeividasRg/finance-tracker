"use client";
import { useContextProvider } from "../_context/ContextProvider";
import { usePathname } from "next/navigation";
import { navigationConfig } from "../lib/config";
import MenuLink from "./MenuLink";
import { signOut } from "next-auth/react";

function NavigationPanel() {
  const { isOpen, closeBurgerMenu } = useContextProvider();
  const pathName = usePathname();

  if (isOpen)
    return (
      <>
        <div
          onClick={closeBurgerMenu}
          className="fixed inset-0 bg-black/40 z-40"
        />
        <div className="fixed top-0 right-0 z-50 bg-white h-screen w-[60%] px-5 py-6">
          <div className="flex items-center justify-between">
            <h1 className="font-bold">Menu</h1>
            <button
              onClick={closeBurgerMenu}
              className="text-3xl cursor-pointer"
            >
              &times;
            </button>
          </div>
          <ul className="flex flex-col items-left gap-6 mt-10">
            {navigationConfig.map((link) => (
              <li className="text-xl" key={link.label}>
                <MenuLink
                  href={link.href}
                  pathName={pathName}
                  label={link.label}
                  onClick={closeBurgerMenu}
                />
              </li>
            ))}
          </ul>
          <button
            onClick={signOut}
            className="mt-5 w-full py-3 bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400 active:bg-gray-500"
          >
            Logout
          </button>
        </div>
      </>
    );
}

export default NavigationPanel;
