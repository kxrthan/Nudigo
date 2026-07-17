import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CookiePage() {
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
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-black">Cookie Policy</h1>
          <p className="text-black/60 text-lg">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/5 text-black/80 space-y-8 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">1. What Are Cookies</h2>
            <p>Cookies are small pieces of text sent to your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">2. How We Use Cookies</h2>
            <p className="mb-4">When you use and access the Service, we may place a number of cookies files in your web browser. We use cookies for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-2 marker:text-black/30">
              <li>To enable certain functions of the Service (e.g., keeping you logged in).</li>
              <li>To provide analytics and store your preferences.</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">3. Third-party Cookies</h2>
            <p>In addition to our own cookies, we may also use various third-parties cookies to report usage statistics of the Service and deliver advertisements.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">4. What Are Your Choices Regarding Cookies</h2>
            <p>If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser. Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.</p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
