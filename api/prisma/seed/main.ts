import { prisma } from '@/integrations/prisma'
import { config as loadDotenv } from 'dotenv'
import { expand as expandDotenv } from 'dotenv-expand'

expandDotenv(loadDotenv())

async function main() {
  await prisma.item.create({
    data: {
      name: 'Test Item',
    },
  })
}

main()
