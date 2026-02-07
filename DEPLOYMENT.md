# FastForward Platform - Complete Setup & Deployment Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Database Setup](#database-setup)
4. [Environment Configuration](#environment-configuration)
5. [Running the Application](#running-the-application)
6. [Testing Features](#testing-features)
7. [GitHub Setup](#github-setup)
8. [Vercel Deployment](#vercel-deployment)
9. [Production Checklist](#production-checklist)
10. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.17 or later ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **Git** for version control ([Download](https://git-scm.com/))
- **PostgreSQL** 12 or later ([Download](https://www.postgresql.org/download/))
- **Code editor** (VS Code recommended)

### Required Accounts (Free tiers available):
- [ ] **Vercel** account ([Sign up](https://vercel.com/signup))
- [ ] **GitHub** account ([Sign up](https://github.com/join))
- [ ] **Stripe** account for payments ([Sign up](https://dashboard.stripe.com/register))
- [ ] **SendGrid** or **Postmark** for emails ([SendGrid](https://signup.sendgrid.com/) | [Postmark](https://postmarkapp.com/))
- [ ] **OpenAI** account for AI chatbot ([Sign up](https://platform.openai.com/signup))
- [ ] **AWS** account for file storage (optional) ([Sign up](https://aws.amazon.com/))

---

## Local Development Setup

### Step 1: Clone the Repository

```bash
# If you have the code locally
cd C:\Users\jader\fastforwardtpcourier

# Or clone from GitHub (after pushing)
git clone https://github.com/YOUR-USERNAME/fastforwardtpcourier.git
cd fastforwardtpcourier
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

This will install all required packages:
- Next.js 16.1.6
- React 19
- Prisma ORM
- TypeScript
- Tailwind CSS
- And all other dependencies

---

## Database Setup

### Step 1: Install PostgreSQL

**Windows:**
1. Download PostgreSQL from [official website](https://www.postgresql.org/download/windows/)
2. Run the installer
3. Remember your password for the `postgres` user
4. Default port is `5432`

**macOS:**
```bash
brew install postgresql@14
brew services start postgresql@14
```

**Linux:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Step 2: Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE fastforward;

# Create user (optional)
CREATE USER fastforward_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE fastforward TO fastforward_user;

# Exit
\q
```

### Step 3: Configure Database URL

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and update the `DATABASE_URL`:

```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/fastforward"
```

### Step 4: Run Prisma Migrations

```bash
# Generate Prisma Client
npx prisma generate

# Create database tables
npx prisma migrate dev --name init

# Seed demo data (optional)
npx prisma db seed
```

### Step 5: View Database (Optional)

```bash
# Open Prisma Studio - a visual database browser
npx prisma studio
```

This will open `http://localhost:5555` where you can view and edit database records.

---

## Environment Configuration

### Required Environment Variables

Open `.env` and configure all required variables:

#### 1. Database (Required)
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/fastforward"
```

#### 2. NextAuth (Required)
```bash
# Generate a secret
openssl rand -base64 32
```

```env
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="paste-generated-secret-here"
```

#### 3. Stripe (Required for Warehouse)
Get keys from [Stripe Dashboard](https://dashboard.stripe.com/apikeys):

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

#### 4. Email Service (Required)

**Option A: SendGrid**
```env
EMAIL_FROM="noreply@yourdomain.com"
SENDGRID_API_KEY="SG.your-api-key"
```

**Option B: Postmark**
```env
EMAIL_FROM="noreply@yourdomain.com"
POSTMARK_API_KEY="your-postmark-api-key"
```

**Option C: SMTP (Gmail)**
```env
EMAIL_FROM="your-email@gmail.com"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="app-specific-password"
```

#### 5. OpenAI (Required for AI Chatbot)
Get key from [OpenAI Platform](https://platform.openai.com/api-keys):

```env
OPENAI_API_KEY="sk-proj-..."
OPENAI_MODEL="gpt-4"
```

#### 6. AWS S3 (Optional - for file uploads)
```env
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_S3_BUCKET="fastforward-storage"
AWS_REGION="us-east-1"
```

#### 7. Twilio SMS (Optional)
```env
TWILIO_ACCOUNT_SID="ACxxxxxxxxx"
TWILIO_AUTH_TOKEN="your-auth-token"
TWILIO_PHONE_NUMBER="+1234567890"
```

### Verify Configuration

```bash
# Test database connection
npx prisma db execute --stdin <<< "SELECT 1;"

# Check environment variables are loaded
npm run dev
```

---

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will start at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
npx prisma studio    # Open database GUI
npx prisma generate  # Generate Prisma Client
npx prisma migrate dev  # Run database migrations
```

---

## Testing Features

### 1. Test Demo Mode

1. Go to `http://localhost:3000`
2. Click "Try Demo"
3. Select "Courier Service" or "Warehouse Service"
4. Explore the dashboard with pre-populated data

**Demo Accounts:**
- **Courier:** Sarah Johnson (2,450 packages, $12.4K revenue)
- **Warehouse:** Michael Chen (8,900 packages, $89.5K revenue)

### 2. Test AI Chatbot

1. Click the chat button (bottom right)
2. Try these queries:
   - "Track shipment FF-2024-123456789"
   - "What's your pricing?"
   - "Show me features"
   - "How do I integrate the API?"

### 3. Test Pages

- **Landing Page:** `http://localhost:3000`
- **Courier Features:** `http://localhost:3000/features/courier`
- **Warehouse Features:** `http://localhost:3000/features/warehouse`
- **Dashboard:** `http://localhost:3000/dashboard?demo=true`
- **Onboarding:** `http://localhost:3000/onboarding`
- **Privacy Policy:** `http://localhost:3000/legal/privacy`
- **Terms of Service:** `http://localhost:3000/legal/terms`
- **Security:** `http://localhost:3000/legal/security`

### 4. Test API Endpoints

```bash
# Get all shipments
curl http://localhost:3000/api/shipments?companyId=test-company-id

# Track shipment
curl http://localhost:3000/api/tracking/FF-2024-123456789

# Get customers
curl http://localhost:3000/api/customers?companyId=test-company-id
```

---

## GitHub Setup

### Step 1: Initialize Git Repository

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: FastForward Platform"
```

### Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository named `fastforwardtpcourier`
3. **Do not** initialize with README, .gitignore, or license

### Step 3: Push to GitHub

```bash
# Add remote
git remote add origin https://github.com/YOUR-USERNAME/fastforwardtpcourier.git

# Push code
git branch -M main
git push -u origin main
```

### Step 4: Verify Push

Go to your GitHub repository and verify all files are uploaded.

---

## Vercel Deployment

### Step 1: Connect GitHub to Vercel

1. Go to [Vercel](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository `fastforwardtpcourier`

### Step 2: Configure Project

**Framework Preset:** Next.js (auto-detected)

**Root Directory:** `./`

**Build Command:** `npm run build`

**Output Directory:** `.next` (auto-detected)

**Install Command:** `npm install`

### Step 3: Configure Environment Variables

In Vercel project settings, add all environment variables from `.env`:

#### Required Variables:
```
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
SENDGRID_API_KEY=SG...
OPENAI_API_KEY=sk-proj-...
```

⚠️ **Important:** Update `NEXTAUTH_URL` to your Vercel domain!

### Step 4: Database Setup (Production)

**Option A: Vercel Postgres (Recommended)**

1. In Vercel project, go to "Storage"
2. Create "Postgres" database
3. Copy connection string to `DATABASE_URL`

**Option B: External Provider**

Use providers like:
- [Supabase](https://supabase.com/) (Free tier available)
- [Neon](https://neon.tech/) (Generous free tier)
- [Railway](https://railway.app/)
- [PlanetScale](https://planetscale.com/)

### Step 5: Run Migrations on Production Database

```bash
# Set production database URL temporarily
DATABASE_URL="your-production-database-url" npx prisma migrate deploy

# Or use Vercel CLI
vercel env pull .env.production
npx prisma migrate deploy
```

### Step 6: Deploy

Click "Deploy" in Vercel. The deployment process will:
1. Install dependencies
2. Run build
3. Deploy to CDN
4. Provide a URL (e.g., `https://fastforwardtpcourier.vercel.app`)

### Step 7: Configure Custom Domain (Optional)

1. Go to Vercel project settings → "Domains"
2. Add your custom domain (e.g., `fastforward.com`)
3. Update DNS records as instructed
4. Update `NEXTAUTH_URL` environment variable to your custom domain

---

## Production Checklist

Before going live, ensure you complete these steps:

### Security
- [ ] Change all API keys to production keys
- [ ] Update `NEXTAUTH_SECRET` with a strong secret
- [ ] Use environment variables for all secrets (never hardcode)
- [ ] Enable HTTPS only (Vercel does this automatically)
- [ ] Set up Stripe webhooks for production
- [ ] Configure CORS properly
- [ ] Enable rate limiting
- [ ] Set up security headers

### Database
- [ ] Production database is created and accessible
- [ ] All migrations are applied
- [ ] Backup strategy is in place
- [ ] Connection pooling is configured (Prisma handles this)
- [ ] Database is in same region as app for low latency

### Email
- [ ] Production email service is configured
- [ ] Email templates are tested
- [ ] Sender domain is verified (SPF, DKIM records)
- [ ] Unsubscribe functionality works

### Monitoring
- [ ] Set up error tracking (Sentry, LogRocket, etc.)
- [ ] Configure analytics (Vercel Analytics, Google Analytics)
- [ ] Set up uptime monitoring
- [ ] Configure alert notifications

### Testing
- [ ] All features tested in production environment
- [ ] Demo mode works correctly
- [ ] All API endpoints tested
- [ ] Payment processing tested with Stripe
- [ ] Email notifications tested
- [ ] Mobile responsiveness verified
- [ ] Cross-browser compatibility checked

### Performance
- [ ] Images are optimized
- [ ] Bundle size is optimized
- [ ] Caching is configured
- [ ] Database queries are optimized
- [ ] CDN is configured (Vercel does this)

### Legal
- [ ] Privacy policy is accurate and up-to-date
- [ ] Terms of service are complete
- [ ] Cookie consent banner (if needed)
- [ ] GDPR compliance verified
- [ ] CCPA compliance verified

### Documentation
- [ ] API documentation is complete
- [ ] User guide is available
- [ ] README is updated
- [ ] Environment variables are documented
- [ ] Troubleshooting guide is available

---

## Troubleshooting

### Build Errors

**Error: "Module not found"**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

**Error: "Prisma Client not generated"**
```bash
npx prisma generate
```

### Database Connection Errors

**Error: "Connection refused"**
- Check PostgreSQL is running: `sudo systemctl status postgresql`
- Verify DATABASE_URL is correct
- Check firewall settings

**Error: "Authentication failed"**
- Verify username and password in DATABASE_URL
- Check user has correct permissions

### Vercel Deployment Errors

**Error: "Build timeout"**
- Check build logs in Vercel dashboard
- Optimize build process
- Increase timeout in Vercel settings

**Error: "Environment variable not found"**
- Verify all variables are set in Vercel project settings
- Redeploy after adding variables

### API Errors

**Error: "500 Internal Server Error"**
- Check Vercel function logs
- Verify database connection
- Check API endpoint code

**Error: "CORS policy"**
- Add proper CORS headers in API routes
- Check origin in requests

### Common Issues

**Issue: Demo mode not working**
- Verify `ENABLE_DEMO_MODE="true"` in environment variables
- Check demo data is correct in `src/lib/demo-data.ts`

**Issue: AI chatbot not responding**
- Verify `OPENAI_API_KEY` is set and valid
- Check OpenAI API quota and billing
- Look for errors in browser console

**Issue: Emails not sending**
- Verify email service credentials
- Check sender email is verified
- Look for errors in Vercel function logs

**Issue: Stripe payments failing**
- Verify Stripe keys (use test keys for testing)
- Check webhook secret is correct
- Verify webhook endpoint is accessible

### Getting Help

If you encounter issues:

1. **Check Logs:**
   - Vercel Dashboard → Functions → View Logs
   - Browser Console (F12)
   - Terminal output

2. **Verify Environment:**
   - All variables are set correctly
   - Database is accessible
   - External services are configured

3. **Search Documentation:**
   - [Next.js Docs](https://nextjs.org/docs)
   - [Prisma Docs](https://www.prisma.io/docs)
   - [Vercel Docs](https://vercel.com/docs)

4. **Contact Support:**
   - Create GitHub issue
   - Contact FastForward support
   - Check community forums

---

## Next Steps

After successful deployment:

1. **Test thoroughly** in production environment
2. **Monitor performance** and errors
3. **Gather user feedback**
4. **Iterate and improve**
5. **Scale as needed**

### Recommended Enhancements:

- Add automated tests (Jest, Playwright)
- Implement CI/CD pipeline (GitHub Actions)
- Add end-to-end encryption for sensitive data
- Implement two-factor authentication
- Add mobile app (React Native)
- Enhance AI chatbot with more context
- Add multi-language support
- Implement advanced analytics dashboard

---

## Support

For questions or issues:

- **Email:** support@fastforward.com
- **Documentation:** https://docs.fastforward.com
- **GitHub Issues:** https://github.com/YOUR-USERNAME/fastforwardtpcourier/issues
- **Community:** https://community.fastforward.com

---

**Congratulations! Your FastForward Platform is now live! 🚀**
