'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Search, ChevronRight, Book, Zap, Users, Lock, MessageCircle } from 'lucide-react'

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'getting-started', name: 'Getting Started', icon: Zap, articles: 8 },
    { id: 'features', name: 'Features', icon: Book, articles: 15 },
    { id: 'account', name: 'Account & Settings', icon: Users, articles: 7 },
    { id: 'security', name: 'Security', icon: Lock, articles: 5 }
  ]

  const articles = [
    {
      id: 1,
      title: 'How to Create Your First Shipment',
      category: 'getting-started',
      readTime: '5 min',
      description: 'Learn how to create and manage shipments in the system'
    },
    {
      id: 2,
      title: 'Understanding Real-time Tracking',
      category: 'features',
      readTime: '8 min',
      description: 'How real-time tracking works and how to use it for better customer service'
    },
    {
      id: 3,
      title: 'Setting Up Your Warehouse',
      category: 'getting-started',
      readTime: '12 min',
      description: 'Step-by-step guide to configure your warehouse settings'
    },
    {
      id: 4,
      title: 'Managing Team Members',
      category: 'account',
      readTime: '6 min',
      description: 'Add, remove, and manage team member roles and permissions'
    },
    {
      id: 5,
      title: 'API Integration Guide',
      category: 'features',
      readTime: '15 min',
      description: 'Complete guide to integrating LogisticsHub API with your system'
    },
    {
      id: 6,
      title: 'Two-Factor Authentication',
      category: 'security',
      readTime: '4 min',
      description: 'Enable 2FA to secure your account'
    },
    {
      id: 7,
      title: 'Generating Reports',
      category: 'features',
      readTime: '7 min',
      description: 'Create custom reports and export data'
    },
    {
      id: 8,
      title: 'Password Reset & Recovery',
      category: 'account',
      readTime: '3 min',
      description: 'How to reset your password if forgotten'
    }
  ]

  const faqs = [
    {
      q: 'What is the maximum number of team members I can add?',
      a: 'There\'s no limit to the number of team members you can add. Each team member can have different roles and permissions.'
    },
    {
      q: 'Can I export my data?',
      a: 'Yes, you can export all your shipments, customers, and reports as CSV files from the Analytics section.'
    },
    {
      q: 'Is my data backed up?',
      a: 'Yes, all data is automatically backed up daily and stored securely in multiple geographic locations.'
    },
    {
      q: 'How long does it take to process a shipment?',
      a: 'Shipments are processed immediately upon creation. Real-time tracking begins as soon as the package is picked up.'
    },
    {
      q: 'Can I customize the platform branding?',
      a: 'Yes, on our Enterprise plan, you can fully white-label the platform with your branding.'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept all major credit cards, bank transfers, and ACH payments. Enterprise customers can set up custom billing.'
    }
  ]

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <>
      <Navigation />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-gradient-to-r from-purple-600 to-orange-500 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Help & Support</h1>
            <p className="text-xl opacity-90 mb-8">Find answers, learn best practices, and get the most out of LogisticsHub</p>
            
            {/* Search */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Categories */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`p-6 rounded-lg text-center transition ${
                selectedCategory === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-900 border border-gray-200 hover:shadow-lg'
              }`}
            >
              <p className="text-2xl mb-2">📚</p>
              <p className="font-semibold">All Articles</p>
              <p className="text-sm opacity-75 mt-1">32 articles</p>
            </button>

            {categories.map(cat => {
              const Icon = cat.icon
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`p-6 rounded-lg text-center transition ${
                    selectedCategory === cat.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-900 border border-gray-200 hover:shadow-lg'
                  }`}
                >
                  <Icon className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-semibold">{cat.name}</p>
                  <p className="text-sm opacity-75 mt-1">{cat.articles} articles</p>
                </button>
              )
            })}
          </div>

          {/* Articles */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {filteredArticles.map(article => (
              <a
                key={article.id}
                href="#"
                className="bg-white rounded-lg shadow p-6 hover:shadow-lg hover:border-purple-500 transition border border-gray-200 group"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition flex-1">
                    {article.title}
                  </h3>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition" />
                </div>
                <p className="text-gray-600 text-sm mb-4">{article.description}</p>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                    {categories.find(c => c.id === article.category)?.name}
                  </span>
                  <span className="text-xs text-gray-500">{article.readTime}</span>
                </div>
              </a>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No articles found. Try adjusting your search.</p>
            </div>
          )}

          {/* FAQs */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition group"
                >
                  <summary className="p-6 cursor-pointer flex justify-between items-center font-semibold text-gray-900">
                    {faq.q}
                    <span className="text-purple-600 group-open:rotate-180 transition">▼</span>
                  </summary>
                  <p className="px-6 pb-6 text-gray-600 border-t border-gray-200">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="mt-16 bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-xl p-12 text-center">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h3 className="text-2xl font-bold mb-4">Still need help?</h3>
            <p className="text-lg opacity-90 mb-6">Can't find what you're looking for? Contact our support team.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:shadow-lg transition">
                Contact Support
              </a>
              <a href="#" className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition">
                Schedule Demo
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
