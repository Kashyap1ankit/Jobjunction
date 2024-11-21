import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, PlusCircle, Shield, UserCircle } from "lucide-react";
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
            className="h-8 w-8 rounded-full shadow-md md:h-12 md:w-12"
            aria-label="user-profile"
            width={500}
            height={500}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="items-left mx-4 flex flex-col border-2 border-primaryBorder bg-secondaryBorder text-gray-400">
          <DropdownMenuItem>
            <Link
              href="/jobs"
              className="flex w-full cursor-pointer items-center justify-center gap-2"
              aria-label="apply"
            >
              <TbHandClick />
              <TextComponent text="Apply" className="font-bebas" />
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link
              href={"/jobs/create"}
              className="flex w-full cursor-pointer items-center justify-center gap-2"
              aria-label="post"
            >
              <PlusCircle className="size-4" />
              <TextComponent text="Post" className="font-bebas" />
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link
              href={`/user/${session.data?.user?.id}/profile`}
              className="flex w-full cursor-pointer items-center justify-center gap-2"
              aria-label="profile"
            >
              <UserCircle className="size-4" />
              <TextComponent text="Profile" className="font-bebas" />
            </Link>
          </DropdownMenuItem>

          {session.data?.user?.role === "ADMIN" ? (
            <DropdownMenuItem>
              <Link
                href={`/admin`}
                className="flex w-full cursor-pointer items-center justify-center gap-2"
                aria-label="profile"
              >
                <Shield className="size-4 fill-white" />
                <p>Admin</p>
              </Link>
            </DropdownMenuItem>
          ) : null}

          <DropdownMenuItem>
            <div
              onClick={() => signOut()}
              className="flex w-full cursor-pointer items-center justify-center gap-2"
            >
              <LogOut className="size-4" />
              <p>Logout</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
