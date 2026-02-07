# FastForward API Client Library

Complete guide for integrating FastForward with your application.

## Installation

### NPM
```bash
npm install @fastforward/sdk
```

### Yarn
```bash
yarn add @fastforward/sdk
```

## Quick Start

### 1. Initialize Client

```javascript
import FastForwardClient from '@fastforward/sdk'

const client = new FastForwardClient({
  apiKey: 'your-api-key',
  apiSecret: 'your-api-secret',
  baseUrl: 'https://api.fastforward.com'
})
```

### 2. Create a Shipment

```javascript
const shipment = await client.shipments.create({
  trackingNumber: 'FF-2025-001234',
  origin: 'New York Warehouse',
  destination: 'Los Angeles, CA',
  weight: 5.5,
  dimensions: {
    length: 10,
    width: 8,
    height: 6
  },
  contents: 'Electronics',
  value: 250.00,
  reference: 'ORDER-12345'
})

console.log(shipment.id)
// → "ship_abc123def456"
```

### 3. Track a Package

```javascript
const tracking = await client.shipments.track('FF-2025-001234')

console.log(tracking.status)
// → "in-transit"

console.log(tracking.events)
// → [
//   {
//     status: 'picked_up',
//     location: 'New York Warehouse',
//     timestamp: '2025-02-07T10:30:00Z',
//     description: 'Package picked up'
//   },
//   ...
// ]
```

### 4. List Shipments

```javascript
const shipments = await client.shipments.list({
  status: 'in-transit',
  limit: 100,
  offset: 0
})

shipments.items.forEach(shipment => {
  console.log(`${shipment.trackingNumber}: ${shipment.status}`)
})
```

## Authentication

### API Key Authentication

All requests require an API key in the Authorization header:

```bash
curl -X GET https://api.fastforward.com/shipments \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Getting Your API Key

1. Sign up at https://fastforward.com/onboarding
2. Go to Dashboard → Settings → API Keys
3. Click "Generate New Key"
4. Copy your API key and secret

## Webhooks

### Setup Webhook Endpoint

```javascript
// In your server
app.post('/webhooks/fastforward', (req, res) => {
  const event = req.body

  switch(event.type) {
    case 'shipment.updated':
      console.log('Shipment updated:', event.data.trackingNumber)
      break
    case 'shipment.delivered':
      console.log('Shipment delivered:', event.data.trackingNumber)
      break
    default:
      console.log('Unknown event:', event.type)
  }

  res.json({ received: true })
})
```

### Register Webhook URL

```javascript
const webhook = await client.webhooks.create({
  url: 'https://yourapp.com/webhooks/fastforward',
  events: ['shipment.updated', 'shipment.delivered'],
  active: true
})
```

### Webhook Events

```javascript
// Shipment created
{
  type: 'shipment.created',
  id: 'evt_abc123',
  timestamp: '2025-02-07T10:30:00Z',
  data: {
    id: 'ship_abc123',
    trackingNumber: 'FF-2025-001234',
    status: 'created',
    origin: 'New York Warehouse',
    destination: 'Los Angeles, CA'
  }
}

// Shipment updated
{
  type: 'shipment.updated',
  id: 'evt_def456',
  timestamp: '2025-02-07T11:00:00Z',
  data: {
    id: 'ship_abc123',
    trackingNumber: 'FF-2025-001234',
    status: 'in-transit',
    lastEvent: {
      status: 'picked_up',
      location: 'New York Warehouse',
      timestamp: '2025-02-07T10:45:00Z'
    }
  }
}

// Shipment delivered
{
  type: 'shipment.delivered',
  id: 'evt_ghi789',
  timestamp: '2025-02-07T15:00:00Z',
  data: {
    id: 'ship_abc123',
    trackingNumber: 'FF-2025-001234',
    status: 'delivered',
    deliveredAt: '2025-02-07T14:30:00Z',
    signature: 'John Doe'
  }
}
```

## Advanced Usage

### Batch Operations

```javascript
// Create multiple shipments
const shipments = await client.shipments.createBatch([
  {
    trackingNumber: 'FF-2025-001234',
    destination: 'Los Angeles, CA',
    // ... other details
  },
  {
    trackingNumber: 'FF-2025-001235',
    destination: 'San Francisco, CA',
    // ... other details
  }
])
```

### Real-time Tracking

```javascript
// Subscribe to real-time updates
client.on('shipment:update', (shipment) => {
  console.log('Real-time update:', shipment.trackingNumber)
})

// Unsubscribe
client.off('shipment:update')
```

### Error Handling

```javascript
try {
  const shipment = await client.shipments.create({...})
} catch (error) {
  if (error.code === 'INVALID_REQUEST') {
    console.error('Missing required fields:', error.details)
  } else if (error.code === 'UNAUTHORIZED') {
    console.error('Invalid API key')
  } else if (error.code === 'RATE_LIMIT') {
    console.error('Rate limit exceeded')
  } else {
    console.error('Unknown error:', error.message)
  }
}
```

## Response Examples

### Success Response (200)

```json
{
  "success": true,
  "data": {
    "id": "ship_abc123",
    "trackingNumber": "FF-2025-001234",
    "status": "created",
    "createdAt": "2025-02-07T10:30:00Z"
  }
}
```

### Error Response (400)

```json
{
  "success": false,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Missing required fields",
    "details": {
      "missing": ["destination", "weight"]
    }
  }
}
```

### Unauthorized Response (401)

```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired API key"
  }
}
```

### Rate Limited Response (429)

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT",
    "message": "Too many requests",
    "retryAfter": 60
  }
}
```

## SDK Methods Reference

### Shipments

```javascript
// Create
client.shipments.create(data)

// Retrieve
client.shipments.get(id)

// Track
client.shipments.track(trackingNumber)

// List
client.shipments.list(options)

// Update
client.shipments.update(id, data)

// Delete
client.shipments.delete(id)

// Cancel
client.shipments.cancel(id)

// Batch create
client.shipments.createBatch(items)

// Export
client.shipments.export(format)
```

### Webhooks

```javascript
// Create
client.webhooks.create(data)

// List
client.webhooks.list()

// Get
client.webhooks.get(id)

// Update
client.webhooks.update(id, data)

// Delete
client.webhooks.delete(id)

// Test
client.webhooks.test(id)

// List events
client.webhooks.events(options)
```

### Locations

```javascript
// Create
client.locations.create(data)

// List
client.locations.list()

// Get
client.locations.get(id)

// Update
client.locations.update(id, data)

// Delete
client.locations.delete(id)
```

### Reports

```javascript
// Get analytics
client.reports.analytics(options)

// Get delivery stats
client.reports.deliveryStats(options)

// Get revenue
client.reports.revenue(options)

// Export report
client.reports.export(format, options)
```

## Best Practices

1. **Store API Keys Securely**
   - Never commit to version control
   - Use environment variables
   - Rotate keys regularly

2. **Handle Errors Gracefully**
   - Implement retry logic
   - Log errors for debugging
   - Notify users appropriately

3. **Optimize API Calls**
   - Use batch operations
   - Cache non-critical data
   - Implement pagination

4. **Monitor API Usage**
   - Track request counts
   - Monitor response times
   - Alert on errors

5. **Keep SDK Updated**
   - Check for new versions
   - Review changelog
   - Test before upgrading

## Examples

### E-commerce Integration

```javascript
// In your checkout process
const handleCheckout = async (order) => {
  // Create shipment when order is confirmed
  const shipment = await client.shipments.create({
    trackingNumber: `ORDER-${order.id}`,
    origin: 'Main Warehouse',
    destination: order.shippingAddress.city,
    weight: calculateWeight(order.items),
    value: order.total,
    contents: order.items.map(i => i.name).join(', ')
  })

  // Save tracking number
  order.trackingNumber = shipment.trackingNumber
  await order.save()
}
```

### Order Status Page

```javascript
// Display tracking info on order page
const getOrderTracking = async (orderId) => {
  const order = await Order.findById(orderId)
  const tracking = await client.shipments.track(order.trackingNumber)
  
  return {
    status: tracking.status,
    lastEvent: tracking.events[0],
    estimatedDelivery: tracking.estimatedDelivery,
    events: tracking.events
  }
}
```

### Inventory Management

```javascript
// Sync with warehouse system
const syncInventory = async () => {
  const shipments = await client.shipments.list({
    status: 'delivered',
    since: '2025-02-01'
  })

  for (const shipment of shipments.items) {
    await updateInventory(shipment)
  }
}
```

## Support

- **Documentation**: https://docs.fastforward.com
- **API Status**: https://status.fastforward.com
- **Email**: support@fastforward.com
- **Slack**: https://fastforward.slack.com

---

**FastForward SDK** - Faster Is Always Better 🚀
