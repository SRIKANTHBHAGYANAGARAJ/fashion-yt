import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col bg-hero-wash">
      <div className="p-6">
        <Link href="/" className="font-display text-2xl">
          Atelier Vale
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-center px-4 pb-16">{children}</div>
    </div>
  );
}
