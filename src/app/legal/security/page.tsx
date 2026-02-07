'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Shield, Lock, CheckCircle, AlertCircle, Key, Eye } from 'lucide-react'

export default function SecurityPage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-orange-500 text-white py-12">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-10 h-10" />
              <h1 className="text-4xl font-bold">Security & Compliance</h1>
            </div>
            <p className="text-purple-100">Your data security is our top priority</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl shadow-sm p-8 space-y-10">
            
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Security Standards</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-green-200 bg-green-50 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <h3 className="font-bold text-green-900">SOC 2 Type II</h3>
                  </div>
                  <p className="text-green-800 text-sm">Certified and audited by third-party security firm. Covers security, availability, processing integrity, confidentiality, and privacy.</p>
                </div>

                <div className="border border-blue-200 bg-blue-50 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                    <h3 className="font-bold text-blue-900">GDPR Compliant</h3>
                  </div>
                  <p className="text-blue-800 text-sm">Full compliance with European General Data Protection Regulation. User data rights, consent, and deletion guaranteed.</p>
                </div>

                <div className="border border-purple-200 bg-purple-50 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="w-6 h-6 text-purple-600" />
                    <h3 className="font-bold text-purple-900">ISO 27001</h3>
                  </div>
                  <p className="text-purple-800 text-sm">Information Security Management System certified. Ensures systematic data protection and secure operations.</p>
                </div>

                <div className="border border-orange-200 bg-orange-50 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="w-6 h-6 text-orange-600" />
                    <h3 className="font-bold text-orange-900">CCPA Compliant</h3>
                  </div>
                  <p className="text-orange-800 text-sm">California Consumer Privacy Act compliance. Full data access, deletion, and opt-out capabilities for California residents.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Protection</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Lock className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Encryption in Transit</h3>
                    <p className="text-gray-700">All data transmitted between your browser and our servers is encrypted using TLS 1.2 or higher with 256-bit encryption.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Key className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Encryption at Rest</h3>
                    <p className="text-gray-700">All stored data is encrypted using AES-256 encryption. Database encryption keys are rotated regularly and managed via AWS KMS.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Eye className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Access Control</h3>
                    <p className="text-gray-700">Role-based access control (RBAC) ensures employees only access data necessary for their role. Multi-factor authentication required for all accounts.</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Infrast Reliability</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-bold text-blue-900 mb-3">99.99% Uptime Guarantee</h3>
                <ul className="text-blue-800 space-y-2 list-disc list-inside">
                  <li>Hosted on AWS with multi-region redundancy</li>
                  <li>Automatic failover and load balancing</li>
                  <li>Real-time monitoring and alerts</li>
                  <li>Regular disaster recovery testing</li>
                  <li>Daily automated backups with 30-day retention</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Security Practices</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-purple-600 pl-4 py-2">
                  <h3 className="font-bold text-gray-900">Penetration Testing</h3>
                  <p className="text-gray-700 text-sm">Annual third-party penetration testing performed by certified security professionals to identify vulnerabilities.</p>
                </div>

                <div className="border-l-4 border-blue-600 pl-4 py-2">
                  <h3 className="font-bold text-gray-900">Vulnerability Scanning</h3>
                  <p className="text-gray-700 text-sm">Automated weekly vulnerability scans of all systems. Monthly manual security code review by dedicated security team.</p>
                </div>

                <div className="border-l-4 border-green-600 pl-4 py-2">
                  <h3 className="font-bold text-gray-900">Incident Response</h3>
                  <p className="text-gray-700 text-sm">24/7 security monitoring. Dedicated incident response team with documented procedures for immediate mitigation.</p>
                </div>

                <div className="border-l-4 border-orange-600 pl-4 py-2">
                  <h3 className="font-bold text-gray-900">Employee Training</h3>
                  <p className="text-gray-700 text-sm">All employees undergo mandatory security awareness training. Quarterly updates on emerging threats and best practices.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">API Security</h2>
              <div className="space-y-3 text-gray-700">
                <p><strong>Rate Limiting:</strong> API endpoints are protected with intelligent rate limiting to prevent abuse and distributed attacks.</p>
                <p><strong>API Keys:</strong> Cryptographically signed with SHA-256. Automatic key rotation recommended every 90 days.</p>
                <p><strong>Webhook Verification:</strong> All webhooks signed with HMAC-SHA256 to verify authenticity and prevent man-in-the-middle attacks.</p>
                <p><strong>OAuth 2.0:</strong> Support for OAuth 2.0 for secure third-party integrations without exposing credentials.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Compliance Roadmap</h2>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span><strong>2024 Q4:</strong> Achieved SOC 2 Type II certification</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span><strong>2024 Q4:</strong> GDPR compliance fully implemented</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span><strong>2025 Q1:</strong> ISO 27001 certification completed</span>
                </div>
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span><strong>2025 Q2:</strong> HIPAA compliance (for healthcare customers)</span>
                </div>
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span><strong>2025 Q3:</strong> PCI DSS Level 1 for payment processing</span>
                </div>
              </div>
            </section>

            <section className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="font-bold text-yellow-900 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Report a Security Vulnerability
              </h3>
              <p className="text-yellow-800 mb-4">
                If you discover a security vulnerability, please report it responsibly to our security team instead of disclosing it publicly.
              </p>
              <p className="text-yellow-900 font-semibold">Email: security@fastforward.io</p>
              <p className="text-yellow-800 text-sm mt-2">We will acknowledge your report within 24 hours and keep you informed of our progress toward remediation.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Security Contacts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2">Security Officer</h3>
                  <p className="text-gray-600 text-sm">Chief Security Officer</p>
                  <p className="text-purple-600 font-semibold">security@fastforward.io</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2">Data Protection Officer</h3>
                  <p className="text-gray-600 text-sm">GDPR & Compliance Lead</p>
                  <p className="text-purple-600 font-semibold">dpo@fastforward.io</p>
                </div>
              </div>
            </section>
          </div>

          {/* Navigation */}
          <div className="mt-12 flex justify-center gap-4">
            <Link href="/legal/privacy" className="text-purple-600 hover:underline font-semibold">Privacy Policy</Link>
            <span className="text-gray-300">•</span>
            <Link href="/legal/terms" className="text-purple-600 hover:underline font-semibold">Terms of Service</Link>
            <span className="text-gray-300">•</span>
            <Link href="/" className="text-purple-600 hover:underline font-semibold">Back to Home</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
