'use client'

import { useState } from 'react'
import { Plus, Trash2, Edit, Copy, Key, Settings, BarChart3, CheckCircle, AlertCircle, Zap } from 'lucide-react'

interface PartnerCompany {
  id: string
  name: string
  email: string
  tier: 'starter' | 'professional' | 'enterprise'
  status: 'active' | 'inactive' | 'pending'
  apiKey: string
  shipmentQuota: number
  shipmentsUsed: number
  balance: number
  createdDate: string
  lastSync: string
  webhooks: number
}

export default function AdminIntegrationDashboard() {
  const [activeTab, setActiveTab] = useState<'companies' | 'setup' | 'monitoring' | 'ai'>('companies')
  const [companies, setCompanies] = useState<PartnerCompany[]>([
    {
      id: '1',
      name: 'QuickShip Logistics',
      email: 'api@quickship.com',
      tier: 'professional',
      status: 'active',
      apiKey: 'ff_sk_live_abc123def456ghi789',
      shipmentQuota: 10000,
      shipmentsUsed: 7234,
      balance: 2500.50,
      createdDate: '2025-01-15',
      lastSync: '2 minutes ago',
      webhooks: 3
    },
    {
      id: '2',
      name: 'Express Delivery Co',
      email: 'support@expressco.com',
      tier: 'starter',
      status: 'active',
      apiKey: 'ff_sk_live_xyz789abc456def123',
      shipmentQuota: 1000,
      shipmentsUsed: 456,
      balance: 1200.75,
      createdDate: '2025-02-01',
      lastSync: '5 minutes ago',
      webhooks: 2
    }
  ])
  const [showNewCompany, setShowNewCompany] = useState(false)

  const getTierColor = (tier: string) => {
    switch(tier) {
      case 'starter': return 'bg-blue-100 text-blue-700'
      case 'professional': return 'bg-purple-100 text-purple-700'
      case 'enterprise': return 'bg-amber-100 text-amber-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'inactive': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Partner Integrations</h1>
          <p className="text-gray-600">Manage FastForward API connections and company integrations</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            {[
              { id: 'companies', label: 'Companies', icon: '🏢' },
              { id: 'setup', label: 'Setup', icon: '⚙️' },
              { id: 'monitoring', label: 'Monitoring', icon: '📊' },
              { id: 'ai', label: 'AI Balance', icon: '🤖' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-2 border-b-2 font-semibold transition ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Companies Tab */}
        {activeTab === 'companies' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Connected Companies</h2>
              <button
                onClick={() => setShowNewCompany(!showNewCompany)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Company
              </button>
            </div>

            {showNewCompany && (
              <div className="bg-white rounded-lg shadow p-6 mb-6 border border-blue-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">New Company Onboarding</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <input type="text" placeholder="Company Name" className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                  <input type="email" placeholder="Email" className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                  <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                    <option value="">Select Tier</option>
                    <option value="starter">Starter (1,000 shipments/month)</option>
                    <option value="professional">Professional (10,000 shipments/month)</option>
                    <option value="enterprise">Enterprise (Unlimited)</option>
                  </select>
                  <input type="number" placeholder="Initial Balance ($)" className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="flex gap-3 mt-4">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Create & Send Invite</button>
                  <button onClick={() => setShowNewCompany(false)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">Cancel</button>
                </div>
              </div>
            )}

            {/* Companies Grid */}
            <div className="grid gap-6">
              {companies.map(company => (
                <div key={company.id} className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{company.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTierColor(company.tier)}`}>
                          {company.tier}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(company.status)}`}>
                          {company.status === 'active' ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                          {company.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{company.email} • Created {company.createdDate}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid md:grid-cols-4 gap-4 mb-4 py-4 border-y border-gray-200">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Quota Usage</p>
                      <p className="text-lg font-bold text-gray-900">{company.shipmentsUsed} / {company.shipmentQuota}</p>
                      <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(company.shipmentsUsed / company.shipmentQuota) * 100}%` }} />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Account Balance</p>
                      <p className="text-lg font-bold text-green-600">${company.balance.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Last Sync</p>
                      <p className="text-lg font-bold text-gray-900">{company.lastSync}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Webhooks</p>
                      <p className="text-lg font-bold text-gray-900">{company.webhooks} active</p>
                    </div>
                  </div>

                  {/* API Key */}
                  <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">API Key</p>
                      <p className="font-mono text-sm text-gray-900">{company.apiKey}</p>
                    </div>
                    <button className="p-2 text-gray-600 hover:bg-white rounded-lg transition">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    <button className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition text-sm font-semibold flex items-center gap-2">
                      <Key className="w-4 h-4" />
                      Manage Keys
                    </button>
                    <button className="px-3 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition text-sm font-semibold flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Webhooks
                    </button>
                    <button className="px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition text-sm font-semibold flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Analytics
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Setup Tab */}
        {activeTab === 'setup' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Integration Setup Guide</h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-600 pl-6 py-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Step 1: API Authentication</h3>
                  <p className="text-gray-600 mb-3">Generate API keys and set up JWT authentication</p>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
{`curl -X POST https://api.logisticshub.com/v1/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{
    "api_key": "ff_sk_live_abc123",
    "secret": "your_secret"
  }'`}
                  </pre>
                </div>

                <div className="border-l-4 border-purple-600 pl-6 py-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Step 2: Sync Warehouse Data</h3>
                  <p className="text-gray-600 mb-3">Connect to FastForward warehouse for real-time package data</p>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
{`GET /api/v1/packages?status=pending&limit=100
Authorization: Bearer YOUR_JWT_TOKEN`}
                  </pre>
                </div>

                <div className="border-l-4 border-green-600 pl-6 py-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Step 3: Register Webhooks</h3>
                  <p className="text-gray-600 mb-3">Receive real-time updates on package status changes</p>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
{`POST /api/v1/webhooks
{
  "url": "https://your-company.com/webhooks",
  "events": ["shipment.created", "shipment.delivered"],
  "active": true
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Monitoring Tab */}
        {activeTab === 'monitoring' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600 text-sm mb-2">Total Companies</p>
                <p className="text-3xl font-bold text-gray-900">{companies.length}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600 text-sm mb-2">Active Shipments</p>
                <p className="text-3xl font-bold text-gray-900">12,450</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600 text-sm mb-2">System Health</p>
                <p className="text-3xl font-bold text-green-600">99.8%</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600 text-sm mb-2">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">$34,200</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Real-time Activity Feed</h3>
              <div className="space-y-3">
                {[
                  { company: 'QuickShip Logistics', action: 'Synced 245 packages', time: '2 minutes ago', type: 'sync' },
                  { company: 'Express Delivery', action: 'Delivered shipment EXP-2025-0456', time: '5 minutes ago', type: 'delivery' },
                  { company: 'QuickShip Logistics', action: 'API rate limit warning', time: '1 hour ago', type: 'alert' }
                ].map((activity, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${activity.type === 'sync' ? 'bg-blue-600' : activity.type === 'delivery' ? 'bg-green-600' : 'bg-yellow-600'}`} />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{activity.company}</p>
                      <p className="text-sm text-gray-600">{activity.action}</p>
                    </div>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* AI Balance Tab */}
        {activeTab === 'ai' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow p-8">
              <h2 className="text-3xl font-bold mb-4">🤖 AI-Powered Balance Management</h2>
              <p className="text-lg opacity-90">Automatic load balancing and optimization across all connected companies</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Intelligent Features</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Load Balancing</h4>
                  <p className="text-gray-600 mb-4">Automatically distribute shipments based on:</p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ Company capacity & utilization</li>
                    <li>✓ Geographic proximity</li>
                    <li>✓ Delivery performance history</li>
                    <li>✓ Account balance</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Dynamic Pricing</h4>
                  <p className="text-gray-600 mb-4">Intelligent pricing based on:</p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ Demand fluctuations</li>
                    <li>✓ Seasonal trends</li>
                    <li>✓ Route complexity</li>
                    <li>✓ Company tier</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Predictive Analytics</h4>
                  <p className="text-gray-600 mb-4">ML models predict:</p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ Delivery times</li>
                    <li>✓ Failure risks</li>
                    <li>✓ Resource needs</li>
                    <li>✓ Future demand</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Fraud Detection</h4>
                  <p className="text-gray-600 mb-4">Real-time detection of:</p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ Suspicious activity</li>
                    <li>✓ Unusual patterns</li>
                    <li>✓ Rate limit abuse</li>
                    <li>✓ Balance anomalies</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Balance Distribution Simulation</h3>
              <div className="space-y-4">
                {companies.map(company => (
                  <div key={company.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-semibold text-gray-900">{company.name}</p>
                      <p className="text-sm text-gray-600">Current: ${company.balance.toFixed(2)}</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full" style={{ width: `${Math.min((company.balance / 5000) * 100, 100)}%` }} />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">AI Recommendation: Maintain current balance • Load: {Math.round((company.shipmentsUsed / company.shipmentQuota) * 100)}%</p>
                  </div>
                ))}
              </div>
              <button className="mt-6 w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                Run Auto-Balance
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
