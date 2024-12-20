import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

process.on('exit', () => prisma.$disconnect())
