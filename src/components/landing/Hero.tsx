"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden relative bg-[#FAFAFA]">
      {/* Abstract Animated Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-[100px] -z-10 rounded-full animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))] -z-10" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 text-black font-medium text-xs md:text-sm mb-8 border border-black/5 backdrop-blur-sm shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Introducing Nudigo 2.0</span>
            <span className="w-px h-3 bg-black/20 mx-1"></span>
            <span className="text-black/60 hover:text-black cursor-pointer flex items-center transition-colors">
               Read the announcement <ArrowRight className="w-3 h-3 ml-1" />
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-[100px] font-bold tracking-tighter mb-6 leading-[0.95] text-black animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-both">
            Convert <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-900">visitors</span> <br className="hidden md:block"/>
            into customers.
          </h1>
          
          <p className="text-lg md:text-2xl text-black/60 mb-10 max-w-2xl leading-relaxed tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both">
            Deliver high-impact wake-up calls to your visitors. <br className="hidden md:block"/>
            Drive urgency, engagement, and revenue instantly.
          </p>
          
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/sign-up">
                <Button size="lg" className="h-14 px-8 text-base font-medium rounded-xl shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 transition-all bg-black text-white group">
                  Start for free
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base font-medium rounded-xl bg-white text-black border-2 border-black/10 hover:border-black/20 hover:bg-black/5 transition-colors">
                Book a demo
              </Button>
            </div>
          </div>



        </div>
      </div>
    </section>
  );
}
