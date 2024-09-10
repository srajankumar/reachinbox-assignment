"use client";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { usePathname } from "next/navigation";
import React from "react";
import { ModeToggle } from "../mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Plus } from "lucide-react";

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

const Header = () => {
  const [fullName, setFullName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const pathname = usePathname();
  const dynamicSegment = pathname.split("/")[2];

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        const { firstName, lastName } = decoded.user;
        setFullName(`${firstName} ${lastName}`);
        setFirstName(firstName);
      } catch (error) {
        console.error("Failed to decode JWT token", error);
      }
    }
  }, []);

  return (
    <div className="w-full flex fixed z-40 pl-20 bg-background justify-between items-center pr-4 py-4 border-b">
      <p className="text-xl font-semibold capitalize">{dynamicSegment}</p>
      <div className="flex gap-3">
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger className="flex justify-center items-center gap-2">
            <div className="md:flex hidden">{fullName}&apos;s Workspace</div>
            <div className="md:hidden sm:flex hidden">
              {firstName}&apos;s Workspace
            </div>
            <div className="sm:hidden flex">Workspace</div>
            <ChevronDown className="w-5 h-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="text-blue-500 flex gap-2 items-center">
              <Plus className="w-5 h-5" /> Create Workspace
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="md:flex hidden">{fullName}&apos;s Workspace</div>
              <div className="md:hidden sm:flex hidden">
                {firstName}&apos;s Workspace
              </div>
              <div className="sm:hidden flex">Workspace</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
