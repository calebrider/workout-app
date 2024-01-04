import Navbar from '@/components/navbar/page'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { getServerSession } from 'next-auth'
import SessionProvider from '@/components/SessionProvider/page'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Workout Tracker App',
  description: 'An app to track your workouts',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();

  return (
    <html lang="en" className="scroll-smooth bg-gray-100">
      <body className={`${inter.className} flex flex-col max-w-screen min-h-screen`}>
        <SessionProvider session={session}>
          <main>
            <Navbar/>
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  )
}
