'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Download, TrendingUp, Package, DollarSign, Calendar, Filter } from 'lucide-react'

export default function Analytics() {
  const [dateRange, setDateRange] = useState('30days')
  const [platform, setPlatform] = useState('all')

  const stats = [
    { label: 'Total Shipments', value: '2,450', change: '+12.5%', icon: Package, color: 'purple' },
    { label: 'Revenue', value: '$45,230', change: '+8.2%', icon: DollarSign, color: 'green' },
    { label: 'Avg Delivery Time', value: '2.3 days', change: '-5%', icon: TrendingUp, color: 'blue' },
    { label: 'Customer Satisfaction', value: '4.8/5.0', change: '+0.2%', icon: TrendingUp, color: 'orange' }
  ]

  const chartData = [
    { date: 'Feb 1', shipments: 120, revenue: 2400 },
    { date: 'Feb 5', shipments: 145, revenue: 3200 },
    { date: 'Feb 10', shipments: 165, revenue: 4100 },
    { date: 'Feb 15', shipments: 210, revenue: 5200 },
    { date: 'Feb 20', shipments: 185, revenue: 4800 },
    { date: 'Feb 25', shipments: 195, revenue: 5100 },
    { date: 'Feb 28', shipments: 230, revenue: 6200 }
  ]

  return (
    <>
      <Navigation />
      
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Analytics & Reports</h1>
              <p className="text-gray-600 mt-2">Track your business performance</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-lg hover:shadow-lg transition">
              <Download size={18} />
              Export Report
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow p-4 mb-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-gray-600" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
                <option value="ytd">Year to date</option>
                <option value="custom">Custom range</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-600" />
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
              >
                <option value="all">All Platforms</option>
                <option value="courier">Courier Service</option>
                <option value="warehouse">Warehouse</option>
              </select>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon
              const colorClasses = {
                purple: 'from-purple-600 to-purple-400',
                green: 'from-green-600 to-green-400',
                blue: 'from-blue-600 to-blue-400',
                orange: 'from-orange-600 to-orange-400'
              }
              return (
                <div key={i} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClasses[stat.color as keyof typeof colorClasses]} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-green-600">{stat.change}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
              )
            })}
          </div>

          {/* Charts Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Shipments Trend */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Shipments Trend</h2>
              <div className="h-64 flex items-end gap-2 justify-between">
                {chartData.map((data, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t" style={{ height: `${(data.shipments / 230) * 100}%` }} />
                    <p className="text-xs text-gray-600 mt-2">{data.date}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">Total: <span className="font-bold text-gray-900">1,250 shipments</span></p>
              </div>
            </div>

            {/* Revenue Trend */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Revenue Trend</h2>
              <div className="h-64 flex items-end gap-2 justify-between">
                {chartData.map((data, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t" style={{ height: `${(data.revenue / 6200) * 100}%` }} />
                    <p className="text-xs text-gray-600 mt-2">${(data.revenue / 1000).toFixed(1)}k</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">Total: <span className="font-bold text-gray-900">$31,000</span></p>
              </div>
            </div>
          </div>

          {/* Top Routes */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Top Routes</h2>
              <div className="space-y-4">
                {[
                  { route: 'NY to CA', shipments: 450, revenue: 12000 },
                  { route: 'TX to FL', shipments: 320, revenue: 8500 },
                  { route: 'CA to WA', shipments: 280, revenue: 7200 },
                  { route: 'IL to OH', shipments: 210, revenue: 5600 }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">{item.route}</p>
                      <p className="text-sm text-gray-600">{item.shipments} shipments</p>
                    </div>
                    <p className="font-bold text-gray-900">${(item.revenue / 1000).toFixed(1)}k</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Shipment Status Breakdown</h2>
              <div className="space-y-4">
                {[
                  { status: 'Delivered', count: 1800, percent: 73 },
                  { status: 'In Transit', count: 450, percent: 18 },
                  { status: 'Pending', count: 150, percent: 6 },
                  { status: 'Returned', count: 50, percent: 3 }
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-gray-900">{item.status}</p>
                      <p className="text-sm text-gray-600">{item.count} ({item.percent}%)</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-600 to-orange-500 h-2 rounded-full" style={{ width: `${item.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
