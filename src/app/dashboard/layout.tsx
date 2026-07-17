"use client";

import Link from "next/link";
import { LogOut, ChevronDown, User, BarChart2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signout } from "@/app/(auth)/actions";

import Image from "next/image";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-black">
      
      {/* Top Navigation */}
      <header className="h-20 px-8 flex items-center justify-between max-w-7xl mx-auto w-full">
        
        {/* Left Side: Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-105">
              <Image src="/logo.png" alt="Nudigo Logo" width={40} height={40} className="w-full h-full object-contain drop-shadow-sm" priority />
            </div>
            <span className="font-bold text-xl tracking-tighter text-black hidden sm:inline-block">Nudigo</span>
          </Link>
        </div>

        {/* Right Side: Navigation, Feedback & Account Dropdown */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard/analytics" className="inline-flex items-center justify-center bg-black hover:bg-black/80 transition-colors rounded-xl px-3 sm:px-5 py-2 sm:py-2.5 text-sm font-semibold text-white shadow-sm">
            <BarChart2 className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Analytics</span>
          </Link>
          

          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-2 bg-white border border-black/10 hover:bg-zinc-100 transition-colors rounded-full px-5 py-2.5 text-sm font-semibold text-black/80 outline-none shadow-sm">
              <div className="w-6 h-6 rounded-full bg-black/5 border border-black/10 flex items-center justify-center mr-1">
                 <User className="w-3.5 h-3.5 text-black/70" />
              </div>
              Account
              <ChevronDown className="w-4 h-4 opacity-50" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-xl border-black/10 shadow-lg bg-white">
              <DropdownMenuItem className="cursor-pointer hover:bg-black/5 rounded-md font-medium p-0">
                <Link href="/dashboard/profile" className="w-full h-full px-2 py-1.5 flex items-center">Profile Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-black/5 rounded-md font-medium p-0">
                <Link href="/dashboard/billing" className="w-full h-full px-2 py-1.5 flex items-center">Billing</Link>
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
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {children}
      </main>

    </div>
  );
}
