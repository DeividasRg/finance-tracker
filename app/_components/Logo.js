import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/">
      <Image src="/logo.png" height="60" width="60" alt="logo" />
    </Link>
  );
}

export default Logo;
