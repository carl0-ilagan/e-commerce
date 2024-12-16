import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import AdminChat from './components/AdminChat'
import { AuthProvider } from './contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'The Retro Alley',
  description: 'Your one-stop shop for retro shoes',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <AdminChat />
        </body>
      </AuthProvider>
    </html>
  )
}

