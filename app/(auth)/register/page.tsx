import { RegisterForm } from "@/components/auth/auth-forms";
import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Register",
  description: "Create an Atelier Vale account.",
  path: "/register",
  noIndex: true,
});

export default function RegisterPage() {
  return <RegisterForm />;
}
