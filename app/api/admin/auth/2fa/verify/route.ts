import { NextRequest, NextResponse } from "next/server";
import { activate2FA, requireAdmin } from "@/lib/admin-auth";
import { rateLimit } from "@/lib/rate-limit";
import { logAction } from "@/lib/audit";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAdmin();
    if ("error" in auth) return auth.error;
    const session = auth.session;

    const adminId = (session.user as any).id;
    const ip = request.headers.get("x-forwarded-for") || "unknown";

    // Rate limit by admin ID instead of IP
    const { allowed } = rateLimit(`2fa-verify-${adminId}`, 5, 60000);

    if (!allowed) {
      return NextResponse.json(
        { error: "Too many attempts. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { error: "Token is required" },
        { status: 400 }
      );
    }

    // Retrieve secret from database instead of trusting client
    const admin = await prisma.admin.findUnique({
      where: { id: adminId },
      select: { twoFactorSecret: true },
    });

    if (!admin?.twoFactorSecret) {
      return NextResponse.json(
        { error: "2FA not initialized. Please set up 2FA first." },
        { status: 400 }
      );
    }

    const success = await activate2FA(adminId, admin.twoFactorSecret, token);

    if (!success) {
      await logAction(
        adminId,
        "2fa.verify_failed",
        undefined,
        JSON.stringify({ ip })
      );

      return NextResponse.json(
        { error: "Invalid 2FA token" },
        { status: 400 }
      );
    }

    await logAction(
      adminId,
      "2fa.activated",
      undefined,
      JSON.stringify({ ip })
    );

    return NextResponse.json({
      success: true,
      message: "2FA has been activated",
    });
  } catch (error) {
    console.error("2FA verify error:", error);
    return NextResponse.json(
      { error: "Failed to verify 2FA token" },
      { status: 500 }
    );
  }
}
