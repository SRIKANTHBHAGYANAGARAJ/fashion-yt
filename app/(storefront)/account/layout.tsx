import { AccountNav } from "@/components/account/account-nav";
import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Account",
  description: "Your Atelier Vale account.",
  path: "/account",
  noIndex: true,
});

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6">
      <AccountNav />
      <div className="mt-8">{children}</div>
    </div>
  );
}
