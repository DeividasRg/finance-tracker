"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function Navigation() {
  const pathName = usePathname();

  return (
    <nav className="z-10 text-xl flex items-center justify-between gap-15">
      <ul className="flex gap-10 items-center">
        <li>
          <Link
            href="/"
            className={`hover:text-sky-500  transition-colors ${
              pathName === "/"
                ? "border-b-2 border-b-sky-500 pb-1 "
                : "font-light"
            }`}
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            href="/about"
            className={`hover:text-sky-500  transition-colors ${
              pathName === "/about"
                ? "border-b-2 border-b-sky-500 pb-1 font-normal"
                : "font-light"
            }`}
          >
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
