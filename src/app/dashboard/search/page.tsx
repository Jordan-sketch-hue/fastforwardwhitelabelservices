'use client'

import { useState } from 'react'
import { Search, Filter, X, MapPin, Package, Calendar, DollarSign, User } from 'lucide-react'

interface SearchResult {
  id: string
  type: 'shipment' | 'customer' | 'invoice'
  title: string
  subtitle: string
  date: string
  status: string
  icon: React.ReactNode
  details?: Record<string, string>
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'shipment' | 'customer' | 'invoice'>('all')
  const [dateRange, setDateRange] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const [searched, setSearched] = useState(false)

  // Mock search results
  const mockResults: SearchResult[] = [
    {
      id: 'SHP-2025-001',
      type: 'shipment',
      title: 'SHP-2025-001',
      subtitle: 'NYC → Los Angeles',
      date: 'Feb 6, 2025',
      status: 'In Transit',
      icon: <Package className="w-5 h-5" />,
      details: { weight: '15.2 kg', carrier: 'FastForward Express', value: '$450' }
    },
    {
      id: 'SHP-2025-002',
      type: 'shipment',
      title: 'SHP-2025-002',
      subtitle: 'Boston → Miami',
      date: 'Feb 5, 2025',
      status: 'Delivered',
      icon: <Package className="w-5 h-5" />,
      details: { weight: '8.5 kg', carrier: 'FastForward Standard', value: '$280' }
    },
    {
      id: 'CUST-456',
      type: 'customer',
      title: 'TechCorp Industries',
      subtitle: 'customer@techcorp.com',
      date: 'Member since Jan 2024',
      status: 'Active',
      icon: <User className="w-5 h-5" />,
      details: { totalShipments: '245', spent: '$12,450', tier: 'Premium' }
    },
    {
      id: 'INV-2025-0034',
      type: 'invoice',
      title: 'INV-2025-0034',
      subtitle: 'February 2025 Statement',
      date: 'Feb 1, 2025',
      status: 'Paid',
      icon: <DollarSign className="w-5 h-5" />,
      details: { amount: '$2,340.50', items: '12 shipments', dueDate: 'Feb 15, 2025' }
    },
    {
      id: 'SHP-2025-003',
      type: 'shipment',
      title: 'SHP-2025-003',
      subtitle: 'Seattle → San Francisco',
      date: 'Feb 4, 2025',
      status: 'Pending',
      icon: <Package className="w-5 h-5" />,
      details: { weight: '22.0 kg', carrier: 'FastForward Express', value: '$580' }
    }
  ]

  const handleSearch = () => {
    setSearched(true)
    
    // Filter results based on search query and filters
    let filtered = mockResults.filter(result => {
      const matchesQuery = searchQuery === '' || 
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesType = filterType === 'all' || result.type === filterType
      const matchesStatus = statusFilter === 'all' || result.status.toLowerCase() === statusFilter.toLowerCase()
      
      return matchesQuery && matchesType && matchesStatus
    })

    // Apply date range filter
    if (dateRange !== 'all') {
      const today = new Date()
      const pastDate = new Date()
      
      switch(dateRange) {
        case '7days':
          pastDate.setDate(today.getDate() - 7)
          break
        case '30days':
          pastDate.setDate(today.getDate() - 30)
          break
        case '90days':
          pastDate.setDate(today.getDate() - 90)
          break
      }
      
      // In real app, would filter by actual date comparison
    }

    setResults(filtered)
  }

  const getStatusColor = (status: string) => {
    const lowerStatus = status.toLowerCase()
    if (lowerStatus === 'delivered') return 'bg-green-100 text-green-800'
    if (lowerStatus === 'in transit') return 'bg-blue-100 text-blue-800'
    if (lowerStatus === 'pending') return 'bg-yellow-100 text-yellow-800'
    if (lowerStatus === 'active') return 'bg-green-100 text-green-800'
    if (lowerStatus === 'paid') return 'bg-green-100 text-green-800'
    return 'bg-gray-100 text-gray-800'
  }

  const getIconColor = (type: string) => {
    if (type === 'shipment') return 'bg-blue-100 text-blue-600'
    if (type === 'customer') return 'bg-purple-100 text-purple-600'
    if (type === 'invoice') return 'bg-green-100 text-green-600'
    return 'bg-gray-100 text-gray-600'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Advanced Search</h1>
          <p className="text-gray-600">Search shipments, customers, invoices, and more across your account</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex gap-3 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by shipment ID, customer name, invoice number, tracking number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Search
            </button>
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Advanced Filters */}
          {showAdvanced && (
            <div className="pt-4 border-t border-gray-200">
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search Type
                  </label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Types</option>
                    <option value="shipment">Shipments</option>
                    <option value="customer">Customers</option>
                    <option value="invoice">Invoices</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Statuses</option>
                    <option value="delivered">Delivered</option>
                    <option value="in transit">In Transit</option>
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Range
                  </label>
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Any Time</option>
                    <option value="7days">Last 7 Days</option>
                    <option value="30days">Last 30 Days</option>
                    <option value="90days">Last 90 Days</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setFilterType('all')
                      setStatusFilter('all')
                      setDateRange('all')
                      setResults([])
                      setSearched(false)
                    }}
                    className="w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search Tips */}
        {!searched && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Search Tips:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Use shipment IDs (SHP-2025-001), customer names, or invoice numbers</li>
              <li>• Combine filters for more precise results</li>
              <li>• Search by tracking number or destination city</li>
              <li>• Use date range to narrow down results</li>
            </ul>
          </div>
        )}

        {/* Results */}
        {searched && (
          <div>
            <div className="mb-4">
              <p className="text-gray-700">
                Found <span className="font-bold text-gray-900">{results.length}</span> results
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>

            {results.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSearched(false)
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  New Search
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {results.map((result) => (
                  <div
                    key={result.id}
                    className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition cursor-pointer border border-gray-200 hover:border-gray-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${getIconColor(result.type)}`}>
                        {result.icon}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{result.title}</h3>
                            <p className="text-sm text-gray-600">{result.subtitle}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                            {result.status}
                          </span>
                        </div>

                        {result.details && (
                          <div className="grid md:grid-cols-3 gap-4 mt-3 pt-3 border-t border-gray-100">
                            {Object.entries(result.details).map(([key, value]) => (
                              <div key={key}>
                                <p className="text-xs text-gray-600 capitalize">{key}</p>
                                <p className="text-sm font-medium text-gray-900">{value}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        <p className="text-xs text-gray-500 mt-3">{result.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Saved Searches */}
        {!searched && (
          <div className="mt-12 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Saved Searches</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { name: 'Recent Shipments', query: 'status:in transit' },
                { name: 'Pending Invoices', query: 'type:invoice status:pending' },
                { name: 'Premium Customers', query: 'tier:premium' }
              ].map((search, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSearchQuery(search.query)
                    setShowAdvanced(false)
                  }}
                  className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-left"
                >
                  <p className="font-medium text-gray-900">{search.name}</p>
                  <p className="text-sm text-gray-600 mt-1">{search.query}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
