import { Shield, ArrowLeft, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  const currentDate = new Date().toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>

        {/* Header */}
        <div className="mb-12 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-lg shadow-lg shadow-cyan-500/20">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              HOMELAND RECOVERY SERVICES LTD
            </h1>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            TERMS OF SERVICE
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 text-sm text-slate-600 dark:text-slate-400">
            <div>
              <span className="font-semibold">Effective Date:</span> {currentDate}
            </div>
            <div>
              <span className="font-semibold">Last Updated:</span> {currentDate}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            Welcome to Homeland Recovery Services Ltd ("Homeland Recovery Services", "we", "us", or "our").
          </p>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            These Terms of Service ("Terms") govern your access to and use of our website, platforms, products and services (collectively, the "Services").
          </p>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
            By accessing our website, registering for an account, submitting a request, engaging our services, making a payment, or otherwise using our Services, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you should not use our Services.
          </p>

          {/* Section 1 */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              1. ABOUT OUR SERVICES
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Homeland Recovery Services Ltd provides recovery, claims assistance, asset recovery, consultancy, documentation, advisory and related services.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              The specific nature, scope, duration, cost and conditions of each service shall be communicated to the client before engagement where applicable.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">Our Services may include:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 mb-4 ml-4">
              <li>Initial consultation and assessment;</li>
              <li>Case or claim review;</li>
              <li>Documentation and verification support;</li>
              <li>Recovery-related assistance;</li>
              <li>Communication and liaison with relevant parties;</li>
              <li>Advisory and administrative support;</li>
              <li>Follow-up and case monitoring; and</li>
              <li>Other services expressly agreed with the client.</li>
            </ul>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Nothing on our website constitutes a guarantee that a particular recovery, claim, dispute or matter will be successful.
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              2. ELIGIBILITY
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              You must provide accurate information and have the legal capacity to enter into a binding agreement when using our Services.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Where you act on behalf of another person, company, organisation, estate or entity, you confirm that you have the authority to do so.
            </p>
          </section>

          {/* Section 3 */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              3. CLIENT INFORMATION
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              You agree to provide complete, accurate and truthful information reasonably required for us to provide the Services.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              You are responsible for promptly notifying us of any changes to information or circumstances that may affect your matter.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We may rely on information and documents supplied by you and shall not be responsible for consequences arising from information that is false, incomplete, misleading, forged, outdated or withheld.
            </p>
          </section>

          {/* Section 4 */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              4. VERIFICATION AND DUE DILIGENCE
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              We may conduct reasonable verification, identity checks, document reviews, background checks or other due-diligence procedures where necessary or required by law.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              We reserve the right to decline, suspend or terminate a matter where:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 ml-4">
              <li>Information provided cannot reasonably be verified;</li>
              <li>We suspect fraud, deception or unlawful activity;</li>
              <li>The requested service would violate applicable law;</li>
              <li>The client fails to provide necessary documentation;</li>
              <li>A conflict of interest arises; or</li>
              <li>Continuing the engagement would expose the Company or another party to unacceptable legal, regulatory or operational risk.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              5. FEES AND PAYMENT
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Fees shall be communicated to the client before the relevant service is commenced, unless otherwise agreed in writing.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Depending on the service, fees may include consultation charges, professional/service fees, administrative charges, third-party expenses, transaction charges or other agreed costs.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              All payments must be made through payment channels authorised by Homeland Recovery Services Ltd.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              A payment made to an unauthorised individual, account or platform may not be recognised by the Company.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Where applicable, third-party charges, government fees, bank charges, legal fees, courier expenses and other external costs shall be borne by the client where expressly disclosed or agreed.
            </p>
          </section>

          {/* Section 6 */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              6. NO GUARANTEE OF OUTCOME
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Homeland Recovery Services Ltd shall exercise reasonable professional care in providing its Services.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">However, we do not guarantee:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 mb-4 ml-4">
              <li>Successful recovery of funds, assets, claims or property;</li>
              <li>A particular financial outcome;</li>
              <li>A particular processing or resolution time;</li>
              <li>The conduct or cooperation of third parties;</li>
              <li>Decisions by government agencies, courts, financial institutions, regulators or other third parties; or</li>
              <li>Outcomes dependent on circumstances outside our reasonable control.</li>
            </ul>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Any representation concerning a possible outcome must not be interpreted as an unconditional guarantee unless expressly stated in a written agreement signed by an authorised representative of the Company.
            </p>
          </section>

          {/* Section 7 */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              7. CLIENT RESPONSIBILITIES
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">You agree to:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 ml-4">
              <li>Provide accurate and complete information;</li>
              <li>Provide documents requested for legitimate service purposes;</li>
              <li>Cooperate reasonably with our personnel;</li>
              <li>Respond to requests for clarification within a reasonable period;</li>
              <li>Pay agreed fees when due;</li>
              <li>Keep your contact details current; and</li>
              <li>Refrain from providing fraudulent, forged or misleading documents.</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              8. PROHIBITED USE
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">You must not use our Services or website to:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 ml-4">
              <li>Commit or facilitate fraud;</li>
              <li>Submit forged or misleading documents;</li>
              <li>Impersonate another person;</li>
              <li>Infringe another person's rights;</li>
              <li>Circumvent applicable laws or regulations;</li>
              <li>Attempt unauthorised access to our systems;</li>
              <li>Introduce malicious software or code;</li>
              <li>Interfere with the security or operation of our website; or</li>
              <li>Use our Services for any unlawful purpose.</li>
            </ul>
          </section>

          {/* Section 9 */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              9. INTELLECTUAL PROPERTY
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Unless otherwise stated, all content appearing on our website and platforms, including logos, trademarks, text, graphics, photographs, designs, documents, videos and other materials, belongs to Homeland Recovery Services Ltd or is used with appropriate permission.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              You may not reproduce, modify, distribute, publish, sell or commercially exploit our intellectual property without prior written permission.
            </p>
          </section>

          {/* Section 10 */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              10. THIRD-PARTY SERVICES
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Our Services may involve or refer to third-party institutions, payment providers, professional advisers, government agencies, financial institutions, technology providers or other external parties.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              We do not control third-party services and cannot guarantee their availability, accuracy, security, decisions or performance.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Where a third party's terms apply, you may also be required to comply with those terms.
            </p>
          </section>

          {/* Section 11 */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              11. CONFIDENTIALITY
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              We will take reasonable measures to maintain the confidentiality of information entrusted to us, subject to applicable law and legitimate circumstances requiring disclosure.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Information may be disclosed where necessary to provide the Services, comply with legal obligations, respond to lawful requests, protect our rights, prevent fraud or protect the safety and interests of relevant persons.
            </p>
          </section>

          {/* Section 12 */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              12. PRIVACY
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Our collection and use of personal information are governed by our{" "}
              <Link href="/privacy" className="text-cyan-600 dark:text-cyan-400 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              By using our Services, you acknowledge that personal information may be processed as described in our Privacy Policy and in accordance with applicable data-protection laws.
            </p>
          </section>

          {/* Section 13 */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              13. LIMITATION OF LIABILITY
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              To the extent permitted by applicable law, Homeland Recovery Services Ltd shall not be liable for losses arising solely from circumstances beyond our reasonable control, including third-party failures, inaccurate information supplied by a client, governmental decisions, banking delays, technological failures, force majeure events or actions of other parties.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Nothing in these Terms excludes or limits liability that cannot lawfully be excluded or limited under Nigerian law.
            </p>
          </section>

          {/* Section 14 */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              14. INDEMNITY
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              To the extent permitted by law, you agree to indemnify Homeland Recovery Services Ltd against reasonable losses, claims, liabilities, costs and expenses arising from:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 ml-4">
              <li>Your breach of these Terms;</li>
              <li>Fraudulent or misleading information supplied by you;</li>
              <li>Your unlawful use of our Services; or</li>
              <li>Your violation of another person's rights.</li>
            </ul>
          </section>

          {/* Section 15 */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              15. SUSPENSION OR TERMINATION
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              We may suspend or terminate your access to our Services where:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 mb-4 ml-4">
              <li>You materially breach these Terms;</li>
              <li>Required payments remain outstanding;</li>
              <li>Fraud or unlawful activity is suspected;</li>
              <li>Required information or documentation is not supplied;</li>
              <li>Continuing the engagement becomes unlawful or impracticable; or</li>
              <li>Other legitimate circumstances justify termination.</li>
            </ul>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Termination shall not affect rights or obligations that accrued before termination.
            </p>
          </section>

          {/* Section 16 */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              16. COMPLAINTS AND DISPUTE RESOLUTION
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Clients are encouraged to first submit complaints directly to Homeland Recovery Services Ltd through:
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 mb-4 border border-slate-200 dark:border-slate-700">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Email</p>
                    <a href="mailto:homelandrecoveryservicesltd@gmail.com" className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                      homelandrecoveryservicesltd@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Telephone</p>
                    <a href="tel:+2349065173333" className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                      +234 906 517 3333
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Address</p>
                    <p className="text-slate-600 dark:text-slate-400">
                      Suite 205 NCWS House, Area 11 Garki 2, Abuja, FCT, Nigeria
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              We will make reasonable efforts to investigate and resolve legitimate complaints promptly.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Nothing in this clause prevents a consumer from exercising rights available under applicable Nigerian law.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              The Federal Competition and Consumer Protection Act provides consumer remedies where services fail to meet applicable standards, including circumstances in which a reasonable portion of the price may be refundable.
            </p>
          </section>

          {/* Section 17 */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              17. GOVERNING LAW
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              These Terms shall be governed by the laws of the Federal Republic of Nigeria.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Subject to applicable dispute-resolution requirements, disputes shall be submitted to the competent courts of Nigeria.
            </p>
          </section>

          {/* Section 18 */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              18. CHANGES TO THESE TERMS
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              We may update these Terms periodically to reflect changes in our Services, business operations, technology or applicable laws.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              The updated version will be published through our website or other appropriate communication channels.
            </p>
          </section>

          {/* Section 19 */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              19. CONTACT US
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              For questions concerning these Terms:
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 mb-6 border border-slate-200 dark:border-slate-700">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Address</p>
                    <p className="text-slate-600 dark:text-slate-400">
                      Suite 205 NCWS House, Area 11 Garki 2, Abuja, FCT, Nigeria
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Email</p>
                    <a href="mailto:homelandrecoveryservicesltd@gmail.com" className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                      homelandrecoveryservicesltd@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Telephone</p>
                    <a href="tel:+2349065173333" className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                      +234 906 517 3333
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Final Statement */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              By using our Services, you acknowledge that you have read, understood and agreed to these Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}