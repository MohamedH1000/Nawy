import Image from "next/image";
import React from "react";
import Link from "next/link";

const NavBar = () => {
  return (
    <header
      className="h-[70px] bg-[white] fixed 
    top-0 flex justify-between items-center py-5
    border-b-[1px] w-full px-5 md:px-[145px] z-20"
    >
      <Link href={"/"}>
        <Image src={"/logo.svg"} alt="logo" width={100} height={50} />
      </Link>
    </header>
  );
};

export default NavBar;
