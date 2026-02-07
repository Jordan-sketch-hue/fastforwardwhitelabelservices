'use client'

import { useState } from 'react'
import { Search, Filter, MapPin, Calendar, DollarSign, CheckCircle, Clock, AlertCircle, Download } from 'lucide-react'

interface Package {
  id: string
  trackingNumber: string
  customer: string
  origin: string
  destination: string
  status: 'pending' | 'in-transit' | 'delivered' | 'failed'
  weight: number
  createdDate: string
  expectedDelivery: string
  cost: number
}

export default function PackagesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('recent')

  const packages: Package[] = [
    {
      id: '1',
      trackingNumber: 'FF-2025-0120',
      customer: 'John Smith',
      origin: 'Warehouse NYC',
      destination: 'Downtown Manhattan',
      status: 'in-transit',
      weight: 2.5,
      createdDate: '2025-02-07',
      expectedDelivery: '2025-02-07 2:30 PM',
      cost: 15.50
    },
    {
      id: '2',
      trackingNumber: 'FF-2025-0121',
      customer: 'Sarah Johnson',
      origin: 'Warehouse NYC',
      destination: 'Midtown Manhattan',
      status: 'delivered',
      weight: 1.8,
      createdDate: '2025-02-07',
      expectedDelivery: '2025-02-07 1:15 PM',
      cost: 12.00
    },
    {
      id: '3',
      trackingNumber: 'FF-2025-0122',
      customer: 'Mike Davis',
      origin: 'Warehouse NYC',
      destination: 'Upper East Side',
      status: 'pending',
      weight: 3.2,
      createdDate: '2025-02-07',
      expectedDelivery: '2025-02-07 3:45 PM',
      cost: 18.75
    },
    {
      id: '4',
      trackingNumber: 'FF-2025-0119',
      customer: 'Emma Wilson',
      origin: 'Warehouse NYC',
      destination: 'Brooklyn',
      status: 'failed',
      weight: 4.1,
      createdDate: '2025-02-06',
      expectedDelivery: '2025-02-07',
      cost: 22.50
    },
    {
      id: '5',
      trackingNumber: 'FF-2025-0118',
      customer: 'David Brown',
      origin: 'Warehouse NYC',
      destination: 'Queens',
      status: 'delivered',
      weight: 2.0,
      createdDate: '2025-02-06',
      expectedDelivery: '2025-02-06 4:00 PM',
      cost: 14.25
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700'
      case 'in-transit':
        return 'bg-blue-100 text-blue-700'
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'failed':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />
      case 'in-transit':
        return <Clock className="w-4 h-4" />
      case 'pending':
        return <AlertCircle className="w-4 h-4" />
      case 'failed':
        return <AlertCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch =
      pkg.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.customer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || pkg.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Packages</h1>
          <p className="text-gray-600">Manage all packages and shipments</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Controls */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by tracking number or customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-transit">In Transit</option>
                <option value="delivered">Delivered</option>
                <option value="failed">Failed</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest</option>
                <option value="cost">Highest Cost</option>
              </select>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-600 mb-1">Total Packages</p>
              <p className="text-2xl font-bold text-gray-900">{packages.length}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-gray-600 mb-1">In Transit</p>
              <p className="text-2xl font-bold text-blue-600">{packages.filter(p => p.status === 'in-transit').length}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-xs text-gray-600 mb-1">Delivered</p>
              <p className="text-2xl font-bold text-green-600">{packages.filter(p => p.status === 'delivered').length}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg border border-red-200">
              <p className="text-xs text-gray-600 mb-1">Failed/Issues</p>
              <p className="text-2xl font-bold text-red-600">{packages.filter(p => p.status === 'failed').length}</p>
            </div>
          </div>
        </div>

        {/* Packages Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Tracking</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Route</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Weight</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Expected</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Cost</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPackages.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{pkg.trackingNumber}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{pkg.customer}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        <p className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {pkg.origin}
                        </p>
                        <p className="flex items-center gap-1 text-gray-500">
                          → {pkg.destination}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 w-fit ${getStatusColor(pkg.status)}`}>
                        {getStatusIcon(pkg.status)}
                        {pkg.status.charAt(0).toUpperCase() + pkg.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{pkg.weight} kg</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{pkg.expectedDelivery}</td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900 flex items-center gap-1">
                        <DollarSign className="w-4 h-4" /> {pkg.cost.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                        Track
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPackages.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-gray-600">No packages found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
