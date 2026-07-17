"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full"
      >
        <div className="w-20 h-20 bg-black/5 rounded-[24px] flex items-center justify-center mx-auto mb-8 border border-black/10">
          <AlertCircle className="w-10 h-10 text-black/40" />
        </div>
        
        <h1 className="text-6xl font-bold tracking-tighter text-black mb-4">
          404
        </h1>
        
        <h2 className="text-2xl font-semibold tracking-tight text-black mb-4">
          Page not found
        </h2>
        
        <p className="text-black/60 font-medium leading-relaxed mb-10">
          We couldn't find the page you're looking for. It might have been moved, deleted, or perhaps it never existed at all.
        </p>

        <Link href="/">
          <Button className="w-full h-12 rounded-xl text-base font-medium shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] transition-all bg-black text-white">
            Return to Homepage
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
