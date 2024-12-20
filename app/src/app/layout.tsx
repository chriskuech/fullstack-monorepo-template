import { Box, CssBaseline } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { PropsWithChildren } from 'react'

const RootProvider = dynamic(() => import('./RootProvider'), {
  ssr: false,
})

export const metadata: Metadata = {
  title: 'SupplySide',
  description: 'Software for the supply side of your business',
}

export default async function RootLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <AppRouterCacheProvider>
          <RootProvider>
            <CssBaseline />
            <Box width="100vw" flexGrow={1}>
              {children}
            </Box>
          </RootProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
