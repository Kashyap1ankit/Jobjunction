import { redirect } from "next/navigation";

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  redirect(`/user/${userId}/profile`);
}
