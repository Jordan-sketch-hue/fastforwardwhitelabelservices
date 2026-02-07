'use client'

import { useState } from 'react'
import { Calendar, CheckCircle, Clock, Inbox, AlertCircle, Plus, Download } from 'lucide-react'

interface Receivable {
  id: string
  supplier: string
  trackingNumber: string
  items: number
  weight: number
  status: 'received' | 'in-transit' | 'scheduled' | 'delayed'
  expectedDate: string
  actualDate?: string
  location: string
  notes: string
}

export default function ReceivalsPage() {
  const [statusFilter, setStatusFilter] = useState('all')
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list')

  const receivals: Receivable[] = [
    {
      id: '1',
      supplier: 'Supplier A Inc.',
      trackingNumber: 'SHIP-SPA-001',
      items: 120,
      weight: 450.5,
      status: 'received',
      expectedDate: '2025-02-07 10:00 AM',
      actualDate: '2025-02-07 09:45 AM',
      location: 'Zone A - Rack 12',
      notes: 'All items inspected and verified'
    },
    {
      id: '2',
      supplier: 'Supplier B Corp',
      trackingNumber: 'SHIP-SBC-002',
      items: 85,
      weight: 320.2,
      status: 'in-transit',
      expectedDate: '2025-02-07 2:00 PM',
      location: 'In transit',
      notes: 'En route, GPS tracking active'
    },
    {
      id: '3',
      supplier: 'Supplier C Ltd.',
      trackingNumber: 'SHIP-SCL-003',
      items: 240,
      weight: 680.0,
      status: 'scheduled',
      expectedDate: '2025-02-07 4:30 PM',
      location: 'Scheduled',
      notes: 'Warehouse space reserved'
    },
    {
      id: '4',
      supplier: 'Supplier D Solutions',
      trackingNumber: 'SHIP-SDS-004',
      items: 95,
      weight: 380.1,
      status: 'delayed',
      expectedDate: '2025-02-06 11:00 AM',
      location: 'En route',
      notes: 'Delayed due to traffic - ETA now 3:00 PM'
    },
    {
      id: '5',
      supplier: 'Supplier A Inc.',
      trackingNumber: 'SHIP-SPA-005',
      items: 150,
      weight: 520.3,
      status: 'received',
      expectedDate: '2025-02-06 2:00 PM',
      actualDate: '2025-02-06 2:15 PM',
      location: 'Zone B - Shelf 05',
      notes: 'Some items damaged - insurance claim filed'
    }
  ]

  const stats = [
    { label: 'Total Items Received', value: '690', icon: CheckCircle, color: 'bg-green-100 text-green-600' },
    { label: 'In Transit', value: '85', icon: Clock, color: 'bg-blue-100 text-blue-600' },
    { label: 'Scheduled Today', value: '240', icon: Calendar, color: 'bg-orange-100 text-orange-600' },
    { label: 'Delayed', value: '1', icon: AlertCircle, color: 'bg-red-100 text-red-600' }
  ]

  const filteredReceivables = receivals.filter(r => 
    statusFilter === 'all' || r.status === statusFilter
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'received':
        return 'bg-green-100 text-green-700'
      case 'in-transit':
        return 'bg-blue-100 text-blue-700'
      case 'scheduled':
        return 'bg-gray-100 text-gray-700'
      case 'delayed':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'received':
        return <CheckCircle className="w-4 h-4" />
      case 'in-transit':
        return <Clock className="w-4 h-4" />
      case 'scheduled':
        return <Calendar className="w-4 h-4" />
      case 'delayed':
        return <AlertCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Receivals</h1>
          <p className="text-gray-600">Manage incoming shipments and inventory</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-4 rounded-lg`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  statusFilter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter('received')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  statusFilter === 'received'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Received
              </button>
              <button
                onClick={() => setStatusFilter('in-transit')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  statusFilter === 'in-transit'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                In Transit
              </button>
              <button
                onClick={() => setStatusFilter('scheduled')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  statusFilter === 'scheduled'
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Scheduled
              </button>
              <button
                onClick={() => setStatusFilter('delayed')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  statusFilter === 'delayed'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Delayed
              </button>
            </div>

            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Receivable
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Receivables List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Supplier</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Tracking</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Items</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Weight</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Expected/Actual</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Location</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredReceivables.map((receivable) => (
                  <tr key={receivable.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{receivable.supplier}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{receivable.trackingNumber}</td>
                    <td className="px-6 py-4 text-gray-600">{receivable.items}</td>
                    <td className="px-6 py-4 text-gray-600">{receivable.weight} kg</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 w-fit ${getStatusColor(receivable.status)}`}>
                        {getStatusIcon(receivable.status)}
                        {receivable.status.charAt(0).toUpperCase() + receivable.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <p>Expected: {receivable.expectedDate}</p>
                      {receivable.actualDate && (
                        <p className="text-green-600">Received: {receivable.actualDate}</p>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{receivable.location}</td>
                    <td className="px-6 py-4">
                      {receivable.status === 'received' ? (
                        <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                          View Details
                        </button>
                      ) : receivable.status === 'delayed' ? (
                        <button className="text-orange-600 hover:text-orange-700 font-semibold text-sm">
                          Alert
                        </button>
                      ) : (
                        <button className="text-gray-600 hover:text-gray-700 font-semibold text-sm">
                          Track
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Info */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <Inbox className="w-5 h-5" />
              Today's Receiving Schedule
            </h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• 10:00 AM - Supplier A Inc. (120 items)</li>
              <li>• 2:00 PM - Supplier B Corp (85 items)</li>
              <li>• 4:30 PM - Supplier C Ltd. (240 items)</li>
            </ul>
          </div>

          <div className="bg-red-50 rounded-lg p-6 border border-red-200">
            <h3 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Delayed Shipments
            </h3>
            <ul className="space-y-2 text-sm text-red-800">
              <li>• SHIP-SDS-004: Expected 11:00 AM, now ETA 3:00 PM</li>
              <li>Note: Due to traffic congestion on route 495</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
