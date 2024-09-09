"use client";
import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  user: {
    email: string;
    id: number;
    firstName: string;
    lastName: string;
  };
  iat: number;
  exp: number;
}

const Sidebar = () => {
  const [initials, setInitials] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        const { firstName, lastName } = decoded.user;

        const firstInitial = firstName ? firstName[0].toUpperCase() : "";
        const lastInitial = lastName ? lastName[0].toUpperCase() : "";

        setInitials(`${firstInitial}${lastInitial}`);
      } catch (error) {
        console.error("Failed to decode JWT token", error);
      }
    }
  }, []);

  return (
    <div className="bg-card flex border-r flex-col w-fit min-h-[100dvh]">
      <div className="py-5 px-4">
        <Image
          src={"/logos/logo-white.svg"}
          className="w-8 h-8 rounded-sm dark:flex hidden"
          alt="logo"
          width={500}
          height={500}
        />
        <Image
          src={"/logos/logo-black.svg"}
          className="w-8 h-8 rounded-sm dark:hidden flex"
          alt="logo"
          width={500}
          height={500}
        />
      </div>
      <div className="flex flex-col justify-between h-[90dvh]">
        <div className="flex flex-col gap-5 py-5">
          <Link
            href={"/home"}
            className={`${
              pathname == "/home"
                ? "dark:bg-secondary bg-primary/10 dark:text-primary"
                : "dark:text-primary/80 text-primary/60"
            } w-fit p-2 mx-auto rounded-sm`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 48 48"
            >
              <path
                fill="currentColor"
                d="M26.394 5.855a3.78 3.78 0 0 0-4.788 0L8.431 16.597A3.91 3.91 0 0 0 7 19.628v19.485C7 41.26 8.713 43 10.825 43h4.35C17.288 43 19 41.26 19 39.113V30.5a2.5 2.5 0 0 1 2.5-2.5h5a2.5 2.5 0 0 1 2.5 2.5v8.613C29 41.26 30.712 43 32.825 43h4.35C39.288 43 41 41.26 41 39.113V19.628a3.91 3.91 0 0 0-1.431-3.031z"
              />
            </svg>
          </Link>
          <Link
            href={"/search"}
            className={`${
              pathname == "/search"
                ? "dark:bg-secondary bg-primary/10 dark:text-primary"
                : "dark:text-primary/80 text-primary/60"
            } w-fit p-2 mx-auto rounded-sm`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
            >
              <g fill="none" fill-rule="evenodd">
                <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
                <path
                  fill="currentColor"
                  d="M6 7a5 5 0 1 1 10 0A5 5 0 0 1 6 7m-1.178 7.672C6.425 13.694 8.605 13 11 13q.671 0 1.316.07a1 1 0 0 1 .72 1.557A5.97 5.97 0 0 0 12 18c0 .92.207 1.79.575 2.567a1 1 0 0 1-.89 1.428Q11.345 22 11 22c-2.229 0-4.335-.14-5.913-.558c-.785-.208-1.524-.506-2.084-.956C2.41 20.01 2 19.345 2 18.5c0-.787.358-1.523.844-2.139c.494-.625 1.177-1.2 1.978-1.69ZM17.5 16a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3M14 17.5a3.5 3.5 0 1 1 6.58 1.665l.834.835A1 1 0 1 1 20 21.414l-.835-.835A3.5 3.5 0 0 1 14 17.5"
                />
              </g>
            </svg>
          </Link>
          <Link
            href={"/mail"}
            className={`${
              pathname == "/mail"
                ? "dark:bg-secondary bg-primary/10 dark:text-primary"
                : "dark:text-primary/80 text-primary/60"
            } w-fit p-2 mx-auto rounded-sm`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7l8-5V6l-8 5l-8-5v2z"
              />
            </svg>
          </Link>
          <Link
            href={"/send"}
            className={`${
              pathname == "/send"
                ? "dark:bg-secondary bg-primary/10 dark:text-primary"
                : "dark:text-primary/80 text-primary/60"
            } w-fit p-2 mx-auto rounded-sm`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 16 16"
            >
              <path
                fill="currentColor"
                d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26l.001.002l4.995 3.178l3.178 4.995l.002.002l.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215l7.494-7.494l1.178-.471z"
              />
            </svg>
          </Link>
          <Link
            href={"/list"}
            className={`${
              pathname == "/list"
                ? "dark:bg-secondary bg-primary/10 dark:text-primary"
                : "dark:text-primary/80 text-primary/60"
            } w-fit p-2 mx-auto rounded-sm`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 512 512"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linejoin="round"
                stroke-width="48"
                d="M144 144h320M144 256h320M144 368h320"
              />
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="square"
                stroke-linejoin="round"
                stroke-width="32"
                d="M64 128h32v32H64zm0 112h32v32H64zm0 112h32v32H64z"
              />
            </svg>
          </Link>
          <Link
            href={"/inbox"}
            className={`${
              pathname == "/inbox"
                ? "dark:bg-secondary bg-primary/10 dark:text-primary"
                : "dark:text-primary/80 text-primary/60"
            } w-fit p-2 mx-auto rounded-sm`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 16 16"
            >
              <path
                fill="currentColor"
                d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5a1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4zm-1.17-.437A1.5 1.5 0 0 1 4.98 3h6.04a1.5 1.5 0 0 1 1.17.563l3.7 4.625a.5.5 0 0 1 .106.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374z"
              />
            </svg>
          </Link>
          <Link
            href={"/stats"}
            className={`${
              pathname == "/stats"
                ? "dark:bg-secondary bg-primary/10 dark:text-primary"
                : "dark:text-primary/80 text-primary/60"
            } w-fit p-2 mx-auto rounded-sm`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M104 496H72a24 24 0 0 1-24-24V328a24 24 0 0 1 24-24h32a24 24 0 0 1 24 24v144a24 24 0 0 1-24 24m224 0h-32a24 24 0 0 1-24-24V232a24 24 0 0 1 24-24h32a24 24 0 0 1 24 24v240a24 24 0 0 1-24 24m112 0h-32a24 24 0 0 1-24-24V120a24 24 0 0 1 24-24h32a24 24 0 0 1 24 24v352a24 24 0 0 1-24 24m-224 0h-32a24 24 0 0 1-24-24V40a24 24 0 0 1 24-24h32a24 24 0 0 1 24 24v432a24 24 0 0 1-24 24"
              />
            </svg>
          </Link>
        </div>
        <div className="mx-auto py-5">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback className="bg-green-900">
              {initials ? initials : "NA"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
