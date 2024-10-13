import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { fraunces, poppins } from "@/utils/fonts/font";

export default function NavComponent() {
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row gap-8 justify-center items-center ">
      <Button
        className={`${fraunces.className} w-full bg-white text-black hover:bg-white`}
        onClick={() => signIn()}
      >
        Login
      </Button>
      <Button
        className={`${poppins.className} w-full bg-gradient-to-r from-primarySkyBlue to-secondarySkyBlue hover:bg-gradient-to-r hover:to-primarySkyBlue hover:from-secondarySkyBlue`}
        onClick={() => {
          router.push("/signup");
        }}
      >
        Signup
      </Button>
    </div>
  );
}
