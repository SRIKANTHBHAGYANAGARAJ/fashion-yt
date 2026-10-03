import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/account/profile-form";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/signin");
  return <ProfileForm name={session.user.name ?? ""} email={session.user.email ?? ""} />;
}
