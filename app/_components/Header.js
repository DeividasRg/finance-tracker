"use client";
import { signOut, useSession } from "next-auth/react";
import Logo from "./Logo";
import { RxHamburgerMenu } from "react-icons/rx";
import { useBurgerMenu } from "../_context/BurgerMenuProvider";
import Navigation from "./Navigation";

function Header() {
  const { status } = useSession();
  const { isOpen, openBurgerMenu, closeBurgerMenu } = useBurgerMenu();

  if (status !== "authenticated") {
    return (
      <header className="px-8 py-4 border-b-1 border-b-gray-200 bg-white ">
        <div className="flex justify-center items-center max-w-7xl mx-auto">
          <Logo />
        </div>
      </header>
    );
  }

  return (
    <header className="flex items-center justify-between px-15 py-5 border-b-1 border-b-gray-200 bg-white">
      <Logo />
      <Navigation />
      <button
        onClick={signOut}
        className="bg-gray-200 p-3 rounded-full cursor-pointer active:bg-gray-400 hover:bg-gray-300 hidden sm:block"
      >
        Logout
      </button>

      {!isOpen && (
        <button
          onClick={openBurgerMenu}
          className="mt-2 border border-gray-400 p-2 rounded-full sm:hidden"
        >
          <RxHamburgerMenu />
        </button>
      )}
    </header>
  );
}

export default Header;
