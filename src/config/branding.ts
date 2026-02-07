// Branding Configuration - Customize for White-Label
export const branding = {
  // Company Details
  companyName: "LogisticsHub",
  tagline: "Enterprise Logistics Platform",
  description: "Streamline your courier and warehouse operations with intelligent tracking and management",

  // URLs
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "https://logisticshub.vercel.app",
  supportEmail: "support@logisticshub.com",
  
  // Colors (Tailwind classes)
  primary: "purple",      // purple-600
  accent: "pink",         // pink-600
  secondary: "orange",    // orange-600
  
  // Gradients
  gradientStart: "from-purple-600",
  gradientMiddle: "via-pink-500",
  gradientEnd: "to-orange-500",
  
  // Features Toggle
  features: {
    courier: true,
    warehouse: true,
    aiChat: true,
    billing: true,
    apiIntegration: true,
    whiteLabel: true,
  },

  // Social Links
  social: {
    twitter: "https://twitter.com/logisticshub",
    linkedin: "https://linkedin.com/company/logisticshub",
    github: "https://github.com/jordan-sketch-hue",
  },

  // Support
  support: {
    phone: "+1 (555) 123-4567",
    email: "support@logisticshub.com",
    website: "https://logisticshub.com",
  },
};
