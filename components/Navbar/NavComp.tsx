import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { workSans } from "@/utils/fonts/font";

export default function NavComponent() {
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row gap-y-8  sm:gap-x-8">
      <Button
        className={`${workSans.className} w-full bg-white text-black hover:bg-white`}
        onClick={() => signIn()}
        aria-label="Sign-in"
      >
        Login
      </Button>
      <Button
        className={`${workSans.className} w-full bg-gradient-to-r from-primarySkyBlue to-secondarySkyBlue hover:bg-gradient-to-r hover:to-primarySkyBlue hover:from-secondarySkyBlue`}
        onClick={() => {
          router.push("/signup");
        }}
        aria-label="Sign-up"
      >
        Signup
      </Button>
    </div>
  );
}
