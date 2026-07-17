"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signout } from "@/app/(auth)/actions";

export function Navbar({ user, profile }: { user?: any, profile?: any }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled ? "bg-white md:bg-white/80 backdrop-blur-xl border-black/[0.05] shadow-sm py-3" : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 md:gap-3 group ml-0 md:ml-12">
          <div className="w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-105">
            <Image src="/logo.png" alt="Nudigo Logo" width={40} height={40} className="w-full h-full object-contain drop-shadow-sm" priority />
          </div>
          <span className="font-bold text-xl tracking-tighter text-black">Nudigo</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          <Link href="/" className="text-sm font-medium text-black/60 hover:text-black transition-colors">Home</Link>
          <a href="/#features" className="text-sm font-medium text-black/60 hover:text-black transition-colors">Features</a>
          <a href="/#pricing" className="text-sm font-medium text-black/60 hover:text-black transition-colors">Pricing</a>
          <a href="/#testimonials" className="text-sm font-medium text-black/60 hover:text-black transition-colors">Testimonials</a>
          <a href="/#faq" className="text-sm font-medium text-black/60 hover:text-black transition-colors">FAQ</a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center gap-2 bg-transparent hover:bg-black/5 transition-colors rounded-xl px-5 h-9 text-sm font-semibold text-black/80 outline-none">
                <div className="w-6 h-6 rounded-full bg-black/5 border border-black/10 flex items-center justify-center mr-1">
                   <User className="w-3.5 h-3.5 text-black/70" />
                </div>
                {profile?.full_name || 'Account'}
                <ChevronDown className="w-4 h-4 opacity-50" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 rounded-xl border-black/10 shadow-lg bg-white">
                <DropdownMenuItem className="cursor-pointer hover:bg-black/5 rounded-md font-medium p-0">
                  <Link href="/dashboard" className="w-full h-full px-2 py-1.5 flex items-center">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-black/5" />
                <DropdownMenuItem 
                  onClick={() => signout()}
                  className="cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md font-medium"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/sign-in" className="inline-flex items-center justify-center font-medium text-black/70 hover:text-black hover:bg-black/5 rounded-xl px-5 h-9 text-sm transition-all">
                Sign In
              </Link>
              <Link href="/sign-up" className="inline-flex items-center justify-center font-medium shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 transition-all rounded-xl px-6 h-9 text-sm bg-black text-white">
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          type="button"
          className="md:hidden relative z-[100] text-black p-4 -mr-4 flex items-center justify-center cursor-pointer active:scale-95 transition-transform" 
          onClick={(e) => {
             e.preventDefault();
             setMobileMenuOpen(!mobileMenuOpen);
          }}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed top-[70px] left-0 w-full h-[calc(100vh-70px)] bg-white z-[90] py-6 px-6 flex flex-col gap-6 animate-in slide-in-from-top-2 fade-in duration-200 overflow-y-auto"
        >
          <div className="flex flex-col gap-4">
             <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-black/80 hover:text-black tracking-tight">Home</Link>
             <a href="/#features" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-black/80 hover:text-black tracking-tight">Features</a>
             <a href="/#pricing" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-black/80 hover:text-black tracking-tight">Pricing</a>
             <a href="/#testimonials" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-black/80 hover:text-black tracking-tight">Testimonials</a>
             <a href="/#faq" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-black/80 hover:text-black tracking-tight">FAQ</a>
          </div>
          <div className="flex flex-col gap-3 pt-6 border-t border-black/5">
            {user ? (
              <>
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="inline-flex items-center justify-center w-full rounded-xl h-12 text-base bg-black text-white hover:bg-black/90 transition-colors">
                  Dashboard
                </Link>
                <button onClick={() => { signout(); setMobileMenuOpen(false); }} className="inline-flex items-center justify-center w-full rounded-xl h-12 text-base border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 transition-colors">
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)} className="inline-flex items-center justify-center w-full rounded-xl h-12 text-base border border-black/10 hover:bg-black/5 transition-colors">
                  Sign In
                </Link>
                <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)} className="inline-flex items-center justify-center w-full rounded-xl h-12 text-base bg-black text-white hover:bg-black/90 transition-colors">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
