'use client'

import { useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { DEMO_ACCOUNTS } from '@/lib/demo-data'
import { ArrowRight, CheckCircle, Play, Eye } from 'lucide-react'

type Step = 'type-select' | 'plan-choice' | 'company-info' | 'contact-info' | 'complete' | 'demo-access'

function OnboardingContent() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>('type-select')
  const [selectedType, setSelectedType] = useState<'demo' | 'signup'>('demo')
  const [selectedPlan, setSelectedPlan] = useState<'courier' | 'warehouse'>('courier')

  const handleDemoAccess = (plan: 'courier' | 'warehouse') => {
    setSelectedPlan(plan)
    setSelectedType('demo')
    setCurrentStep('demo-access')
  }

  const handleSignUp = (plan: 'courier' | 'warehouse') => {
    setSelectedPlan(plan)
    setSelectedType('signup')
    setCurrentStep('company-info')
  }

  const handleDemoContinue = () => {
    const demoAccount = DEMO_ACCOUNTS[selectedPlan]
    sessionStorage.setItem('demoMode', 'true')
    sessionStorage.setItem('demoAccount', JSON.stringify(demoAccount))
    sessionStorage.setItem('selectedPlan', selectedPlan)
    router.push(`/dashboard?demo=true&plan=${selectedPlan}`)
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {currentStep === 'type-select' && (
            <div className="space-y-12">
              <div className="text-center">
                <h1 className="text-5xl font-bold text-gray-900 mb-4">Welcome to FastForward</h1>
                <p className="text-2xl text-gray-600">The fastest, easiest logistics platform</p>
                <p className="text-gray-500 mt-3">Choose how you'd like to get started</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Demo Access Card */}
                <div className="group bg-white rounded-3xl shadow-lg p-10 border-2 border-purple-200 hover:border-purple-500 hover:shadow-2xl transition cursor-pointer">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">Try Demo</h2>
                      <p className="text-gray-600 mt-2">Explore all features risk-free</p>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-orange-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <ul className="space-y-3 mb-10 text-gray-700">
                    <li className="flex items-center gap-3">
                      <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                      <span>Instant access - no signup needed</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                      <span>Pre-loaded with realistic sample data</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                      <span>Full access to all features</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                      <span>See exactly what you'll get</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => {
                      setSelectedType('demo')
                      setCurrentStep('plan-choice')
                    }}
                    className="w-full bg-gradient-to-r from-purple-600 to-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition hover:scale-105 transform"
                  >
                    Explore Demo →
                  </button>
                </div>

                {/* Create Account Card */}
                <div className="group bg-white rounded-3xl shadow-lg p-10 border-2 border-gray-200 hover:border-orange-500 hover:shadow-2xl transition cursor-pointer">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
                      <p className="text-gray-600 mt-2">Start managing your shipments</p>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <ul className="space-y-3 mb-10 text-gray-700">
                    <li className="flex items-center gap-3">
                      <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                      <span>Full platform access</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                      <span>Real-time shipment tracking</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                      <span>API & webhook integration</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                      <span>14-day free trial included</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => {
                      setSelectedType('signup')
                      setCurrentStep('plan-choice')
                    }}
                    className="w-full border-2 border-orange-500 text-orange-600 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition hover:scale-105 transform"
                  >
                    Sign Up Now →
                  </button>
                </div>
              </div>

              <div className="text-center text-gray-600">
                <p>Already have an account? <Link href="/auth/login" className="text-purple-600 font-semibold hover:underline">Log in</Link></p>
              </div>
            </div>
          )}

          {currentStep === 'plan-choice' && (
            <div className="space-y-12">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Platform</h1>
                <p className="text-xl text-gray-600">
                  {selectedType === 'demo' ? 'Explore our demo platforms' : 'Select the solution that fits your business'}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Courier Platform */}
                <div
                  onClick={() => selectedType === 'demo' ? handleDemoAccess('courier') : handleSignUp('courier')}
                  className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-3xl shadow-lg p-10 border-2 border-pink-300 hover:border-pink-500 hover:shadow-2xl transition cursor-pointer hover:scale-105 transform"
                >
                  <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Courier Platform</h2>
                    <p className="text-gray-700 text-lg">For courier & delivery companies</p>
                  </div>
                  <div className="text-4xl font-bold text-pink-600 mb-8">$34.99<span className="text-lg text-gray-600 font-normal">/month</span></div>
                  
                  <div className="mb-10">
                    <p className="text-sm font-bold text-gray-900 mb-4">13 Powerful Features:</p>
                    <ul className="text-sm text-gray-700 space-y-3">
                      <li className="flex items-center gap-2">
                        <span className="text-pink-600">✓</span>
                        <span>Customer Portal</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-pink-600">✓</span>
                        <span>Advanced Package Tracking</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-pink-600">✓</span>
                        <span>Backoffice Portal</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-pink-600">✓</span>
                        <span>Pre-Alert System</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-pink-600">✓</span>
                        <span>Invoice Management</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-pink-600">✓</span>
                        <span>No User Limit</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-pink-600">✓</span>
                        <span>+ 7 More Features</span>
                      </li>
                    </ul>
                  </div>

                  <button className="w-full bg-gradient-to-r from-purple-600 to-orange-500 text-white py-4 rounded-xl font-bold hover:shadow-lg transition">
                    {selectedType === 'demo' ? 'View Demo →' : 'Get Started →'}
                  </button>
                </div>

                {/* Warehouse Platform */}
                <div
                  onClick={() => selectedType === 'demo' ? handleDemoAccess('warehouse') : handleSignUp('warehouse')}
                  className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-3xl shadow-lg p-10 border-2 border-yellow-400 hover:border-yellow-600 hover:shadow-2xl transition cursor-pointer hover:scale-105 transform ring-2 ring-yellow-500/20 relative"
                >
                  <div className="absolute top-6 right-6 bg-gradient-to-r from-purple-600 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                  <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Warehouse Platform</h2>
                    <p className="text-gray-700 text-lg">For warehouse & logistics operations</p>
                  </div>
                  <div className="text-4xl font-bold text-yellow-600 mb-8">$249.99<span className="text-lg text-gray-600 font-normal">/month</span></div>
                  
                  <div className="mb-10">
                    <p className="text-sm font-bold text-gray-900 mb-4">13 Enterprise Features:</p>
                    <ul className="text-sm text-gray-700 space-y-3">
                      <li className="flex items-center gap-2">
                        <span className="text-yellow-600">✓</span>
                        <span>Courier Portal</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-yellow-600">✓</span>
                        <span>Advanced Package Tracking</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-yellow-600">✓</span>
                        <span>Invoice Management</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-yellow-600">✓</span>
                        <span>Online Payment via Stripe</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-yellow-600">✓</span>
                        <span>API for 3rd party vendors</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-yellow-600">✓</span>
                        <span>Asycuda Manifest Generation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-yellow-600">✓</span>
                        <span>+ 7 More Features</span>
                      </li>
                    </ul>
                  </div>

                  <button className="w-full bg-gradient-to-r from-purple-600 to-orange-500 text-white py-4 rounded-xl font-bold hover:shadow-lg transition">
                    {selectedType === 'demo' ? 'View Demo →' : 'Get Started →'}
                  </button>
                </div>
              </div>

              <button
                onClick={() => setCurrentStep('type-select')}
                className="w-full text-gray-600 hover:text-gray-900 font-semibold py-3 text-center"
              >
                ← Back
              </button>
            </div>
          )}

          {currentStep === 'demo-access' && (
            <div className="space-y-8">
              <div className="text-center">
                <Eye className="w-20 h-20 text-purple-600 mx-auto mb-8" />
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Experience FastForward</h1>
                <p className="text-xl text-gray-600 mb-2">
                  {selectedPlan === 'courier' ? 
                    'See how courier companies manage thousands of shipments effortlessly.' :
                    'Discover how warehouses optimize operations with advanced management tools.'
                  }
                </p>
                <p className="text-gray-500">All features unlocked • Real data • Ready to explore</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-orange-50 rounded-3xl shadow-lg p-12 border-2 border-purple-200">
                <h2 className="text-3xl font-bold text-gray-900 mb-10">Demo Account</h2>
                
                {selectedPlan === 'courier' ? (
                  <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <p className="text-sm text-gray-600 mb-2 font-semibold">Company Name</p>
                      <p className="text-2xl font-bold text-gray-900">FastCourier Express</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <p className="text-sm text-gray-600 mb-2 font-semibold">Account Manager</p>
                      <p className="text-2xl font-bold text-gray-900">Sarah Johnson</p>
                      <p className="text-sm text-gray-600 mt-1">demo.courier@fastforward.com</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <p className="text-sm text-gray-600 mb-2 font-semibold">Total Packages</p>
                        <p className="text-3xl font-bold text-purple-600">2,450</p>
                        <p className="text-xs text-gray-500 mt-1">All time</p>
                      </div>
                      <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <p className="text-sm text-gray-600 mb-2 font-semibold">In Transit</p>
                        <p className="text-3xl font-bold text-blue-600">845</p>
                        <p className="text-xs text-gray-500 mt-1">Right now</p>
                      </div>
                      <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <p className="text-sm text-gray-600 mb-2 font-semibold">Delivered</p>
                        <p className="text-3xl font-bold text-green-600">1,605</p>
                        <p className="text-xs text-gray-500 mt-1">This month</p>
                      </div>
                      <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <p className="text-sm text-gray-600 mb-2 font-semibold">Revenue</p>
                        <p className="text-3xl font-bold text-orange-600">$12.4K</p>
                        <p className="text-xs text-gray-500 mt-1">Monthly avg</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <p className="text-sm text-gray-600 mb-2 font-semibold">Warehouse</p>
                      <p className="text-2xl font-bold text-gray-900">Advanced Logistics Hub</p>
                      <p className="text-sm text-gray-600 mt-1">Los Angeles, CA • 450,000 sq ft</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <p className="text-sm text-gray-600 mb-2 font-semibold">Warehouse Manager</p>
                      <p className="text-2xl font-bold text-gray-900">Michael Chen</p>
                      <p className="text-sm text-gray-600 mt-1">demo.warehouse@fastforward.com</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <p className="text-sm text-gray-600 mb-2 font-semibold">Total Packages</p>
                        <p className="text-3xl font-bold text-purple-600">8,900</p>
                        <p className="text-xs text-gray-500 mt-1">All time</p>
                      </div>
                      <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <p className="text-sm text-gray-600 mb-2 font-semibold">In Transit</p>
                        <p className="text-3xl font-bold text-blue-600">3,200</p>
                        <p className="text-xs text-gray-500 mt-1">Active</p>
                      </div>
                      <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <p className="text-sm text-gray-600 mb-2 font-semibold">Storage</p>
                        <p className="text-3xl font-bold text-yellow-600">78%</p>
                        <p className="text-xs text-gray-500 mt-1">Capacity used</p>
                      </div>
                      <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <p className="text-sm text-gray-600 mb-2 font-semibold">Revenue</p>
                        <p className="text-3xl font-bold text-orange-600">$89.5K</p>
                        <p className="text-xs text-gray-500 mt-1">Monthly avg</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-10 p-6 bg-blue-50 border-2 border-blue-200 rounded-2xl">
                  <p className="text-sm text-blue-900 font-semibold mb-2">✓ What You'll See in the Demo:</p>
                  <p className="text-sm text-blue-800">
                    Complete dashboard with live shipments, real-time tracking, customer portals, analytics, invoicing, and all advanced features. Browse shipment history, download reports, manage settings, and explore the full platform experience.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentStep('plan-choice')}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-bold text-lg hover:border-purple-600 transition hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={handleDemoContinue}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition hover:scale-105 transform flex items-center justify-center gap-2"
                >
                  Launch Demo <ArrowRight size={24} />
                </button>
              </div>
            </div>
          )}

          {/* Company Info for Signup */}
          {currentStep === 'company-info' && selectedType === 'signup' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-3xl shadow-lg p-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Company Information</h1>
                <p className="text-gray-600 mb-10 text-lg">Tell us about your business</p>
                
                <div className="space-y-8 mb-10">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Company Name *</label>
                    <input type="text" placeholder="Your Company Name" className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Industry *</label>
                    <select className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg">
                      <option>Select an industry</option>
                      <option>E-commerce</option>
                      <option>Manufacturing</option>
                      <option>Retail</option>
                      <option>Healthcare</option>
                      <option>Logistics</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Monthly Package Volume *</label>
                    <select className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg">
                      <option>Select volume</option>
                      <option>0 - 100 packages</option>
                      <option>100 - 500 packages</option>
                      <option>500 - 1,000 packages</option>
                      <option>1,000+ packages</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setCurrentStep('plan-choice')} className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-bold text-lg hover:border-purple-600 transition hover:bg-gray-50">
                    Back
                  </button>
                  <button onClick={() => setCurrentStep('contact-info')} className="flex-1 bg-gradient-to-r from-purple-600 to-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition flex items-center justify-center gap-2">
                    Continue <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Contact Info for Signup */}
          {currentStep === 'contact-info' && selectedType === 'signup' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-3xl shadow-lg p-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
                <p className="text-gray-600 mb-10 text-lg">Set up your login credentials</p>
                
                <div className="space-y-6 mb-10">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-3">First Name *</label>
                      <input type="text" placeholder="John" className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-3">Last Name *</label>
                      <input type="text" placeholder="Doe" className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Email Address *</label>
                    <input type="email" placeholder="john@company.com" className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Phone Number</label>
                    <input type="tel" placeholder="+1 (555) 000-0000" className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Password *</label>
                    <input type="password" placeholder="••••••••" className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg" />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setCurrentStep('company-info')} className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-bold text-lg hover:border-purple-600 transition hover:bg-gray-50">
                    Back
                  </button>
                  <button onClick={() => setCurrentStep('complete')} className="flex-1 bg-gradient-to-r from-purple-600 to-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition flex items-center justify-center gap-2">
                    Create Account <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Complete */}
          {currentStep === 'complete' && selectedType === 'signup' && (
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-white rounded-3xl shadow-lg p-12">
                <div className="mb-8 flex justify-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-orange-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-16 h-16 text-white" />
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to FastForward!</h1>
                <p className="text-xl text-gray-600 mb-2">Your account has been successfully created</p>
                <p className="text-gray-600 mb-12">Check your email for confirmation and API keys</p>
                
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 mb-10 text-left">
                  <h3 className="font-bold text-green-900 mb-4 text-lg">What's Next?</h3>
                  <ul className="text-green-800 space-y-3">
                    <li className="flex items-center gap-3">
                      <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                      <span className="text-lg">Access your dashboard</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                      <span className="text-lg">Get your API keys</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                      <span className="text-lg">Invite team members</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                      <span className="text-lg">Create your first shipment</span>
                    </li>
                  </ul>
                </div>

                <Link href="/dashboard" className="inline-block bg-gradient-to-r from-purple-600 to-orange-500 text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition hover:scale-105 transform">
                  Go to Dashboard →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <OnboardingContent />
    </Suspense>
  )
}
