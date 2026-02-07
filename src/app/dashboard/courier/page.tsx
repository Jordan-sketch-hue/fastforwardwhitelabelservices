'use client'

import { useState } from 'react'
import { Package, Truck, Clock, CheckCircle, AlertCircle, MapPin, Calendar, DollarSign, Users } from 'lucide-react'
import Link from 'next/link'

export default function CourierDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview')

  const stats = [
    { label: 'Today\'s Deliveries', value: '12', change: '+2', icon: Package, color: 'bg-blue-100 text-blue-600' },
    { label: 'Pending Pickups', value: '8', change: '+1', icon: Truck, color: 'bg-orange-100 text-orange-600' },
    { label: 'In Progress', value: '5', change: '-1', icon: Clock, color: 'bg-yellow-100 text-yellow-600' },
    { label: 'Completed', value: '24', change: '+3', icon: CheckCircle, color: 'bg-green-100 text-green-600' }
  ]

  const recentActivities = [
    { id: 1, type: 'delivered', message: 'Package FF-2025-0124 delivered', time: '2 hours ago', icon: CheckCircle },
    { id: 2, type: 'created', message: 'New shipment FF-2025-0125 created', time: '5 hours ago', icon: Package },
    { id: 3, type: 'report', message: 'Daily report generated', time: '1 day ago', icon: Calendar },
    { id: 4, type: 'api', message: 'API integration completed', time: '2 days ago', icon: Truck }
  ]

  const todayDeliveries = [
    {
      id: 'FF-2025-0120',
      customer: 'John Smith',
      destination: 'Downtown NYC',
      status: 'in-transit',
      distance: '3.2 km',
      expectedTime: '2:30 PM'
    },
    {
      id: 'FF-2025-0121',
      customer: 'Sarah Johnson',
      destination: 'Midtown Manhattan',
      status: 'in-transit',
      distance: '1.8 km',
      expectedTime: '1:45 PM'
    },
    {
      id: 'FF-2025-0122',
      customer: 'Mike Davis',
      destination: 'Upper East Side',
      status: 'pending',
      distance: '5.4 km',
      expectedTime: '3:15 PM'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, Sarah! 🚀</h1>
              <p className="text-gray-600">Courier Platform • February 7, 2026</p>
            </div>
            <div className="flex gap-4">
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                <Calendar className="w-4 h-4 inline mr-2" />
                Today's Schedule
              </button>
              <Link
                href="/dashboard/settings"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Settings
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-lg shadow p-6 border-l-4 border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-green-600 text-sm mt-2">{stat.change} this month</p>
                </div>
                <div className={`${stat.color} p-4 rounded-lg`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Today's Deliveries */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Today's Deliveries</h2>
                <Link href="/dashboard/packages" className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                  View All
                </Link>
              </div>

              <div className="divide-y divide-gray-200">
                {todayDeliveries.map((delivery) => (
                  <div key={delivery.id} className="p-6 hover:bg-gray-50 transition cursor-pointer border-l-4 border-transparent hover:border-blue-600">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="font-semibold text-gray-900">{delivery.id}</p>
                        <p className="text-sm text-gray-600">{delivery.customer}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        delivery.status === 'in-transit'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {delivery.status === 'in-transit' ? 'In Transit' : 'Pending'}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {delivery.destination}
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock className="w-4 h-4 text-gray-400" />
                        {delivery.expectedTime}
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Truck className="w-4 h-4 text-gray-400" />
                        {delivery.distance} away
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <Link href="/dashboard/packages" className="w-full py-2 text-center text-blue-600 font-semibold hover:text-blue-700">
                  Load Route
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            </div>

            <div className="divide-y divide-gray-200">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="p-4 hover:bg-gray-50 transition">
                  <div className="flex gap-4">
                    <div className={`mt-1 ${
                      activity.type === 'delivered'
                        ? 'text-green-600'
                        : activity.type === 'created'
                        ? 'text-blue-600'
                        : activity.type === 'report'
                        ? 'text-orange-600'
                        : 'text-purple-600'
                    }`}>
                      <activity.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-blue-50 border-t border-gray-200">
              <Link href="/dashboard/help" className="text-blue-600 text-sm font-semibold hover:text-blue-700">
                Need Help? → Check Help Center
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4 mt-8">
          {[
            { label: 'Start Route', icon: Truck, href: '/dashboard/packages' },
            { label: 'View Transactions', icon: DollarSign, href: '/dashboard/transactions' },
            { label: 'My Customers', icon: Users, href: '/dashboard/customers' },
            { label: 'Upload Report', icon: Calendar, href: '/dashboard/reporting' }
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition flex items-center gap-3"
            >
              <action.icon className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-900">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
