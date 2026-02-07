'use client'

import { useState } from 'react'
import { ChevronRight, CheckCircle, Users, Truck, BarChart3, Lock } from 'lucide-react'
import Link from 'next/link'

type SetupStep = 'welcome' | 'role' | 'company' | 'team' | 'complete'

interface SetupData {
  fullName: string
  email: string
  role: 'courier' | 'warehouse' | 'business' | ''
  companyName: string
  teamMembers: Array<{ email: string; role: string }>
}

export default function GetStartedPage() {
  const [currentStep, setCurrentStep] = useState<SetupStep>('welcome')
  const [setupData, setSetupData] = useState<SetupData>({
    fullName: '',
    email: '',
    role: '',
    companyName: '',
    teamMembers: []
  })
  const [newMemberEmail, setNewMemberEmail] = useState('')
  const [newMemberRole, setNewMemberRole] = useState('staff')

  const handleRoleSelect = (role: 'courier' | 'warehouse' | 'business') => {
    setSetupData({ ...setupData, role })
    setCurrentStep('company')
  }

  const handleAddTeamMember = () => {
    if (newMemberEmail) {
      setSetupData({
        ...setupData,
        teamMembers: [
          ...setupData.teamMembers,
          { email: newMemberEmail, role: newMemberRole }
        ]
      })
      setNewMemberEmail('')
      setNewMemberRole('staff')
    }
  }

  const removeTeamMember = (index: number) => {
    setSetupData({
      ...setupData,
      teamMembers: setupData.teamMembers.filter((_, i) => i !== index)
    })
  }

  const handleComplete = () => {
    localStorage.setItem('user_setup_complete', 'true')
    setCurrentStep('complete')
  }

  const steps: SetupStep[] = ['welcome', 'role', 'company', 'team', 'complete']
  const currentStepIndex = steps.indexOf(currentStep)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900">
      {/* Header */}
      <div className="bg-white bg-opacity-10 backdrop-blur-md border-b border-white border-opacity-10 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-white">LogisticsHub Setup</h1>
          <p className="text-blue-100">Get your account ready in 5 minutes</p>
        </div>
      </div>

      {/* Progress Bar */}
      {currentStep !== 'welcome' && currentStep !== 'complete' && (
        <div className="bg-white bg-opacity-5 border-b border-white border-opacity-10">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between gap-2">
              {steps.slice(1, 4).map((step, i) => (
                <div key={step} className="flex-1 flex items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition ${
                      i < currentStepIndex
                        ? 'bg-green-500 text-white'
                        : i === currentStepIndex
                        ? 'bg-white text-blue-600'
                        : 'bg-white bg-opacity-30 text-white'
                    }`}
                  >
                    {i < currentStepIndex ? <CheckCircle className="w-6 h-6" /> : i + 2}
                  </div>
                  {i < 2 && (
                    <div
                      className={`flex-1 h-1 transition ${
                        i < currentStepIndex ? 'bg-green-500' : 'bg-white bg-opacity-20'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-blue-100">
              <span>Role</span>
              <span>Company</span>
              <span>Team</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Welcome */}
        {currentStep === 'welcome' && (
          <div className="bg-white rounded-lg shadow-2xl p-12 animate-in fade-in duration-500">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome to LogisticsHub</h2>
              <p className="text-xl text-gray-600 max-w-lg mx-auto">
                The modern platform for managing shipments, tracking packages, and growing your logistics business
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                <Truck className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Real-time Tracking</h3>
                <p className="text-sm text-gray-600">Track all shipments live with GPS and delivery updates</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                <Users className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Team Collaboration</h3>
                <p className="text-sm text-gray-600">Manage teams, assign roles, and track activities</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
                <BarChart3 className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Advanced Analytics</h3>
                <p className="text-sm text-gray-600">Get insights into your operations with detailed reports</p>
              </div>
            </div>

            <button
              onClick={() => setCurrentStep('role')}
              className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg transition font-semibold text-lg flex items-center justify-center gap-2 group"
            >
              Start Setup <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </button>

            <p className="text-center text-gray-500 text-sm mt-6">
              Already have an account? <Link href="/dashboard" className="text-blue-600 hover:underline">Go to Dashboard</Link>
            </p>
          </div>
        )}

        {/* Role Selection */}
        {currentStep === 'role' && (
          <div className="bg-white rounded-lg shadow-2xl p-12 animate-in fade-in duration-500">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What describes you best?</h2>
            <p className="text-gray-600 mb-12">We'll customize your dashboard based on your role</p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  id: 'courier',
                  title: 'Courier',
                  description: 'I handle deliveries and pickups',
                  icon: <Truck className="w-10 h-10" />,
                  features: ['Track packages', 'Manage routes', 'Get assignments']
                },
                {
                  id: 'warehouse',
                  title: 'Warehouse',
                  description: 'I manage inventory and fulfillment',
                  icon: <Lock className="w-10 h-10" />,
                  features: ['Inventory tracking', 'Receive shipments', 'Quality control']
                },
                {
                  id: 'business',
                  title: 'Business/Shipper',
                  description: 'I send shipments regularly',
                  icon: <BarChart3 className="w-10 h-10" />,
                  features: ['Create shipments', 'View analytics', 'Manage billing']
                }
              ].map((role) => (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id as any)}
                  className={`p-6 rounded-lg border-2 transition text-left hover:shadow-lg ${
                    setupData.role === role.id
                      ? 'border-blue-600 bg-blue-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className={`mb-4 transition ${setupData.role === role.id ? 'text-blue-600' : 'text-gray-400'}`}>
                    {role.icon}
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{role.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{role.description}</p>
                  <ul className="space-y-2">
                    {role.features.map((feature) => (
                      <li key={feature} className="text-xs text-gray-600 flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setCurrentStep('welcome')}
                className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                Back
              </button>
            </div>
          </div>
        )}

        {/* Company Info */}
        {currentStep === 'company' && (
          <div className="bg-white rounded-lg shadow-2xl p-12 animate-in fade-in duration-500">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Let's set up your account</h2>
            <p className="text-gray-600 mb-8">Tell us a bit about yourself and your company</p>

            <form className="space-y-6 mb-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={setupData.fullName}
                    onChange={(e) => setSetupData({ ...setupData, fullName: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={setupData.email}
                    onChange={(e) => setSetupData({ ...setupData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  placeholder="Your Company Inc."
                  value={setupData.companyName}
                  onChange={(e) => setSetupData({ ...setupData, companyName: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition"
                />
              </div>
            </form>

            <div className="flex gap-3">
              <button
                onClick={() => setCurrentStep('role')}
                className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep('team')}
                className="flex-1 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg transition font-semibold flex items-center justify-center gap-2 group"
              >
                Next: Build Your Team <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>
            </div>
          </div>
        )}

        {/* Team Setup */}
        {currentStep === 'team' && (
          <div className="bg-white rounded-lg shadow-2xl p-12 animate-in fade-in duration-500">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Build your team</h2>
            <p className="text-gray-600 mb-8">Invite team members to collaborate (optional - you can skip this)</p>

            <div className="space-y-6 mb-8">
              {setupData.teamMembers.length > 0 && (
                <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                  <h3 className="font-semibold text-gray-900 mb-4">Team Members ({setupData.teamMembers.length})</h3>
                  <div className="space-y-3">
                    {setupData.teamMembers.map((member, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {member.email.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{member.email}</p>
                            <p className="text-xs text-gray-600 capitalize bg-gray-100 px-2 py-1 rounded w-fit">{member.role}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeTeamMember(i)}
                          className="text-red-600 hover:text-red-700 font-semibold text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Add Team Member</h3>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-900 mb-2">Email Address</label>
                    <input
                      type="email"
                      placeholder="colleague@example.com"
                      value={newMemberEmail}
                      onChange={(e) => setNewMemberEmail(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Role</label>
                    <select
                      value={newMemberRole}
                      onChange={(e) => setNewMemberRole(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition"
                    >
                      <option value="staff">Staff</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={handleAddTeamMember}
                  className="w-full px-4 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold flex items-center justify-center gap-2"
                >
                  <Users className="w-4 h-4" /> Add Team Member
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setCurrentStep('company')}
                className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                Back
              </button>
              <button
                onClick={handleComplete}
                className="flex-1 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition font-semibold flex items-center justify-center gap-2 group"
              >
                <CheckCircle className="w-5 h-5" /> Complete Setup
              </button>
              <button
                onClick={handleComplete}
                className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold"
                title="Skip team setup"
              >
                Skip
              </button>
            </div>
          </div>
        )}

        {/* Complete */}
        {currentStep === 'complete' && (
          <div className="bg-white rounded-lg shadow-2xl p-12 text-center animate-in fade-in duration-500">
            <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Setup Complete!</h2>
            <p className="text-xl text-gray-600 max-w-lg mx-auto mb-4">
              Welcome to LogisticsHub, {setupData.fullName}!
            </p>
            <p className="text-gray-600 mb-12">
              Your account is ready and {setupData.teamMembers.length > 0 ? `${setupData.teamMembers.length} team member${setupData.teamMembers.length > 1 ? 's' : ''} will receive invitations.` : 'you can add team members later.'}
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 mb-12 border border-blue-200">
              <div className="space-y-3">
                <div className="flex items-center gap-3 justify-center text-gray-900">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="font-medium">Account activated</span>
                </div>
                {setupData.teamMembers.length > 0 && (
                  <div className="flex items-center gap-3 justify-center text-gray-900">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <span className="font-medium">Team invitations sent</span>
                  </div>
                )}
                <div className="flex items-center gap-3 justify-center text-gray-900">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="font-medium">Dashboard ready for {setupData.role}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Link
                href="/dashboard"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg transition font-semibold flex items-center gap-2 group"
              >
                Go to Dashboard <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </Link>
              <Link
                href="/help"
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                View Help Center
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
