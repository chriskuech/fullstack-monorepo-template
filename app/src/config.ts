import 'server-only'

import { z } from 'zod'

const ConfigSchema = z.object({
  API_KEY: z.string().min(1),
  API_BASE_URL: z.string().url(),
  APP_BASE_URL: z.string().url(),
  ENV: z.enum(['development', 'integration', 'production']),
})

export const config = () => ConfigSchema.parse(process.env)
