import { prisma } from "@/lib/db";

export async function logAction(
  adminId: string,
  action: string,
  targetId?: string,
  details?: string,
  ip?: string
) {
  return prisma.auditLog.create({
    data: {
      adminId,
      action,
      targetId: targetId ?? null,
      details: details ?? null,
      ip: ip ?? null,
    },
  });
}
