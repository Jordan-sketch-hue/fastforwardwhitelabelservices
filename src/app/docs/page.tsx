'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Code2, Copy, Check } from 'lucide-react'
import { useState } from 'react'

export default function DocsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const codeExamples = [
    {
      id: 'register',
      title: 'Register New Account',
      method: 'POST',
      endpoint: '/api/auth/register',
      code: `curl -X POST https://api.fastforward.com/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "admin@company.com",
    "password": "SecurePassword123",
    "firstName": "John",
    "lastName": "Doe",
    "companyName": "Your Company",
    "phone": "+1-555-0000",
    "industry": "ecommerce",
    "packageVolume": "100-500",
    "plan": "courier"
  }'`,
    },
    {
      id: 'create-package',
      title: 'Create New Shipment',
      method: 'POST',
      endpoint: '/api/packages',
      code: `curl -X POST https://api.fastforward.com/packages \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "trackingNumber": "FF-2025-001234",
    "origin": "New York Warehouse",
    "destination": "Los Angeles, CA",
    "weight": 5.5,
    "dimensions": {
      "length": 10,
      "width": 8,
      "height": 6
    },
    "contents": "Electronics",
    "value": 250.00
  }'`,
    },
    {
      id: 'track-package',
      title: 'Track Shipment',
      method: 'GET',
      endpoint: '/api/packages?tracking=FF-2025-001234',
      code: `curl -X GET "https://api.fastforward.com/packages?tracking=FF-2025-001234" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
    },
    {
      id: 'list-packages',
      title: 'List All Packages',
      method: 'GET',
      endpoint: '/api/packages?status=in-transit',
      code: `curl -X GET "https://api.fastforward.com/packages?status=in-transit" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
    },
  ]

  const responses = [
    {
      status: 200,
      title: 'Success',
      example: `{
  "success": true,
  "package": {
    "id": "1234567890",
    "trackingNumber": "FF-2025-001234",
    "status": "in-transit",
    "origin": "New York Warehouse",
    "destination": "Los Angeles, CA",
    "createdAt": "2025-02-07T10:30:00Z",
    "events": [
      {
        "status": "picked_up",
        "timestamp": "2025-02-07T10:30:00Z",
        "location": "New York Warehouse"
      }
    ]
  }
}`,
    },
    {
      status: 400,
      title: 'Bad Request',
      example: `{
  "error": "Missing required fields",
  "details": {
    "missing": ["destination", "weight"]
  }
}`,
    },
    {
      status: 401,
      title: 'Unauthorized',
      example: `{
  "error": "Invalid or missing API key",
  "message": "Please provide a valid API key in the Authorization header"
}`,
    },
  ]

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">API Documentation</h1>
            <p className="text-xl text-gray-600">
              Complete guide to integrate FastForward with your systems
            </p>
          </div>

          {/* Authentication */}
          <section className="bg-white rounded-lg shadow p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication</h2>
            <p className="text-gray-600 mb-6">
              All API requests require authentication using your API key. Include it in the Authorization header:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 mb-4">
              <code className="text-green-400 text-sm">Authorization: Bearer YOUR_API_KEY</code>
            </div>
            <p className="text-gray-600">
              You can find your API key in your dashboard under Settings → API Keys
            </p>
          </section>

          {/* Endpoints */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Endpoints</h2>
            
            {codeExamples.map((example) => (
              <div key={example.id} className="bg-white rounded-lg shadow overflow-hidden mb-8">
                <div className="bg-gradient-to-r from-purple-600 to-orange-500 px-6 py-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold mb-1">{example.title}</h3>
                      <p className="text-sm opacity-90">
                        <span className="font-mono font-semibold">{example.method}</span>
                        {' '}{example.endpoint}
                      </p>
                    </div>
                    <div className="bg-white/20 px-3 py-1 rounded text-sm font-semibold">
                      {example.method}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="bg-gray-900 rounded-lg overflow-hidden">
                    <div className="flex justify-between items-center bg-gray-800 px-4 py-2">
                      <code className="text-gray-400 text-xs">curl</code>
                      <button
                        onClick={() => copyToClipboard(example.code, example.id)}
                        className="text-gray-400 hover:text-gray-200 transition flex items-center gap-1"
                      >
                        {copiedId === example.id ? (
                          <>
                            <Check size={16} />
                            <span className="text-xs">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={16} />
                            <span className="text-xs">Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 text-green-400 text-sm overflow-auto max-h-64">
                      <code>{example.code}</code>
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Response Codes */}
          <section className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Response Codes</h2>
            
            <div className="space-y-6">
              {responses.map((response, idx) => (
                <div key={idx}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded font-semibold text-white text-sm ${
                      response.status === 200 ? 'bg-green-600' :
                      response.status === 400 ? 'bg-yellow-600' :
                      'bg-red-600'
                    }`}>
                      {response.status}
                    </span>
                    <h3 className="font-bold text-gray-900">{response.title}</h3>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-auto">
                    <pre className="text-green-400 text-sm">
                      <code>{response.example}</code>
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Rate Limiting */}
          <section className="bg-blue-50 border border-blue-200 rounded-lg p-8 mt-8">
            <h3 className="text-lg font-bold text-blue-900 mb-2">Rate Limiting</h3>
            <p className="text-blue-800 text-sm">
              API requests are limited to 1000 requests per hour per API key. The rate limit status is included in response headers:
            </p>
            <div className="bg-white rounded mt-3 p-3 text-sm font-mono">
              <code className="text-blue-600">
                X-RateLimit-Limit: 1000<br />
                X-RateLimit-Remaining: 999<br />
                X-RateLimit-Reset: 1644250000
              </code>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
}
