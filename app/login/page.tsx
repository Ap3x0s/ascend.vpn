import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen items-center justify-center px-4 pt-16">
        <Suspense>
          <LoginForm />
        </Suspense>
      </main>
    </>
  );
}
