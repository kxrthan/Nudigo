"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ServerCrash, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full"
      >
        <div className="w-20 h-20 bg-red-500/10 rounded-[24px] flex items-center justify-center mx-auto mb-8 border border-red-500/20">
          <ServerCrash className="w-10 h-10 text-red-500" />
        </div>
        
        <h1 className="text-4xl font-bold tracking-tighter text-black mb-4">
          Something went wrong
        </h1>
        
        <p className="text-black/60 font-medium leading-relaxed mb-10">
          We encountered an unexpected error while trying to process your request. Our team has been notified.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => reset()}
            className="h-12 px-6 rounded-xl text-base font-medium bg-black text-white hover:bg-black/90 shadow-sm"
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Try again
          </Button>
          
          <Link href="/">
            <Button 
              variant="outline" 
              className="w-full sm:w-auto h-12 px-6 rounded-xl text-base font-medium border-2 border-black/10 hover:border-black/20 hover:bg-black/5 transition-colors"
            >
              Return Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
