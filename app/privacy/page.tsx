import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — PeptideGuide',
  description: 'Privacy Policy for PeptideGuide. Learn how we collect, use, and protect your personal information.',
}

export default function PrivacyPage() {
  return (
    <div className="molecular-bg min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="glass-card p-8 sm:p-12">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-500 mb-10">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="space-y-8 text-sm sm:text-base text-slate-400 leading-relaxed">
            <section>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-white mb-3">
                1. Information We Collect
              </h2>
              <p>We collect the following types of information when you use PeptideGuide:</p>

              <h3 className="text-base sm:text-lg font-semibold text-slate-300 mt-4 mb-2">
                Information You Provide
              </h3>
              <ul className="list-disc list-inside space-y-1.5 text-slate-400">
                <li>
                  <strong className="text-slate-300">Quiz responses:</strong> Your answers to the peptide
                  recommendation quiz, including health goals, experience level, and preferences.
                </li>
                <li>
                  <strong className="text-slate-300">Email address:</strong> If you provide it for report
                  delivery or communication.
                </li>
                <li>
                  <strong className="text-slate-300">Payment information:</strong> Processed securely through
                  Stripe. We do not store your credit card number, CVV, or full card details on our servers.
                </li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-slate-300 mt-4 mb-2">
                Automatically Collected Information
              </h3>
              <ul className="list-disc list-inside space-y-1.5 text-slate-400">
                <li>Browser type, device type, and operating system.</li>
                <li>Pages visited, time spent, and general usage patterns.</li>
                <li>IP address and approximate geographic location.</li>
                <li>Referring URL and search terms that led you to our site.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-white mb-3">
                2. How We Use Your Information
              </h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside mt-3 space-y-1.5 text-slate-400">
                <li>Generate your personalized peptide recommendation report based on quiz answers.</li>
                <li>Process payments and deliver digital products.</li>
                <li>Improve the accuracy and relevance of our recommendation algorithm.</li>
                <li>Analyze usage patterns to improve the Service and user experience.</li>
                <li>Communicate with you about your purchase or respond to inquiries.</li>
                <li>Comply with legal obligations.</li>
              </ul>
              <p className="mt-3">
                We do <strong className="text-slate-300">not</strong> sell, rent, or share your personal
                information with third parties for their marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-white mb-3">
                3. Third-Party Services
              </h2>
              <p>We use the following third-party services that may process your data:</p>
              <ul className="list-disc list-inside mt-3 space-y-1.5 text-slate-400">
                <li>
                  <strong className="text-slate-300">Stripe:</strong> For secure payment processing.
                  Stripe&apos;s privacy policy governs their handling of your payment data.
                  See <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-neon-teal hover:underline">stripe.com/privacy</a>.
                </li>
                <li>
                  <strong className="text-slate-300">Vercel:</strong> For hosting and serving the application.
                  See <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-neon-teal hover:underline">vercel.com/legal/privacy-policy</a>.
                </li>
                <li>
                  <strong className="text-slate-300">Analytics:</strong> We may use privacy-focused analytics
                  to understand site usage. No personally identifiable information is shared with analytics providers.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-white mb-3">
                4. Cookies
              </h2>
              <p>
                PeptideGuide uses minimal cookies. We do not use advertising or tracking cookies.
                The cookies we may use include:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1.5 text-slate-400">
                <li>
                  <strong className="text-slate-300">Essential cookies:</strong> Required for the site to
                  function (e.g., session management, payment processing).
                </li>
                <li>
                  <strong className="text-slate-300">Analytics cookies:</strong> Anonymous usage data to help
                  us understand how visitors interact with the site. These do not identify you personally.
                </li>
              </ul>
              <p className="mt-3">
                You can configure your browser to block cookies, though this may affect site functionality.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-white mb-3">
                5. Data Retention
              </h2>
              <p>We retain your information as follows:</p>
              <ul className="list-disc list-inside mt-3 space-y-1.5 text-slate-400">
                <li>
                  <strong className="text-slate-300">Quiz responses:</strong> Retained for up to 12 months
                  to support report generation and service improvements, then anonymized or deleted.
                </li>
                <li>
                  <strong className="text-slate-300">Payment records:</strong> Retained as required by
                  applicable tax and financial regulations (typically 7 years).
                </li>
                <li>
                  <strong className="text-slate-300">Analytics data:</strong> Aggregated and anonymized;
                  individual session data is not retained beyond 26 months.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-white mb-3">
                6. Your Rights
              </h2>
              <p>You have the right to:</p>
              <ul className="list-disc list-inside mt-3 space-y-1.5 text-slate-400">
                <li>
                  <strong className="text-slate-300">Access:</strong> Request a copy of the personal data
                  we hold about you.
                </li>
                <li>
                  <strong className="text-slate-300">Correction:</strong> Request correction of inaccurate
                  personal data.
                </li>
                <li>
                  <strong className="text-slate-300">Deletion:</strong> Request deletion of your personal
                  data, subject to legal retention requirements.
                </li>
                <li>
                  <strong className="text-slate-300">Portability:</strong> Request your data in a
                  machine-readable format.
                </li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, contact us
                at <a href="mailto:privacy@peptideguide.com" className="text-neon-teal hover:underline">privacy@peptideguide.com</a>.
                We will respond to requests within 30 days.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-white mb-3">
                7. Data Security
              </h2>
              <p>
                We implement reasonable technical and organizational measures to protect your
                personal information, including encrypted connections (HTTPS), secure payment
                processing through Stripe, and access controls on our systems. However, no
                method of electronic transmission or storage is 100% secure, and we cannot
                guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-white mb-3">
                8. Children&apos;s Privacy
              </h2>
              <p>
                PeptideGuide is not intended for individuals under the age of 18. We do not
                knowingly collect personal information from minors. If we learn that we have
                collected data from a child under 18, we will take steps to delete it promptly.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-white mb-3">
                9. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will be posted on
                this page with an updated revision date. Your continued use of the Service after
                changes are posted constitutes acceptance of the revised policy.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-white mb-3">
                10. Contact Us
              </h2>
              <p>
                For privacy-related questions or to exercise your data rights, contact us
                at <a href="mailto:privacy@peptideguide.com" className="text-neon-teal hover:underline">privacy@peptideguide.com</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
