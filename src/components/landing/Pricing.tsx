"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

export function Pricing() {

  return (
    <section id="pricing" className="py-24 md:py-32 bg-white relative">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            Simple, transparent pricing.
          </h2>
          <p className="text-lg text-black/60 leading-relaxed">
            No hidden fees or recurring subscriptions. Just one single payment for lifetime access to all features.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          
          {/* Plan 1 */}
          <div className="border-2 border-black/20 rounded-[32px] p-8 md:p-10 bg-white hover:border-black/40 transition-colors shadow-sm">
            <h3 className="text-2xl font-bold mb-2 tracking-tight">Starter</h3>
            <p className="text-black/60 text-sm mb-8">Perfect for early-stage startups.</p>
            <div className="mb-8 flex items-end gap-2">
              <span className="text-2xl font-bold text-black/30 line-through decoration-black/20 mb-2">$18</span>
              <span className="text-6xl font-bold tracking-tighter">$9</span>
              <span className="text-black/50 font-medium mb-2 uppercase">usd</span>
            </div>
            
            <ul className="space-y-4 mb-8">
              {['Unlimited PopUps', '1 Website', 'Simple analytics'].map((feature, i) => (
                 <li key={i} className="flex items-center gap-3 text-sm font-medium text-black/80">
                   <div className="w-5 h-5 rounded-full bg-black/5 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-black" />
                   </div>
                   {feature}
                 </li>
              ))}
            </ul>

            <Link href="/sign-up" className="block mb-4">
              <Button className="w-full h-12 rounded-xl text-base font-medium border-2 border-black/20 hover:border-black/40 hover:bg-black/5 transition-colors" variant="outline">
                Get Started
              </Button>
            </Link>
            <p className="text-center text-xs font-semibold text-black/40">Pay once. Access forever.</p>
          </div>

          {/* Plan 2 */}
          <div className="border border-black rounded-[32px] p-8 md:p-10 bg-black text-white relative shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]">
            <div className="absolute top-0 right-10 -translate-y-1/2">
               <span className="bg-white text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">Most Popular</span>
            </div>
            <h3 className="text-2xl font-bold mb-2 tracking-tight">Pro</h3>
            <p className="text-white/60 text-sm mb-8">For scaling businesses that need more power.</p>
            <div className="mb-8 flex items-end gap-2">
              <span className="text-2xl font-bold text-white/40 line-through decoration-white/30 mb-2">$38</span>
              <span className="text-6xl font-bold tracking-tighter">$19</span>
              <span className="text-white/50 font-medium mb-2 uppercase">usd</span>
            </div>
            
            <ul className="space-y-4 mb-8">
              {['Unlimited PopUps', 'Unlimited websites', 'Simple analytics'].map((feature, i) => (
                 <li key={i} className="flex items-center gap-3 text-sm font-medium text-white/90">
                   <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-white" />
                   </div>
                   {feature}
                 </li>
              ))}
            </ul>

            <Link href="/sign-up" className="block mb-4">
              <Button className="w-full h-12 rounded-xl text-base font-medium bg-white text-black hover:bg-gray-100 shadow-[0_4px_14px_0_rgba(255,255,255,0.2)]">
                Get Started
              </Button>
            </Link>
            <p className="text-center text-xs font-semibold text-white/40">Pay once. Access forever.</p>
          </div>

        </div>
      </div>
    </section>
  );
}
