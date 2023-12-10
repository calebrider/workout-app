import Top from './components/top/page'
import Display from './components/display/page'
import Navbar from './components/navbar/page'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Workout Tracker App',
  description: 'An app to track your workouts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} flex flex-col max-w-screen min-h-screen`}>
        <Navbar/>
        {children}
      </body>
    </html>
  )
}
