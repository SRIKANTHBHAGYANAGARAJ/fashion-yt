import { SignInForm } from "@/components/auth/auth-forms";
import { generateSEOMetadata } from "@/lib/seo";
import type { SearchParams } from "@/types";

export const metadata = generateSEOMetadata({
  title: "Sign in",
  description: "Sign in to Atelier Vale.",
  path: "/signin",
  noIndex: true,
});

export default async function SignInPage({ searchParams }: { searchParams: SearchParams }) {
  const q = await searchParams;
  const callbackUrl = (Array.isArray(q.callbackUrl) ? q.callbackUrl[0] : q.callbackUrl) ?? "/";
  return <SignInForm callbackUrl={callbackUrl} />;
}
