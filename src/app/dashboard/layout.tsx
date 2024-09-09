"use client";

import Header from "@/components/shared/header";
import Sidebar from "@/components/shared/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <Header />
      <div className="pl-20 pt-20 pr-4 w-full">{children}</div>
    </div>
  );
}
