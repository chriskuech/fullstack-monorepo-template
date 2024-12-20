import { PropsWithChildren } from 'react'

export default function RootProvider({ children }: PropsWithChildren) {
  // add global context providers here

  return <>{children}</>
}
