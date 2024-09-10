"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

const Logout = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    router.push("/login");
  };

  return (
    <Button onClick={handleLogout} variant={"destructive"} className="w-full">
      Logout
    </Button>
  );
};

export default Logout;
