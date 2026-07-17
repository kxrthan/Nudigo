import Link from "next/link";
import Image from "next/image";
import profileImg from "@/Assets/Profile-img (1).jpg";

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
            <p className="text-sm text-black/40 mt-4">
              Copyright © {new Date().getFullYear()} Nudigo Inc. All rights reserved.
            </p>
          </div>

          <div>
            <h4 className="font-semibold tracking-tight text-sm mb-6 text-black">Links</h4>
            <ul className="space-y-4">
              <li><Link href="/sign-in" className="text-black/60 hover:text-black transition-colors text-sm">Login</Link></li>
              <li><Link href="/#pricing" className="text-black/60 hover:text-black transition-colors text-sm">Pricing</Link></li>
            </ul>
          </div>


          <div>
            <h4 className="font-semibold tracking-tight text-sm mb-6 text-black">Legal</h4>
            <ul className="space-y-4">
              <li><Link href="/terms" className="text-black/60 hover:text-black transition-colors text-sm">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-black/60 hover:text-black transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link href="/cookie" className="text-black/60 hover:text-black transition-colors text-sm">Cookie Policy</Link></li>
            </ul>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="bg-black/5 rounded-xl p-4 border border-black/5 inline-flex items-center gap-3 overflow-hidden -ml-4">
            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
              <Image src={profileImg} alt="Keerthan MS" className="w-full h-full object-cover" />
            </div>
            <p className="text-sm text-black/60 whitespace-nowrap">
              Hey Curious 👋 I'm Keerthan, the creator of Nudigo. You can follow my work on <a href="https://x.com/kxrthan" target="_blank" rel="noopener noreferrer" className="text-black font-bold hover:underline decoration-black/30 underline-offset-2">Twitter</a>.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-black/40">
            <span>Designed by Keerthan MS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
