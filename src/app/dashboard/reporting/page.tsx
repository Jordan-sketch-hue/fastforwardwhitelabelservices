'use client'

import { useState } from 'react'
import { Download, Calendar, BarChart3, TrendingUp, FileText, Filter } from 'lucide-react'

interface Report {
  id: string
  name: string
  type: 'performance' | 'financial' | 'activity' | 'custom'
  created: string
  period: string
  status: 'ready' | 'generating' | 'scheduled'
  size: string
}

export default function ReportingPage() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)

  const reports: Report[] = [
    {
      id: '1',
      name: 'Monthly Performance Report - January 2025',
      type: 'performance',
      created: '2025-02-01',
      period: 'January 2025',
      status: 'ready',
      size: '2.4 MB'
    },
    {
      id: '2',
      name: 'Financial Summary - January 2025',
      type: 'financial',
      created: '2025-02-01',
      period: 'January 2025',
      status: 'ready',
      size: '1.2 MB'
    },
    {
      id: '3',
      name: 'Daily Activity Report - Feb 7, 2025',
      type: 'activity',
      created: '2025-02-07',
      period: 'Feb 7, 2025',
      status: 'ready',
      size: '0.8 MB'
    },
    {
      id: '4',
      name: 'Quarterly Analysis Q1 2025',
      type: 'custom',
      created: '2025-02-05',
      period: 'Q1 2025',
      status: 'scheduled',
      size: '-'
    }
  ]

  const reportSummary = [
    { label: 'Total Deliveries', value: '2,450', trend: '+15.2%', icon: BarChart3 },
    { label: 'Revenue', value: '$45,230', trend: '+8.7%', icon: TrendingUp },
    { label: 'Avg Rating', value: '4.8/5', trend: '+0.2', icon: Calendar },
    { label: 'On-Time Rate', value: '96.3%', trend: '+2.1%', icon: FileText }
  ]

  const getReportIcon = (type: string) => {
    switch (type) {
      case 'performance':
        return <BarChart3 className="w-5 h-5 text-blue-600" />
      case 'financial':
        return <TrendingUp className="w-5 h-5 text-green-600" />
      case 'activity':
        return <Calendar className="w-5 h-5 text-orange-600" />
      default:
        return <FileText className="w-5 h-5 text-purple-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Reporting & Analytics</h1>
          <p className="text-gray-600">Generate and view detailed reports on your operations</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {reportSummary.map((item) => (
            <div key={item.label} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{item.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{item.value}</p>
                  <p className="text-green-600 text-sm mt-2">{item.trend}</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                  <item.icon className="w-6 h-6 text-gray-600" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Generate New Report */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Generate New Report</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Report Type</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Performance Report</option>
                <option>Financial Report</option>
                <option>Activity Report</option>
                <option>Custom Report</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Date Range</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
                <option>This Month</option>
                <option>Last Month</option>
                <option>This Year</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Format</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>PDF</option>
                <option>CSV</option>
                <option>Excel</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Include Sections</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Sections</option>
                <option>Summary Only</option>
                <option>Detailed Analysis</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Generate Report
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold">
              Schedule
            </button>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Recent Reports</h2>
            <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">View All</button>
          </div>

          <div className="divide-y divide-gray-200">
            {reports.map((report) => (
              <div
                key={report.id}
                onClick={() => setSelectedReport(report)}
                className="p-6 hover:bg-gray-50 transition cursor-pointer border-l-4 border-transparent hover:border-blue-600"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="mt-1">
                      {getReportIcon(report.type)}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{report.name}</p>
                      <div className="flex gap-4 mt-2">
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded capitalize">
                          {report.type}
                        </span>
                        <span className="text-xs text-gray-600">Period: {report.period}</span>
                        <span className="text-xs text-gray-600">Created: {report.created}</span>
                        {report.size !== '-' && (
                          <span className="text-xs text-gray-600">Size: {report.size}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      report.status === 'ready'
                        ? 'bg-green-100 text-green-700'
                        : report.status === 'generating'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {report.status === 'ready' ? 'Ready' : report.status === 'generating' ? 'Generating' : 'Scheduled'}
                    </span>
                    {report.status === 'ready' && (
                      <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scheduled Reports */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Scheduled Reports</h2>
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">Weekly Performance Report</p>
                <p className="text-sm text-gray-600">Every Monday at 9:00 AM • Email delivery</p>
              </div>
              <button className="text-red-600 hover:text-red-700 font-semibold text-sm">Cancel</button>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">Monthly Financial Report</p>
                <p className="text-sm text-gray-600">First day of each month at 8:00 AM • Email delivery</p>
              </div>
              <button className="text-red-600 hover:text-red-700 font-semibold text-sm">Cancel</button>
            </div>
          </div>

          <button className="mt-4 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold">
            + Add Scheduled Report
          </button>
        </div>
      </div>
    </div>
  )
}
