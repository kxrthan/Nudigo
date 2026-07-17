import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-white border-t border-black/5">
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8">
          
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 flex items-center justify-center">
                <Image src="/logo.png" alt="Nudigo Logo" width={40} height={40} className="w-full h-full object-contain opacity-90" priority />
              </div>
              <span className="font-bold text-xl tracking-tighter text-black">Nudigo</span>
            </Link>
            <p className="text-black/60 mb-8 max-w-xs text-sm leading-relaxed">
              The ultimate toolkit to convert bouncing visitors into paying customers. Stop losing money on ads today.
            </p>
            <div className="flex gap-4">
               {/* Social Icons (Abstract) */}
               <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-black/60 hover:text-black hover:border-black transition-colors cursor-pointer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
               </div>
               <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-black/60 hover:text-black hover:border-black transition-colors cursor-pointer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.8c0-1.2-.4-2.4-1.2-3.2 3.4-.4 7-1.7 7-7.2 0-1.6-.6-3-1.5-4-.2-.5-1.3-2-.1-4 0 0 1.2 0 4 3 1.1-.3 2.3-.3 3.5-.3s2.4.1 3.5.3c2.8-3 4-3 4-3 1.2 2 1.1 3.5.9 4 1 1 1.5 2.4 1.5 4 0 5.5-3.6 6.8-7.2 7.2.8.8 1.5 2.5 1.5 5.1V22"/></svg>
               </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold tracking-tight text-sm mb-6 text-black">Product</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-black/60 hover:text-black transition-colors text-sm">Home</Link></li>
              <li><Link href="#features" className="text-black/60 hover:text-black transition-colors text-sm">Features</Link></li>
              <li><Link href="#pricing" className="text-black/60 hover:text-black transition-colors text-sm">Pricing</Link></li>
              <li><Link href="#" className="text-black/60 hover:text-black transition-colors text-sm">Changelog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold tracking-tight text-sm mb-6 text-black">Company</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-black/60 hover:text-black transition-colors text-sm">About</Link></li>
              <li><Link href="#" className="text-black/60 hover:text-black transition-colors text-sm">Blog</Link></li>
              <li><Link href="#" className="text-black/60 hover:text-black transition-colors text-sm">Careers</Link></li>
              <li><Link href="#" className="text-black/60 hover:text-black transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold tracking-tight text-sm mb-6 text-black">Legal</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-black/60 hover:text-black transition-colors text-sm">Terms of Service</Link></li>
              <li><Link href="#" className="text-black/60 hover:text-black transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link href="#" className="text-black/60 hover:text-black transition-colors text-sm">Cookie Policy</Link></li>
            </ul>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-black/40">
            Copyright © {new Date().getFullYear()} Nudigo Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-black/40">
            <span>Designed in California</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
