"use client";

import Navbar from "../../navbar";
import Footer from "../../footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="mb-4">
                By accessing and using TrackFlow's services, you accept and
                agree to be bound by the terms and provision of this agreement.
                If you do not agree to abide by the above, please do not use
                this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                2. Description of Service
              </h2>
              <p className="mb-4">
                TrackFlow provides package tracking and logistics management
                services. Our platform allows users to track packages, receive
                notifications, and manage shipping information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
              <p className="mb-4">
                To use certain features of our service, you must create an
                account. You agree to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized use</li>
                <li>Be responsible for all activities under your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use</h2>
              <p className="mb-4">You agree not to use our service to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Transmit harmful or malicious code</li>
                <li>Interfere with the service's operation</li>
                <li>Access data not intended for you</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                5. Service Availability
              </h2>
              <p className="mb-4">
                We strive to maintain high service availability but cannot
                guarantee uninterrupted access. We may temporarily suspend
                service for maintenance, updates, or other operational reasons.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Payment Terms</h2>
              <p className="mb-4">For paid services:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  Fees are charged in advance on a monthly or annual basis
                </li>
                <li>All fees are non-refundable except as required by law</li>
                <li>We may change pricing with 30 days notice</li>
                <li>Failure to pay may result in service suspension</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                7. Intellectual Property
              </h2>
              <p className="mb-4">
                The service and its original content, features, and
                functionality are owned by TrackFlow and are protected by
                international copyright, trademark, patent, trade secret, and
                other intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                8. Limitation of Liability
              </h2>
              <p className="mb-4">
                TrackFlow shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages, including without
                limitation, loss of profits, data, use, goodwill, or other
                intangible losses.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Termination</h2>
              <p className="mb-4">
                We may terminate or suspend your account and access to the
                service immediately, without prior notice, for conduct that we
                believe violates these terms or is harmful to other users, us,
                or third parties.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                10. Changes to Terms
              </h2>
              <p className="mb-4">
                We reserve the right to modify these terms at any time. We will
                notify users of any changes by posting the new terms on this
                page. Your continued use of the service after such modifications
                constitutes acceptance of the updated terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">11. Governing Law</h2>
              <p className="mb-4">
                These terms shall be governed by and construed in accordance
                with the laws of the State of California, without regard to its
                conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                12. Contact Information
              </h2>
              <p className="mb-4">
                If you have any questions about these Terms of Service, please
                contact us at:
              </p>
              <ul className="list-none mb-4">
                <li>Email: legal@trackflow.com</li>
                <li>Phone: +1 (812) 207-9729"</li>
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
