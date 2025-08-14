"use client";
import { useSession } from "next-auth/react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import { signOut } from "next-auth/react";

function Header() {
  const { status } = useSession();

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
    <header className="px-8 py-4 border-b-1 border-b-gray-200 bg-white">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center justify-start sm:gap-10 gap-4 ">
          <Logo />
          <Navigation />
        </div>
        <button
          onClick={() => signOut()}
          className="bg-gray-100 rounded-full p-2 hover:bg-gray-200 hover:cursor-pointer font-normal"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}

export default Header;
