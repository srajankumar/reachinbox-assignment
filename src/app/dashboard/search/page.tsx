"use client";
import React from "react";
import Image from "next/image";
const Search = () => {
  return (
    <div className="flex justify-center items-center min-h-[85dvh] w-full">
      <div className="flex justify-center items-center flex-col w-full gap-9">
        <Image
          src={"/images/mail.svg"}
          className="w-60 md:w-80 h-48 md:h-60 rounded-sm"
          alt="logo"
          width={500}
          height={500}
        />
        <h1 className="md:text-2xl text-xl text-center font-semibold">
          It&apos;s the beginning of a legendary sales pipeline
        </h1>
        <div className="md:text-lg text-base text-center text-primary/50">
          <p>This is a Search Page</p>
        </div>
      </div>
    </div>
  );
};

export default Search;
