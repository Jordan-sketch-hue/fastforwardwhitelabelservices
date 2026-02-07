'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { DEMO_ACCOUNTS } from '@/lib/demo-data'
import {
  BarChart3, TrendingUp, Package, Truck, TrendingDown,
  Settings, Download, Bell, Plus, Map, AlertCircle,
  CheckCircle, Clock, Zap, Users, FileText, DollarSign
} from 'lucide-react'

interface DashboardData {
  id: string
  email: string
  password: string
  firstName: string
  lastName: string
  companyName: string
  plan: string
  industry: string
  packageVolume: string
  role: string
  stats: {
    totalPackages: number
    inTransit: number
    delivered: number
    revenue: number
  }
  recentShipments: Array<{
    id: string
    trackingNumber: string
    destination: string
    origin: string
    status: string
    createdAt: string
    weight: number
    contents: string
    value: number
  }>
}

interface CourierFeature {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  status: 'active' | 'premium' | 'coming'
}

function DashboardContent() {
  const searchParams = useSearchParams()
  const [demoMode, setDemoMode] = useState(false)
  const [account, setAccount] = useState<DashboardData | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<'courier' | 'warehouse'>('courier')
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const isDemoMode = searchParams?.get('demo') === 'true'
    const plan = (searchParams?.get('plan') || 'courier') as 'courier' | 'warehouse'
    
    setDemoMode(isDemoMode)
    setSelectedPlan(plan)

    if (isDemoMode && DEMO_ACCOUNTS[plan]) {
      setAccount(DEMO_ACCOUNTS[plan])
    }
    
    setIsLoading(false)
  }, [searchParams])

  const courierFeatures: CourierFeature[] = [
    { id: '1', name: 'Customer Portal', description: 'Self-service portal for shipment tracking and management', icon: <Users size={20} />, status: 'active' },
    { id: '2', name: 'Advanced Tracking', description: 'Real-time GPS tracking and delivery updates', icon: <Map size={20} />, status: 'active' },
    { id: '3', name: 'Backoffice Portal', description: 'Complete operations management dashboard', icon: <BarChart3 size={20} />, status: 'active' },
    { id: '4', name: 'Pre-Alert System', description: 'Notify customers before delivery', icon: <Bell size={20} />, status: 'active' },
    { id: '5', name: 'Invoice Management', description: 'Automated billing and invoicing', icon: <FileText size={20} />, status: 'active' },
    { id: '6', name: 'No User Limit', description: 'Unlimited team members', icon: <Users size={20} />, status: 'active' },
    { id: '7', name: 'Multiple Locations', description: 'Manage multi-branch operations', icon: <Map size={20} />, status: 'active' },
    { id: '8', name: 'Advanced Reporting', description: 'Custom reports and analytics', icon: <TrendingUp size={20} />, status: 'active' },
    { id: '9', name: 'Email Marketing', description: 'Customer communication tools', icon: <Zap size={20} />, status: 'premium' },
    { id: '10', name: 'Label Generation', description: 'Automated shipping labels', icon: <Printer size={20} />, status: 'premium' },
    { id: '11', name: 'POS Integration', description: 'Connect with point of sale systems', icon: <DollarSign size={20} />, status: 'premium' },
    { id: '12', name: 'White Label Solution', description: 'Rebrand platform as your own', icon: <Zap size={20} />, status: 'premium' },
    { id: '13', name: 'No Setup Fee', description: 'Start free with 14-day trial', icon: <CheckCircle size={20} />, status: 'active' },
  ]

  const warehouseFeatures: CourierFeature[] = [
    { id: '1', name: 'Courier Portal', description: 'Courier interface for delivery management', icon: <Users size={20} />, status: 'active' },
    { id: '2', name: 'Advanced Tracking', description: 'Real-time shipment and inventory tracking', icon: <Map size={20} />, status: 'active' },
    { id: '3', name: 'Invoice Management', description: 'Comprehensive billing system', icon: <FileText size={20} />, status: 'active' },
    { id: '4', name: 'Stripe Payments', description: 'Online payment processing', icon: <DollarSign size={20} />, status: 'active' },
    { id: '5', name: 'API for 3rd Party', description: 'Connect with external vendors', icon: <Zap size={20} />, status: 'active' },
    { id: '6', name: 'Shipment Management', description: 'Full shipment lifecycle management', icon: <Package size={20} />, status: 'active' },
    { id: '7', name: 'Manifest Generation', description: 'Asycuda manifest automation', icon: <FileText size={20} />, status: 'active' },
    { id: '8', name: 'Label Generation', description: 'Automatic label printing', icon: <Printer size={20} />, status: 'active' },
    { id: '9', name: 'Cloud Printing', description: 'Remote printing from anywhere', icon: <Zap size={20} />, status: 'premium' },
    { id: '10', name: 'Advanced Reporting', description: 'In-depth analytics and insights', icon: <TrendingUp size={20} />, status: 'premium' },
    { id: '11', name: 'Phone App', description: 'Mobile app for on-the-go management', icon: <Users size={20} />, status: 'premium' },
    { id: '12', name: 'White Label Solution', description: 'Custom branding options', icon: <Zap size={20} />, status: 'premium' },
    { id: '13', name: 'No Setup Fee', description: 'Start free with 14-day trial', icon: <CheckCircle size={20} />, status: 'active' },
  ]

  const features = selectedPlan === 'courier' ? courierFeatures : warehouseFeatures
  const currentAccount = account || DEMO_ACCOUNTS[selectedPlan]

  if (isLoading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="inline-block animate-spin">
              <Package className="w-12 h-12 text-purple-600" />
            </div>
            <p className="text-gray-600 mt-4">Loading dashboard...</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (!currentAccount) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">No Account Found</h1>
            <p className="text-gray-600 mb-8">Please start from the onboarding page or demo screen</p>
            <a href="/onboarding" className="inline-block bg-gradient-to-r from-purple-600 to-orange-500 text-white px-8 py-3 rounded-lg font-semibold">
              Start Demo or Sign Up
            </a>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-16 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  {demoMode && (
                    <span className="inline-block px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-bold">
                      🎬 DEMO MODE
                    </span>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-gray-900">{currentAccount.companyName}</h1>
                <p className="text-gray-600 mt-1">
                  Welcome back, {currentAccount.firstName}! {selectedPlan === 'courier' ? '📦 Courier Platform' : '🏭 Warehouse Platform'}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition relative">
                  <Bell size={24} className="text-gray-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                  <Settings size={24} className="text-gray-600" />
                </button>
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-orange-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-600 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Total Packages</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{currentAccount.stats.totalPackages.toLocaleString()}</p>
                  <p className="text-green-600 text-xs font-semibold mt-2">↑ 12% from last month</p>
                </div>
                <Package className="w-12 h-12 text-purple-100" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-600 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">In Transit</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{currentAccount.stats.inTransit.toLocaleString()}</p>
                  <p className="text-blue-600 text-xs font-semibold mt-2">Active now</p>
                </div>
                <Truck className="w-12 h-12 text-blue-100" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-600 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Delivered</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{currentAccount.stats.delivered.toLocaleString()}</p>
                  <p className="text-green-600 text-xs font-semibold mt-2">This month</p>
                </div>
                <CheckCircle className="w-12 h-12 text-green-100" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-orange-600 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Revenue</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">${(currentAccount.stats.revenue / 1000).toFixed(1)}K</p>
                  <p className="text-orange-600 text-xs font-semibold mt-2">Monthly avg</p>
                </div>
                <DollarSign className="w-12 h-12 text-orange-100" />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
            <div className="border-b border-gray-200 px-6 flex overflow-x-auto">
              {[
                { id: 'dashboard', label: 'Dashboard' },
                { id: 'shipments', label: 'Shipments' },
                { id: 'features', label: 'Features' },
                { id: 'settings', label: 'Settings' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-6 font-semibold border-b-2 transition whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                        <h3 className="font-bold text-gray-900 mb-4">Performance Metrics</h3>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="bg-white rounded-lg p-4 text-center">
                            <p className="text-2xl font-bold text-purple-600">94%</p>
                            <p className="text-xs text-gray-600 mt-1">On-Time Delivery</p>
                          </div>
                          <div className="bg-white rounded-lg p-4 text-center">
                            <p className="text-2xl font-bold text-blue-600">4.8★</p>
                            <p className="text-xs text-gray-600 mt-1">Customer Rating</p>
                          </div>
                          <div className="bg-white rounded-lg p-4 text-center">
                            <p className="text-2xl font-bold text-green-600">99.9%</p>
                            <p className="text-xs text-gray-600 mt-1">Uptime</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-bold text-gray-900 mb-4">Recent Activity</h3>
                        <div className="space-y-2">
                          {[
                            { time: '2 hours ago', action: 'Package FF-2025-0124 delivered' },
                            { time: '5 hours ago', action: 'New shipment FF-2025-0125 created' },
                            { time: '1 day ago', action: 'Monthly report generated' },
                            { time: '2 days ago', action: 'API integration completed' },
                          ].map((item, i) => (
                            <div key={i} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg">
                              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                              <div>
                                <p className="text-gray-900 font-medium">{item.action}</p>
                                <p className="text-gray-500 text-sm">{item.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h3 className="font-bold text-blue-900 mb-4">Quick Actions</h3>
                      <div className="space-y-2">
                        <button className="w-full flex items-center gap-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                          <Plus size={20} /> New Shipment
                        </button>
                        <button className="w-full flex items-center gap-2 p-3 bg-white border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold">
                          <Download size={20} /> Generate Report
                        </button>
                        <button className="w-full flex items-center gap-2 p-3 bg-white border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold">
                          <Users size={20} /> Invite Team
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'shipments' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Recent Shipments</h3>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-lg hover:shadow-lg transition font-semibold">
                      <Plus size={20} /> New Shipment
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Tracking #</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Customer</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Route</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Status</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Date</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentAccount.recentShipments.slice(0, 5).map((shipment) => (
                          <tr key={shipment.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-4">
                              <span className="font-mono text-sm font-semibold text-purple-600">{shipment.trackingNumber}</span>
                            </td>
                            <td className="py-4 px-4 text-sm text-gray-900">{shipment.contents}</td>
                            <td className="py-4 px-4 text-sm text-gray-600">{shipment.origin} → {shipment.destination}</td>
                            <td className="py-4 px-4">
                              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                shipment.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                shipment.status === 'in-transit' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {shipment.status.replace('-', ' ').toUpperCase()}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-sm text-gray-600">{shipment.createdAt}</td>
                            <td className="py-4 px-4 text-sm font-semibold text-gray-900">${shipment.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'features' && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-6">
                    {selectedPlan === 'courier' ? 'Courier Platform Features' : 'Warehouse Platform Features'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {features.map(feature => (
                      <div key={feature.id} className={`rounded-lg p-4 border-2 ${
                        feature.status === 'active' ? 'bg-green-50 border-green-200' :
                        feature.status === 'premium' ? 'bg-purple-50 border-purple-200' :
                        'bg-gray-50 border-gray-200'
                      }`}>
                        <div className="flex items-start justify-between mb-2">
                          <div className={feature.status === 'active' ? 'text-green-600' : 'text-purple-600'}>
                            {feature.icon}
                          </div>
                          <span className={`text-xs font-bold px-2 py-1 rounded ${
                            feature.status === 'active' ? 'bg-green-200 text-green-800' :
                            feature.status === 'premium' ? 'bg-purple-200 text-purple-800' :
                            'bg-gray-200 text-gray-800'
                          }`}>
                            {feature.status === 'active' ? 'ACTIVE' : feature.status === 'premium' ? 'PREMIUM' : 'COMING'}
                          </span>
                        </div>
                        <h4 className="font-bold text-gray-900 mb-1">{feature.name}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6 max-w-2xl">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Account Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                        <input type="text" defaultValue={currentAccount.companyName} className="w-full px-4 py-2 border border-gray-300 rounded-lg" disabled />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                        <input type="email" defaultValue={currentAccount.email} className="w-full px-4 py-2 border border-gray-300 rounded-lg" disabled />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Plan Type</label>
                        <input type="text" defaultValue={selectedPlan === 'courier' ? 'Courier Platform - $34.99/mo' : 'Warehouse Platform - $249.99/mo'} className="w-full px-4 py-2 border border-gray-300 rounded-lg" disabled />
                      </div>
                    </div>
                  </div>

                  {demoMode && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                      <p className="text-yellow-800"><strong>Demo Mode:</strong> This is a read-only demo account with simulated data. Create a real account to access the full platform and make changes.</p>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">API Keys</h3>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-sm break-all">
                      <p className="text-gray-600 text-xs mb-2">API KEY (Demo)</p>
                      <p className="text-gray-900">sk_demo_{Math.random().toString(36).substring(7)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

import { Printer } from 'lucide-react'

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  )
}
