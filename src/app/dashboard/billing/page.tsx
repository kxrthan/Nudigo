"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Check, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BillingPage() {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('profiles')
        .select('plan_tier')
        .eq('id', user.id)
        .single();
      setProfile(data);
    }
    setIsLoading(false);
  }

  const upgradePlan = async (plan: 'starter' | 'pro') => {
    setIsUpgrading(true);
    setSelectedPlan(plan);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from('profiles').update({ plan_tier: plan }).eq('id', user.id);
      await fetchProfile();
    }
    setIsUpgrading(false);
    setSelectedPlan(null);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center w-full h-[400px]"><Loader2 className="w-8 h-8 animate-spin text-black/20" /></div>;
  }

  const planName = profile?.plan_tier === 'pro' ? 'Pro Plan' : profile?.plan_tier === 'starter' ? 'Starter Plan' : 'Free Plan';
  
  const isStarter = profile?.plan_tier === 'starter';
  const isPro = profile?.plan_tier === 'pro';

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 animate-in fade-in duration-500">
      <div>
        <Link href="/dashboard" className="inline-flex items-center text-sm font-semibold text-black/50 hover:text-black transition-colors mb-6 bg-white border border-black/10 px-3 py-1.5 rounded-lg shadow-sm hover:bg-black/5">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Billing & Subscription</h1>
        <p className="text-black/60">Manage your lifetime access and plan limits.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Current Plan Card */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-black/10 p-6 shadow-sm flex flex-col gap-6">
          <div>
            <h2 className="text-lg font-bold text-black mb-1">Current Plan</h2>
            <p className="text-sm text-black/60">You are currently on the {planName}.</p>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-xl border border-black/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl">
                {planName.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-black capitalize">{planName}</h3>
                <p className="text-sm text-black/60">Lifetime Access</p>
              </div>
            </div>
            
            <span className="text-xs font-semibold uppercase tracking-wider text-black/40 bg-black/5 px-2.5 py-1 rounded-full">
              Active
            </span>
          </div>
        </div>

        {/* Quick Stats or Info */}
        <div className="bg-white rounded-2xl border border-black/10 p-6 shadow-sm flex flex-col gap-4">
          <h2 className="text-lg font-bold text-black">Plan Limits</h2>
          
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-black/60">Website Limit</span>
              <span className="font-medium">{isPro ? 'Unlimited' : '1 Website'}</span>
            </div>
            {!isPro && (
               <p className="text-xs text-black/40 mt-1">Upgrade to Pro for unlimited websites.</p>
            )}
          </div>
        </div>
      </div>

      {/* Upgrade Options */}
      <div>
         <h2 className="text-xl font-bold tracking-tight mb-4 mt-4">Upgrade Plan</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Starter Plan */}
            <div className={`border-2 rounded-2xl p-6 relative flex flex-col transition-all ${isStarter ? 'border-black bg-zinc-50' : 'border-black/10 bg-white hover:border-black/20'}`}>
               <h3 className="text-xl font-bold mb-2">Starter</h3>
               <p className="text-black/60 text-sm mb-4">Unlimited PopUps for 1 website.</p>
               <div className="mb-6">
                  <span className="text-4xl font-bold">$9</span>
                  <span className="text-black/50 ml-1 text-sm uppercase font-semibold">usd / lifetime</span>
               </div>
               
               <div className="mt-auto">
                  {isStarter ? (
                    <button disabled className="w-full h-12 rounded-xl bg-black/10 text-black font-bold flex items-center justify-center">
                       <Check className="w-4 h-4 mr-2" /> Current Plan
                    </button>
                  ) : isPro ? (
                    <button disabled className="w-full h-12 rounded-xl bg-black/5 text-black/40 font-bold flex items-center justify-center">
                       Included in Pro
                    </button>
                  ) : (
                    <button onClick={() => upgradePlan('starter')} disabled={isUpgrading} className="w-full h-12 rounded-xl bg-black text-white font-bold hover:bg-black/80 flex items-center justify-center transition-all shadow-md">
                       {isUpgrading && selectedPlan === 'starter' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Pay $9 Once'}
                    </button>
                  )}
               </div>
            </div>

            {/* Pro Plan */}
            <div className={`border-2 rounded-2xl p-6 relative flex flex-col transition-all ${isPro ? 'border-black bg-zinc-50' : 'border-black/10 bg-white hover:border-black/20'}`}>
               <h3 className="text-xl font-bold mb-2">Pro</h3>
               <p className="text-black/60 text-sm mb-4">Unlimited PopUps across unlimited websites.</p>
               <div className="mb-6">
                  <span className="text-4xl font-bold">$19</span>
                  <span className="text-black/50 ml-1 text-sm uppercase font-semibold">usd / lifetime</span>
               </div>
               
               <div className="mt-auto">
                  {isPro ? (
                    <button disabled className="w-full h-12 rounded-xl bg-black/10 text-black font-bold flex items-center justify-center">
                       <Check className="w-4 h-4 mr-2" /> Current Plan
                    </button>
                  ) : (
                    <button onClick={() => upgradePlan('pro')} disabled={isUpgrading} className="w-full h-12 rounded-xl bg-black text-white font-bold hover:bg-black/80 flex items-center justify-center transition-all shadow-md">
                       {isUpgrading && selectedPlan === 'pro' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Pay $19 Once'}
                    </button>
                  )}
               </div>
            </div>

         </div>
      </div>
    </div>
  );
}
