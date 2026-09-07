import { Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CookiesPage() {
  const currentDate = new Date().toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>

        <div className="mb-12 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-lg shadow-lg shadow-cyan-500/20">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              COOKIE POLICY
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 text-sm text-slate-600 dark:text-slate-400">
            <div>
              <span className="font-semibold">Effective Date:</span> {currentDate}
            </div>
            <div>
              <span className="font-semibold">Last Updated:</span> {currentDate}
            </div>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            This Cookie Policy explains how Homeland Recovery Services Ltd uses cookies and similar technologies on our website.
          </p>

          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              What Are Cookies?
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Cookies are small text files that are stored on your device when you visit a website. They help the website remember your preferences and improve your browsing experience.
            </p>
          </section>

          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              How We Use Cookies
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              We use cookies to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 ml-4">
              <li>Remember your preferences and settings;</li>
              <li>Understand how you use our website;</li>
              <li>Improve website performance and functionality;</li>
              <li>Provide personalized content and experiences; and</li>
              <li>Analyze website traffic and usage patterns.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Types of Cookies We Use
            </h3>
            
            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
              Essential Cookies
            </h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.
            </p>

            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
              Analytics Cookies
            </h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
            </p>

            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
              Preference Cookies
            </h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              These cookies allow the website to remember choices you make (such as your language preference) and provide enhanced, personalized features.
            </p>
          </section>

          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Managing Cookies
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              You can control and manage cookies in various ways:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 ml-4">
              <li>Browser settings: Most browsers allow you to manage cookie settings;</li>
              <li>Opt-out links: Some third-party services provide opt-out options;</li>
              <li>Do Not Track: Some browsers have a Do Not Track feature.</li>
            </ul>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
              Please note that disabling cookies may affect the functionality of our website.
            </p>
          </section>

          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Contact Us
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              If you have questions about our use of cookies, please contact us at{" "}
              <a href="mailto:homelandrecoveryservicesltd@gmail.com" className="text-cyan-600 dark:text-cyan-400 hover:underline">
                homelandrecoveryservicesltd@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}