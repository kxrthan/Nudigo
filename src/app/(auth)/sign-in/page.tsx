import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "../actions";

export default async function SignInPage(props: { searchParams: Promise<{ message: string }> }) {
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
        <h1 className="text-3xl font-bold tracking-tight text-black mb-2">Welcome back</h1>
        <p className="text-black/60 text-sm">Enter your details to sign in to your account.</p>
      </div>

      {/* Form */}
      <form action={login} className="flex flex-col gap-5">
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
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-black font-medium text-xs uppercase tracking-wider">Password</Label>
            <Link href="#" className="text-xs text-black/50 hover:text-black transition-colors font-medium">Forgot password?</Link>
          </div>
          <Input 
            id="password" 
            name="password"
            type="password" 
            className="h-12 bg-black/5 border-transparent focus-visible:ring-black focus-visible:border-black transition-all rounded-xl"
            required 
          />
        </div>

        <button type="submit" className="w-full flex items-center justify-center h-12 mt-2 rounded-xl bg-black text-white font-medium shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 transition-all">
          Sign In
        </button>

        {searchParams?.message && (
          <p className="p-3 bg-red-50 text-red-600 text-sm text-center rounded-lg font-medium">
            {searchParams.message}
          </p>
        )}
      </form>

      {/* Divider */}
      <div className="relative flex items-center py-2">
        <div className="flex-grow border-t border-black/10"></div>
        <span className="flex-shrink-0 mx-4 text-black/40 text-xs font-medium uppercase tracking-wider">Or continue with</span>
        <div className="flex-grow border-t border-black/10"></div>
      </div>

      {/* Social Logins */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="w-full h-12 rounded-xl border-black/10 hover:bg-black/5 text-black font-medium">
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </Button>
        <Button variant="outline" className="w-full h-12 rounded-xl border-black/10 hover:bg-black/5 text-black font-medium">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
          GitHub
        </Button>
      </div>

      {/* Footer link */}
      <p className="text-center text-sm text-black/60 mt-4">
        Don't have an account?{" "}
        <Link href="/sign-up" className="text-black font-semibold hover:underline">
          Sign up
        </Link>
      </p>

    </div>
  );
}
