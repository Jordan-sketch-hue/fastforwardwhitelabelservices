'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Eye, EyeOff, Copy, Check, Mail, Lock, Key, Users, Bell, Trash2 } from 'lucide-react'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [copied, setCopied] = useState(false)
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    department: 'Operations',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [emailPreferences, setEmailPreferences] = useState({
    shipmentUpdates: true,
    invoices: true,
    weeklyReport: true,
    systemAlerts: true,
    marketing: false
  })

  const apiKeys = [
    { id: '1', name: 'Production Key', key: 'sk_live_abc123def456...', created: '2024-12-15', lastUsed: '2 hours ago' },
    { id: '2', name: 'Development Key', key: 'sk_test_xyz789...', created: '2024-12-10', lastUsed: '1 day ago' }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleEmailPrefChange = (key: keyof typeof emailPreferences) => {
    setEmailPreferences(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <Navigation />
      
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Account Settings</h1>
            <p className="text-gray-600 mt-2">Manage your profile, security, and preferences</p>
          </div>

          {/* Tabs */}
          <div className="grid md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow sticky top-4">
                <nav className="space-y-0">
                  {[
                    { id: 'profile', label: 'Profile', icon: '👤' },
                    { id: 'password', label: 'Password & Security', icon: '🔒' },
                    { id: 'emails', label: 'Email Preferences', icon: '📧' },
                    { id: 'api', label: 'API Keys', icon: '🔑' },
                    { id: 'team', label: 'Team Members', icon: '👥' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left px-6 py-3 border-l-4 transition ${
                        activeTab === tab.id
                          ? 'border-purple-600 bg-purple-50 text-purple-600 font-semibold'
                          : 'border-transparent text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="mr-2">{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="md:col-span-3">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="bg-white rounded-lg shadow p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
                  
                  {/* Profile Picture */}
                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-gray-900 mb-4">Profile Picture</label>
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        JD
                      </div>
                      <div>
                        <button className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition">
                          Upload Photo
                        </button>
                        <p className="text-sm text-gray-500 mt-2">Max 5MB. JPG, PNG, or GIF.</p>
                      </div>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">Department</label>
                      <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
                        placeholder="e.g., Operations, Management"
                      />
                    </div>

                    <button className="w-full bg-gradient-to-r from-purple-600 to-orange-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {/* Password & Security Tab */}
              {activeTab === 'password' && (
                <div className="bg-white rounded-lg shadow p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Password & Security</h2>

                  {/* Change Password */}
                  <div className="mb-8 pb-8 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Lock size={20} /> Change Password
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Current Password</label>
                        <input
                          type="password"
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">New Password</label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Min. 8 characters, 1 uppercase, 1 number</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Confirm New Password</label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
                        />
                      </div>
                      <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                        Update Password
                      </button>
                    </div>
                  </div>

                  {/* Two-Factor Authentication */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Key size={20} /> Two-Factor Authentication
                    </h3>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p className="text-gray-700 mb-4">Add an extra layer of security to your account</p>
                      <button className="px-6 py-2 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition">
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Email Preferences Tab */}
              {activeTab === 'emails' && (
                <div className="bg-white rounded-lg shadow p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Mail size={24} /> Email Preferences
                  </h2>

                  <div className="space-y-4">
                    {[
                      { key: 'shipmentUpdates' as const, label: 'Shipment Updates', desc: 'Get notified when shipments change status' },
                      { key: 'invoices' as const, label: 'Invoice Notifications', desc: 'Receive invoices and payment reminders' },
                      { key: 'weeklyReport' as const, label: 'Weekly Report', desc: 'Summary of activity every Monday' },
                      { key: 'systemAlerts' as const, label: 'System Alerts', desc: 'Important system updates and maintenance' },
                      { key: 'marketing' as const, label: 'Marketing Emails', desc: 'Features, tips, and product news' }
                    ].map(pref => (
                      <div key={pref.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{pref.label}</p>
                          <p className="text-sm text-gray-600">{pref.desc}</p>
                        </div>
                        <button
                          onClick={() => handleEmailPrefChange(pref.key)}
                          className={`relative inline-flex w-12 h-6 rounded-full transition ${
                            emailPreferences[pref.key] ? 'bg-purple-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block w-5 h-5 bg-white rounded-full transform transition ${
                              emailPreferences[pref.key] ? 'translate-x-6' : 'translate-x-0.5'
                            } mt-0.5`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>

                  <button className="mt-8 w-full bg-gradient-to-r from-purple-600 to-orange-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition">
                    Save Preferences
                  </button>
                </div>
              )}

              {/* API Keys Tab */}
              {activeTab === 'api' && (
                <div className="bg-white rounded-lg shadow p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <Key size={24} /> API Keys
                    </h2>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                      Generate New Key
                    </button>
                  </div>

                  <div className="space-y-4">
                    {apiKeys.map(key => (
                      <div key={key.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="font-semibold text-gray-900">{key.name}</p>
                            <p className="text-sm text-gray-600">Created {key.created}</p>
                          </div>
                          <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                            Last used {key.lastUsed}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-50 p-3 rounded">
                          <code className="text-sm text-gray-700 flex-1">{key.key}</code>
                          <button
                            onClick={() => copyToClipboard(key.key)}
                            className="p-2 hover:bg-gray-200 rounded transition"
                          >
                            {copied ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-sm text-gray-600 mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    ⚠️ Keep your API keys secure. Never share them in public repositories or client-side code.
                  </p>
                </div>
              )}

              {/* Team Members Tab */}
              {activeTab === 'team' && (
                <div className="bg-white rounded-lg shadow p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <Users size={24} /> Team Members
                    </h2>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                      Invite Member
                    </button>
                  </div>

                  <div className="space-y-4">
                    {[
                      { name: 'Sarah Johnson', email: 'sarah@company.com', role: 'Admin', status: 'Active' },
                      { name: 'Mike Chen', email: 'mike@company.com', role: 'Manager', status: 'Active' },
                      { name: 'Emma Davis', email: 'emma@company.com', role: 'User', status: 'Pending' }
                    ].map((member, i) => (
                      <div key={i} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-gray-900">{member.name}</p>
                          <p className="text-sm text-gray-600">{member.email}</p>
                          <p className="text-sm text-purple-600 font-medium mt-1">{member.role}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            member.status === 'Active' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {member.status}
                          </span>
                          <button className="p-2 text-gray-400 hover:text-red-600 transition">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
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
