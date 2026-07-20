import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { adminAuthOptions } from "@/lib/admin-auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeaderWrapper } from "@/components/admin/AdminHeaderWrapper";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(adminAuthOptions);

  // Check if session exists and has admin role
  if (!session) {
    redirect("/admin/login");
  }

  // Verify the session is from admin auth (not regular user)
  const role = (session.user as any)?.role;
  if (role !== "admin" && role !== "superadmin") {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-[#08080f]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeaderWrapper />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
