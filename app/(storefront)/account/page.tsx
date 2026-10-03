import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) redirect("/signin?callbackUrl=/account");
  return (
    <div>
      <h1 className="font-display text-4xl">Hello {session.user.name ?? session.user.email}</h1>
      <p className="mt-2 text-sm text-muted-foreground">Orders, addresses, and the password live here.</p>
    </div>
  );
}
