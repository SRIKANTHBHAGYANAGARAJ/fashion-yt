import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { loadProducts, loadSettings } from "@/lib/data";
import { generateSEOMetadata } from "@/lib/seo";
import { USERS_COLLECTION } from "@/lib/collections";
import { connectToDatabase, isMongoConfigured } from "@/lib/mongodb";
import type { User } from "@/types";

export const metadata = generateSEOMetadata({
  title: "Checkout",
  description: "Pay for your Atelier Vale order.",
  path: "/checkout",
  noIndex: true,
});

export default async function CheckoutPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/signin?callbackUrl=/checkout");
  const [products, settings] = await Promise.all([loadProducts(), loadSettings()]);
  let defaultAddress;
  if (isMongoConfigured()) {
    try {
      const db = await connectToDatabase();
      const user = await db
        .collection<User>(USERS_COLLECTION)
        .findOne({ email: session.user.email });
      defaultAddress = user?.addresses?.find((item) => item.isDefault) ?? user?.addresses?.[0];
    } catch {
      defaultAddress = undefined;
    }
  }
  return (
    <CheckoutForm
      products={products}
      settings={settings}
      defaultAddress={defaultAddress}
      email={session.user.email}
      name={session.user.name ?? ""}
    />
  );
}
