import { createRouter } from '@/router'
import { writeFileSync } from 'fs'
import openapiTS, { astToString } from 'openapi-typescript'
import process from 'process'
import { z } from 'zod'

async function main() {
  const app = await createRouter()

  await app.ready()

  if (process.env.ENV === 'development' || process.argv.includes('--gen')) {
    // gen OpenAPI types
    const json = JSON.stringify(app.swagger())
    const ast = await openapiTS(json)
    const ts = astToString(ast)
    writeFileSync('./client.ts', ts)
  }

  if (process.argv.includes('--gen')) {
    process.exit(0)
  }

  app.listen({
    port: z.coerce.number().optional().parse(process.env.PORT),
    host: '0.0.0.0',
  })
}

main()
