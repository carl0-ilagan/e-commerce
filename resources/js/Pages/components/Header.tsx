'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, ShoppingCart, User, Menu, X, LogOut } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isLoggedIn, logout } = useAuth()

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          The Retro Alley
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-600 hover:text-gray-800">Home</Link>
          <div className="relative group">
            <button className="text-gray-600 hover:text-gray-800">Categories</button>
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block">
              <Link href="/category/sneakers" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sneakers</Link>
              <Link href="/category/formal" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Formal</Link>
              <Link href="/category/casual" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Casual</Link>
            </div>
          </div>
          <Link href="/about" className="text-gray-600 hover:text-gray-800">About Us</Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-800">Contact</Link>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-800">
            <Search size={20} />
          </button>
          <Link href="/cart" className="text-gray-600 hover:text-gray-800">
            <ShoppingCart size={20} />
          </Link>
          {isLoggedIn ? (
            <div className="relative group">
              <button className="text-gray-600 hover:text-gray-800">
                <User size={20} />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block">
                <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                <Link href="/checkout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Checkout</Link>
                <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <LogOut size={16} className="inline mr-2" />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="relative group">
              <button className="text-gray-600 hover:text-gray-800">
                <User size={20} />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block">
                <Link href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Login</Link>
                <Link href="/signup" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Up</Link>
              </div>
            </div>
          )}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white py-2">
          <Link href="/" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Home</Link>
          <Link href="/category/sneakers" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Sneakers</Link>
          <Link href="/category/formal" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Formal</Link>
          <Link href="/category/casual" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Casual</Link>
          <Link href="/about" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">About Us</Link>
          <Link href="/contact" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Contact</Link>
          {isLoggedIn ? (
            <>
              <Link href="/profile" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Profile</Link>
              <Link href="/checkout" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Checkout</Link>
              <button onClick={logout} className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100">
                <LogOut size={16} className="inline mr-2" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Login</Link>
              <Link href="/signup" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </header>
  )
}
