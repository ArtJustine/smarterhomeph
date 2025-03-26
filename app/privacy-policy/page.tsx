import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHeader } from "@/components/page-header"

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <PageHeader
          title="PRIVACY POLICY"
          backgroundImage="/placeholder.svg?height=500&width=1200"
          alt="Privacy concept"
        />

        <section className="container py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm text-muted-foreground mb-8">Last Updated: March 24, 2025</p>

            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p className="text-muted-foreground mb-6">
              SmartHome ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how
              we collect, use, disclose, and safeguard your information when you visit our website, use our mobile
              application, or interact with our smart home products and services.
            </p>

            <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
            <p className="text-muted-foreground mb-6">
              We may collect personal information that you provide directly to us, such as your name, email address,
              postal address, phone number, and payment information. We may also collect information about your use of
              our products and services, including device data, usage patterns, and preferences.
            </p>

            <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-6">
              We use the information we collect to provide, maintain, and improve our products and services. This
              includes processing transactions, sending notifications, and personalizing your experience. We may also
              use your information to communicate with you about products, services, and promotions, and to respond to
              your inquiries and feedback.
            </p>

            <h2 className="text-2xl font-bold mb-4">4. Sharing Your Information</h2>
            <p className="text-muted-foreground mb-6">
              We may share your information with third-party service providers who perform services on our behalf, such
              as payment processing, data analysis, and customer service. We may also share information when required by
              law or to protect our rights and the safety of our users.
            </p>

            <h2 className="text-2xl font-bold mb-4">5. Your Choices</h2>
            <p className="text-muted-foreground mb-6">
              You can review and update your account information at any time. You may also opt out of receiving
              promotional communications from us by following the instructions in those communications. You can choose
              to disable certain data collection features in our products, though this may limit functionality.
            </p>

            <h2 className="text-2xl font-bold mb-4">6. Security</h2>
            <p className="text-muted-foreground mb-6">
              We implement appropriate technical and organizational measures to protect your personal information
              against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2 className="text-2xl font-bold mb-4">7. Changes to This Policy</h2>
            <p className="text-muted-foreground mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last Updated" date.
            </p>

            <h2 className="text-2xl font-bold mb-4">8. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us at privacy@smarthome.com.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

