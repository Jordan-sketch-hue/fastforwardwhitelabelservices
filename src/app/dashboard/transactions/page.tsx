'use client'

import { useState } from 'react'
import { Search, Download, Filter, DollarSign, TrendingUp, Calendar } from 'lucide-react'

interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  type: 'credit' | 'debit'
  category: 'delivery' | 'refund' | 'payment' | 'fee' | 'bonus'
  status: 'completed' | 'pending' | 'failed'
  reference: string
}

export default function TransactionsPage() {
  const [dateRange, setDateRange] = useState('30days')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const transactions: Transaction[] = [
    {
      id: '1',
      date: '2025-02-07',
      description: 'Delivery Fee - Order #FF-2025-0120',
      amount: 15.50,
      type: 'credit',
      category: 'delivery',
      status: 'completed',
      reference: 'DEL-001'
    },
    {
      id: '2',
      date: '2025-02-07',
      description: 'Platform Fee',
      amount: 2.50,
      type: 'debit',
      category: 'fee',
      status: 'completed',
      reference: 'FEE-001'
    },
    {
      id: '3',
      date: '2025-02-06',
      description: 'Refund - Customer Return',
      amount: 12.00,
      type: 'debit',
      category: 'refund',
      status: 'completed',
      reference: 'REF-001'
    },
    {
      id: '4',
      date: '2025-02-06',
      description: 'Monthly Bonus',
      amount: 50.00,
      type: 'credit',
      category: 'bonus',
      status: 'pending',
      reference: 'BON-001'
    },
    {
      id: '5',
      date: '2025-02-05',
      description: 'Deposit - Bank Transfer',
      amount: 500.00,
      type: 'credit',
      category: 'payment',
      status: 'completed',
      reference: 'PAY-001'
    },
    {
      id: '6',
      date: '2025-02-05',
      description: 'Withdrawal to Account',
      amount: 300.00,
      type: 'debit',
      category: 'payment',
      status: 'completed',
      reference: 'WITH-001'
    }
  ]

  const stats = [
    { label: 'Total Balance', value: '$1,245.75', trend: '+$125.50', icon: DollarSign, color: 'bg-green-100 text-green-600' },
    { label: 'This Month', value: '$423.50', trend: '+18%', icon: TrendingUp, color: 'bg-blue-100 text-blue-600' },
    { label: 'Pending', value: '$50.00', trend: '2 transactions', icon: Calendar, color: 'bg-yellow-100 text-yellow-600' }
  ]

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = searchQuery === '' || 
      tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.reference.includes(searchQuery)
    const matchesCategory = categoryFilter === 'all' || tx.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const totalCredits = filteredTransactions
    .filter(tx => tx.type === 'credit')
    .reduce((sum, tx) => sum + tx.amount, 0)

  const totalDebits = filteredTransactions
    .filter(tx => tx.type === 'debit')
    .reduce((sum, tx) => sum + tx.amount, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600">View and manage all financial transactions</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-green-600 text-sm mt-2">{stat.trend}</p>
                </div>
                <div className={`${stat.color} p-4 rounded-lg`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="all">All Time</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="delivery">Delivery</option>
                <option value="refund">Refund</option>
                <option value="payment">Payment</option>
                <option value="fee">Fee</option>
                <option value="bonus">Bonus</option>
              </select>
            </div>

            <div className="flex gap-2 items-end">
              <div className="flex-1 relative">
                <label className="block text-sm font-medium text-gray-900 mb-2">Search</label>
                <Search className="absolute left-3 top-10 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Reference or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="grid md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-gray-600 mb-1">Total Credits</p>
              <p className="text-2xl font-bold text-green-600">+${totalCredits.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-sm text-gray-600 mb-1">Total Debits</p>
              <p className="text-2xl font-bold text-red-600">-${totalDebits.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Description</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Reference</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-600">{tx.date}</td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{tx.description}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{tx.reference}</td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 capitalize">
                        {tx.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-semibold text-lg ${tx.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                        {tx.type === 'credit' ? '+' : '-'}${tx.amount.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        tx.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : tx.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-gray-600">No transactions found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
