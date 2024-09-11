import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl mt-4">Oops! Page not found.</p>
      <Link href={"/"}>
        <Button className="mt-6 px-20 text-base py-5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
          Go Back
        </Button>
      </Link>
    </div>
  );
}
