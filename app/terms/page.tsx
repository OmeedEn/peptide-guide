import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — PeptideGuide',
  description: 'Terms of Service for PeptideGuide. Read our terms regarding use of our peptide education and recommendation platform.',
}

export default function TermsPage() {
  return (
    <div className="molecular-bg min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="glass-card p-8 sm:p-12">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
            Terms of Service
          </h1>
          <p className="text-sm text-slate-500 mb-10">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="space-y-8 text-sm sm:text-base text-slate-400 leading-relaxed">
            <section>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-white mb-3">
                1. Service Description
              </h2>
              <p>
                PeptideGuide (&quot;the Service&quot;) is an educational platform that provides
                research-backed information about peptides, including an interactive quiz that
                generates personalized peptide recommendation reports. The Service is strictly
                for <strong className="text-slate-300">educational and informational purposes only</strong> and
                does not constitute medical advice, diagnosis, or treatment.
              </p>
              <p className="mt-3">
                The content provided through PeptideGuide is compiled from published research,
                FDA databases, clinical trials, and other publicly available scientific sources.
                We do not sell, manufacture, distribute, or prescribe any peptides or pharmaceutical products.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-white mb-3">
                2. Not Medical Advice
              </h2>
              <p>
                The information on PeptideGuide is not intended to replace professional medical
                advice, diagnosis, or treatment. Many peptides discussed on this platform are
                not FDA-approved for the uses described and may carry significant health risks.
              </p>
              <p className="mt-3">
                You should <strong className="text-slate-300">always consult with a qualified healthcare
                provider</strong> before starting, stopping, or modifying any health-related regimen,
                including the use of peptides. Reliance on any information provided by PeptideGuide
                is solely at your own risk.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-white mb-3">
                3. Payment Terms
              </h2>
              <p>
                PeptideGuide offers a personalized peptide recommendation report for a one-time
                fee of $3.00 USD. Payment is processed securely through Stripe. By completing
                a purchase, you agree to the following:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1.5 text-slate-400">
                <li>The $3.00 fee is a one-time charge with no recurring billing.</li>
                <li>
                  Because the report is a <strong className="text-slate-300">digital good delivered
                  immediately</strong> upon purchase, all sales are final and no refunds will be issued.
                </li>
                <li>
                  You will receive your personalized report immediately after payment is confirmed.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-white mb-3">
                4. User Responsibilities
              </h2>
              <p>By using PeptideGuide, you agree to:</p>
              <ul className="list-disc list-inside mt-3 space-y-1.5 text-slate-400">
                <li>Use the Service for personal educational purposes only.</li>
                <li>
                  Consult a licensed healthcare provider before acting on any information
                  obtained from the Service.
                </li>
                <li>
                  Provide accurate information when using the recommendation quiz, understanding
                  that inaccurate inputs may lead to less relevant recommendations.
                </li>
                <li>Not redistribute, resell, or commercially exploit the content or reports.</li>
                <li>Not attempt to reverse-engineer, scrape, or systematically download content from the Service.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-white mb-3">
                5. Disclaimer of Warranties
              </h2>
              <p>
                The Service is provided on an <strong className="text-slate-300">&quot;as is&quot; and
                &quot;as available&quot;</strong> basis without warranties of any kind, either express
                or implied. We do not warrant that:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1.5 text-slate-400">
                <li>The information is complete, accurate, or up-to-date at all times.</li>
                <li>The Service will be uninterrupted, secure, or error-free.</li>
                <li>Any particular health outcome will result from following the information provided.</li>
                <li>The peptides discussed are safe or effective for any specific individual.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-white mb-3">
                6. Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by applicable law, PeptideGuide and its owners,
                operators, and affiliates shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages arising out of or related to your
                use of the Service. This includes, without limitation, damages for loss of
                profits, health complications, data loss, or other intangible losses.
              </p>
              <p className="mt-3">
                Our total liability for any claim arising from the Service shall not exceed
                the amount you paid to us in the twelve (12) months preceding the claim.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-white mb-3">
                7. Intellectual Property
              </h2>
              <p>
                All content on PeptideGuide, including text, graphics, data compilations,
                software, and report templates, is the property of PeptideGuide or its
                licensors and is protected by copyright and other intellectual property laws.
              </p>
              <p className="mt-3">
                Your personalized report is licensed to you for personal, non-commercial use
                only. You may not reproduce, distribute, or publicly display any content from
                the Service without prior written permission.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-white mb-3">
                8. Changes to Terms
              </h2>
              <p>
                We reserve the right to modify these Terms at any time. Changes will be
                effective immediately upon posting to the Service. Your continued use of the
                Service after changes are posted constitutes acceptance of the revised Terms.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-white mb-3">
                9. Governing Law
              </h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws
                of the State of California, United States, without regard to its conflict
                of law provisions. Any disputes arising under these Terms shall be resolved
                in the courts located in Los Angeles County, California.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-white mb-3">
                10. Contact
              </h2>
              <p>
                If you have questions about these Terms, please contact us
                at <a href="mailto:support@peptideguide.com" className="text-neon-teal hover:underline">support@peptideguide.com</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
