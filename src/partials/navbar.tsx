"use client";

import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="w-full h-16 text-gray-700 flex items-center justify-between px-4 ">
      <Link href={"/"} className="text-lg font-bold flex space-x-4 items-center">
        <Image src="/images/cinema.jpg" alt="Logo" width={48} height={48} />
        <span>MovieAttitude</span>
      </Link>     
    </nav>
  );
}

