import z from 'zod'

export const config = z
  .object({
    API_KEY: z.string().min(1),
    APP_BASE_URL: z.string().url(),
    ENV: z.enum(['development', 'integration', 'production']),
    CI: z.coerce.boolean().optional(),
    GEN: z.coerce.boolean().optional(),
    PORT: z.coerce.number(),
  })
  .parse(process.env)
