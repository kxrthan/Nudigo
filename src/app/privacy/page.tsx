import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FAFAFA] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10 blur-[100px] -z-10 rounded-full" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.05),rgba(255,255,255,0))] -z-10" />

      <Navbar />
      
      <div className="flex-1 max-w-4xl mx-auto px-4 py-24 md:py-32 w-full">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-black/60 hover:text-black transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-black">Privacy Policy</h1>
          <p className="text-black/60 text-lg">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/5 text-black/80 space-y-8 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you create or modify your account, request customer support, or otherwise communicate with us. This information may include your name, email address, and payment information.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, process transactions, and send you technical notices and support messages.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">3. Data Collection via Popups</h2>
            <p>When you embed Nudigo widgets on your website, we may collect non-personally identifiable information (such as IP addresses and browser types) from your visitors strictly for the purpose of analytics and tracking views/conversions for your dashboard.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">4. Information Sharing</h2>
            <p>We do not share your personal information with third parties except as necessary to provide our services (e.g., payment processors like Stripe) or when required by law.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">5. Data Security</h2>
            <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">6. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at support@nudigo.com.</p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
