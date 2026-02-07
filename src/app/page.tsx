'use client'

import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { branding } from '@/config/branding'
import {
  Package,
  TrendingUp,
  Lock,
  Zap,
  Globe,
  BarChart3,
  CheckCircle,
  Users,
  Cloud,
  Smartphone,
  ArrowRight,
  Star,
} from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: <Package className="w-8 h-8" />,
      title: 'Smart Package Tracking',
      description: 'Real-time tracking with advanced package management system',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Business Analytics',
      description: 'Advanced reporting and analytics dashboard for data-driven insights',
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: 'Industry Security',
      description: 'Enterprise-grade security to keep your data safe and protected',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Lightning Fast',
      description: 'Optimized performance for quick operations and seamless experience',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Coverage',
      description: 'Connect with couriers and warehouses across the globe',
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Advanced Reporting',
      description: 'Comprehensive reports to track and optimize your operations',
    },
  ]

  const courierFeatures = [
    'Customer Portal',
    'Advanced Package Tracking',
    'Backoffice Portal',
    'Pre-Alert System',
    'Invoice Management',
    'No User Limit',
    'Multiple Branch Location',
    'Point of Sale',
    'Email Marketing',
    'Label Generation',
    'Advanced Reporting',
    'No Set Up Fee',
    'White Label',
  ]

  const warehouseFeatures = [
    'Courier Portal',
    'Advanced Package Tracking',
    'Invoice Management',
    'Online Payment via Stripe',
    'API for 3rd party vendors',
    'Shipment management',
    'Asycuda Manifest generation',
    'Label Generation',
    'Cloud Printing',
    'Advanced Reporting',
    'No Set Up Fee',
    'Phone Application for staff',
    'White Label',
  ]

  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-purple-50 to-white pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {branding.companyName}
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {branding.description}
                <span className="block text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-orange-500 mt-2">
                  Faster Is Always Better
                </span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/onboarding"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  href="/onboarding?demo=true"
                  className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-purple-600 hover:text-purple-600 transition"
                >
                  View Demo
                </Link>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={16} className="fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <span>200+ Trusted Customers</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-20 pt-12 border-t border-gray-200">
            <div className="text-center">
              <p className="text-4xl font-bold text-purple-600">200+</p>
              <p className="text-gray-600 mt-2">Trusted Customers</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-purple-600">100+</p>
              <p className="text-gray-600 mt-2">Features</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-purple-600">24/7</p>
              <p className="text-gray-600 mt-2">Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600">
              The ultimate logistics software for couriers and shipping services
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="p-8 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-lg transition border border-gray-200"
              >
                <div className="text-purple-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Key Benefits */}
          <div className="mt-16 grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Built for Scale
              </h3>
              <ul className="space-y-4">
                {['Manage unlimited users and locations', 'Handle millions of packages', 'Real-time notifications', 'Cloud-based infrastructure'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Enterprise Ready
              </h3>
              <ul className="space-y-4">
                {['99.9% Uptime SLA', 'Bank-level security', 'GDPR compliant', 'Custom integrations'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Perfect Plans for Every Business
            </h2>
            <p className="text-xl text-gray-600">
              Start free, scale as you grow. No setup fees ever.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Courier Platform */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200 hover:border-purple-500 transition">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Courier Platform
              </h3>
              <p className="text-gray-600 mb-6">
                Perfect for courier companies managing deliveries
              </p>
              <div className="mb-8">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-purple-600">$34.99</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-gray-600 text-sm">+ $0.20 per package</p>
              </div>
              <Link
                href="/onboarding?plan=courier"
                className="w-full bg-gradient-to-r from-purple-600 to-orange-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition mb-8 block text-center"
              >
                Get Started
              </Link>
              <div className="space-y-3">
                {courierFeatures.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Warehouse Platform */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-purple-500 ring-2 ring-purple-500/20 relative">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-orange-500 text-white px-4 py-1 rounded-bl-lg rounded-tr-2xl text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Warehouse Platform
              </h3>
              <p className="text-gray-600 mb-6">
                Complete solution for warehouse operations
              </p>
              <div className="mb-8">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-purple-600">$249.99</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-gray-600 text-sm">+ $0.15 per package</p>
              </div>
              <Link
                href="/onboarding?plan=warehouse"
                className="w-full bg-gradient-to-r from-purple-600 to-orange-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition mb-8 block text-center"
              >
                Get Started
              </Link>
              <div className="space-y-3">
                {warehouseFeatures.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Scale Your Logistics?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join 200+ companies already managing their operations on FastForward
          </p>
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition"
          >
            Start Your Free Trial
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}
