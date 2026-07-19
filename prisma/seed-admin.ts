import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@ascendvpn.com";
  const password = "admin1234";
  const role = "superadmin";

  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) {
    console.log("Admin already exists, skipping.");
    return;
  }

  const passwordHash = await hash(password, 12);
  const admin = await prisma.admin.create({
    data: { email, passwordHash, role },
  });

  console.log("Created admin:", admin.id, admin.email, admin.role);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
