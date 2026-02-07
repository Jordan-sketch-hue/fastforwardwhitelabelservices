'use client'

import { useState } from 'react'
import { Box, BarChart3, AlertCircle, CheckCircle, Inbox, TrendingUp, Calendar, Users } from 'lucide-react'
import Link from 'next/link'

export default function WarehouseDashboard() {
  const stats = [
    { label: 'Inventory Items', value: '1,245', change: '+45', icon: Box, color: 'bg-purple-100 text-purple-600' },
    { label: 'Receivals Today', value: '23', change: '+8', icon: Inbox, color: 'bg-blue-100 text-blue-600' },
    { label: 'Low Stock Alerts', value: '7', change: '+2', icon: AlertCircle, color: 'bg-red-100 text-red-600' },
    { label: 'Ready to Ship', value: '156', change: '+12', icon: CheckCircle, color: 'bg-green-100 text-green-600' }
  ]

  const recentActivities = [
    { id: 1, type: 'received', message: 'Received shipment SHP-2025-0450 (45 items)', time: '1 hour ago', icon: CheckCircle },
    { id: 2, type: 'packed', message: '320 packages packed and labeled', time: '3 hours ago', icon: Box },
    { id: 3, type: 'alert', message: 'Low stock alert: Item SKU-1024', time: '5 hours ago', icon: AlertCircle },
    { id: 4, type: 'report', message: 'Daily inventory report generated', time: '1 day ago', icon: Calendar }
  ]

  const lowStockItems = [
    { sku: 'SKU-1024', name: 'Standard Box (Medium)', current: 15, threshold: 50, location: 'Rack A-12' },
    { sku: 'SKU-1025', name: 'Bubble Wrap (Roll)', current: 8, threshold: 30, location: 'Shelf B-05' },
    { sku: 'SKU-1026', name: 'Shipping Labels', current: 22, threshold: 100, location: 'Desk C-01' },
    { sku: 'SKU-1027', name: 'Packing Tape', current: 3, threshold: 20, location: 'Storage D-03' }
  ]

  const todayReceivingSchedule = [
    { id: 1, from: 'Supplier A Inc.', items: 120, expectedTime: '10:00 AM', status: 'received' },
    { id: 2, from: 'Supplier B Corp', items: 85, expectedTime: '2:00 PM', status: 'in-transit' },
    { id: 3, from: 'Supplier C Ltd.', items: 240, expectedTime: '4:30 PM', status: 'scheduled' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, Alex! 📦</h1>
              <p className="text-gray-600">Warehouse Management Platform • February 7, 2026</p>
            </div>
            <div className="flex gap-4">
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                <BarChart3 className="w-4 h-4 inline mr-2" />
                Inventory Report
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
                  <p className={`text-sm mt-2 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} today
                  </p>
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
          {/* Today's Receiving Schedule */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow mb-8">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Today's Receiving Schedule</h2>
                <Link href="/dashboard/receivals" className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                  Full Schedule
                </Link>
              </div>

              <div className="divide-y divide-gray-200">
                {todayReceivingSchedule.map((shipment) => (
                  <div key={shipment.id} className="p-6 hover:bg-gray-50 transition border-l-4 border-transparent hover:border-blue-600">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="font-semibold text-gray-900">{shipment.from}</p>
                        <p className="text-sm text-gray-600">{shipment.items} items</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        shipment.status === 'received'
                          ? 'bg-green-100 text-green-700'
                          : shipment.status === 'in-transit'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {shipment.status === 'received' ? 'Received' : shipment.status === 'in-transit' ? 'In Transit' : 'Scheduled'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Expected: {shipment.expectedTime}</p>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <Link href="/dashboard/receivals" className="w-full py-2 text-center text-blue-600 font-semibold hover:text-blue-700">
                  Manage Receivals
                </Link>
              </div>
            </div>

            {/* Low Stock Alerts */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200 bg-red-50">
                <h2 className="text-xl font-bold text-red-900 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Low Stock Alerts
                </h2>
              </div>

              <div className="divide-y divide-gray-200">
                {lowStockItems.map((item) => (
                  <div key={item.sku} className="p-6 hover:bg-gray-50 transition">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">{item.sku} • {item.location}</p>
                      </div>
                      <span className="text-red-600 font-bold">{item.current} items</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-600 h-2 rounded-full" 
                        style={{ width: `${(item.current / item.threshold) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-2">Threshold: {item.threshold} items</p>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-blue-50 border-t border-gray-200">
                <button className="text-blue-600 text-sm font-semibold hover:text-blue-700">
                  → Request Purchase Order
                </button>
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
                      activity.type === 'received'
                        ? 'text-green-600'
                        : activity.type === 'packed'
                        ? 'text-blue-600'
                        : activity.type === 'alert'
                        ? 'text-red-600'
                        : 'text-orange-600'
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
                View All Activity →
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4 mt-8">
          {[
            { label: 'Receive Shipment', icon: Inbox, href: '/dashboard/receivals' },
            { label: 'Inventory Check', icon: Box, href: '/dashboard/packages' },
            { label: 'View Reports', icon: BarChart3, href: '/dashboard/reporting' },
            { label: 'Manage Team', icon: Users, href: '/dashboard/settings' }
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
