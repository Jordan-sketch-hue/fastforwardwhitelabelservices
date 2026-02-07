# FastForward Partner API Documentation

## Overview

FastForward provides a comprehensive REST API for partner companies to integrate with our warehouse and courier network. This documentation covers authentication, endpoints, webhooks, and best practices.

## Authentication

### Step 1: Get API Credentials

1. Sign up at `/partner-onboarding`
2. Select your tier (Starter, Professional, Enterprise)
3. Configure webhooks
4. Receive API key via email

### Step 2: Generate JWT Token

```bash
curl -X POST https://api.logisticshub.com/v1/partner/auth \
  -H "Content-Type: application/json" \
  -d '{
    "apiKey": "ff_sk_live_abc123",
    "secret": "your_secret_key"
  }'
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 86400,
  "tokenType": "Bearer",
  "company": {
    "id": "company_123",
    "name": "QuickShip Logistics",
    "tier": "professional"
  }
}
```

### Step 3: Use Token for API Calls

Include token in Authorization header:

```bash
curl https://api.logisticshub.com/v1/partner/shipments \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## API Endpoints

### Shipments

#### Get All Shipments

```
GET /api/partner/shipments
```

**Query Parameters:**
- `limit` (optional): Max results per page (default: 50, max: 100)
- `offset` (optional): Pagination offset (default: 0)
- `status` (optional): Filter by status (pending, picked_up, in_transit, delivered, failed)
- `from` (optional): Start date (ISO 8601 format)
- `to` (optional): End date (ISO 8601 format)

**Example:**
```bash
curl "https://api.logisticshub.com/v1/partner/shipments?status=in_transit&limit=50&offset=0" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response:**
```json
{
  "data": [
    {
      "id": "ship_123",
      "trackingNumber": "FF-2025-001234",
      "status": "in_transit",
      "customerName": "John Doe",
      "customerEmail": "john@example.com",
      "customerPhone": "+1234567890",
      "pickupAddress": "123 Warehouse St, NY",
      "dropoffAddress": "456 Main St, CA",
      "totalCost": 45.99,
      "notes": "Fragile items",
      "createdAt": "2025-01-20T10:30:00Z",
      "updatedAt": "2025-01-20T14:20:00Z",
      "packages": [
        {
          "id": "pkg_456",
          "trackingNumber": "FF-2025-001234-001",
          "weight": 2.5,
          "dimensions": "12x8x6",
          "contents": "Electronics"
        }
      ],
      "trackingEvents": [
        {
          "status": "picked_up",
          "location": "Warehouse Center",
          "createdAt": "2025-01-20T11:00:00Z",
          "notes": "Package picked up"
        }
      ]
    }
  ],
  "pagination": {
    "total": 250,
    "limit": 50,
    "offset": 0,
    "hasMore": true
  }
}
```

---

#### Create Shipment

```
POST /api/partner/shipments
```

**Request Body:**
```json
{
  "trackingNumber": "YOUR-TRACKING-001",
  "customer": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  },
  "pickupLocation": {
    "address": "123 Warehouse St, New York, NY 10001"
  },
  "dropoffLocation": {
    "address": "456 Main St, Los Angeles, CA 90001"
  },
  "packages": [
    {
      "trackingNumber": "YOUR-TRACKING-001-001",
      "weight": 2.5,
      "dimensions": "12x8x6",
      "contents": "Electronics"
    }
  ],
  "notes": "Fragile - Handle with care"
}
```

**Response:** (201 Created)
```json
{
  "id": "ship_123",
  "trackingNumber": "YOUR-TRACKING-001",
  "status": "pending",
  "createdAt": "2025-01-20T15:30:00Z",
  "packages": [...],
  "trackingEvents": [...]
}
```

**Error Responses:**
- `400 Bad Request`: Missing required fields
- `401 Unauthorized`: Invalid token
- `429 Too Many Requests`: Rate limit exceeded

---

### Tracking

#### Get Shipment Details

```
GET /api/partner/tracking/{trackingNumber}
```

**Example:**
```bash
curl https://api.logisticshub.com/v1/partner/tracking/FF-2025-001234 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response:**
```json
{
  "tracking": {
    "trackingNumber": "FF-2025-001234",
    "status": "in_transit",
    "progressPercentage": 60,
    "estimatedDelivery": "2025-01-22",
    "currentLocation": "Distribution Center - Denver",
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "customerPhone": "+1234567890",
    "pickupAddress": "123 Warehouse St, NY",
    "dropoffAddress": "456 Main St, CA",
    "totalCost": 45.99,
    "notes": "Fragile items",
    "createdAt": "2025-01-20T10:30:00Z",
    "updatedAt": "2025-01-20T14:20:00Z"
  },
  "packages": [
    {
      "id": "pkg_456",
      "trackingNumber": "FF-2025-001234-001",
      "weight": 2.5,
      "dimensions": "12x8x6",
      "contents": "Electronics"
    }
  ],
  "events": [
    {
      "status": "picked_up",
      "location": "Warehouse Center",
      "timestamp": "2025-01-20T11:00:00Z",
      "notes": "Package picked up"
    },
    {
      "status": "in_transit",
      "location": "Distribution Center - Denver",
      "timestamp": "2025-01-21T08:30:00Z",
      "notes": "In transit to destination"
    }
  ]
}
```

---

### Webhooks

#### Register Webhook

```
POST /api/partner/webhooks
```

**Request Body:**
```json
{
  "url": "https://your-company.com/webhooks/fastforward",
  "events": ["shipment.created", "shipment.updated", "shipment.delivered"],
  "active": true,
  "description": "Main webhook for shipment updates"
}
```

**Response:** (201 Created)
```json
{
  "id": "wh_123",
  "url": "https://your-company.com/webhooks/fastforward",
  "events": ["shipment.created", "shipment.updated", "shipment.delivered"],
  "active": true,
  "createdAt": "2025-01-20T10:30:00Z"
}
```

---

#### List Webhooks

```
GET /api/partner/webhooks
```

**Response:**
```json
{
  "data": [
    {
      "id": "wh_123",
      "url": "https://your-company.com/webhooks",
      "events": ["shipment.created", "shipment.delivered"],
      "active": true,
      "createdAt": "2025-01-20T10:30:00Z",
      "logs": [
        {
          "event": "shipment.created",
          "status": 200,
          "timestamp": "2025-01-20T15:00:00Z"
        }
      ]
    }
  ]
}
```

---

#### Update Webhook

```
PATCH /api/partner/webhooks/{id}
```

**Request Body:**
```json
{
  "url": "https://your-company.com/webhooks/new-endpoint",
  "events": ["shipment.created", "shipment.updated"],
  "active": true
}
```

---

#### Delete Webhook

```
DELETE /api/partner/webhooks/{id}
```

**Response:** (200 OK)
```json
{
  "success": true
}
```

---

## Webhook Events

### Event Types

#### shipment.created
Triggered when a new shipment is created.

```json
{
  "event": "shipment.created",
  "timestamp": "2025-01-20T10:30:00Z",
  "webhookId": "wh_123",
  "data": {
    "shipmentId": "ship_123",
    "trackingNumber": "FF-2025-001234",
    "status": "pending",
    "customer": {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890"
    }
  }
}
```

#### shipment.updated
Triggered when shipment details are updated.

```json
{
  "event": "shipment.updated",
  "timestamp": "2025-01-20T14:20:00Z",
  "webhookId": "wh_123",
  "data": {
    "shipmentId": "ship_123",
    "trackingNumber": "FF-2025-001234",
    "previousStatus": "pending",
    "currentStatus": "picked_up",
    "location": "Warehouse Center"
  }
}
```

#### shipment.delivered
Triggered when shipment is delivered.

```json
{
  "event": "shipment.delivered",
  "timestamp": "2025-01-22T16:45:00Z",
  "webhookId": "wh_123",
  "data": {
    "shipmentId": "ship_123",
    "trackingNumber": "FF-2025-001234",
    "deliveryTime": "2025-01-22T16:45:00Z",
    "signature": "John D.",
    "notes": "Left at door"
  }
}
```

#### shipment.failed
Triggered when delivery fails.

```json
{
  "event": "shipment.failed",
  "timestamp": "2025-01-22T17:00:00Z",
  "webhookId": "wh_123",
  "data": {
    "shipmentId": "ship_123",
    "trackingNumber": "FF-2025-001234",
    "reason": "Address not found",
    "retryScheduled": "2025-01-23T08:00:00Z"
  }
}
```

---

## Webhook Security

### Verify Webhook Signature

All webhooks include an HMAC-SHA256 signature in the `X-Webhook-Signature` header.

**JavaScript Example:**
```javascript
const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const hash = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
  
  return hash === signature;
}

app.post('/webhooks/fastforward', (req, res) => {
  const signature = req.headers['x-webhook-signature'];
  
  if (!verifyWebhookSignature(req.body, signature, 'your-webhook-secret')) {
    return res.status(401).send('Unauthorized');
  }
  
  // Process webhook
  console.log('Webhook event:', req.body.event);
  res.status(200).send('OK');
});
```

---

## Rate Limits

Rate limits vary by tier:

| Tier | Requests/Minute | Requests/Hour | Requests/Day |
|------|-----------------|---------------|--------------|
| Starter | 60 | 3,600 | 86,400 |
| Professional | 500 | 30,000 | 720,000 |
| Enterprise | Unlimited | Unlimited | Unlimited |

**Rate Limit Headers:**
```
X-RateLimit-Limit: 500
X-RateLimit-Remaining: 499
X-RateLimit-Reset: 1705764000
```

When rate limit is exceeded:
```json
{
  "error": "Rate limit exceeded",
  "status": 429,
  "retryAfter": 60
}
```

---

## Error Codes

| Code | Meaning | Action |
|------|---------|--------|
| 400 | Bad Request | Check request format and required fields |
| 401 | Unauthorized | Verify API key and token |
| 403 | Forbidden | Check tier permissions |
| 404 | Not Found | Verify resource ID/tracking number |
| 429 | Rate Limited | Implement backoff retry strategy |
| 500 | Server Error | Contact support |
| 503 | Service Unavailable | Retry after delay |

---

## Best Practices

1. **Always verify webhook signatures** before processing
2. **Implement exponential backoff** for retries
3. **Store API keys securely** (use environment variables)
4. **Monitor rate limits** and implement throttling
5. **Use batch operations** when possible
6. **Implement idempotency** for POST requests
7. **Log all API interactions** for debugging
8. **Test webhooks** in sandbox before production

---

## Support

- **Documentation:** https://docs.logisticshub.com
- **Status Page:** https://status.logisticshub.com
- **Email Support:** support@logisticshub.com
- **Phone Support:** +1-555-COURIER-1
