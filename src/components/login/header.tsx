import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="fixed top-0 py-5 border-b w-full flex justify-center">
      <Image
        src={"/logos/logo-h-white.png"}
        alt="reachinbox-logo"
        className="md:w-52 w-40 md:h-7 h-6 hidden dark:flex"
        width={500}
        height={500}
      ></Image>
      <Image
        src={"/logos/logo-h-black.png"}
        alt="reachinbox-logo"
        className="md:w-52 w-40 md:h-7 h-6 dark:hidden flex"
        width={500}
        height={500}
      ></Image>
    </div>
  );
};

export default Header;
