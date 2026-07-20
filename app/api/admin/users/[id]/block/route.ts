import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";
import { logAction } from "@/lib/audit";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;
  const session = auth.session;

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

  await logAction(
    (session.user as any).id,
    action,
    id,
    JSON.stringify({ email: user.email, previousStatus: user.status, newStatus })
  );

  return NextResponse.json({ user: updated });
}
