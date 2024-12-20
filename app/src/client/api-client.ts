import 'server-only'
import React from 'react'
import type { paths } from '@api'
import createClient from 'openapi-fetch'
import { config } from '@/config'

export const client = React.cache(() => {
  const { API_BASE_URL, API_KEY } = config()

  return createClient<paths>({
    baseUrl: API_BASE_URL,
    headers: { Authorization: `Bearer ${API_KEY}` },
  })
})
