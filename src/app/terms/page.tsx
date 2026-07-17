import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-black">Terms of Service</h1>
          <p className="text-black/60 text-lg">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/5 text-black/80 space-y-8 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">1. Acceptance of Terms</h2>
            <p>By accessing or using Nudigo ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">2. Description of Service</h2>
            <p>Nudigo provides a software-as-a-service platform that allows users to create, manage, and display social proof popups and notifications on their websites.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">3. User Responsibilities</h2>
            <p>You are responsible for maintaining the security of your account and password. You agree not to use the Service for any illegal or unauthorized purpose.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">4. Subscription and Billing</h2>
            <p>The Service is billed on a subscription basis. You will be billed in advance on a recurring schedule depending on the plan you select. All fees are non-refundable unless otherwise required by law.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">5. Intellectual Property</h2>
            <p>The Service and its original content, features, and functionality are and will remain the exclusive property of Nudigo and its licensors.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">6. Limitation of Liability</h2>
            <p>In no event shall Nudigo, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">7. Changes to Terms</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any significant changes.</p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
