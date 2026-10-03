import { ForgotForm } from "@/components/auth/auth-forms";
import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Forgot password",
  description: "Reset your Atelier Vale password.",
  path: "/forgot-password",
  noIndex: true,
});

export default function ForgotPage() {
  return <ForgotForm />;
}
