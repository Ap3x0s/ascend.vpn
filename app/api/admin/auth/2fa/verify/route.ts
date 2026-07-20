import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { activate2FA } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
      return NextResponse.json(
        { error: "Invalid 2FA token" },
        { status: 400 }
      );
    }

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
