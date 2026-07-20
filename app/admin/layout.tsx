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

  if (!session) {
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
