import Image from "next/image";
import Link from "next/link";
import React from "react";
import Breadcrumb from "./Breadcrumb";

function Header() {
  return (
    <header className="bg-blue-600 px-10 py-4">
      <nav className="flex justify-between items-center">
        <div className="">
          <Link href={"/"} className="text-white font-semibold">
            <Image src="/logo.svg" width={150} height={40} alt="logo" />{" "}
          </Link>
        </div>
        <div className="">
          <Link href={"/"}>
            <Image
              src="https://picsum.photos/id/883/50/50"
              width={45}
              height={45}
              alt="Avatar"
              className="align-middle rounded-full border-white border-2"
            />
          </Link>
        </div>
      </nav>
      <hr className="opacity-50  my-6" />
      <Breadcrumb />
    </header>
  );
}

export default Header;
