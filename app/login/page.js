"use client";

import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

export default function Page() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex items-center gap-3 bg-gray-200 px-8 py-5 rounded-full hover:bg-gray-400 hover:cursor-pointer active:bg-gray-500">
        <FaGoogle className="h-[1.8rem] w-[1.8rem]" />
        <button
          className="text-3xl font-bold hover:cursor-pointer"
          onClick={() => signIn("google", { redirectTo: "/" })}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
