"use client";

import Navbar from "../../navbar";
import Footer from "../../footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                1. Information We Collect
              </h2>
              <p className="mb-4">
                We collect information you provide directly to us, such as when
                you create an account, use our services, or contact us for
                support.
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Account information (name, email address, password)</li>
                <li>Tracking information (package details, tracking IDs)</li>
                <li>Communication data (support messages, feedback)</li>
                <li>Usage data (how you interact with our platform)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                2. How We Use Your Information
              </h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Provide and maintain our tracking services</li>
                <li>Send you tracking updates and notifications</li>
                <li>Respond to your comments and questions</li>
                <li>Improve our services and develop new features</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                3. Information Sharing
              </h2>
              <p className="mb-4">
                We do not sell, trade, or otherwise transfer your personal
                information to third parties except as described in this policy:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>With your consent</li>
                <li>To comply with legal requirements</li>
                <li>To protect our rights and safety</li>
                <li>With service providers who assist in our operations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
              <p className="mb-4">
                We implement appropriate security measures to protect your
                personal information against unauthorized access, alteration,
                disclosure, or destruction. This includes:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security audits and assessments</li>
                <li>Access controls and authentication measures</li>
                <li>Employee training on data protection</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Delete your account and data</li>
                <li>Object to processing of your information</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                6. Cookies and Tracking
              </h2>
              <p className="mb-4">
                We use cookies and similar technologies to enhance your
                experience, analyze usage, and provide personalized content. You
                can control cookie settings through your browser preferences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                7. International Transfers
              </h2>
              <p className="mb-4">
                Your information may be transferred to and processed in
                countries other than your own. We ensure appropriate safeguards
                are in place to protect your data during such transfers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                8. Changes to This Policy
              </h2>
              <p className="mb-4">
                We may update this privacy policy from time to time. We will
                notify you of any changes by posting the new policy on this page
                and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this privacy policy, please
                contact us at:
              </p>
              <ul className="list-none mb-4">
                <li>Email: privacy@trackflow.com</li>
                <li>Phone: +1 (812) 207-9729</li>
                <li>Address: 123 Tech Street, San Francisco, CA 94105</li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
