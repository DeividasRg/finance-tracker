import Link from "next/link";

function MenuLink({ href, pathName, label, onClick }) {
  const isActive = href === "/" ? pathName === "/" : pathName.startsWith(href);

  if (onClick)
    return (
      <Link
        href={href}
        onClick={onClick}
        className={`hover:text-sky-500  transition-colors ${
          isActive ? "border-b-2 border-b-sky-500 pb-1 " : "font-light"
        }`}
      >
        {label}
      </Link>
    );

  return (
    <Link
      href={href}
      className={`hover:text-sky-500  transition-colors ${
        isActive ? "border-b-2 border-b-sky-500 pb-1 " : "font-light"
      }`}
    >
      {label}
    </Link>
  );
}

export default MenuLink;
