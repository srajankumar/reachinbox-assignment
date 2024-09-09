"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/shared/sidebar";

const Home = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("jwtToken", token);
      console.log("Token saved to localStorage:", token);
    }
  }, [searchParams]);

  return (
    <div>
      <Sidebar />
    </div>
  );
};

export default Home;
