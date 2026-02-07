// Mock Prisma Client for build time
// Replace with actual PrismaClient after running: npx prisma generate

type PrismaClient = any

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Mock client for build - replace after prisma generate
export const prisma: any = globalForPrisma.prisma ?? {
  shipment: {
    findMany: async () => [],
    findUnique: async () => null,
    create: async () => ({}),
    update: async () => ({}),
    count: async () => 0,
  },
  customer: {
    findMany: async () => [],
    findUnique: async () => null,
    findFirst: async () => null,
    create: async () => ({}),
    update: async () => ({}),
    delete: async () => ({}),
    count: async () => 0,
  },
  webhook: {
    findMany: async () => [],
  },
  webhookLog: {
    create: async () => ({}),
  },
  notification: {
    create: async () => ({}),
  },
  activityLog: {
    create: async () => ({}),
  },
}

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Uncomment after running: npx prisma generate
// import { PrismaClient } from '@prisma/client'
// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
//   })
// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

