import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SolanaBot - AI-Powered dApp Generator',
  description: 'Create custom decentralized applications on Solana with simple bot commands',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}