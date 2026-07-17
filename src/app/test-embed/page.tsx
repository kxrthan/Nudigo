"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Script from "next/script";

function TestEnvironment() {
  const searchParams = useSearchParams();
  const domain = searchParams.get("domain");

  if (!domain) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center font-sans">
        <div className="max-w-md text-center">
          <h1 className="text-3xl font-bold text-black mb-4">Test Environment</h1>
          <p className="text-black/60 mb-8">
            You need to provide a domain in the URL to test the embed script.
          </p>
          <div className="p-4 bg-zinc-100 rounded-xl border border-black/10 font-mono text-sm text-black">
            http://localhost:3000/test-embed?domain=<strong>yourdomain.com</strong>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <header className="border-b border-black/10 p-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-black">Acme Corp (Dummy Website)</h1>
        <nav className="flex gap-6 text-sm font-medium text-black/50">
          <span>Home</span>
          <span>About</span>
          <span>Pricing</span>
        </nav>
      </header>
      
      <main className="p-12 max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold text-black tracking-tight mb-6">
          Testing your Nudigo Popups!
        </h2>
        <p className="text-lg text-black/60 leading-relaxed mb-8">
          This is a simulated external website. If your API is working correctly, the Nudigo script has just been injected into the head of this document, and your custom popups will start appearing in the bottom right corner exactly according to your timing settings.
        </p>
        
        <div className="p-6 bg-blue-50 text-blue-800 rounded-2xl border border-blue-100">
          <h3 className="font-bold mb-2">Currently testing script for:</h3>
          <code className="bg-white px-3 py-1 rounded shadow-sm border border-black/5 text-black">
            {domain}
          </code>
        </div>
      </main>

      {/* Injecting the Nudigo Script */}
      <Script 
        src={`/api/embed/${domain}`} 
        strategy="lazyOnload" 
      />
    </div>
  );
}

export default function TestPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TestEnvironment />
    </Suspense>
  );
}
