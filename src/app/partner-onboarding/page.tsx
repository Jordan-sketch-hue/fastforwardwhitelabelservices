'use client'

import { useState } from 'react'
import { ChevronRight, CheckCircle, Lock, Zap, Shield, BarChart3, ArrowRight } from 'lucide-react'

export default function PartnerOnboarding() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    industry: '',
    tier: 'professional',
    webhookUrl: '',
    targetDeliveries: '',
    representativeName: '',
    phone: ''
  })

  const steps = [
    { number: 1, title: 'Welcome', description: 'Introduction to FastForward' },
    { number: 2, title: 'Company Info', description: 'Tell us about your business' },
    { number: 3, title: 'Tier Selection', description: 'Choose your service level' },
    { number: 4, title: 'Webhooks', description: 'Set up real-time notifications' },
    { number: 5, title: 'Activation', description: 'Go live and start shipping' }
  ]

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="text-white mb-12">
          <h1 className="text-4xl font-bold mb-2">FastForward Partner Onboarding</h1>
          <p className="text-blue-100 text-lg">Connect your business to our courier network</p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Sidebar - Steps */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="font-bold text-gray-900 mb-6 text-lg">Setup Steps</h2>
              <div className="space-y-4">
                {steps.map((step, idx) => (
                  <button
                    key={step.number}
                    onClick={() => setCurrentStep(step.number)}
                    className={`w-full text-left p-4 rounded-lg transition ${
                      currentStep === step.number
                        ? 'bg-blue-600 text-white'
                        : currentStep > step.number
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm ${
                        currentStep > step.number
                          ? 'bg-green-600 text-white'
                          : currentStep === step.number
                          ? 'bg-white text-blue-600'
                          : 'bg-gray-300 text-gray-600'
                      }`}>
                        {currentStep > step.number ? <CheckCircle className="w-4 h-4" /> : step.number}
                      </div>
                      <div>
                        <p className="font-semibold">{step.title}</p>
                        <p className="text-xs opacity-75">{step.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Form Area */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              {/* Step 1: Welcome */}
              {currentStep === 1 && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to FastForward</h2>
                  <p className="text-gray-600 mb-8 text-lg max-w-xl mx-auto">
                    Join thousands of courier companies using FastForward to streamline their operations, optimize routes, and grow their business.
                  </p>
                  <div className="space-y-4 text-left max-w-xl mx-auto mb-8">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900">Real-time API Access</h3>
                        <p className="text-sm text-gray-600">Get instant access to package data and shipment information</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900">Webhook Notifications</h3>
                        <p className="text-sm text-gray-600">Receive real-time updates on delivery status changes</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900">AI Optimization</h3>
                        <p className="text-sm text-gray-600">Automatic load balancing and route optimization</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Company Info */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Company Information</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        placeholder="Your Company Inc."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Business Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="admin@yourcompany.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Industry</label>
                      <select
                        value={formData.industry}
                        onChange={(e) => handleInputChange('industry', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        <option value="">Select Industry</option>
                        <option value="ecommerce">E-Commerce</option>
                        <option value="retail">Retail</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="manufacturing">Manufacturing</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Tier Selection */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Your Service Tier</h2>
                  <div className="space-y-4">
                    {[
                      {
                        id: 'starter',
                        name: 'Starter',
                        price: '$299',
                        shipments: '1,000 shipments/month',
                        features: ['API Access', 'Email Support', '2 Webhooks', 'Basic Analytics']
                      },
                      {
                        id: 'professional',
                        name: 'Professional',
                        price: '$999',
                        shipments: '10,000 shipments/month',
                        features: ['Priority API', 'Phone Support', '10 Webhooks', 'Advanced Analytics', 'AI Load Balancing'],
                        popular: true
                      },
                      {
                        id: 'enterprise',
                        name: 'Enterprise',
                        price: 'Custom',
                        shipments: 'Unlimited shipments',
                        features: ['Dedicated Support', 'Unlimited Webhooks', 'Custom Integrations', 'AI Optimization', 'SLA Guarantee']
                      }
                    ].map(tier => (
                      <button
                        key={tier.id}
                        onClick={() => handleInputChange('tier', tier.id)}
                        className={`p-6 border-2 rounded-lg text-left transition ${
                          formData.tier === tier.id
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        } ${tier.popular ? 'relative' : ''}`}
                      >
                        {tier.popular && (
                          <div className="absolute -top-3 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                            Most Popular
                          </div>
                        )}
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                        <p className="text-2xl font-bold text-blue-600 mb-2">{tier.price}</p>
                        <p className="text-sm text-gray-600 mb-4">{tier.shipments}</p>
                        <ul className="space-y-2">
                          {tier.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Webhooks */}
              {currentStep === 4 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Webhook Configuration</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Webhook URL</label>
                      <input
                        type="url"
                        value={formData.webhookUrl}
                        onChange={(e) => handleInputChange('webhookUrl', e.target.value)}
                        placeholder="https://your-company.com/webhooks"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <p className="text-sm text-gray-600 mt-2">Where we'll send real-time delivery updates</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Subscribe to Events</label>
                      <div className="space-y-2">
                        {[
                          { id: 'created', label: 'Shipment Created' },
                          { id: 'updated', label: 'Shipment Updated' },
                          { id: 'delivered', label: 'Delivery Completed' },
                          { id: 'failed', label: 'Delivery Failed' }
                        ].map(event => (
                          <label key={event.id} className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                            <span className="text-gray-700">{event.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Activation */}
              {currentStep === 5 && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Go Live!</h2>
                  <p className="text-gray-600 mb-8 text-lg max-w-xl mx-auto">
                    Your FastForward integration is ready. Here's what happens next:
                  </p>
                  <div className="space-y-4 text-left max-w-xl mx-auto mb-8">
                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">API Key Generated</h3>
                        <p className="text-sm text-gray-600">You'll receive your unique API key via email</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                      <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Webhooks Activated</h3>
                        <p className="text-sm text-gray-600">Real-time notifications start flowing to your webhook URL</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Live Operations</h3>
                        <p className="text-sm text-gray-600">Start accessing packages and managing deliveries</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg mb-8">
                    <p className="text-sm text-yellow-800">
                      <strong>Next Step:</strong> Check your email for API credentials and setup documentation
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentStep === steps.length}
                  className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold flex items-center gap-2"
                >
                  {currentStep === steps.length ? 'Complete' : 'Next'}
                  {currentStep < steps.length && <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-blue-100">
          <p>Step {currentStep} of {steps.length}</p>
        </div>
      </div>
    </div>
  )
}
