import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { generate2FASecret, generate2FAQRCode } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminId = (session.user as any).id;

    const email = session.user.email || "admin";

    const { secret, otpauthUrl } = generate2FASecret(email);

    const qrCodeDataUrl = await generate2FAQRCode(otpauthUrl);

    return NextResponse.json({
      secret,
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
