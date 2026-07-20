import speakeasy from "speakeasy";
import QRCode from "qrcode";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";

export const adminAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "admin-credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const adminUser = await authorizeAdmin(
          credentials.email,
          credentials.password
        );

        if (!adminUser) {
          return null;
        }

        return {
          id: adminUser.id,
          email: adminUser.email,
          name: "Admin",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.role = "admin";
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
};

export interface AdminUser {
  id: string;
  email: string;
  role: string;
  twoFactorEnabled: boolean;
}

export async function authorizeAdmin(
  email: string,
  password: string
): Promise<AdminUser | null> {
  const admin = await prisma.admin.findUnique({
    where: { email },
  });

  if (!admin) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);

  if (!isPasswordValid) {
    return null;
  }

  return {
    id: admin.id,
    email: admin.email,
    role: admin.role,
    twoFactorEnabled: admin.twoFactorEnabled,
  };
}

export function generate2FASecret(email: string): {
  secret: string;
  otpauthUrl: string;
} {
  const secret = speakeasy.generateSecret({
    name: `ASCEND.VPN Admin (${email})`,
    issuer: "ASCEND.VPN",
    length: 20,
  });

  return {
    secret: secret.base32,
    otpauthUrl: secret.otpauth_url!,
  };
}

export async function generate2FAQRCode(otpauthUrl: string): Promise<string> {
  return QRCode.toDataURL(otpauthUrl);
}

export function verify2FAToken(secret: string, token: string): boolean {
  return speakeasy.totp.verify({
    secret,
    encoding: "base32",
    token,
    window: 1,
  });
}

export async function activate2FA(
  adminId: string,
  secret: string,
  token: string
): Promise<boolean> {
  const isValid = verify2FAToken(secret, token);

  if (!isValid) {
    return false;
  }

  await prisma.admin.update({
    where: { id: adminId },
    data: {
      twoFactorSecret: secret,
      twoFactorEnabled: true,
    },
  });

  return true;
}
