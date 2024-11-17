"use client";

import { GetUserDetailById } from "@/app/actions/users/checkUser";
import {
  isProfileVisitorUser,
  refetchAtom,
  universalError,
  universalLoader,
} from "@/store/store";
import { GetUserDetailByIdType } from "@/types/types";
import {
  Calendar,
  Linkedin,
  Mail,
  Notebook,
  RefreshCcw,
  User2,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { useRecoilState } from "recoil";
import EditUserProfileDialog from "./EditDialog";
import { TbExternalLink } from "react-icons/tb";
import Link from "next/link";
import { UserRole } from "@prisma/client";
import { roboto_slab } from "@/utils/fonts/font";
import Loader from "@/app/loading";

export default function UserProfileDashboard() {
  const [accountCreated, setAccountCreated] = useState<string>();
  const [loader, setLoader] = useRecoilState(universalLoader);
  const [error, setError] = useRecoilState(universalError);
  const [refetch, setRefetch] = useRecoilState(refetchAtom);
  const [isVisitorUser, setIsVisitorUser] =
    useRecoilState(isProfileVisitorUser);

  const [user, setUser] = useState<GetUserDetailByIdType>({
    id: "",
    username: "",
    email: "",
    linkedin_url: null,
    instagram_url: null,
    twitter_url: null,
    bio: null,
    avatar: null,
    createdAt: new Date(Date.now()),
    role: UserRole.USER,
  });

  const { userId }: { userId: string } = useParams();

  const getFormattedDate = (createdAt: Date) => {
    const date = new Date(createdAt);

    const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth(),
    ).padStart(2, "0")}/${String(date.getFullYear()).padStart(2, "0")}`;

    setAccountCreated(formattedDate);
  };

  useEffect(() => {
    const getUser = async () => {
      setLoader(true);
      try {
        const res: {
          status: number;
          message: string;
          data: GetUserDetailByIdType | null;
        } = await GetUserDetailById(userId as string);

        if (res.status !== 200 || !res.data) throw new Error(res.message);

        setUser(res.data);
        getFormattedDate(res.data.createdAt);
      } catch (error) {
        setError({
          status: true,
          message: (error as Error).message,
        });
      } finally {
        setLoader(false);
      }
    };

    getUser();
  }, [refetch]);

  if (loader) {
    return <Loader />;
  }

  if (error.status) {
    return (
      <div className="flex h-full w-full items-center justify-center text-xl text-red-400">
        Error...
        <RefreshCcw
          onClick={() => {
            setError({
              status: false,
              message: "",
            });
            setRefetch((prev) => !prev);
          }}
          className="size-4 cursor-pointer text-red-400"
        />
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="mt-12 flex items-center justify-between rounded-xl border-2 border-primaryBorder bg-primaryBorder p-4">
        <div className="flex items-center gap-6">
          <Image
            src={user.avatar || "/Images/avatar.png"}
            width={100}
            height={100}
            alt="Picture of the author"
            className="rounded-full"
          />

          <div>
            <p className="font-kanit text-sm font-bold text-white sm:text-lg md:text-xl">
              {user.username}
            </p>

            <div className="mt-2 flex items-center gap-2">
              <MdAdminPanelSettings className="size-4 text-gray-400" />
              <p className="text-sm font-bold text-gray-400">
                {user.role?.toLowerCase()}
              </p>
            </div>

            <div className="mt-2 flex items-center gap-2">
              <Calendar className="size-4 text-gray-400" />
              <p className="text-sm font-bold text-gray-400">
                {accountCreated}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 rounded-xl border-2 border-primaryBorder bg-primaryBorder p-4">
        <div className="flex items-center justify-between">
          <p className="text-bold font-kanit text-xl font-bold text-white">
            More Details
          </p>

          {isVisitorUser ? (
            <EditUserProfileDialog
              id={user.id}
              bio={user.bio}
              linkedin_url={user.linkedin_url}
              twitter_url={user.twitter_url}
              instagram_url={user.instagram_url}
            />
          ) : (
            ""
          )}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-y-4 md:gap-y-8 lg:grid-cols-2">
          <div>
            <p className="flex items-center gap-2 font-bebas font-kanit text-lg text-gray-400">
              <User2 className="size-4" />
              <span>User Name</span>
            </p>
            <p className="font-kanit text-sm font-bold text-slate-300 sm:text-lg md:text-lg">
              {user.username}
            </p>
          </div>

          <div>
            <p className="flex items-center gap-2 font-bebas font-kanit text-lg text-gray-400">
              <Mail className="size-4" />
              <span> Email Id</span>
            </p>
            <p className="font-kanit text-sm font-bold text-slate-300 sm:text-lg md:text-lg">
              {user.email}
            </p>
          </div>

          <div>
            <p className="flex items-center gap-2 font-bebas font-kanit text-lg text-gray-400">
              <Notebook className="size-4" />
              <span>Bio</span>
            </p>
            <p className="font-kanit text-sm font-bold text-slate-300 sm:text-lg md:text-lg">
              {user.bio || "null"}
            </p>
          </div>

          <div>
            <p className="flex items-center gap-2 font-bebas font-kanit text-lg text-gray-400">
              <Linkedin className="size-4" />
              <span>Linkedin</span>
            </p>
            <p className="flex items-center gap-2 font-kanit text-sm font-bold text-slate-300 sm:text-lg md:text-lg">
              {user.linkedin_url || "null"}
              {user.linkedin_url ? (
                <Link href={user.linkedin_url} aria-label="linkedin">
                  <TbExternalLink />
                </Link>
              ) : (
                ""
              )}
            </p>
          </div>

          <div>
            <p className="flex items-center gap-2 font-bebas font-kanit text-lg text-gray-400">
              <FaTwitter />
              <span>Twitter</span>
            </p>
            <p className="flex items-center gap-2 font-kanit text-sm font-bold text-slate-300 sm:text-lg md:text-lg">
              {user.twitter_url || "null"}
              {user.twitter_url ? (
                <Link href={user.twitter_url} aria-label="twitter">
                  <TbExternalLink />
                </Link>
              ) : (
                ""
              )}
            </p>
          </div>

          <div>
            <p className="flex items-center gap-2 font-bebas font-kanit text-lg text-gray-400">
              <FaInstagram />
              <span>Instagram</span>
            </p>
            <p className="flex items-center gap-2 font-kanit text-sm font-bold text-slate-300 sm:text-lg md:text-lg">
              {user.instagram_url || "null"}
              {user.instagram_url ? (
                <Link href={user.instagram_url} aria-label="instagram">
                  <TbExternalLink />
                </Link>
              ) : (
                ""
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
