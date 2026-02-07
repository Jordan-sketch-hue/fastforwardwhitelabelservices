import { branding } from "@/config/branding"

export function getStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": branding.companyName,
    "description": branding.description,
    "applicationCategory": "BusinessApplication",
    "url": branding.appUrl,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free tier available"
    },
    "organizationName": branding.companyName,
    "organizationUrl": branding.appUrl,
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "email": branding.support.email,
      "telephone": branding.support.phone,
      "url": branding.support.website
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "ratingCount": "200",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5",
          "worstRating": "1"
        },
        "author": {
          "@type": "Person",
          "name": "Sarah Johnson"
        },
        "reviewBody": "LogisticsHub transformed how we manage deliveries. Our tracking accuracy improved by 99.8%.",
        "datePublished": "2024-12-15"
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5",
          "worstRating": "1"
        },
        "author": {
          "@type": "Person",
          "name": "Michael Chen"
        },
        "reviewBody": "The white-label solution allowed us to rebrand for our customers.",
        "datePublished": "2024-12-10"
      }
    ]
  }
}
