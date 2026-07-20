import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { activate2FA, adminAuthOptions } from "@/lib/admin-auth";
import { rateLimit } from "@/lib/rate-limit";
import { logAction } from "@/lib/audit";

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 5 attempts per minute
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const { allowed } = rateLimit(`2fa-verify-${ip}`, 5, 60000);

    if (!allowed) {
      return NextResponse.json(
        { error: "Too many attempts. Please try again later." },
        { status: 429 }
      );
    }

    const session = await getServerSession(adminAuthOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify admin role
    const role = (session.user as any)?.role;
    if (role !== "admin" && role !== "superadmin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { secret, token } = body;

    if (!secret || !token) {
      return NextResponse.json(
        { error: "Secret and token are required" },
        { status: 400 }
      );
    }

    const adminId = (session.user as any).id;

    const success = await activate2FA(adminId, secret, token);

    if (!success) {
      // Log failed attempt
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

    // Log successful activation
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
