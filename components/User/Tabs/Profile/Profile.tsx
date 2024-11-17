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
      <div className="w-full h-full flex items-center justify-center text-xl text-red-400">
        Error...
        <RefreshCcw
          onClick={() => {
            setError({
              status: false,
              message: "",
            });
            setRefetch((prev) => !prev);
          }}
          className="cursor-pointer size-4 text-red-400"
        />
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center border-2 border-primaryBorder bg-primaryBorder p-4 rounded-xl mt-12">
        <div className="flex gap-6 items-center">
          <Image
            src={user.avatar || "/Images/avatar.png"}
            width={100}
            height={100}
            alt="Picture of the author"
            className="rounded-full"
          />

          <div>
            <p className="text-sm sm:text-lg md:text-xl font-kanit font-bold text-white">
              {user.username}
            </p>

            <div className="flex gap-2 items-center mt-2">
              <MdAdminPanelSettings className="text-gray-400 size-4" />
              <p className="text-sm text-gray-400 font-bold">
                {user.role?.toLowerCase()}
              </p>
            </div>

            <div className="flex gap-2 items-center mt-2">
              <Calendar className="text-gray-400 size-4" />
              <p className="text-sm text-gray-400 font-bold text-sm">
                {accountCreated}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className=" border-2 border-primaryBorder bg-primaryBorder p-4 rounded-xl mt-12">
        <div className="flex justify-between items-center">
          <p className="text-bold font-kanit font-bold text-xl text-white">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 md:gap-y-8 mt-4">
          <div>
            <p className="flex gap-2 items-center text-gray-400 font-kanit text-lg font-bebas">
              <User2 className="size-4" />
              <span>User Name</span>
            </p>
            <p className="font-bold font-kanit text-sm sm:text-lg md:text-lg text-slate-300">
              {user.username}
            </p>
          </div>

          <div>
            <p className="flex gap-2 items-center text-gray-400 font-kanit text-lg font-bebas">
              <Mail className="size-4" />
              <span> Email Id</span>
            </p>
            <p className="font-bold font-kanit text-sm sm:text-lg md:text-lg text-slate-300">
              {user.email}
            </p>
          </div>

          <div>
            <p className="flex gap-2 items-center text-gray-400 font-kanit text-lg font-bebas">
              <Notebook className="size-4" />
              <span>Bio</span>
            </p>
            <p className="font-bold font-kanit text-sm sm:text-lg md:text-lg text-slate-300">
              {user.bio || "null"}
            </p>
          </div>

          <div>
            <p className="flex gap-2 items-center text-gray-400 font-kanit text-lg font-bebas">
              <Linkedin className="size-4" />
              <span>Linkedin</span>
            </p>
            <p className=" flex gap-2 items-center font-bold font-kanit text-sm sm:text-lg  md:text-lg text-slate-300">
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
            <p className="flex gap-2 items-center text-gray-400 font-kanit text-lg font-bebas">
              <FaTwitter />
              <span>Twitter</span>
            </p>
            <p className="flex gap-2 items-center font-bold font-kanit text-sm sm:text-lg  md:text-lg text-slate-300">
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
            <p className="flex gap-2 items-center text-gray-400 font-kanit text-lg font-bebas">
              <FaInstagram />
              <span>Instagram</span>
            </p>
            <p className="flex gap-2 items-center font-bold font-kanit text-sm  sm:text-lg  md:text-lg text-slate-300">
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
