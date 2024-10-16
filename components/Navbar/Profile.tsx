import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, PlusCircle, UserCircle } from "lucide-react";
import { TbHandClick } from "react-icons/tb";
import TextComponent from "../TextComp";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Profile() {
  const session = useSession();
  const imageUrl = session.data?.user?.image;
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <img
            src={imageUrl || "/Images/avatar.png"}
            alt=""
            className="w-8 h-8 md:w-12 md:h-12 rounded-full shadow-md"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col items-left  bg-secondaryBorder text-gray-400 border-2 border-primaryBorder mx-4">
          <DropdownMenuItem>
            <Link
              href="/jobs"
              className="flex gap-2 items-center w-full justify-center cursor-pointer "
            >
              <TbHandClick />
              <TextComponent text="Apply" className=" font-bebas" />
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link
              href={"/jobs/create"}
              className="flex gap-2 items-center w-full justify-center cursor-pointer"
            >
              <PlusCircle className="size-4" />
              <TextComponent text="Post" className=" font-bebas" />
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link
              href={`/user/${session.data?.user?.id}/profile`}
              className="flex gap-2 items-center w-full justify-center cursor-pointer"
            >
              <UserCircle className="size-4" />
              <TextComponent text="Profile" className=" font-bebas" />
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <div
              onClick={() => signOut()}
              className="flex gap-2 items-center w-full justify-center cursor-pointer"
            >
              <LogOut className=" size-4 " />
              <p>Logout</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
