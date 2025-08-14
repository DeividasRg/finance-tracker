"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function Navigation() {
  const pathName = usePathname();

  return (
    <nav className="z-10 text-xl flex items-center justify-between gap-15 overflow-x-auto overflow-y-hidden h-10">
      <ul className="flex sm:gap-10 items-center gap-6">
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
            href="/settings"
            className={`hover:text-sky-500  transition-colors ${
              pathName === "/settings"
                ? "border-b-2 border-b-sky-500 pb-1 font-normal"
                : "font-light"
            }`}
          >
            Settings
          </Link>
        </li>
        <li>
          <Link
            href="/stats"
            className={`hover:text-sky-500  transition-colors ${
              pathName === "/stats"
                ? "border-b-2 border-b-sky-500 pb-1 font-normal"
                : "font-light"
            }`}
          >
            Stats
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
