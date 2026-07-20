"use client";

import { usePathname } from "next/navigation";
import { AdminHeader } from "./AdminHeader";

export function AdminHeaderWrapper() {
  const pathname = usePathname();
  return <AdminHeader pathname={pathname} />;
}
