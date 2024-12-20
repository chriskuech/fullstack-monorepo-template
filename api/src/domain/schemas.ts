import { mapKeys, pipe } from 'remeda'
import { z } from 'zod'
import * as itemSchemas from './item/schemas'

// Add domain schemas here
const domainSchemas = {
  ...itemSchemas,
}

export const schemas = pipe(
  domainSchemas,
  mapKeys((key) => key.replace(/Schema$/, '')),
) satisfies Record<string, z.ZodType>
