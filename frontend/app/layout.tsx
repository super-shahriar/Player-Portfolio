import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import SidebarNavbar from '@/components/sidebar-navbar'

import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Elite Volleyball Scouting Platform',
  description: 'Professional athlete discovery and performance analytics platform',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased dark" suppressHydrationWarning>
        <SidebarNavbar />
        <div className="md:ml-72 pb-24 md:pb-0">
          {children}
        </div>
      </body>
    </html>
  )
}
