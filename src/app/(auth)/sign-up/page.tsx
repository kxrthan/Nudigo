import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup } from "../actions";

export default async function SignUpPage(props: { searchParams: Promise<{ message: string }> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="w-full flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Brand/Logo */}
      <Link href="/" className="flex items-center gap-3 group w-fit">
        <div className="w-8 h-8 rounded bg-black flex items-center justify-center transition-transform group-hover:scale-105">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 22H22L12 2Z" fill="white"/>
          </svg>
        </div>
        <span className="font-bold text-xl tracking-tighter text-black">Nudigo</span>
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-black mb-2">Create an account</h1>
        <p className="text-black/60 text-sm">Join Nudigo and start converting your bouncing visitors.</p>
      </div>

      {/* Form */}
      <form action={signup} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name" className="text-black font-medium text-xs uppercase tracking-wider">Full Name</Label>
          <Input 
            id="name" 
            name="name"
            type="text" 
            placeholder="John Doe" 
            className="h-12 bg-black/5 border-transparent focus-visible:ring-black focus-visible:border-black transition-all rounded-xl"
            required 
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-black font-medium text-xs uppercase tracking-wider">Email</Label>
          <Input 
            id="email" 
            name="email"
            type="email" 
            placeholder="m@example.com" 
            className="h-12 bg-black/5 border-transparent focus-visible:ring-black focus-visible:border-black transition-all rounded-xl"
            required 
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <Label htmlFor="password" className="text-black font-medium text-xs uppercase tracking-wider">Password</Label>
          <Input 
            id="password" 
            name="password"
            type="password" 
            className="h-12 bg-black/5 border-transparent focus-visible:ring-black focus-visible:border-black transition-all rounded-xl"
            required 
          />
        </div>

        <button type="submit" className="w-full flex items-center justify-center h-12 mt-2 rounded-xl bg-black text-white font-medium shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 transition-all">
          Sign Up
        </button>

        {searchParams?.message && (
          <p className="p-3 bg-red-50 text-red-600 text-sm text-center rounded-lg font-medium">
            {searchParams.message}
          </p>
        )}
      </form>

      {/* Footer link */}
      <p className="text-center text-sm text-black/60 mt-4">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-black font-semibold hover:underline">
          Sign in
        </Link>
      </p>

    </div>
  );
}
