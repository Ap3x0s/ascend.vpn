import { NextRequest, NextResponse } from "next/server";
import { generate2FASecret, generate2FAQRCode, requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAdmin();
    if ("error" in auth) return auth.error;
    const session = auth.session;

    const adminId = (session.user as any).id;

    const email = session.user.email || "admin";

    const { secret, otpauthUrl } = generate2FASecret(email);

    const qrCodeDataUrl = await generate2FAQRCode(otpauthUrl);

    // Store secret in admin record immediately so it's never sent to client
    await prisma.admin.update({
      where: { id: adminId },
      data: { twoFactorSecret: secret },
    });

    return NextResponse.json({
      qrCode: qrCodeDataUrl,
    });
  } catch (error) {
    console.error("2FA setup error:", error);
    return NextResponse.json(
      { error: "Failed to generate 2FA secret" },
      { status: 500 }
    );
  }
}
