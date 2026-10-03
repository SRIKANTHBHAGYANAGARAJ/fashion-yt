import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { USERS_COLLECTION } from "@/lib/collections";
import { connectToDatabase, isMongoConfigured } from "@/lib/mongodb";
import { AddressBook } from "@/components/account/address-book";
import type { Address, User } from "@/types";

export default async function AddressesPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/signin");
  let addresses: Address[] = [];
  if (isMongoConfigured()) {
    try {
      const db = await connectToDatabase();
      const user = await db
        .collection<User>(USERS_COLLECTION)
        .findOne({ email: session.user.email.toLowerCase() });
      addresses = user?.addresses ?? [];
    } catch {
      addresses = [];
    }
  }
  return <AddressBook addresses={addresses} />;
}
