'use client'

import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { ArrowRight, CheckCircle, Users, Zap, Globe, Award } from 'lucide-react'

export default function About() {
  return (
    <>
      <Navigation />
      
      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-r from-purple-600 to-orange-500 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-6">About LogisticsHub</h1>
            <p className="text-xl opacity-90">Empowering logistics companies worldwide with intelligent, scalable solutions</p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-700 mb-4">
                  We believe that logistics shouldn't be complicated. LogisticsHub was built to transform how courier services and warehouses operate, removing friction and enabling growth.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Today, 200+ companies trust us with their operations, processing millions of shipments annually.
                </p>
                <div className="space-y-3">
                  {[
                    'Enterprise-grade reliability',
                    'Founder-led and customer-focused',
                    'Transparent, honest pricing',
                    'Dedicated support team'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-orange-100 rounded-2xl h-96 flex items-center justify-center">
                <div className="text-center">
                  <Zap className="w-24 h-24 text-purple-600 mx-auto mb-4" />
                  <p className="text-gray-600 font-semibold">Transforming Logistics</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: Users, title: 'Customer First', description: 'Your success is our success' },
                { icon: Zap, title: 'Innovation', description: 'Always improving, always evolving' },
                { icon: Globe, title: 'Global Impact', description: 'Supporting logistics worldwide' },
                { icon: Award, title: 'Excellence', description: 'Enterprise-quality in everything' }
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} className="text-center p-8 rounded-xl border border-gray-200 hover:shadow-lg transition">
                    <Icon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { number: '200+', label: 'Active Companies' },
                { number: '10M+', label: 'Packages Processed' },
                { number: '99.9%', label: 'Uptime' },
                { number: '50+', label: 'Countries' }
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-4xl font-bold text-purple-600 mb-2">{stat.number}</p>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-orange-500 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Logistics?</h2>
            <Link href="/onboarding" className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition">
              Get Started Free
              <ArrowRight size={20} />
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}
