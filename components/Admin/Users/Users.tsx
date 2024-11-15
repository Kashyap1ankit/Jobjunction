"use client";

import { GetAllUserAdmin } from "@/app/actions/users/checkUser";
import { GetAllUserType } from "@/types/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import DeleteUserAdminModal from "./DeleteModal";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { poppins } from "@/utils/fonts/font";
import Link from "next/link";
import Loader from "@/app/loading";

export default function AllUser() {
  const session = useSession();
  const [users, setUsers] = useState<GetAllUserType[] | []>([]);
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
    return <div className="text-white">Not Logged In</div>;
  }
  return (
    <div>
      <div className="md:flex md:flex-col gap-8 py-6 h-screen max-h-screen overflow-y-scroll no-scrollbar ">
        {loading ? (
          <Loader />
        ) : (
          <>
            <Table>
              <TableHeader className="">
                <TableRow
                  className={`${poppins.className} bg-gray-700 text-white font-bold hover:bg-gray-700`}
                >
                  <TableHead className="text-white rounded-tl-md">Id</TableHead>
                  <TableHead className="text-white">Username</TableHead>
                  <TableHead className="text-white">Role</TableHead>
                  <TableHead className="text-white">Posts</TableHead>
                  <TableHead className="text-white">Email Id</TableHead>
                  <TableHead className="text-white rounded-tr-md">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody
                className={`${poppins.className} bg-primaryBorder text-white font-bold text-gray-400`}
              >
                {users.map((user) => (
                  <TableRow
                    key={user.id}
                    className=" hover:bg-primaryBorder cursor-pointer"
                  >
                    <TableCell className="font-medium">
                      #{user.id.slice(0, 5)}
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/user/${user.id}/profile` || "/jobs"}
                        aria-label="company_website"
                        target="_blank"
                        className="hover:text-blue-500"
                      >
                        {user.username}
                      </Link>
                    </TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user._count.posts}</TableCell>
                    <TableCell>
                      <Link
                        href={`mailto:${user.email}`}
                        aria-label="company_website"
                        target="_blank"
                        className="hover:text-blue-500"
                      >
                        {user.email}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <DeleteUserAdminModal userId={user.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </div>
    </div>
  );
}

// {users.map((e: GetAllUserType) => {
//   return e.id !== session.data?.user?.id ? (
//     <div
//       className="flex justify-between rounded-md border-2 border-slate-100 p-4 items-center mt-8 md:mt-0"
//       key={e.id}
//     >
//       <div className="flex gap-4">
//         <Image
//           src={e.avatar || "/Images/avatar.png"}
//           width={100}
//           height={100}
//           alt="Picture of the author"
//           className="rounded-full w-12 h-12"
//         />
//         <div>
//           <div className="flex gap-2 items-center">
//             <UserCircle className="size-4 " />
//             <p className="text-lg font-bold">{e.username}</p>
//           </div>

//           <div className="flex gap-2 items-center">
//             <Shield className="size-4 " />
//             <p className="text-gray-500">
//               {e.role.toLocaleLowerCase()}
//             </p>
//           </div>
//         </div>
//       </div>
//       <DeleteUserAdminModal userId={e.id} />
//     </div>
//   ) : (
//     ""
//   );
// })}
