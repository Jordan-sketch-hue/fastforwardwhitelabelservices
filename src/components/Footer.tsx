'use client'

import Link from 'next/link'
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-orange-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">FF</span>
              </div>
              <h3 className="text-xl font-bold">FastForward</h3>
            </div>
            <p className="text-gray-400 text-sm">Faster Is Always Better</p>
            <p className="text-gray-400 text-sm mt-2">Complete logistics management platform</p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-bold mb-4">Products</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="#pricing" className="hover:text-white transition">Courier Platform</Link></li>
              <li><Link href="#pricing" className="hover:text-white transition">Warehouse Platform</Link></li>
              <li><Link href="#pricing" className="hover:text-white transition">White Label Solution</Link></li>
              <li><Link href="#pricing" className="hover:text-white transition">API Access</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="hover:text-white transition">Terms of Service</Link></li>
              <li><Link href="/legal/security" className="hover:text-white transition">Security & Compliance</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <div className="space-y-3 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-purple-500" />
                <span>support@fastforward.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-purple-500" />
                <span>1-800-FASTFWD</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-purple-500" />
                <span>Multiple Locations Worldwide</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} FastForward. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-purple-500 transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-500 transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-500 transition">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
