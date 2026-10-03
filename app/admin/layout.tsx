import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Admin",
  description: "Atelier Vale operations.",
  path: "/admin",
  noIndex: true,
});

const groups = [
  {
    title: "Overview",
    links: [
      { href: "/admin/dashboard", label: "Dashboard" },
      { href: "/admin/analytics", label: "Analytics" },
    ],
  },
  {
    title: "Catalog",
    links: [
      { href: "/admin/products", label: "Products" },
      { href: "/admin/categories", label: "Categories" },
      { href: "/admin/inventory", label: "Inventory" },
    ],
  },
  {
    title: "Sales",
    links: [
      { href: "/admin/orders", label: "Orders" },
      { href: "/admin/customers", label: "Customers" },
      { href: "/admin/coupons", label: "Coupons" },
    ],
  },
  {
    title: "Store",
    links: [
      { href: "/admin/reviews", label: "Reviews" },
      { href: "/admin/settings", label: "Settings" },
      { href: "/admin/profile", label: "Profile" },
    ],
  },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user?.email) redirect("/signin?callbackUrl=/admin/dashboard");
  if (session.user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) redirect("/");

  return (
    <div className="flex min-h-svh bg-muted text-sm">
      <aside className="w-56 shrink-0 border-e border-border bg-card p-4">
        <Link href="/" className="font-display text-lg">
          Atelier Vale
        </Link>
        {groups.map((group) => (
          <div key={group.title} className="mt-6">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{group.title}</p>
            <ul className="mt-2 space-y-1">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="block py-1 hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
}
