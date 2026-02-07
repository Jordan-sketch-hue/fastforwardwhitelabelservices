'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { CheckCircle, AlertCircle, Clock } from 'lucide-react'

export default function StatusPage() {
  const services = [
    {
      name: 'API Server',
      status: 'operational',
      uptime: '99.99%',
      lastUpdate: '2025-02-07'
    },
    {
      name: 'Dashboard',
      status: 'operational',
      uptime: '99.95%',
      lastUpdate: '2025-02-07'
    },
    {
      name: 'Package Tracking',
      status: 'operational',
      uptime: '99.99%',
      lastUpdate: '2025-02-07'
    },
    {
      name: 'Webhooks',
      status: 'operational',
      uptime: '99.90%',
      lastUpdate: '2025-02-07'
    },
    {
      name: 'Email Service',
      status: 'operational',
      uptime: '99.98%',
      lastUpdate: '2025-02-07'
    },
  ]

  const incidents = [
    {
      id: 1,
      title: 'Scheduled Maintenance',
      status: 'resolved',
      severity: 'low',
      startTime: '2025-02-05T02:00:00Z',
      endTime: '2025-02-05T03:00:00Z',
      description: 'Database optimization and backups'
    },
  ]

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'operational':
        return { bg: 'bg-green-100', text: 'text-green-800', icon: 'text-green-600' }
      case 'degraded':
        return { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: 'text-yellow-600' }
      case 'down':
        return { bg: 'bg-red-100', text: 'text-red-800', icon: 'text-red-600' }
      case 'resolved':
        return { bg: 'bg-blue-100', text: 'text-blue-800', icon: 'text-blue-600' }
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800', icon: 'text-gray-600' }
    }
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">System Status</h1>
            <p className="text-xl text-gray-600">
              Real-time status of FastForward services and infrastructure
            </p>
          </div>

          {/* Overall Status */}
          <div className="bg-white rounded-lg shadow p-8 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">All Systems Operational</h2>
                <p className="text-gray-600">Last updated: 5 minutes ago</p>
              </div>
            </div>
            <div className="flex gap-6 text-sm text-gray-600 pt-4 border-t border-gray-200">
              <div>
                <p className="font-semibold">Uptime (30 days)</p>
                <p>99.98%</p>
              </div>
              <div>
                <p className="font-semibold">Average Response</p>
                <p>142ms</p>
              </div>
              <div>
                <p className="font-semibold">Incidents (30 days)</p>
                <p>1</p>
              </div>
            </div>
          </div>

          {/* Services Status */}
          <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
            <div className="px-8 py-6 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">Service Status</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {services.map((service) => {
                const colors = getStatusColor(service.status)
                return (
                  <div key={service.name} className="px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition">
                    <div className="flex items-center gap-4 flex-1">
                      <CheckCircle className={`w-6 h-6 ${colors.icon}`} />
                      <div>
                        <p className="font-semibold text-gray-900">{service.name}</p>
                        <p className="text-sm text-gray-600">Uptime: {service.uptime}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${colors.bg} ${colors.text}`}>
                      {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Incidents */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">Recent Incidents</h3>
            </div>
            {incidents.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {incidents.map((incident) => {
                  const colors = getStatusColor(incident.status)
                  return (
                    <div key={incident.id} className="px-8 py-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg">{incident.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{incident.description}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${colors.bg} ${colors.text}`}>
                          {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                        </div>
                      </div>
                      <div className="flex gap-6 text-sm text-gray-600">
                        <div>
                          <p className="font-semibold">Started</p>
                          <p>{new Date(incident.startTime).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="font-semibold">Resolved</p>
                          <p>{new Date(incident.endTime).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="font-semibold">Duration</p>
                          <p>~1 hour</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="px-8 py-12 text-center text-gray-600">
                <p>No recent incidents. All systems running smoothly!</p>
              </div>
            )}
          </div>

          {/* Subscribe */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-blue-900 font-semibold mb-2">
              Want to be notified of status changes?
            </p>
            <p className="text-blue-800 text-sm mb-4">
              Subscribe to our status updates to get real-time notifications about service incidents and maintenance.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
              Subscribe to Updates
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
