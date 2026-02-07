import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FastForward - Reliable Courier & Warehousing SaaS",
  description: "Complete logistics management platform for couriers, warehousing, and shipping services. Faster is Always Better.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        {children}
      </body>
    </html>
  );
}
