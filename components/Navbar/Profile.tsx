import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LogOut,
  PlusCircle,
  Shield,
  ShieldAlert,
  UserCircle,
} from "lucide-react";
import { TbHandClick } from "react-icons/tb";
import TextComponent from "../TextComp";
import Link from "next/link";
import { signOut } from "next-auth/react";
import Image from "next/image";

export default function Profile() {
  const session = useSession();
  const imageUrl = session.data?.user?.image;
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none" aria-label="profile-dd">
          <Image
            src={imageUrl || "/Images/avatar.png"}
            alt="user-avatar"
            className="w-8 h-8 md:w-12 md:h-12 rounded-full shadow-md"
            aria-label="user-profile"
            width={500}
            height={500}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col items-left  bg-secondaryBorder text-gray-400 border-2 border-primaryBorder mx-4">
          <DropdownMenuItem>
            <Link
              href="/jobs"
              className="flex gap-2 items-center w-full justify-center cursor-pointer "
              aria-label="apply"
            >
              <TbHandClick />
              <TextComponent text="Apply" className=" font-bebas" />
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link
              href={"/jobs/create"}
              className="flex gap-2 items-center w-full justify-center cursor-pointer"
              aria-label="post"
            >
              <PlusCircle className="size-4" />
              <TextComponent text="Post" className=" font-bebas" />
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link
              href={`/user/${session.data?.user?.id}/profile`}
              className="flex gap-2 items-center w-full justify-center cursor-pointer"
              aria-label="profile"
            >
              <UserCircle className="size-4" />
              <TextComponent text="Profile" className=" font-bebas" />
            </Link>
          </DropdownMenuItem>

          {session.data?.user?.role === "ADMIN" ? (
            <DropdownMenuItem>
              <Link
                href={`/admin`}
                className="flex gap-2 items-center w-full justify-center cursor-pointer"
                aria-label="profile"
              >
                <Shield className=" size-4 fill-white" />
                <p>Admin</p>
              </Link>
            </DropdownMenuItem>
          ) : null}

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
