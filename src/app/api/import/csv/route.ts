import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'

// Parse CSV from FormData
function parseCSV(csv: string): any[] {
  const lines = csv.split('\n')
  const headers = lines[0].split(',').map(h => h.trim())
  const data = []

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue

    const values = lines[i].split(',').map(v => v.trim())
    const row: any = {}

    headers.forEach((header, index) => {
      row[header] = values[index] || ''
    })

    data.push(row)
  }

  return data
}

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

    // Only admins can import data
    if (user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Only admins can import data' },
        { status: 403 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const importType = formData.get('type') as string

    if (!file || !importType) {
      return NextResponse.json(
        { error: 'File and import type are required' },
        { status: 400 }
      )
    }

    const csvContent = await file.text()
    const rows = parseCSV(csvContent)

    let importedCount = 0
    let errorCount = 0
    const errors: string[] = []

    if (importType === 'shipments') {
      // Validate required fields
      const requiredFields = ['Tracking Number', 'Customer', 'Origin', 'Destination', 'Weight (kg)']
      const headers = Object.keys(rows[0] || {})
      const missingFields = requiredFields.filter(f => !headers.includes(f))

      if (missingFields.length > 0) {
        return NextResponse.json(
          { error: `Missing required fields: ${missingFields.join(', ')}` },
          { status: 400 }
        )
      }

      for (let i = 0; i < rows.length; i++) {
        try {
          const row = rows[i]

          // Check if shipment already exists
          const existing = await prisma.shipment.findUnique({
            where: { trackingNumber: row['Tracking Number'] }
          })

          if (existing) {
            errorCount++
            errors.push(`Row ${i + 2}: Shipment with tracking number already exists`)
            continue
          }

          // Get or create customer
          let customer = await prisma.customer.findFirst({
            where: {
              email: row['Customer Email'] || 'unknown@example.com',
              companyId: user.companyId || undefined
            }
          })

          if (!customer) {
            customer = await prisma.customer.create({
              data: {
                name: row['Customer'] || 'Unknown',
                email: row['Customer Email'] || 'unknown@example.com',
                phone: row['Phone'] || '',
                company: row['Company'] || '',
                companyId: user.companyId || undefined
              }
            })
          }

          // Create shipment
          await prisma.shipment.create({
            data: {
              trackingNumber: row['Tracking Number'],
              customerId: customer.id,
              origin: row['Origin'],
              destination: row['Destination'],
              weight: parseFloat(row['Weight (kg)']) || 0,
              cost: parseFloat(row['Cost']) || 0,
              revenue: parseFloat(row['Revenue']) || 0,
              status: (row['Status'] || 'pending').toLowerCase() as any,
              companyId: user.companyId,
              createdAt: new Date(row['Created At'] || new Date())
            }
          })

          importedCount++
        } catch (error) {
          errorCount++
          errors.push(`Row ${i + 2}: ${(error as Error).message}`)
        }
      }
    } else if (importType === 'customers') {
      for (let i = 0; i < rows.length; i++) {
        try {
          const row = rows[i]

          // Check if customer already exists
          const existing = await prisma.customer.findFirst({
            where: {
              email: row['Email'],
              companyId: user.companyId || undefined
            }
          })

          if (existing) {
            errorCount++
            errors.push(`Row ${i + 2}: Customer with email already exists`)
            continue
          }

          await prisma.customer.create({
            data: {
              name: row['Name'],
              email: row['Email'],
              phone: row['Phone'] || '',
              company: row['Company'] || '',
              companyId: user.companyId
            }
          })

          importedCount++
        } catch (error) {
          errorCount++
          errors.push(`Row ${i + 2}: ${(error as Error).message}`)
        }
      }
    }

    return NextResponse.json({
      message: `Import completed: ${importedCount} records imported, ${errorCount} errors`,
      importedCount,
      errorCount,
      errors: errors.slice(0, 10) // Return first 10 errors
    })
  } catch (error) {
    console.error('Import error:', error)
    return NextResponse.json(
      { error: 'Failed to import data' },
      { status: 500 }
    )
  }
}
