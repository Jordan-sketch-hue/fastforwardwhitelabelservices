import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { branding } from "@/config/branding";
import { getStructuredData } from "@/lib/structured-data";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${branding.companyName} - ${branding.tagline}`,
  description: branding.description,
  keywords: ["logistics", "courier", "warehouse", "shipping", "tracking", "freight forwarding"],
  authors: [{ name: branding.companyName }],
  openGraph: {
    title: `${branding.companyName} - ${branding.tagline}`,
    description: branding.description,
    url: branding.appUrl,
    siteName: branding.companyName,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${branding.companyName} - ${branding.tagline}`,
    description: branding.description,
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = getStructuredData()
  
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${inter.className} bg-white`}>
        {children}
      </body>
    </html>
  );
}
