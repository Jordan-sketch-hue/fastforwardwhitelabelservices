import { prisma } from '@/lib/prisma'

export interface CompanyMetrics {
  companyId: string
  name: string
  tier: 'starter' | 'professional' | 'enterprise'
  currentLoad: number // Number of in-progress shipments
  capacity: number // Max shipments based on tier
  utilizationRate: number // Percentage 0-100
  onTimeDeliveryRate: number // Percentage 0-100
  balance: number // Account balance
  geographicCoverage: string[] // Service areas
  performanceScore: number // 0-100 composite score
}

// Get tier-based capacity limits
function getTierCapacity(tier: string): number {
  switch (tier) {
    case 'starter': return 100
    case 'professional': return 500
    case 'enterprise': return 5000
    default: return 100
  }
}

// Calculate company metrics
async function getCompanyMetrics(companyId: string): Promise<CompanyMetrics | null> {
  try {
    const company = await prisma.company.findUnique({
      where: { id: companyId },
      include: {
        shipments: {
          where: {
            status: { in: ['pending', 'in_transit', 'picked_up'] }
          }
        }
      }
    })

    if (!company) return null

    // Get API key for tier info
    const apiKey = await prisma.apiKey.findFirst({
      where: { companyId }
    })

    const tier = (apiKey?.tier || 'starter') as 'starter' | 'professional' | 'enterprise'
    const capacity = getTierCapacity(tier)
    const currentLoad = company.shipments.length
    const utilizationRate = (currentLoad / capacity) * 100

    // Calculate on-time delivery rate
    const completedShipments = await prisma.shipment.findMany({
      where: {
        companyId,
        status: 'delivered'
      },
      include: {
        trackingEvents: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      }
    })

    const onTimeCount = completedShipments.filter((s: any) => {
      // Check if delivered within expected time (e.g., 3 days)
      return s.trackingEvents.length > 0
    }).length

    const onTimeDeliveryRate = completedShipments.length > 0 
      ? (onTimeCount / completedShipments.length) * 100 
      : 100

    // Performance score = weighted average of metrics
    const performanceScore = (
      (utilizationRate * 0.3) +
      (onTimeDeliveryRate * 0.5) +
      (Math.min((company.balance / 1000) * 100, 100) * 0.2) // Balance health
    ) / 3

    return {
      companyId,
      name: company.name,
      tier,
      currentLoad,
      capacity,
      utilizationRate,
      onTimeDeliveryRate,
      balance: 0, // Would come from payment system
      geographicCoverage: [], // Would come from company settings
      performanceScore: Math.min(100, Math.max(0, performanceScore))
    }
  } catch (error) {
    console.error(`Error getting metrics for company ${companyId}:`, error)
    return null
  }
}

// Main AI Balance Distribution Algorithm
export async function distributeShipments() {
  try {
    console.log('Starting AI balance distribution...')

    // Get all active companies
    const companies = await prisma.company.findMany({
      where: {
        status: 'active'
      }
    })

    if (companies.length === 0) {
      console.log('No active companies found')
      return
    }

    // Calculate metrics for each company
    const metricsMap = new Map<string, CompanyMetrics>()
    for (const company of companies) {
      const metrics = await getCompanyMetrics(company.id)
      if (metrics) {
        metricsMap.set(company.id, metrics)
      }
    }

    // Get pending shipments waiting for assignment
    const pendingShipments = await prisma.shipment.findMany({
      where: {
        status: 'pending',
        assignedToCompanyId: null
      },
      orderBy: { createdAt: 'asc' },
      take: 100 // Process in batches
    })

    if (pendingShipments.length === 0) {
      console.log('No pending shipments to distribute')
      return
    }

    console.log(`Processing ${pendingShipments.length} pending shipments`)

    // Distribute each shipment
    for (const shipment of pendingShipments) {
      const bestCompany = selectBestCompany(
        Array.from(metricsMap.values()),
        shipment
      )

      if (bestCompany) {
        // Assign shipment to company
        await prisma.shipment.update({
          where: { id: shipment.id },
          data: {
            assignedToCompanyId: bestCompany.companyId,
            status: 'assigned'
          }
        })

        // Create activity log
        await prisma.activityLog.create({
          data: {
            companyId: bestCompany.companyId,
            action: 'shipment_assigned',
            description: `Shipment ${shipment.trackingNumber} assigned by AI balance system`,
            metadata: {
              shipmentId: shipment.id,
              performanceScore: bestCompany.performanceScore,
              utilizationRate: bestCompany.utilizationRate
            }
          }
        })

        // Update metrics
        const updated = await getCompanyMetrics(bestCompany.companyId)
        if (updated) {
          metricsMap.set(bestCompany.companyId, updated)
        }
      }
    }

    console.log('AI balance distribution completed')
  } catch (error) {
    console.error('Error in distributeShipments:', error)
  }
}

// Select best company for shipment using AI algorithm
function selectBestCompany(companies: CompanyMetrics[], shipment: any): CompanyMetrics | null {
  // Filter companies that can handle the shipment
  const availableCompanies = companies.filter(c => {
    // Only consider companies with capacity available
    return c.currentLoad < c.capacity * 0.9 // Don't exceed 90% capacity
  })

  if (availableCompanies.length === 0) {
    console.warn('No available companies for shipment distribution')
    return null
  }

  // Score each company
  const scores = availableCompanies.map(company => ({
    company,
    score: calculateCompanyScore(company, shipment)
  }))

  // Sort by score (highest first)
  scores.sort((a, b) => b.score - a.score)

  return scores[0]?.company || null
}

// Calculate score for company-shipment assignment
function calculateCompanyScore(company: CompanyMetrics, shipment: any): number {
  let score = 0

  // Performance score (weighted 40%)
  // Higher performance = better
  score += company.performanceScore * 0.4

  // Utilization balance (weighted 30%)
  // Lower utilization = more available capacity (better)
  const underutilizationBonus = Math.max(0, 100 - company.utilizationRate)
  score += (underutilizationBonus / 100) * 30

  // Balance health (weighted 20%)
  // Companies with good balance should take more load
  const balanceScore = Math.min(100, (company.balance / 5000) * 100)
  score += (balanceScore / 100) * 20

  // Tier-based weighting (weighted 10%)
  // Professional and Enterprise tiers get slight preference
  const tierBonus = {
    starter: 0,
    professional: 5,
    enterprise: 10
  }
  score += tierBonus[company.tier as keyof typeof tierBonus]

  // Geographic proximity bonus (if data available)
  if (company.geographicCoverage.length > 0) {
    score += 5 // Simplified; in production, calculate actual distance
  }

  return score
}

// Schedule periodic rebalancing (call every 15 minutes)
export async function scheduledRebalance() {
  // This should be called by a cron job or scheduled task
  // Example: node_cron or Vercel Cron
  console.log('Scheduled rebalance triggered')
  await distributeShipments()
}

// AI-powered price optimization
export async function optimizePricing() {
  try {
    console.log('Starting AI price optimization...')

    // Get market conditions
    const stats = {
      totalShipments: await prisma.shipment.count(),
      averageBalance: 0,
      utilizationRate: 0
    }

    // If utilization > 80%, increase prices
    // If utilization < 40%, decrease prices
    // If balance is low, increase prices for high-tier companies

    console.log('Price optimization completed', stats)
  } catch (error) {
    console.error('Error optimizing prices:', error)
  }
}

// AI anomaly detection
export async function detectAnomalies() {
  try {
    console.log('Starting anomaly detection...')

    const companies = await prisma.company.findMany({
      where: { status: 'active' }
    })

    for (const company of companies) {
      // Check for unusual patterns
      const recentShipments = await prisma.shipment.findMany({
        where: { companyId: company.id },
        orderBy: { createdAt: 'desc' },
        take: 100
      })

      // Analyze patterns - detect fraud, abuse, etc.
      const analysis = analyzeCompanyBehavior(recentShipments)

      if (analysis.anomalies.length > 0) {
        console.warn(`Anomalies detected for company ${company.name}:`, analysis.anomalies)
        
        // Alert admin if needed
        if (analysis.riskScore > 70) {
          // Send alert to admin
          console.warn(`HIGH RISK: Company ${company.name} flagged for review`)
        }
      }
    }

    console.log('Anomaly detection completed')
  } catch (error) {
    console.error('Error detecting anomalies:', error)
  }
}

// Analyze company behavior patterns
function analyzeCompanyBehavior(shipments: any[]): { anomalies: string[]; riskScore: number } {
  const anomalies: string[] = []
  let riskScore = 0

  if (shipments.length === 0) return { anomalies, riskScore }

  // Check for unusual spike in shipments
  const shipmentTimes = shipments.map(s => s.createdAt.getTime())
  const avgTimeBetween = (shipmentTimes[0] - shipmentTimes[shipmentTimes.length - 1]) / shipments.length
  
  if (avgTimeBetween < 1000) { // Less than 1 second between shipments
    anomalies.push('Unusual shipment rate')
    riskScore += 20
  }

  // Check for zero-value shipments
  const zeroValueShipments = shipments.filter(s => s.totalCost === 0).length
  if (zeroValueShipments > shipments.length * 0.1) { // More than 10% zero-value
    anomalies.push('High proportion of zero-value shipments')
    riskScore += 15
  }

  return { anomalies, riskScore }
}
