'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import AIChat from '@/components/AIChat'
import {
  Package, MapPin, Bell, FileText, Mail, Printer,
  CreditCard, BarChart3, Users, Building2, Globe, Shield
} from 'lucide-react'

function CourierPortalContent() {
  const searchParams = useSearchParams()
  const [demoMode, setDemoMode] = useState(false)

  useEffect(() => {
    setDemoMode(searchParams?.get('demo') === 'true')
  }, [searchParams])

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <div className="bg-gradient-to-r from-purple-600 to-orange-500 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              {demoMode && (
                <span className="px-4 py-2 bg-blue-500 rounded-full text-sm font-bold">
                  🎬 DEMO MODE
                </span>
              )}
            </div>
            <h1 className="text-5xl font-bold mb-4">Courier Platform</h1>
            <p className="text-2xl text-purple-100 mb-8">Complete delivery management for courier companies</p>
            <div className="flex gap-4">
              <button className="px-8 py-3 bg-white text-purple-600 rounded-lg font-bold hover:shadow-lg transition">
                Create Shipment
              </button>
              <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 transition">
                View All Shipments
              </button>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">All Features at Your Fingertips</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Customer Portal */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Customer Portal</h3>
              <p className="text-gray-600 mb-6">
                Give your customers 24/7 access to track shipments, view invoices, and manage their account independently.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Real-time tracking dashboard</li>
                <li>✓ Invoice history & downloads</li>
                <li>✓ Shipment history & analytics</li>
                <li>✓ Custom notifications</li>
              </ul>
              <button className="mt-6 w-full py-2 bg-purple-50 text-purple-600 rounded-lg font-semibold hover:bg-purple-100 transition">
                Configure Portal
              </button>
            </div>

            {/* Advanced Tracking */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced Tracking</h3>
              <p className="text-gray-600 mb-6">
                Real-time GPS tracking with geofencing, route optimization, and live delivery updates for customers.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Live GPS coordinates</li>
                <li>✓ Estimated delivery times</li>
                <li>✓ Route optimization</li>
                <li>✓ Proof of delivery photos</li>
              </ul>
              <button className="mt-6 w-full py-2 bg-blue-50 text-blue-600 rounded-lg font-semibold hover:bg-blue-100 transition">
                View Tracking Demo
              </button>
            </div>

            {/* Pre-Alert System */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
              <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mb-6">
                <Bell className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Pre-Alert System</h3>
              <p className="text-gray-600 mb-6">
                Automatically notify customers before delivery with customizable SMS, email, and push notifications.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ SMS & Email alerts</li>
                <li>✓ Custom delivery windows</li>
                <li>✓ Rescheduling options</li>
                <li>✓ Multi-language support</li>
              </ul>
              <button className="mt-6 w-full py-2 bg-yellow-50 text-yellow-600 rounded-lg font-semibold hover:bg-yellow-100 transition">
                Setup Alerts
              </button>
            </div>

            {/* Invoice Management */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Invoice Management</h3>
              <p className="text-gray-600 mb-6">
                Automated invoicing with payment tracking, recurring billing, and customizable invoice templates.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Auto-generated invoices</li>
                <li>✓ Payment tracking</li>
                <li>✓ Recurring billing</li>
                <li>✓ Custom templates</li>
              </ul>
              <button className="mt-6 w-full py-2 bg-green-50 text-green-600 rounded-lg font-semibold hover:bg-green-100 transition">
                Create Invoice
              </button>
            </div>

            {/* Backoffice Portal */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6">
                <Building2 className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Backoffice Portal</h3>
              <p className="text-gray-600 mb-6">
                Complete operations management with dispatch tools, route planning, and driver assignments.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Dispatch management</li>
                <li>✓ Driver assignments</li>
                <li>✓ Route optimization</li>
                <li>✓ Performance analytics</li>
              </ul>
              <button className="mt-6 w-full py-2 bg-indigo-50 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-100 transition">
                Access Backoffice
              </button>
            </div>

            {/* Email Marketing */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
              <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mb-6">
                <Mail className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Email Marketing</h3>
              <p className="text-gray-600 mb-6">
                Built-in email marketing tools to keep customers engaged with promotions, updates, and newsletters.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Campaign builder</li>
                <li>✓ Customer segmentation</li>
                <li>✓ Analytics & tracking</li>
                <li>✓ Automated sequences</li>
              </ul>
              <button className="mt-6 w-full py-2 bg-pink-50 text-pink-600 rounded-lg font-semibold hover:bg-pink-100 transition">
                Create Campaign
              </button>
            </div>

            {/* Label Generation */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                <Printer className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Label Generation</h3>
              <p className="text-gray-600 mb-6">
                Automatic shipping label creation with barcode/QR code generation and batch printing support.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Auto-generate labels</li>
                <li>✓ Barcode & QR codes</li>
                <li>✓ Batch printing</li>
                <li>✓ Custom formats</li>
              </ul>
              <button className="mt-6 w-full py-2 bg-orange-50 text-orange-600 rounded-lg font-semibold hover:bg-orange-100 transition">
                Print Labels
              </button>
            </div>

            {/* POS Integration */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6">
                <CreditCard className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">POS Integration</h3>
              <p className="text-gray-600 mb-6">
                Seamless integration with point-of-sale systems for instant payment processing and receipt generation.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Payment processing</li>
                <li>✓ Receipt generation</li>
                <li>✓ Refund management</li>
                <li>✓ Multi-currency support</li>
              </ul>
              <button className="mt-6 w-full py-2 bg-teal-50 text-teal-600 rounded-lg font-semibold hover:bg-teal-100 transition">
                Connect POS
              </button>
            </div>

            {/* Multi-Location */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-cyan-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Multi-Location Support</h3>
              <p className="text-gray-600 mb-6">
                Manage multiple branch locations with centralized control and location-specific reporting.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Branch management</li>
                <li>✓ Location analytics</li>
                <li>✓ Inventory per location</li>
                <li>✓ Staff assignment</li>
              </ul>
              <button className="mt-6 w-full py-2 bg-cyan-50 text-cyan-600 rounded-lg font-semibold hover:bg-cyan-100 transition">
                Add Location
              </button>
            </div>

            {/* Advanced Reporting */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced Reporting</h3>
              <p className="text-gray-600 mb-6">
                Comprehensive analytics with custom reports, KPI tracking, and data export capabilities.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Custom dashboards</li>
                <li>✓ Performance metrics</li>
                <li>✓ Export to Excel/PDF</li>
                <li>✓ Scheduled reports</li>
              </ul>
              <button className="mt-6 w-full py-2 bg-purple-50 text-purple-600 rounded-lg font-semibold hover:bg-purple-100 transition">
                View Reports
              </button>
            </div>

            {/* Unlimited Users */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Unlimited Users</h3>
              <p className="text-gray-600 mb-6">
                Add unlimited team members with role-based permissions and access control at no extra cost.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Unlimited accounts</li>
                <li>✓ Role-based access</li>
                <li>✓ Permission management</li>
                <li>✓ Team collaboration</li>
              </ul>
              <button className="mt-6 w-full py-2 bg-blue-50 text-blue-600 rounded-lg font-semibold hover:bg-blue-100 transition">
                Invite Team
              </button>
            </div>

            {/* White Label */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition border-2 border-purple-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-orange-500 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">White Label Solution</h3>
              <p className="text-gray-600 mb-6">
                Completely rebrand the platform with your logo, colors, and domain for a seamless brand experience.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Custom domain</li>
                <li>✓ Your branding</li>
                <li>✓ Custom emails</li>
                <li>✓ Remove our logo</li>
              </ul>
              <button className="mt-6 w-full py-2 bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition">
                Setup White Label
              </button>
            </div>

            {/* No Setup Fee */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6">
                <Package className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Setup Fee</h3>
              <p className="text-gray-600 mb-6">
                Get started immediately with our 14-day free trial. No credit card required, no hidden fees.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ 14-day free trial</li>
                <li>✓ No credit card needed</li>
                <li>✓ Cancel anytime</li>
                <li>✓ Instant activation</li>
              </ul>
              <button className="mt-6 w-full py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">
                Start Free Trial
              </button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-orange-500 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Courier Business?</h2>
            <p className="text-xl text-purple-100 mb-8">Join thousands of courier companies using FastForward</p>
            <div className="flex justify-center gap-4">
              <button className="px-8 py-4 bg-white text-purple-600 rounded-lg font-bold text-lg hover:shadow-lg transition">
                Start Free Trial
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white/10 transition">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <AIChat />
    </>
  )
}

export default function CourierPortalPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <CourierPortalContent />
    </Suspense>
  )
}
