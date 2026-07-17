import { createClient } from "@/lib/supabase/server";
import { updateProfile } from "@/app/(auth)/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function ProfilePage(props: { searchParams: Promise<{ message: string }> }) {
  const searchParams = await props.searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email, plan_tier')
    .eq('id', user.id)
    .single();

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-8 animate-in fade-in duration-500">
      <div>
        <Link href="/dashboard" className="inline-flex items-center text-sm font-semibold text-black/50 hover:text-black transition-colors mb-6 bg-white border border-black/10 px-3 py-1.5 rounded-lg shadow-sm hover:bg-black/5">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Profile Settings</h1>
        <p className="text-black/60">Manage your account details and personal preferences.</p>
      </div>

      <div className="bg-white rounded-2xl border border-black/10 p-6 shadow-sm">
        <form action={updateProfile} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="font-semibold text-black/80">Email Address</Label>
            <Input 
              key={`email-${user.email}`}
              id="email" 
              type="email" 
              defaultValue={user.email || ""} 
              disabled 
              className="bg-zinc-50 text-black/50 border-black/10"
            />
            <p className="text-xs text-black/40">Your email is managed by your authentication provider.</p>
          </div>
          
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="font-semibold text-black/80">Full Name</Label>
            <Input 
              key={`name-${profile?.full_name || "empty"}`}
              id="name" 
              name="name"
              type="text" 
              defaultValue={profile?.full_name || ""} 
              placeholder="John Doe"
              className="border-black/20 focus-visible:ring-black"
            />
          </div>
          
          
          <div className="flex justify-end pt-4 border-t border-black/5">
            <button type="submit" className="bg-black hover:bg-black/80 text-white rounded-lg px-6 py-2.5 font-bold transition-all shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 text-sm">
              Save Changes
            </button>
          </div>

          {searchParams?.message && (
            <div className="p-4 bg-green-50 text-green-700 text-sm rounded-xl font-medium border border-green-100 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {searchParams.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
