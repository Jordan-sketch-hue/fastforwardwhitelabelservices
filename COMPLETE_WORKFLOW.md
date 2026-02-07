# FastForward Complete Workflow - End-to-End Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FASTFORWARD SYSTEM                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐        ┌──────────────┐       ┌─────────────┐ │
│  │  Admin Panel │        │  Partner 1   │       │  Partner 2  │ │
│  │ (/admin/     │        │   QuickShip  │       │   Express   │ │
│  │ integrations)│        │   Logistics  │       │  Delivery   │ │
│  └──────┬───────┘        └──────┬───────┘       └──────┬──────┘ │
│         │                       │                       │         │
│         │                       │                       │         │
│         └───────────────────────┼───────────────────────┘         │
│                                 │                                 │
│                    ┌────────────▼────────────┐                   │
│                    │   API Authentication   │                   │
│                    │   /api/partner/auth    │                   │
│                    │  (JWT Token Generation)│                   │
│                    └────────────┬────────────┘                   │
│                                 │                                 │
│         ┌───────────────────────┼───────────────────────┐        │
│         │                       │                       │        │
│  ┌──────▼────────┐  ┌──────────▼──────────┐  ┌────────▼─────┐  │
│  │   Shipments   │  │    Tracking Info    │  │   Webhooks   │  │
│  │ Management    │  │   Real-time Status  │  │  Notifications
│  │ GET/POST/CRUD │  │  GET tracking data  │  │  Events      │  │
│  └──────┬────────┘  └──────────┬──────────┘  └────────┬─────┘  │
│         │                       │                       │        │
│         └───────────────────────┼───────────────────────┘        │
│                                 │                                 │
│                    ┌────────────▼────────────┐                   │
│                    │   AI Balance Engine    │                   │
│                    │  Load Distribution     │                   │
│                    │  Price Optimization    │                   │
│                    │  Anomaly Detection     │                   │
│                    └────────────┬────────────┘                   │
│                                 │                                 │
│         ┌───────────────────────┼───────────────────────┐        │
│         │                       │                       │        │
│  ┌──────▼────────┐  ┌──────────▼──────────┐  ┌────────▼─────┐  │
│  │  Shipment     │  │   Company Metrics  │  │ Auto-         │  │
│  │ Distribution  │  │   Performance      │  │ Distribution  │  │
│  │ to Companies  │  │   Scoring          │  │ Triggers      │  │
│  └────────────────┘  └──────────────────┘  └───────────────┘  │
│                                 │                                 │
│                    ┌────────────▼────────────┐                   │
│                    │   Webhook Delivery     │                   │
│                    │  Events to Partners    │                   │
│                    │  Signature Verification│                   │
│                    │  Retry Logic           │                   │
│                    └─────────────────────────┘                   │
│                                 │                                 │
│         ┌───────────────────────┼───────────────────────┐        │
│         │                       │                       │        │
│    ┌────▼────┐         ┌───────▼────────┐      ┌──────▼─────┐  │
│    │ Partner │         │    Partner 2   │      │  Monitoring
│    │   1     │         │   Receives     │      │  & Logging  │  │
│    │Database │         │   Updates      │      │  Analytics  │  │
│    │ Updated │         │   In Real-time │      │             │  │
│    └─────────┘         └────────────────┘      └─────────────┘  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Complete Workflow - Step by Step

### Phase 1: Partner Onboarding

```
1. New Partner Company Registers
   └─→ Visit /partner-onboarding
   
2. Complete 5-Step Setup Wizard
   ├─→ Step 1: Welcome (read benefits)
   ├─→ Step 2: Company Info (name, email, industry)
   ├─→ Step 3: Tier Selection (Starter/Pro/Enterprise)
   ├─→ Step 4: Webhook Config (register URLs, select events)
   └─→ Step 5: Activation (confirmation)

3. System Creates Company Record
   ├─→ Generates unique API Key
   ├─→ Creates Secret (stored as SHA256 hash)
   ├─→ Sets tier-based rate limits
   └─→ Sends welcome email with credentials

4. Partner Stores Credentials Securely
   ├─→ API Key: ff_sk_live_abc123
   ├─→ Secret: your_secret_key
   ├─→ Webhook URLs: configured
   └─→ Events: registered
```

### Phase 2: Partner Authentication

```
1. Partner Calls Authentication Endpoint
   POST /api/partner/auth
   {
     "apiKey": "ff_sk_live_abc123",
     "secret": "your_secret_key"
   }

2. System Validates Credentials
   ├─→ Find API Key in database
   ├─→ Hash provided secret
   ├─→ Compare with stored hash
   ├─→ Verify API key is active
   └─→ Check tier and permissions

3. Generate JWT Token
   ├─→ Create JWT payload:
   │   {
   │     "companyId": "company_123",
   │     "apiKeyId": "key_456",
   │     "tier": "professional",
   │     "type": "partner_api"
   │   }
   ├─→ Sign with secret key
   ├─→ Set expiration: 24 hours
   └─→ Return token to partner

4. Log Authentication Attempt
   ├─→ Record in ApiLog table
   ├─→ Store timestamp
   ├─→ Store IP address
   └─→ Store response status

5. Partner Receives Token
   {
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     "expiresIn": 86400,
     "company": {
       "id": "company_123",
       "name": "QuickShip Logistics",
       "tier": "professional"
     }
   }

6. Partner Stores Token
   ├─→ Save in memory/cache
   ├─→ Refresh before expiration (< 1 hour)
   └─→ Use for all subsequent requests
```

### Phase 3: Real-Time Shipment Data Sync

```
1. Partner Requests List of Shipments
   GET /api/partner/shipments?status=pending&limit=50
   Headers:
   {
     "Authorization": "Bearer JWT_TOKEN"
   }

2. System Validates Request
   ├─→ Extract and verify JWT token
   ├─→ Get company ID from token
   ├─→ Verify API key active
   ├─→ Check rate limit (500/min for Professional)
   └─→ Increment rate limit counter

3. Query Database for Shipments
   ├─→ WHERE companyId = company_123
   ├─→ WHERE status = 'pending'
   ├─→ ORDER BY createdAt DESC
   ├─→ LIMIT 50 OFFSET 0
   └─→ Include packages and tracking events

4. Return Shipment Data
   {
     "data": [
       {
         "id": "ship_123",
         "trackingNumber": "FF-2025-001234",
         "status": "pending",
         "customerName": "John Doe",
         "packages": [...],
         "trackingEvents": [...]
       },
       ...
     ],
     "pagination": {
       "total": 245,
       "limit": 50,
       "offset": 0,
       "hasMore": true
     }
   }

5. Partner Processes Data
   ├─→ Update local database
   ├─→ Trigger business workflows
   ├─→ Queue for processing
   └─→ Send notifications to customers
```

### Phase 4: Create New Shipment

```
1. Partner Sends New Shipment Request
   POST /api/partner/shipments
   {
     "trackingNumber": "QUICK-2025-001",
     "customer": {
       "name": "Jane Smith",
       "email": "jane@customer.com",
       "phone": "+1555555555"
     },
     "pickupLocation": {
       "address": "123 Warehouse St, New York, NY"
     },
     "dropoffLocation": {
       "address": "456 Home Ave, Los Angeles, CA"
     },
     "packages": [
       {
         "weight": 2.5,
         "dimensions": "12x8x6",
         "contents": "Electronics"
       }
     ]
   }

2. System Validates Request
   ├─→ Verify JWT token
   ├─→ Check all required fields
   ├─→ Validate email format
   ├─→ Check rate limit
   └─→ Verify no duplicate tracking number

3. Check Company Capacity
   ├─→ Get current shipments for company
   ├─→ Get company tier capacity
   ├─→ Verify: used < (capacity × 0.9)
   └─→ Prevent overload

4. AI Routing Evaluation
   ├─→ NOT assigned yet (awaiting AI balance)
   ├─→ Mark status as "pending"
   ├─→ Add to unassigned queue
   └─→ Create initial tracking event

5. Create Shipment Record
   ├─→ Insert into Shipment table
   ├─→ Create package records
   ├─→ Create initial TrackingEvent
   ├─→ Record in database
   └─→ Generate unique shipment ID

6. Return Confirmation
   {
     "id": "ship_789",
     "trackingNumber": "QUICK-2025-001",
     "status": "pending",
     "createdAt": "2025-01-20T15:30:00Z",
     "packages": [...],
     "trackingEvents": [
       {
         "status": "pending",
         "location": "Warehouse",
         "notes": "Shipment created"
       }
     ]
   }

7. Trigger Webhook Events
   └─→ Send "shipment.created" event
       (see Phase 6)
```

### Phase 5: AI-Powered Load Balancing

```
1. Scheduled Trigger (every 15 minutes)
   └─→ POST /api/admin/ai (action: "distribute")

2. AI Distribution Engine Activates
   ├─→ Get all active companies
   ├─→ Get unassigned pending shipments
   └─→ For each shipment: select best company

3. Calculate Company Metrics
   For each company, calculate:
   ├─→ Current Load: count shipments with status in (pending, picked_up, in_transit)
   ├─→ Capacity: based on tier
   ├─→ Utilization Rate: (current_load / capacity) × 100
   ├─→ On-Time Delivery: completed_on_time / total_completed
   ├─→ Performance Score: weighted average
   └─→ Balance Health: account balance / $5000

4. AI Scoring Algorithm
   For each available company:
   
   score = 0
   
   // Performance Score (40% weight)
   score += company.performanceScore × 0.4
   
   // Underutilization Bonus (30% weight)
   underutil = max(0, 100 - company.utilizationRate)
   score += (underutil / 100) × 30
   
   // Balance Health (20% weight)
   balance_score = min(100, (balance / 5000) × 100)
   score += (balance_score / 100) × 20
   
   // Tier Bonus (10% weight)
   tier_bonus = {starter: 0, professional: 5, enterprise: 10}
   score += tier_bonus[company.tier]
   
   // Filter: must have < 90% capacity
   if company.currentLoad >= company.capacity × 0.9:
     skip this company

5. Select Best Company
   ├─→ Sort all companies by score (highest first)
   ├─→ Select company with highest score
   ├─→ If no available company, hold shipment
   └─→ Assign shipment to selected company

6. Update Shipment Assignment
   ├─→ Set assignedToCompanyId
   ├─→ Update status to "assigned"
   ├─→ Create ActivityLog entry
   └─→ Record AI decision metrics

7. Log and Analyze
   ├─→ Track all distribution decisions
   ├─→ Analyze company utilization
   ├─→ Identify bottlenecks
   └─→ Optimize pricing accordingly
```

### Phase 6: Real-Time Webhook Notifications

```
1. Shipment Status Changes (e.g., picked_up)
   
2. System Triggers Webhooks
   ├─→ Query: WHERE events has 'shipment.updated'
   ├─→ Find all registered webhooks for company
   ├─→ Create webhook payload:
   │   {
   │     "event": "shipment.updated",
   │     "timestamp": "2025-01-20T16:00:00Z",
   │     "webhookId": "wh_123",
   │     "data": {
   │       "shipmentId": "ship_789",
   │       "trackingNumber": "QUICK-2025-001",
   │       "previousStatus": "pending",
   │       "currentStatus": "picked_up",
   │       "location": "Distribution Center"
   │     }
   │   }
   └─→ Send to delivery system

3. Generate Webhook Signature
   ├─→ Create HMAC-SHA256 signature
   ├─→ Sign entire payload
   ├─→ Generate signature header:
   │   X-Webhook-Signature: abcdef123456...
   └─→ Add security headers

4. Send Webhook Delivery Request
   POST {partner_webhook_url}
   Headers:
   {
     "Content-Type": "application/json",
     "X-Webhook-Signature": "abcdef123456...",
     "X-Webhook-Event": "shipment.updated",
     "X-Webhook-Timestamp": "2025-01-20T16:00:00Z",
     "X-Webhook-ID": "wh_123"
   }

5. Partner Receives Webhook
   ├─→ Extract signature from header
   ├─→ Verify signature matches payload
   ├─→ Check timestamp freshness
   ├─→ Process event
   └─→ Update local records

6. Retry Logic (if delivery fails)
   ├─→ Attempt 1: Immediate (fail → wait 1s)
   ├─→ Attempt 2: After 1 second (fail → wait 2s)
   ├─→ Attempt 3: After 2 seconds (fail → wait 4s)
   ├─→ Attempt 4: After 4 seconds (fail → wait 8s)
   ├─→ Attempt 5: After 8 seconds (fail → wait 16s)
   ├─→ Attempt 6 (final): After 16 seconds
   └─→ If all fail: Disable webhook, alert admin

7. Log Webhook Event
   ├─→ Record in WebhookLog table
   ├─→ Store status code
   ├─→ Store response body
   ├─→ Track attempt count
   └─→ Timestamp all events

8. Partner System Processes Event
   ├─→ Update database
   ├─→ Notify customer
   ├─→ Update tracking page
   ├─→ Send SMS/email notifications
   └─→ Trigger related workflows
```

### Phase 7: Tracking Information Retrieval

```
1. Partner (or Customer) Requests Tracking
   GET /api/partner/tracking/QUICK-2025-001
   Headers:
   {
     "Authorization": "Bearer JWT_TOKEN"
   }

2. System Retrieves Shipment
   ├─→ Query shipment by tracking number
   ├─→ Verify company ownership
   ├─→ Include packages
   ├─→ Include tracking events (recent)
   └─→ Calculate progress percentage

3. Calculate Progress
   ├─→ Shipment status stages: [pending, picked_up, in_transit, out_for_delivery, delivered]
   ├─→ Current status index in array
   ├─→ Progress % = (index + 1) / total_stages × 100
   └─→ Return with estimated delivery date

4. Return Complete Tracking Info
   {
     "tracking": {
       "trackingNumber": "QUICK-2025-001",
       "status": "in_transit",
       "progressPercentage": 60,
       "estimatedDelivery": "2025-01-22T17:00:00Z",
       "currentLocation": "Distribution Center - Denver",
       "customerName": "Jane Smith",
       "pickupAddress": "123 Warehouse St, NY",
       "dropoffAddress": "456 Home Ave, LA",
       "totalCost": 45.99
     },
     "packages": [
       {
         "trackingNumber": "QUICK-2025-001-001",
         "weight": 2.5,
         "contents": "Electronics"
       }
     ],
     "events": [
       {
         "status": "pending",
         "location": "Warehouse",
         "timestamp": "2025-01-20T15:30:00Z"
       },
       {
         "status": "picked_up",
         "location": "Local Pickup",
         "timestamp": "2025-01-20T16:00:00Z"
       },
       {
         "status": "in_transit",
         "location": "Distribution Center - Denver",
         "timestamp": "2025-01-21T08:30:00Z"
       }
     ]
   }

5. Partner Displays to Customer
   ├─→ Show progress bar
   ├─→ Display current location
   ├─→ Show estimated delivery
   ├─→ List all tracking events
   └─→ Allow customer notifications signup
```

### Phase 8: Admin Monitoring & Analytics

```
1. Admin Views Integration Dashboard
   └─→ Visit /admin/integrations

2. Dashboard Displays:
   ├─→ Connected companies: 12
   ├─→ Active shipments: 24,500
   ├─→ System health: 99.8%
   ├─→ Revenue: $125,450
   
3. Companies Tab Shows:
   ├─→ QuickShip Logistics
   │   ├─→ Tier: Professional
   │   ├─→ Status: Active
   │   ├─→ Shipments: 7,234 / 10,000
   │   ├─→ Balance: $2,500.50
   │   └─→ Actions: Edit, Keys, Webhooks, Analytics
   │
   ├─→ Express Delivery Co
   │   ├─→ Tier: Starter
   │   ├─→ Status: Active
   │   ├─→ Shipments: 456 / 1,000
   │   ├─→ Balance: $1,200.75
   │   └─→ Actions: Edit, Keys, Webhooks, Analytics

4. AI Balance Tab Shows:
   ├─→ Real-time load distribution
   ├─→ Each company's score
   ├─→ Recommended actions
   ├─→ Auto-balance button
   └─→ System health metrics

5. Run AI Operations
   └─→ Click "Run Auto-Balance"
       POST /api/admin/ai
       {
         "action": "all"  // distribute + pricing + anomalies
       }

6. System Processes:
   ├─→ Distributes pending shipments
   ├─→ Optimizes pricing
   ├─→ Detects anomalies
   ├─→ Updates company metrics
   └─→ Returns status report

7. Admin Reviews Results
   ├─→ Shipments distributed: 245
   ├─→ Companies rebalanced: 12
   ├─→ Anomalies detected: 2
   ├─→ Processing time: 245ms
   └─→ System health: Optimal
```

---

## Key Features Workflow

### Authentication Flow
```
Partner App
    ↓
Request Token (API Key + Secret)
    ↓
System validates credentials
    ↓
System hashes secret and compares
    ↓
Generate JWT with company info
    ↓
Return token (24-hour expiration)
    ↓
Partner stores token
    ↓
Use token for all API requests
```

### Shipment Management Flow
```
Create Shipment
    ↓
Added to pending queue
    ↓
AI evaluates available companies
    ↓
Best company selected
    ↓
Assigned to company
    ↓
Status updated
    ↓
Webhook notification sent
    ↓
Partner receives real-time update
```

### Webhook Flow
```
Event occurs (e.g., status change)
    ↓
Query registered webhooks
    ↓
Create payload with event data
    ↓
Sign with HMAC-SHA256
    ↓
Send to partner webhook URL
    ↓
If fails: retry with exponential backoff
    ↓
If succeeds: log success
    ↓
If max retries exceeded: disable webhook
```

### AI Load Balancing Flow
```
Periodic trigger (15 min)
    ↓
Get pending shipments
    ↓
For each shipment:
  - Calculate company metrics
  - Score each available company
  - Select best match
  - Assign shipment
    ↓
Log all decisions
    ↓
Update analytics
    ↓
Trigger webhook notifications
```

---

## Rate Limiting & Quotas

### Per Tier Limits
```
Starter:      60 requests/minute
Professional: 500 requests/minute
Enterprise:   Unlimited

Monthly Shipments:
Starter:      1,000 shipments
Professional: 10,000 shipments
Enterprise:   Unlimited
```

### Rate Limit Response
```
When limit exceeded:
- HTTP 429 Too Many Requests
- X-RateLimit-Remaining: 0
- X-RateLimit-Reset: {timestamp}
- Retry-After: {seconds}
```

---

## Error Handling

### Common Errors
```
401 Unauthorized
  - Invalid API key
  - Expired token
  - Secret mismatch
  
400 Bad Request
  - Missing required fields
  - Invalid format
  - Duplicate tracking number
  
404 Not Found
  - Shipment not found
  - Webhook not found
  - Company not found
  
429 Too Many Requests
  - Rate limit exceeded
  - Implement backoff

500 Server Error
  - Database connection issue
  - System error
  - Retry later
```

### Retry Strategy
```
Webhook Delivery Retries:
- Exponential backoff: 2^attempt seconds
- Attempt 1: 1 second
- Attempt 2: 2 seconds
- Attempt 3: 4 seconds
- Attempt 4: 8 seconds
- Attempt 5: 16 seconds

After 5 failed attempts:
- Disable webhook
- Send admin alert
- Log for investigation
```

---

## Data Security

### Encryption & Hashing
```
API Secret Storage:
- Hash using SHA256
- Store hash in database
- Never store plain secret
- Compare hash during auth

Webhook Signatures:
- HMAC-SHA256
- Include timestamp
- Verify signature on receipt
- Reject tampered payloads

JWT Tokens:
- Sign with environment secret
- Expire after 24 hours
- Include company info
- Verify on each request
```

### Data Isolation
```
Each partner sees ONLY their:
- Own shipments
- Own webhooks
- Own API keys
- Own tracking information

Database queries include:
- WHERE companyId = authenticated_company_id
- Prevents cross-company data leaks
```

---

## Monitoring & Alerts

### Metrics Tracked
```
- API request rate
- Error rates
- Response times
- Webhook success rate
- System health
- Company performance
- Load distribution
- Revenue per company
```

### Alerts Configured
```
- High error rate (> 1%)
- Slow response times (> 1s)
- Webhook failures (> 5%)
- Rate limit abuse
- Suspicious activity
- System outages
- Database issues
```

---

This complete workflow ensures smooth, automated, and secure courier operations across all FastForward partner companies with intelligent load balancing and real-time notifications.
