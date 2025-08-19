"use client";
import { useSession } from "next-auth/react";
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
