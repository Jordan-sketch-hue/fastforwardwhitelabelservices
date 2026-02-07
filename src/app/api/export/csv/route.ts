import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'

function generateCSV(data: any[], headers: string[]): string {
  const csvContent = [
    headers.join(','),
    ...data.map(row =>
      headers.map(header => {
        const value = row[header]
        // Escape commas and quotes in values
        return typeof value === 'string' && (value.includes(',') || value.includes('"'))
          ? `"${value.replace(/"/g, '""')}"`
          : value || ''
      }).join(',')
    )
  ].join('\n')

  return csvContent
}

// Export shipments
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const { type, filters } = await request.json()

    let data: any[] = []
    let filename = ''
    let headers: string[] = []

    if (type === 'shipments') {
      const shipments = await prisma.shipment.findMany({
        where: {
          company: {
            users: {
              some: {
                id: user.id
              }
            }
          }
        },
        include: {
          customer: true,
          packages: true,
          trackingEvents: true,
          invoice: true
        },
        orderBy: { createdAt: 'desc' }
      })

      headers = ['ID', 'Tracking Number', 'Customer', 'Status', 'Origin', 'Destination', 'Weight (kg)', 'Created At', 'Delivered At', 'Cost', 'Revenue']
      
      data = shipments.map((shipment: any) => ({
        'ID': shipment.id,
        'Tracking Number': shipment.trackingNumber,
        'Customer': shipment.customer?.name,
        'Status': shipment.status,
        'Origin': shipment.origin,
        'Destination': shipment.destination,
        'Weight (kg)': shipment.weight,
        'Created At': new Date(shipment.createdAt).toISOString(),
        'Delivered At': shipment.deliveredAt ? new Date(shipment.deliveredAt).toISOString() : '',
        'Cost': shipment.cost,
        'Revenue': shipment.revenue
      }))

      filename = `shipments_${new Date().toISOString().split('T')[0]}.csv`
    } else if (type === 'customers') {
      const customers = await prisma.customer.findMany({
        where: {
          companyId: user.companyId || undefined
        },
        include: {
          shipments: true
        }
      })

      headers = ['ID', 'Name', 'Email', 'Phone', 'Company', 'Total Shipments', 'Created At']
      
      data = customers.map((customer: any) => ({
        'ID': customer.id,
        'Name': customer.name,
        'Email': customer.email,
        'Phone': customer.phone,
        'Company': customer.company,
        'Total Shipments': customer.shipments.length,
        'Created At': new Date(customer.createdAt).toISOString()
      }))

      filename = `customers_${new Date().toISOString().split('T')[0]}.csv`
    } else if (type === 'invoices') {
      const invoices = await prisma.invoice.findMany({
        where: {
          company: {
            users: {
              some: {
                id: user.id
              }
            }
          }
        },
        include: {
          shipments: true
        },
        orderBy: { createdAt: 'desc' }
      })

      headers = ['ID', 'Invoice Number', 'Customer', 'Total Amount', 'Status', 'Due Date', 'Created At']
      
      data = invoices.map((invoice: any) => ({
        'ID': invoice.id,
        'Invoice Number': invoice.invoiceNumber,
        'Customer': invoice.customerId,
        'Total Amount': invoice.totalAmount,
        'Status': invoice.status,
        'Due Date': invoice.dueDate ? new Date(invoice.dueDate).toISOString() : '',
        'Created At': new Date(invoice.createdAt).toISOString()
      }))

      filename = `invoices_${new Date().toISOString().split('T')[0]}.csv`
    }

    if (data.length === 0) {
      return NextResponse.json(
        { error: 'No data found to export' },
        { status: 404 }
      )
    }

    const csv = generateCSV(data, headers)

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${filename}"`
      }
    })
  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json(
      { error: 'Failed to export data' },
      { status: 500 }
    )
  }
}
