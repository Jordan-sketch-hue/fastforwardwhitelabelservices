'use client'

// Comprehensive demo data for both Courier and Warehouse platforms

export const DEMO_ACCOUNTS = {
  courier: {
    id: 'demo-courier-001',
    email: 'demo.courier@fastforward.com',
    password: 'DemoCourier@2025',
    firstName: 'Sarah',
    lastName: 'Johnson',
    companyName: 'FastCourier Express',
    plan: 'courier',
    industry: 'logistics',
    packageVolume: '500-1000',
    role: 'ACCOUNT_OWNER',
    stats: {
      totalPackages: 2450,
      inTransit: 845,
      delivered: 1605,
      revenue: 12450,
    },
    recentShipments: [
      {
        id: '1',
        trackingNumber: 'FF-2025-001234',
        destination: 'New York, NY',
        origin: 'Newark, NJ',
        status: 'in-transit',
        createdAt: '2 hours ago',
        weight: 5.5,
        contents: 'Electronics',
        value: 250,
        events: [
          { status: 'picked_up', location: 'Newark, NJ', timestamp: '2025-02-07T10:30:00Z', description: 'Package picked up' },
          { status: 'in_transit', location: 'Pennsylvania', timestamp: '2025-02-07T12:00:00Z', description: 'In transit to destination' },
        ]
      },
      {
        id: '2',
        trackingNumber: 'FF-2025-001233',
        destination: 'Los Angeles, CA',
        origin: 'Long Beach, CA',
        status: 'delivered',
        createdAt: '1 day ago',
        weight: 3.2,
        contents: 'Clothing',
        value: 150,
      },
      {
        id: '3',
        trackingNumber: 'FF-2025-001232',
        destination: 'Chicago, IL',
        origin: 'Milwaukee, WI',
        status: 'in-transit',
        createdAt: '3 days ago',
        weight: 7.8,
        contents: 'Furniture',
        value: 500,
      },
      {
        id: '4',
        trackingNumber: 'FF-2025-001231',
        destination: 'Houston, TX',
        origin: 'Dallas, TX',
        status: 'pending',
        createdAt: '5 days ago',
        weight: 2.1,
        contents: 'Documents',
        value: 75,
      },
    ]
  },
  warehouse: {
    id: 'demo-warehouse-001',
    email: 'demo.warehouse@fastforward.com',
    password: 'DemoWarehouse@2025',
    firstName: 'Michael',
    lastName: 'Chen',
    companyName: 'Advanced Logistics Hub',
    plan: 'warehouse',
    industry: 'manufacturing',
    packageVolume: '1000+',
    role: 'ACCOUNT_OWNER',
    warehouseLocation: 'Los Angeles, CA',
    stats: {
      totalPackages: 8900,
      inTransit: 3200,
      delivered: 5200,
      revenue: 89500,
      storageUtilization: 78,
      staffOnDuty: 24,
    },
    recentShipments: [
      {
        id: '1',
        trackingNumber: 'WH-2025-005678',
        destination: 'Seattle, WA',
        origin: 'Los Angeles Warehouse',
        status: 'picked-up',
        createdAt: '30 minutes ago',
        weight: 125.5,
        contents: 'Industrial Equipment',
        value: 5000,
        events: [
          { status: 'received', location: 'Los Angeles Warehouse', timestamp: '2025-02-07T08:00:00Z', description: 'Received at warehouse' },
          { status: 'sorted', location: 'Los Angeles Warehouse', timestamp: '2025-02-07T10:15:00Z', description: 'Sorted and prepared' },
          { status: 'picked_up', location: 'Los Angeles Warehouse', timestamp: '2025-02-07T14:45:00Z', description: 'Picked up by courier' },
        ]
      },
      {
        id: '2',
        trackingNumber: 'WH-2025-005677',
        destination: 'Portland, OR',
        origin: 'Los Angeles Warehouse',
        status: 'in-transit',
        createdAt: '8 hours ago',
        weight: 87.3,
        contents: 'Bulk Electronics',
        value: 3500,
      },
      {
        id: '3',
        trackingNumber: 'WH-2025-005676',
        destination: 'San Francisco, CA',
        origin: 'Los Angeles Warehouse',
        status: 'delivered',
        createdAt: '2 days ago',
        weight: 95.6,
        contents: 'Computer Parts',
        value: 4200,
      },
      {
        id: '4',
        trackingNumber: 'WH-2025-005675',
        destination: 'Phoenix, AZ',
        origin: 'Los Angeles Warehouse',
        status: 'in-transit',
        createdAt: '5 days ago',
        weight: 156.2,
        contents: 'Manufacturing Materials',
        value: 6800,
      },
    ]
  }
}

export const DEMO_API_KEYS = {
  courier: 'pk_demo_courier_5c8a9e2d1f4b6a3c7e9d2f5b8a1c4e7f',
  warehouse: 'pk_demo_warehouse_7a2e9d4c1f8b5a3e6c2d9f5a8b1e4c7'
}
