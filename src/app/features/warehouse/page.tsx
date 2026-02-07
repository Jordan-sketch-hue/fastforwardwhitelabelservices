'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import AIChat from '@/components/AIChat'
import {
  Package, Truck, FileText, CreditCard, Plug, Cloud,
  Smartphone, BarChart3, Users, Globe, Shield, Zap
} from 'lucide-react'

function WarehousePortalContent() {
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
            <h1 className="text-5xl font-bold mb-4">Warehouse Platform</h1>
            <p className="text-2xl text-purple-100 mb-8">Complete freight forwarding management for warehouse operations</p>
            <div className="flex gap-4">
              <button className="px-8 py-3 bg-white text-purple-600 rounded-lg font-bold hover:shadow-lg transition">
                Create Manifest
              </button>
              <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 transition">
                View All Shipments
              </button>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Enterprise-Grade Warehouse Management</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Courier Portal */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <Truck className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Courier Portal</h3>
              <p className="text-gray-600 mb-6">
                Allow couriers to access their manifests, update delivery status, and manage their assignments efficiently.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Manifest access & downloads</li>
                <li>✓ Status updates</li>
                <li>✓ Delivery confirmations</li>
                <li>✓ Route optimization</li>
              </ul>
              <button className="mt-6 w-full py-2 bg-purple-50 text-purple-600 rounded-lg font-semibold hover:bg-purple-100 transition">
                Access Portal
              </button>
            </div>

            {/* Asycuda Manifest */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Asycuda Manifest</h3>
              <p className="text-gray-600 mb-6">
                Automated generation of Asycuda-compliant manifests for customs clearance and international shipping.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Auto-generate manifests</li>
                <li>✓ Customs compliance</li>
                <li>✓ HS code management</li>
                <li>✓ Bulk processing</li>
              </ul>
              <button className="mt-6 w-full py-2 bg-blue-50 text-blue-600 rounded-lg font-semibold hover:bg-blue-100 transition">
                Generate Manifest
              </button>
            </div>

            {/* Stripe Integration */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <CreditCard className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Stripe Integration</h3>
              <p className="text-gray-600 mb-6">
                Seamless payment processing with Stripe for invoices, deposits, and subscription management.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Payment processing</li>
                <li>✓ Recurring billing</li>
                <li>✓ Refund management</li>
                <li>✓ Multi-currency</li>
              </ul>
              <button className="mt-6 w-full py-2 bg-green-50 text-green-600 rounded-lg font-semibold hover:bg-green-100 transition">
                Connect Stripe
              </button>
            </div>

            {/* API Connectors */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
              <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mb-6">
                <Plug className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">3rd Party API Connectors</h3>
              <p className="text-gray-600 mb-6">
                Connect with major shipping carriers, customs systems, and e-commerce platforms via REST APIs.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ DHL, FedEx, UPS integration</li>
                <li>✓ Shopify & WooCommerce</li>
                <li>✓ Customs APIs</li>
                <li>✓ Webhook support</li>
              </ul>
              <button className="mt-6 w-full py-2 bg-yellow-50 text-yellow-600 rounded-lg font-semibold hover:bg-yellow-100 transition">
                View Integrations
              </button>
            </div>

            {/* Shipment Management */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6">
                <Package className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Shipment Management</h3>
              <p className="text-gray-600 mb-6">
                Comprehensive shipment tracking from warehouse receipt to final delivery with real-time updates.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Batch processing</li>
                <li>✓ Inventory management</li>
                <li>✓ Real-time tracking</li>
                <li>✓ Automated workflows</li>
              </ul>
              <button className="mt-6 w-full py-2 bg-indigo-50 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-100 transition">
                Manage Shipments
              </button>
            </div>

            {/* Cloud Printing */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
              <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mb-6">
                <Cloud className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Cloud Printing</h3>
              <p className="text-gray-600 mb-6">
                Print labels, manifests, and invoices from anywhere with cloud-based printing infrastructure.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Print from anywhere</li>
                <li>✓ Multiple printers</li>
                <li>✓ Batch printing</li>
                <li>✓ PDF generation</li>
              </ul>
              <button className="mt-6 w-full py-2 bg-pink-50 text-pink-600 rounded-lg font-semibold hover:bg-pink-100 transition">
                Setup Printing
              </button>
            </div>

            {/* Phone App */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                <Smartphone className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Phone App Support</h3>
              <p className="text-gray-600 mb-6">
                PWA-ready mobile experience with native app features for iOS and Android devices.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Progressive Web App</li>
                <li>✓ Offline support</li>
                <li>✓ Push notifications</li>
                <li>✓ Barcode scanning</li>
              </ul>
              <button className="mt-6 w-full py-2 bg-orange-50 text-orange-600 rounded-lg font-semibold hover:bg-orange-100 transition">
                Install App
              </button>
            </div>

            {/* Advanced Reporting */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6">
                <BarChart3 className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced Reporting</h3>
              <p className="text-gray-600 mb-6">
                Enterprise-grade analytics with custom dashboards, KPI tracking, and automated report generation.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Revenue analytics</li>
                <li>✓ Performance metrics</li>
                <li>✓ Custom reports</li>
                <li>✓ Data export</li>
              </ul>
              <button className="mt-6 w-full py-2 bg-teal-50 text-teal-600 rounded-lg font-semibold hover:bg-teal-100 transition">
                View Analytics
              </button>
            </div>

            {/* Unlimited Users */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-cyan-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Unlimited Users</h3>
              <p className="text-gray-600 mb-6">
                Add unlimited staff members with granular role-based permissions for warehouse operations.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Unlimited accounts</li>
                <li>✓ Role management</li>
                <li>✓ Permission control</li>
                <li>✓ Team collaboration</li>
              </ul>
              <button className="mt-6 w-full py-2 bg-cyan-50 text-cyan-600 rounded-lg font-semibold hover:bg-cyan-100 transition">
                Invite Team
              </button>
            </div>

            {/* Multi-Warehouse */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Multi-Warehouse Support</h3>
              <p className="text-gray-600 mb-6">
                Manage multiple warehouse locations with centralized inventory and cross-location transfers.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Multiple locations</li>
                <li>✓ Inventory sync</li>
                <li>✓ Transfer management</li>
                <li>✓ Location analytics</li>
              </ul>
              <button className="mt-6 w-full py-2 bg-purple-50 text-purple-600 rounded-lg font-semibold hover:bg-purple-100 transition">
                Add Warehouse
              </button>
            </div>

            {/* API Access */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Full API Access</h3>
              <p className="text-gray-600 mb-6">
                Complete REST API with webhooks for custom integrations and automation workflows.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ RESTful API</li>
                <li>✓ Webhook support</li>
                <li>✓ API documentation</li>
                <li>✓ Rate limiting</li>
              </ul>
              <button className="mt-6 w-full py-2 bg-blue-50 text-blue-600 rounded-lg font-semibold hover:bg-blue-100 transition">
                API Documentation
              </button>
            </div>

            {/* White Label */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition border-2 border-purple-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-orange-500 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">White Label Solution</h3>
              <p className="text-gray-600 mb-6">
                Completely rebrand the platform with your logo, colors, and custom domain for seamless branding.
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

            {/* Priority Support */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6">
                <Package className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Priority Support</h3>
              <p className="text-gray-600 mb-6">
                24/7 dedicated support team with direct phone line, priority tickets, and onboarding assistance.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ 24/7 availability</li>
                <li>✓ Dedicated account manager</li>
                <li>✓ Priority response</li>
                <li>✓ Free onboarding</li>
              </ul>
              <button className="mt-6 w-full py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">
                Contact Support
              </button>
            </div>
          </div>
        </div>

        {/* Enterprise Features */}
        <div className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Enterprise-Grade Infrastructure</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">99.99%</div>
                <div className="text-gray-600">Uptime SLA</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">SOC 2</div>
                <div className="text-gray-600">Type II Certified</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">GDPR</div>
                <div className="text-gray-600">Fully Compliant</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-orange-500 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Scale Your Warehouse Operations</h2>
            <p className="text-xl text-purple-100 mb-8">Join leading freight forwarders using FastForward</p>
            <div className="flex justify-center gap-4">
              <button className="px-8 py-4 bg-white text-purple-600 rounded-lg font-bold text-lg hover:shadow-lg transition">
                Request Demo
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white/10 transition">
                Contact Sales
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

export default function WarehousePortalPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <WarehousePortalContent />
    </Suspense>
  )
}
