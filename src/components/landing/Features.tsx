"use client";

import { Zap, Code2, Paintbrush, LineChart } from "lucide-react";

export function Features() {
  return (
    <section id="features" className="py-12 md:py-16 scroll-mt-24 relative bg-[#FAFAFA] min-h-[calc(100vh-100px)] flex items-center">
      <div className="container mx-auto px-6 max-w-7xl relative z-10 w-full">
        
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-black tracking-tight leading-tight mb-4">
            Everything you need to convert visitors into buyers.
          </h2>
          <p className="text-base md:text-lg text-black/60 leading-relaxed max-w-2xl mx-auto">
            A powerfully simple toolkit designed to build trust, create urgency, and drive revenue on autopilot.
          </p>
        </div>

        {/* 4 Cards in a Single Line (Row) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 */}
          <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm border-2 border-black/40 hover:border-black transition-colors flex flex-col h-full">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-black/5 rounded-2xl flex items-center justify-center mb-4 md:mb-6 text-black">
              <Zap className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-xl font-bold text-black mb-3">Social Proof</h3>
            <p className="text-sm text-black/60 leading-relaxed font-medium">
              Display live visitor activity, recent purchases, or custom FOMO messages that instantly validate your product.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm border-2 border-black/40 hover:border-black transition-colors flex flex-col h-full">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-black/5 rounded-2xl flex items-center justify-center mb-4 md:mb-6 text-black">
              <Code2 className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-xl font-bold text-black mb-3">1-Minute Setup</h3>
            <p className="text-sm text-black/60 leading-relaxed font-medium">
              Just paste a single line of JavaScript into your website's code and your popups will instantly appear.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#222222] rounded-[24px] p-6 md:p-8 shadow-sm border-2 border-white/40 hover:border-white transition-colors flex flex-col h-full text-white">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-4 md:mb-6 text-white">
              <Paintbrush className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">No-code Editor</h3>
            <p className="text-sm text-white/60 leading-relaxed font-medium">
              Design beautiful, glowing popups without writing a single line of code. Customize themes directly from the dashboard.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm border-2 border-black/40 hover:border-black transition-colors flex flex-col h-full">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-black/5 rounded-2xl flex items-center justify-center mb-4 md:mb-6 text-black">
              <LineChart className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-xl font-bold text-black mb-3">Real-time Analytics</h3>
            <p className="text-sm text-black/60 leading-relaxed font-medium">
              Track views, clicks, and engagement in real-time. Understand how visitors interact with your popups.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
