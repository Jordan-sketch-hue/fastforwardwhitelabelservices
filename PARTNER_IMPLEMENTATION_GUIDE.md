# FastForward Partner Implementation Guide

## Quick Start (5 Minutes)

### 1. Create Account
Visit `https://your-app.com/partner-onboarding` and complete the 5-step setup.

### 2. Get API Credentials
Check your email for:
- API Key: `ff_sk_live_abc123`
- Secret: `your_secret_key`
- Webhook Documentation

### 3. Generate Token
```bash
curl -X POST https://api.logisticshub.com/v1/partner/auth \
  -H "Content-Type: application/json" \
  -d '{
    "apiKey": "ff_sk_live_abc123",
    "secret": "your_secret_key"
  }'
```

Save the returned `token` for API requests.

### 4. Make Your First API Call
```bash
curl https://api.logisticshub.com/v1/partner/shipments \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Integration Examples

### JavaScript/Node.js

```javascript
const axios = require('axios');

class FastForwardClient {
  constructor(apiKey, secret) {
    this.apiKey = apiKey;
    this.secret = secret;
    this.token = null;
    this.baseURL = 'https://api.logisticshub.com/v1';
  }

  async authenticate() {
    const response = await axios.post(`${this.baseURL}/partner/auth`, {
      apiKey: this.apiKey,
      secret: this.secret
    });
    
    this.token = response.data.token;
    this.headers = {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    };
  }

  async getShipments(filters = {}) {
    const response = await axios.get(
      `${this.baseURL}/partner/shipments`,
      { headers: this.headers, params: filters }
    );
    return response.data;
  }

  async createShipment(shipmentData) {
    const response = await axios.post(
      `${this.baseURL}/partner/shipments`,
      shipmentData,
      { headers: this.headers }
    );
    return response.data;
  }

  async trackShipment(trackingNumber) {
    const response = await axios.get(
      `${this.baseURL}/partner/tracking/${trackingNumber}`,
      { headers: this.headers }
    );
    return response.data;
  }

  async registerWebhook(webhookData) {
    const response = await axios.post(
      `${this.baseURL}/partner/webhooks`,
      webhookData,
      { headers: this.headers }
    );
    return response.data;
  }
}

// Usage
(async () => {
  const client = new FastForwardClient('ff_sk_live_abc123', 'your_secret_key');
  await client.authenticate();

  // Get shipments
  const shipments = await client.getShipments({
    status: 'in_transit',
    limit: 50
  });
  console.log(shipments);

  // Create new shipment
  const newShipment = await client.createShipment({
    trackingNumber: 'YOUR-001',
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890'
    },
    pickupLocation: {
      address: '123 Warehouse St, NY'
    },
    dropoffLocation: {
      address: '456 Main St, CA'
    },
    packages: [{
      weight: 2.5,
      contents: 'Electronics'
    }]
  });
  console.log(newShipment);
})();
```

---

### Python

```python
import requests
import json

class FastForwardClient:
    def __init__(self, api_key, secret):
        self.api_key = api_key
        self.secret = secret
        self.token = None
        self.base_url = 'https://api.logisticshub.com/v1'
        self.headers = {'Content-Type': 'application/json'}

    def authenticate(self):
        response = requests.post(
            f'{self.base_url}/partner/auth',
            json={'apiKey': self.api_key, 'secret': self.secret}
        )
        self.token = response.json()['token']
        self.headers['Authorization'] = f'Bearer {self.token}'

    def get_shipments(self, filters=None):
        response = requests.get(
            f'{self.base_url}/partner/shipments',
            headers=self.headers,
            params=filters or {}
        )
        return response.json()

    def create_shipment(self, shipment_data):
        response = requests.post(
            f'{self.base_url}/partner/shipments',
            headers=self.headers,
            json=shipment_data
        )
        return response.json()

    def track_shipment(self, tracking_number):
        response = requests.get(
            f'{self.base_url}/partner/tracking/{tracking_number}',
            headers=self.headers
        )
        return response.json()

    def register_webhook(self, webhook_data):
        response = requests.post(
            f'{self.base_url}/partner/webhooks',
            headers=self.headers,
            json=webhook_data
        )
        return response.json()

# Usage
client = FastForwardClient('ff_sk_live_abc123', 'your_secret_key')
client.authenticate()

# Get shipments
shipments = client.get_shipments({'status': 'in_transit', 'limit': 50})
print(json.dumps(shipments, indent=2))

# Create shipment
new_shipment = client.create_shipment({
    'trackingNumber': 'YOUR-001',
    'customer': {
        'name': 'John Doe',
        'email': 'john@example.com',
        'phone': '+1234567890'
    },
    'pickupLocation': {'address': '123 Warehouse St, NY'},
    'dropoffLocation': {'address': '456 Main St, CA'},
    'packages': [{'weight': 2.5, 'contents': 'Electronics'}]
})
print(json.dumps(new_shipment, indent=2))
```

---

### cURL Command-Line

```bash
#!/bin/bash

# Configuration
API_KEY="ff_sk_live_abc123"
SECRET="your_secret_key"
API_BASE="https://api.logisticshub.com/v1"

# Step 1: Authenticate
AUTH_RESPONSE=$(curl -s -X POST "$API_BASE/partner/auth" \
  -H "Content-Type: application/json" \
  -d "{\"apiKey\": \"$API_KEY\", \"secret\": \"$SECRET\"}")

TOKEN=$(echo $AUTH_RESPONSE | jq -r '.token')
echo "Token: $TOKEN"

# Step 2: Get shipments
curl -s -X GET "$API_BASE/partner/shipments?status=in_transit&limit=5" \
  -H "Authorization: Bearer $TOKEN" | jq '.'

# Step 3: Track shipment
curl -s -X GET "$API_BASE/partner/tracking/FF-2025-001234" \
  -H "Authorization: Bearer $TOKEN" | jq '.'

# Step 4: Create shipment
curl -s -X POST "$API_BASE/partner/shipments" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "trackingNumber": "YOUR-001",
    "customer": {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890"
    },
    "pickupLocation": {"address": "123 Warehouse St, NY"},
    "dropoffLocation": {"address": "456 Main St, CA"},
    "packages": [{"weight": 2.5, "contents": "Electronics"}]
  }' | jq '.'
```

---

## Setting Up Webhooks

### 1. Create Webhook Listener (Node.js)

```javascript
const express = require('express');
const crypto = require('crypto');
const app = express();

app.use(express.json());

// Verify webhook signature
function verifySignature(payload, signature, secret) {
  const hash = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
  
  return hash === signature;
}

// Webhook endpoint
app.post('/webhooks/fastforward', (req, res) => {
  const signature = req.headers['x-webhook-signature'];
  const event = req.headers['x-webhook-event'];
  
  // Verify signature
  if (!verifySignature(req.body, signature, 'your-webhook-secret')) {
    return res.status(401).send('Unauthorized');
  }

  // Handle different events
  switch(event) {
    case 'shipment.created':
      console.log('Shipment created:', req.body.data);
      // Save to database, trigger business logic, etc.
      break;
    
    case 'shipment.delivered':
      console.log('Shipment delivered:', req.body.data);
      // Update records, notify customer, etc.
      break;
    
    case 'shipment.failed':
      console.log('Delivery failed:', req.body.data);
      // Alert operations team
      break;
    
    default:
      console.log('Unknown event:', event);
  }

  res.status(200).send('OK');
});

app.listen(3000, () => {
  console.log('Webhook listener on port 3000');
});
```

### 2. Register Webhook

```bash
curl -X POST https://api.logisticshub.com/v1/partner/webhooks \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-company.com/webhooks/fastforward",
    "events": ["shipment.created", "shipment.updated", "shipment.delivered"],
    "active": true,
    "description": "Main webhook for shipment events"
  }'
```

### 3. Test Webhook

Use a tool like webhook.site:
1. Get a unique URL: https://webhook.site/unique-id
2. Register it as a webhook
3. Create a test shipment
4. See the events arrive

---

## Production Checklist

- [ ] Store API keys in environment variables
- [ ] Implement token refresh (before expiry)
- [ ] Set up error logging and alerting
- [ ] Implement exponential backoff for retries
- [ ] Verify webhook signatures on all events
- [ ] Monitor API rate limits
- [ ] Test disaster recovery scenarios
- [ ] Set up uptime monitoring
- [ ] Document API integration in your systems
- [ ] Train team on API usage
- [ ] Set up alerting for failed deliveries
- [ ] Implement caching where appropriate
- [ ] Test during peak load
- [ ] Review security best practices
- [ ] Set up backup mechanisms

---

## Common Issues & Solutions

### Issue: "Invalid token"
**Solution:** Token may have expired. Generate a new one.

### Issue: "Rate limit exceeded"
**Solution:** Implement exponential backoff. Check your tier limits.

### Issue: Webhooks not arriving
**Solution:** 
1. Verify webhook URL is publicly accessible
2. Check firewall rules
3. Verify HMAC signature code
4. Check webhook logs in dashboard

### Issue: "Missing required fields"
**Solution:** Verify request payload matches API documentation. Check field names and data types.

---

## Performance Tips

1. **Batch requests** when possible
2. **Use pagination** for large result sets
3. **Cache frequently accessed data**
4. **Implement local queuing** for offline resilience
5. **Use async operations** for non-blocking calls
6. **Monitor connection pooling**
7. **Compress webhook payloads**

---

## Support

- **Slack Community:** #fastforward-partners
- **Email:** partners@logisticshub.com
- **Phone:** +1-555-COURIER-1
- **Documentation:** https://docs.logisticshub.com
- **Status:** https://status.logisticshub.com
