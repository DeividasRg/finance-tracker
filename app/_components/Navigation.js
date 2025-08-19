"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationConfig } from "../lib/config";
import MenuLink from "./MenuLink";

function Navigation() {
  const pathName = usePathname();

  return (
    <nav className="hidden sm:flex z-10 text-xl  items-center justify-between gap-15 overflow-x-auto overflow-y-hidden h-10">
      <ul className="flex sm:gap-10 items-center gap-6">
        {navigationConfig.map((link) => (
          <li key={link.label}>
            <MenuLink href={link.href} label={link.label} pathName={pathName} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
