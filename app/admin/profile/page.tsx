import { auth } from "@/auth";

export default async function AdminProfilePage() {
  const session = await auth();
  return (
    <div>
      <h1 className="font-display text-3xl">Owner profile</h1>
      <p className="mt-4 text-sm">{session?.user?.email}</p>
      <p className="text-sm">{session?.user?.name}</p>
    </div>
  );
}
