"use client";

import { GetAllUserAdmin } from "@/app/actions/users/checkUser";
import { GetAllUserType } from "@/types/types";
import { Shield, Trash2, UserCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import DeleteUserAdminModal from "./DeleteModal";

export default function AllUser() {
  const session = useSession();
  const [users, setUsers] = useState<GetAllUserType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllUsers = async () => {
      setLoading(true);
      try {
        if (!session.data?.user?.id) throw new Error("No user loggedin");
        const response = await GetAllUserAdmin(session.data?.user.id);
        if (response.status !== 200) throw new Error(response.message);
        setUsers(response.data);
      } catch (error) {
        toast((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    getAllUsers();
  }, []);

  if (!session.data?.user) {
    return <div>Not Logged In</div>;
  }
  return (
    <div>
      <div className="md:flex md:flex-col gap-8 py-6 h-screen max-h-screen overflow-y-scroll no-scrollbar ">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center ">
            <p className="bg-white border-2 border-b-8 border-r-8 border-black p-4 rounded-md font-bold animate-bounce ">
              JJ
            </p>
          </div>
        ) : (
          <>
            {users.map((e: GetAllUserType) => {
              return e.id !== session.data?.user?.id ? (
                <div
                  className="flex justify-between rounded-md border-2 border-slate-100 p-4 items-center mt-8 md:mt-0"
                  key={e.id}
                >
                  <div className="flex gap-4">
                    <Image
                      src={e.avatar || "/Images/avatar.png"}
                      width={100}
                      height={100}
                      alt="Picture of the author"
                      className="rounded-full w-12 h-12"
                    />
                    <div>
                      <div className="flex gap-2 items-center">
                        <UserCircle className="size-4 " />
                        <p className="text-lg font-bold">{e.username}</p>
                      </div>

                      <div className="flex gap-2 items-center">
                        <Shield className="size-4 " />
                        <p className="text-gray-500">
                          {e.role.toLocaleLowerCase()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <DeleteUserAdminModal userId={e.id} />
                </div>
              ) : (
                ""
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
