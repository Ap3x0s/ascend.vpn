import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { adminAuthOptions } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";
import { logAction } from "@/lib/audit";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(adminAuthOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Verify admin role
  const role = (session.user as any)?.role;
  if (role !== "admin" && role !== "superadmin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const newStatus = user.status === "active" ? "blocked" : "active";
  const action = newStatus === "blocked" ? "user.block" : "user.unblock";

  const updated = await prisma.user.update({
    where: { id },
    data: { status: newStatus },
    select: {
      id: true,
      email: true,
      status: true,
    },
  });

  // Log the action
  await logAction(
    (session.user as any).id,
    action,
    id,
    JSON.stringify({ email: user.email, previousStatus: user.status, newStatus })
  );

  return NextResponse.json({ user: updated });
}
