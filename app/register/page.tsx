import { Navbar } from "@/components/layout/Navbar";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen items-center justify-center px-4 pt-16">
        <RegisterForm />
      </main>
    </>
  );
}
