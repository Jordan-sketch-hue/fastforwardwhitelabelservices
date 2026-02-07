'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-orange-500 text-white py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-purple-100">Last updated: January 2025</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl shadow-sm p-8 space-y-8">
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                FastForward ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Personal Information</h3>
                  <p>We collect information you provide directly, such as name, email, phone number, company details, and billing information when you create an account or use our services.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Shipment Data</h3>
                  <p>We collect shipment and package information necessary to provide delivery tracking, including origin, destination, package contents, and delivery status.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Usage Data</h3>
                  <p>We automatically collect information about how you interact with our platform, including IP addresses, browser type, pages visited, and access times.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Cookies</h3>
                  <p>We use cookies and similar tracking technologies to enhance your experience and analyze platform usage patterns.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <ul className="text-gray-700 space-y-3 list-disc list-inside">
                <li>Providing, maintaining, and improving our services</li>
                <li>Processing transactions and sending related information</li>
                <li>Sending promotional communications (with your consent)</li>
                <li>Responding to your inquiries and customer support requests</li>
                <li>Analyzing usage patterns to enhance our platform</li>
                <li>Detecting and preventing fraudulent transactions and abuse</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We implement comprehensive security measures to protect your personal information, including:
              </p>
              <ul className="text-gray-700 space-y-2 list-disc list-inside mt-3">
                <li>256-bit SSL encryption for all data in transit</li>
                <li>Secure password hashing and storage</li>
                <li>Regular security audits and penetration testing</li>
                <li>Industry-standard firewall and intrusion detection</li>
                <li>Access controls and role-based permissions</li>
                <li>Data backup and disaster recovery protocols</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Retention</h2>
              <p className="text-gray-700 leading-relaxed">
                We retain your personal information for as long as necessary to provide services and comply with legal obligations. You can request deletion of your data at any time, subject to legal requirements for record-keeping.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Third-Party Sharing</h2>
              <p className="text-gray-700 leading-relaxed">
                We do not sell your personal information. We may share data with:
              </p>
              <ul className="text-gray-700 space-y-2 list-disc list-inside mt-3">
                <li>Service providers (payment processors, hosting providers)</li>
                <li>Legal authorities when required by law</li>
                <li>Business partners with your explicit consent</li>
                <li>Successor entities in case of merger or acquisition</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-3">You have the right to:</p>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Export your data in a portable format</li>
                <li>Lodge complaints with data protection authorities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. International Transfers</h2>
              <p className="text-gray-700 leading-relaxed">
                Your information may be transferred to, and maintained on, computers located outside of your state, province, country or other governmental jurisdiction. By using FastForward, you consent to the transfer of your information to countries outside your country of residence.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. GDPR Compliance</h2>
              <p className="text-gray-700 leading-relaxed">
                For users in the European Union, we comply with the General Data Protection Regulation (GDPR). We process your data based on your consent, contract fulfillment, or legitimate business interests. You have enhanced rights including the right to be forgotten and data portability.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. CCPA Compliance</h2>
              <p className="text-gray-700 leading-relaxed">
                For California residents, we comply with the California Consumer Privacy Act (CCPA). You have the right to know what data is collected, to delete your data, and to opt-out of data sales.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy periodically. We will notify you of significant changes by email or by posting a notice on our website. Your continued use of FastForward constitutes your acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                <p className="text-gray-900"><strong>FastForward Privacy Team</strong></p>
                <p className="text-gray-600">Email: privacy@fastforward.io</p>
                <p className="text-gray-600">Address: 123 Business Ave, Tech City, TC 12345</p>
                <p className="text-gray-600">Phone: 1-800-FORWARD-1</p>
              </div>
            </section>

            <section className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-bold text-blue-900 mb-2">Data Protection Officer</h3>
              <p className="text-blue-800 text-sm">FastForward has appointed a Data Protection Officer to oversee compliance with privacy laws. You can contact our DPO at dpo@fastforward.io</p>
            </section>
          </div>

          {/* Navigation */}
          <div className="mt-12 flex justify-center gap-4">
            <Link href="/legal/terms" className="text-purple-600 hover:underline font-semibold">Terms of Service</Link>
            <span className="text-gray-300">•</span>
            <Link href="/legal/security" className="text-purple-600 hover:underline font-semibold">Security</Link>
            <span className="text-gray-300">•</span>
            <Link href="/" className="text-purple-600 hover:underline font-semibold">Back to Home</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
