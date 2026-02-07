# FastForward - Courier & Warehousing SaaS Platform

A complete logistics management platform for couriers, warehousing, and shipping services built with Next.js.

## 🚀 Features

### Core Functionality
- **Real-time Package Tracking** - Track shipments in real-time with detailed event history
- **Courier Platform** - Complete solution for courier companies ($34.99/month + $0.20/pkg)
- **Warehouse Platform** - Enterprise warehouse management ($249.99/month + $0.15/pkg)
- **Advanced Reporting** - Comprehensive analytics and business intelligence
- **White Label Solution** - Customize the platform with your branding
- **API Integration** - RESTful API for seamless integration
- **Multi-user Support** - Unlimited users per account
- **Multi-location Support** - Manage multiple warehouses and locations

## 📦 Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Authentication**: JWT (NextAuth.js ready)
- **Database**: Prisma ORM (configured for PostgreSQL)
- **UI Components**: Lucide Icons

## 🛠️ Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   Create a `.env.local` file:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/fastforward"
   NEXTAUTH_URL="http://localhost:3000"
   NEXT_PUBLIC_API_URL="http://localhost:3000"
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to `http://localhost:3000`

## 📁 Key Routes

- **Landing Page**: `/` - Marketing homepage
- **Onboarding**: `/onboarding` - Sign up and account creation
- **Authentication**: `/auth/login` - User login
- **Dashboard**: `/dashboard` - Admin panel
- **API Docs**: `/docs` - API documentation
- **API**: `/api/*` - RESTful endpoints

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new account
- `POST /api/auth/login` - Login

### Packages
- `GET /api/packages` - List packages
- `POST /api/packages` - Create shipment
- `GET /api/packages?tracking=XX` - Track by number

## 🎨 Branding

- **Primary Color**: Purple (#7C3AED)
- **Secondary Color**: Orange (#F97316)
- **Logo**: FF gradient badge

## 📊 Dashboard Features

- Real-time statistics
- Package management
- Shipment tracking
- API key management
- Team settings
- Revenue analytics

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy

### Other Platforms
Works with AWS, Google Cloud, Azure, DigitalOcean, Heroku, etc.

## 📞 Support

- **Documentation**: `/docs`
- **Email**: support@fastforward.com
- **Phone**: 1-800-FASTFWD

## 📄 License

MIT License - See LICENSE file

---

**FastForward** - Faster Is Always Better 🚀
