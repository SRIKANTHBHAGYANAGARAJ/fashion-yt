import { ResetForm } from "@/components/auth/auth-forms";
import { generateSEOMetadata } from "@/lib/seo";
import type { RouteParams } from "@/types";

export const metadata = generateSEOMetadata({
  title: "Reset password",
  description: "Set a new password.",
  path: "/reset-password",
  noIndex: true,
});

export default async function ResetPage({
  params,
}: {
  params: RouteParams<{ token: string }>;
}) {
  const { token } = await params;
  return <ResetForm token={token} />;
}
