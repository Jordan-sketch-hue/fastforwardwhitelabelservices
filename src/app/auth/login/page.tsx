'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { ArrowRight, Mail, Lock, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In production, implement actual login logic
    console.log('Login attempt:', formData)
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50 flex items-center">
        <div className="max-w-md w-full mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">FF</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Sign In</h1>
              <p className="text-gray-600 mt-2">Welcome back to FastForward</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 mb-8">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@company.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-gray-900">
                    Password
                  </label>
                  <Link href="/auth/forgot-password" className="text-sm text-purple-600 hover:text-purple-700">
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-orange-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
              >
                Sign In
                <ArrowRight size={20} />
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="text-sm text-gray-600">or</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-gray-600">
              Don't have an account?{' '}
              <Link href="/onboarding" className="text-purple-600 hover:text-purple-700 font-semibold">
                Sign up
              </Link>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900 font-semibold mb-2">Demo Credentials</p>
            <p className="text-sm text-blue-800">Email: demo@fastforward.com</p>
            <p className="text-sm text-blue-800">Password: Demo@12345</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
