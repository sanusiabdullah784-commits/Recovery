import { Shield, ArrowLeft, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  const currentDate = new Date().toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white dark:from-slate-900 dark:to-slate-950 py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>

        {/* Header */}
        <div className="mb-12 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-lg shadow-lg shadow-amber-500/20">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              HOMELAND RECOVERY SERVICES LTD
            </h1>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            PRIVACY POLICY
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
            Homeland Recovery Services Ltd ("Homeland", "we", "us", or "our") respects your privacy and is committed to protecting your personal information.
          </p>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            This Privacy Policy explains how we collect, use, store, disclose and protect personal information when you visit our website, communicate with us, register for our Services, submit a request or otherwise interact with us.
          </p>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
            This Policy is intended to operate in accordance with applicable Nigerian data-protection laws, including the Nigeria Data Protection Act 2023 ("NDPA").
          </p>

          {/* Section 1 */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              1. INFORMATION WE COLLECT
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Depending on your interaction with us, we may collect:
            </p>

            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
              Personal and Identification Information
            </h4>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 mb-6 ml-4">
              <li>Full name;</li>
              <li>Date of birth where necessary;</li>
              <li>Gender where necessary;</li>
              <li>Identification information;</li>
              <li>Residential or correspondence address;</li>
              <li>Telephone number;</li>
              <li>Email address; and</li>
              <li>Other information necessary to verify your identity.</li>
            </ul>

            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
              Services and Case Information
            </h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Where necessary for the provision of our Services, we may collect information relating to your recovery request, claim, transaction, documentation, correspondence and other relevant circumstances.
            </p>

            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
              Payment Information
            </h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              We may collect information relating to payments, invoices, payment references and transaction status.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Where payment is processed through a third-party payment provider, your payment details may be processed directly by that provider in accordance with its privacy policy.
            </p>

            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
              Technical Information
            </h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              When you use our website, we may automatically receive information such as:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 ml-4">
              <li>IP address;</li>
              <li>Browser type;</li>
              <li>Device information;</li>
              <li>Operating system;</li>
              <li>Pages visited;</li>
              <li>Date and time of visits;</li>
              <li>Referring website; and</li>
              <li>Website usage information.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              2. HOW WE COLLECT INFORMATION
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">We may collect information:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 ml-4">
              <li>Directly from you;</li>
              <li>Through our website or online forms;</li>
              <li>Through telephone, email, WhatsApp or other communication channels;</li>
              <li>From documents supplied by you;</li>
              <li>From authorised representatives;</li>
              <li>From relevant third parties where legally permitted; and</li>
              <li>Automatically through cookies and similar technologies.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              3. WHY WE USE YOUR INFORMATION
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">We may process personal information to:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 ml-4">
              <li>Provide and administer our Services;</li>
              <li>Verify identity and information;</li>
              <li>Assess and manage requests;</li>
              <li>Communicate with clients;</li>
              <li>Process payments;</li>
              <li>Maintain records;</li>
              <li>Respond to complaints and enquiries;</li>
              <li>Prevent fraud and unlawful activity;</li>
              <li>Improve our website and Services;</li>
              <li>Meet legal and regulatory obligations;</li>
              <li>Protect our rights and property; and</li>
              <li>Carry out other legitimate business activities.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              4. LAWFUL BASIS FOR PROCESSING
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Depending on the circumstances, we may process personal information where:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 ml-4">
              <li>You have provided consent;</li>
              <li>Processing is necessary to perform a contract;</li>
              <li>Processing is necessary to comply with a legal obligation;</li>
              <li>Processing is necessary to protect legitimate interests;</li>
              <li>Processing is necessary to protect vital interests; or</li>
              <li>Another lawful basis recognised by applicable data-protection law applies.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              5. SHARING OF PERSONAL INFORMATION
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              We do not sell your personal information.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Where necessary and lawful, we may disclose information to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 mb-4 ml-4">
              <li>Employees and authorised representatives;</li>
              <li>Professional advisers;</li>
              <li>Payment and technology service providers;</li>
              <li>Government agencies and regulators;</li>
              <li>Financial institutions;</li>
              <li>Legal representatives;</li>
              <li>Service providers assisting with your matter; or</li>
              <li>Other parties where you have authorised disclosure or disclosure is legally required.</li>
            </ul>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We only seek to share information that is reasonably necessary for the relevant purpose.
            </p>
          </section>

          {/* Section 6 */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              6. INTERNATIONAL TRANSFERS
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Where personal information is transferred outside Nigeria, we will take reasonable steps to ensure that the transfer and processing comply with applicable data-protection requirements.
            </p>
          </section>

          {/* Section 7 */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              7. DATA SECURITY
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              We implement reasonable technical, organisational and administrative safeguards designed to protect personal information against unauthorised access, alteration, disclosure, loss, misuse or destruction.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              However, no electronic transmission or storage system can be guaranteed to be completely secure.
            </p>
          </section>

          {/* Section 8 */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              8. DATA RETENTION
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              We retain personal information only for as long as reasonably necessary for the purpose for which it was collected, to fulfil contractual or legal obligations, resolve disputes, maintain business records or otherwise comply with applicable law.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              When information is no longer required, we will take reasonable steps to securely delete, anonymise or otherwise dispose of it.
            </p>
          </section>

          {/* Section 9 */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              9. YOUR DATA-PROTECTION RIGHTS
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Subject to applicable law and relevant limitations, you may have rights to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 mb-4 ml-4">
              <li>Request access to your personal information;</li>
              <li>Request correction of inaccurate information;</li>
              <li>Request deletion of personal information where legally applicable;</li>
              <li>Object to or restrict certain processing;</li>
              <li>Withdraw consent where processing is based on consent;</li>
              <li>Request portability of certain information;</li>
              <li>Lodge a complaint regarding the processing of your personal information; and</li>
              <li>Exercise other rights available under applicable data-protection law.</li>
            </ul>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              The NDPC's compliance guidance recognises the importance of transparent privacy policies and appropriate notices concerning processing activities.
            </p>
          </section>

          {/* Section 10 */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              10. MARKETING COMMUNICATIONS
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Where we send marketing or promotional communications, you may opt out by following the unsubscribe instructions provided or contacting us directly.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We will respect applicable requirements concerning direct marketing and consent.
            </p>
          </section>

          {/* Section 11 */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              11. CHILDREN'S INFORMATION
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Our Services are not intentionally directed at children where the nature of the service requires an adult or legally authorised person.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We do not knowingly collect children's personal information except where permitted or required by applicable law and appropriate consent or authorisation has been obtained.
            </p>
          </section>

          {/* Section 12 */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              12. THIRD-PARTY WEBSITES
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Our website may contain links to third-party websites.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We are not responsible for the privacy practices, security or content of third-party websites. Users should review the privacy policies of those websites before providing personal information.
            </p>
          </section>

          {/* Section 13 */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              13. COOKIES
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              We use cookies and similar technologies as described in our{" "}
              <Link href="/cookies" className="text-amber-600 dark:text-amber-400 hover:underline">
                Cookie Policy
              </Link>
              .
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Where required, users will be provided with appropriate options to accept, reject or manage non-essential cookies.
            </p>
          </section>

          {/* Section 14 */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              14. DATA BREACHES
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Where a personal-data breach occurs, we will take reasonable steps to investigate, contain and mitigate the breach and make any notifications required by applicable law.
            </p>
          </section>

          {/* Section 15 */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              15. PRIVACY CONTACT
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              For privacy-related enquiries or requests, contact:
            </p>
            <div className="bg-amber-50/50 dark:bg-slate-800/50 rounded-xl p-6 border border-amber-200/50 dark:border-slate-700">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Email</p>
                    <a href="mailto:homelandrecoveryservicesltd@gmail.com" className="text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                      homelandrecoveryservicesltd@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Telephone</p>
                    <a href="tel:+2349065173333" className="text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                      +234 906 517 3333
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Address</p>
                    <p className="text-slate-600 dark:text-slate-400">
                      Suite 205 NCWS House, Area 11 Garki 2, Abuja, FCT, Nigeria
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 16 */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              16. POLICY UPDATES
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              We may update this Privacy Policy periodically.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              The revised version will be published on our website with an updated "Last Updated" date.
            </p>
          </section>

          {/* Section 17 */}
          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              17. ACCEPTANCE
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              By using our website or Services after this Privacy Policy has been made available to you, you acknowledge that you have read and understood this Policy.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Where applicable, we will obtain specific consent before processing information for purposes requiring consent.
            </p>
          </section>

          {/* Final Statement */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              By using our Services, you acknowledge that you have read, understood and agreed to this Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}