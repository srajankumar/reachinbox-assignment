"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/shared/header";
import Sidebar from "@/components/shared/sidebar";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="flex">
      <Sidebar />
      <Header />
      <div className="pl-20 pt-20 pr-4 w-full">
        <Suspense>{children}</Suspense>
      </div>
    </div>
  );
}
