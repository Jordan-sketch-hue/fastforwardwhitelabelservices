'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { branding } from '@/config/branding'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">FF</span>
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-gray-900">{branding.companyName}</h1>
                <p className="text-xs text-gray-500">Faster Is Always Better</p>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#features" className="text-gray-700 hover:text-purple-600 transition">
              Features
            </Link>
            <Link href="/#pricing" className="text-gray-700 hover:text-purple-600 transition">
              Pricing
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-purple-600 transition">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-purple-600 transition">
              Contact
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/auth/login"
              className="text-gray-700 hover:text-purple-600 transition font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/onboarding"
              className="bg-gradient-to-r from-purple-600 to-orange-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-purple-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            <Link href="/#features" className="block py-2 text-gray-700 hover:text-purple-600">
              Features
            </Link>
            <Link href="/#pricing" className="block py-2 text-gray-700 hover:text-purple-600">
              Pricing
            </Link>
            <Link href="/about" className="block py-2 text-gray-700 hover:text-purple-600">
              About
            </Link>
            <Link href="/contact" className="block py-2 text-gray-700 hover:text-purple-600">
              Contact
            </Link>
            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
              <Link
                href="/auth/login"
                className="flex-1 text-center py-2 text-gray-700 border border-gray-300 rounded-lg"
              >
                Sign In
              </Link>
              <Link
                href="/onboarding"
                className="flex-1 bg-gradient-to-r from-purple-600 to-orange-500 text-white px-4 py-2 rounded-lg text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
