import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await bcrypt.hash('demo1234', 10)

  const user = await prisma.user.upsert({
    where: { email: 'demo@ascendvpn.com' },
    update: {},
    create: {
      email: 'demo@ascendvpn.com',
      passwordHash,
      name: 'Demo User',
    },
  })

  const now = new Date()
  const endDate = new Date(now)
  endDate.setDate(endDate.getDate() + 180)

  await prisma.subscription.upsert({
    where: { id: 'demo-sub-1' },
    update: {},
    create: {
      id: 'demo-sub-1',
      userId: user.id,
      plan: '180d',
      startDate: now,
      endDate,
      status: 'active',
    },
  })

  await prisma.device.upsert({
    where: { id: 'demo-device-1' },
    update: {},
    create: {
      id: 'demo-device-1',
      userId: user.id,
      name: 'iPhone 15 Pro',
      type: 'iOS',
      lastActive: now,
      isActive: true,
    },
  })

  const twoHoursAgo = new Date(now)
  twoHoursAgo.setHours(twoHoursAgo.getHours() - 2)

  await prisma.device.upsert({
    where: { id: 'demo-device-2' },
    update: {},
    create: {
      id: 'demo-device-2',
      userId: user.id,
      name: 'MacBook Pro',
      type: 'macOS',
      lastActive: twoHoursAgo,
      isActive: true,
    },
  })

  const thirtyDaysAgo = new Date(now)
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  await prisma.payment.upsert({
    where: { id: 'demo-payment-1' },
    update: {},
    create: {
      id: 'demo-payment-1',
      userId: user.id,
      amount: 1499,
      currency: 'RUB',
      plan: '180d',
      date: thirtyDaysAgo,
      status: 'completed',
    },
  })

  console.log('Seed completed successfully!')
  console.log('Demo user: demo@ascendvpn.com / demo1234')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
