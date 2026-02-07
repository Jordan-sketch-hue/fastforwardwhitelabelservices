'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function TermsPage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-orange-500 text-white py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-purple-100">Last updated: January 2025</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl shadow-sm p-8 space-y-8">
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using FastForward, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use License</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Permission is granted to temporarily download one copy of the materials (information or software) on FastForward for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li>Modifying or copying the materials</li>
                <li>Using the materials for any commercial purpose or for any public display</li>
                <li>Attempting to decompile or reverse engineer any software contained on FastForward</li>
                <li>Removing any copyright or other proprietary notations from the materials</li>
                <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Disclaimer</h2>
              <p className="text-gray-700 leading-relaxed">
                The materials on FastForward are provided on an 'as is' basis. FastForward makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Limitations</h2>
              <p className="text-gray-700 leading-relaxed">
                In no event shall FastForward or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on FastForward, even if FastForward or an authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Accuracy of Materials</h2>
              <p className="text-gray-700 leading-relaxed">
                The materials appearing on FastForward could include technical, typographical, or photographic errors. FastForward does not warrant that any of the materials on this website are accurate, complete, or current. FastForward may make changes to the materials contained on its website at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Materials on Third Party Websites</h2>
              <p className="text-gray-700 leading-relaxed">
                FastForward has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by FastForward of the site. Use of any such linked website is at the user's own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Modifications to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                FastForward may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws of the United States of America, and you irrevocably submit to the exclusive jurisdiction of the courts located in this location.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. User Accounts</h2>
              <div className="space-y-3 text-gray-700">
                <p>When you create an account on FastForward, you are responsible for:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Maintaining the confidentiality of your password</li>
                  <li>Accepting responsibility for all activities under your account</li>
                  <li>Notifying us immediately of any unauthorized use of your account</li>
                  <li>Providing accurate, complete, and current account information</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Acceptable Use</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                You agree not to use FastForward for any purpose that is unlawful or prohibited by these terms. You agree not to:
              </p>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li>Harass, abuse, or threaten others</li>
                <li>Use automated tools to scrape or collect data</li>
                <li>Transmit viruses, malware, or harmful code</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Engage in any illegal activity or content</li>
                <li>Infringe on intellectual property rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Intellectual Property Rights</h2>
              <p className="text-gray-700 leading-relaxed">
                All content on FastForward, including text, graphics, logos, images, and software, is the property of FastForward or its suppliers and is protected by international copyright and intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                To the fullest extent permitted by applicable law, FastForward shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from use of or inability to use the website or services, even if FastForward has been advised of the possibility of such damages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Indemnification</h2>
              <p className="text-gray-700 leading-relaxed">
                You agree to indemnify, defend, and hold harmless FastForward and its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of the website or violation of these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Termination</h2>
              <p className="text-gray-700 leading-relaxed">
                FastForward may terminate your account and access to the website at any time, for any reason, with or without notice. Upon termination, all rights granted to you will cease, and you must destroy all copies of materials obtained from the website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Pricing and Billing</h2>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li>Prices are subject to change with 30 days notice</li>
                <li>Billing occurs on the day of signup and each month thereafter</li>
                <li>Cancellation takes effect at the end of the current billing period</li>
                <li>No refunds provided for partial months</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-gray-900"><strong>FastForward Legal Team</strong></p>
                <p className="text-gray-600">Email: legal@fastforward.io</p>
                <p className="text-gray-600">Address: 123 Business Ave, Tech City, TC 12345</p>
              </div>
            </section>
          </div>

          {/* Navigation */}
          <div className="mt-12 flex justify-center gap-4">
            <Link href="/legal/privacy" className="text-purple-600 hover:underline font-semibold">Privacy Policy</Link>
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
