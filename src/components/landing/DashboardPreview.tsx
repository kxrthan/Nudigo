"use client";

import { motion } from "framer-motion";
import { Zap, Plus, BarChart2, User, ChevronDown, Trash2, Eye, TrendingUp, Layout, ArrowLeft } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const ResponsiveContainer = dynamic(() => import("recharts").then(mod => mod.ResponsiveContainer), { ssr: false });
const BarChart = dynamic(() => import("recharts").then(mod => mod.BarChart), { ssr: false });
const Bar = dynamic(() => import("recharts").then(mod => mod.Bar), { ssr: false });
const XAxis = dynamic(() => import("recharts").then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import("recharts").then(mod => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import("recharts").then(mod => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then(mod => mod.Tooltip), { ssr: false });

export function DashboardPreview() {
  const [selectedFramework, setSelectedFramework] = useState<'html' | 'nextjs' | 'react'>('html');
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics'>('overview');

  const fakeProjects = [
    { domain: "acme-corp.com", views: "1,240" },
    { domain: "mystore.io", views: "853" }
  ];

  const fakeAnalyticsData = [
    { name: "Jul 10", views: 12 },
    { name: "Jul 11", views: 15 },
    { name: "Jul 12", views: 25 },
    { name: "Jul 13", views: 40 },
    { name: "Jul 14", views: 60 },
    { name: "Jul 15", views: 50 },
    { name: "Jul 16", views: 80 },
  ];

  return (
    <section className="py-24 bg-[#FAFAFA] relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black mb-4">
            Manage everything in one place.
          </h2>
          <p className="text-lg text-black/60 max-w-2xl mx-auto">
            Create, manage, and install campaigns across all your websites effortlessly.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Dashboard Window Container */}
          <div className="bg-zinc-50 rounded-2xl md:rounded-[2rem] shadow-[0_30px_100px_-15px_rgba(0,0,0,0.3)] border border-black overflow-hidden flex flex-col font-sans text-black min-h-[600px]">
            
            {/* macOS Window Controls */}
            <div className="bg-[#f2f2f2] px-4 md:px-6 py-3 flex items-center gap-2 border-b border-black/5 shrink-0">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-sm"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-sm"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-sm"></div>
            </div>

            {/* Top Navigation */}
            <header className="h-16 md:h-20 px-4 md:px-8 flex items-center justify-between border-b border-black/5 bg-white shrink-0">
              {/* Left Side: Logo */}
              <div 
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => setActiveTab('overview')}
              >
                <div className="w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-105">
                  <Image src="/logo.png" alt="Nudigo Logo" width={40} height={40} className="w-full h-full object-contain drop-shadow-sm" priority />
                </div>
                <span className="font-bold text-xl tracking-tighter text-black hidden sm:inline-block">Nudigo</span>
              </div>

              {/* Right Side */}
              <div className="flex items-center gap-2 md:gap-4">
                <div 
                  onClick={() => setActiveTab('analytics')}
                  className={`hidden sm:inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold shadow-sm cursor-pointer transition-colors ${activeTab === 'analytics' ? 'bg-black text-white' : 'bg-white text-black/80 border border-black/10 hover:bg-zinc-100'}`}
                >
                  <BarChart2 className="w-4 h-4 mr-2" />
                  Analytics
                </div>

                <div className="inline-flex items-center gap-2 bg-white border border-black/10 rounded-full px-3 md:px-5 py-2 text-sm font-semibold text-black/80 shadow-sm cursor-pointer hover:bg-zinc-100 transition-colors">
                  <div className="w-6 h-6 rounded-full bg-black/5 border border-black/10 flex items-center justify-center">
                     <User className="w-3.5 h-3.5 text-black/70" />
                  </div>
                  <span className="hidden sm:inline-block">Account</span>
                  <ChevronDown className="w-4 h-4 opacity-50 hidden sm:inline-block" />
                </div>
              </div>
            </header>

            {/* Main Content */}
            <div className="p-6 md:p-8 w-full flex-1 flex flex-col md:flex-row gap-8 bg-zinc-50 text-left relative min-h-[450px]">
              
              {activeTab === 'overview' ? (
                <>
                  {/* Left Column: List of PopUps */}
                  <div className="flex-1 flex flex-col animate-in fade-in duration-300">
                    <div className="flex items-center justify-between mb-6 max-w-sm">
                      <h2 className="text-xl font-bold tracking-tight text-black">2 PopUps</h2>
                      <button className="inline-flex items-center justify-center rounded-full border border-black/10 hover:bg-black/5 text-black font-semibold h-8 px-4 text-xs transition-colors">
                        <Plus className="w-3 h-3 mr-1" /> New Popup
                      </button>
                    </div>
                    
                    <div className="flex flex-col gap-3 max-w-sm">
                      {fakeProjects.map((popup) => (
                        <div
                          key={popup.domain}
                          className="group flex items-center justify-between p-4 rounded-3xl bg-white border border-black/5 hover:border-black/20 hover:bg-zinc-50 transition-all shadow-sm cursor-pointer"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-black bg-zinc-100">
                              <Zap className="w-4 h-4 fill-current" />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-black text-sm">{popup.domain}</span>
                              <div className="flex items-center text-[10px] font-medium text-black/40">
                                <BarChart2 className="w-3 h-3 mr-1 text-blue-500" />
                                {popup.views} visitors in last 24h
                              </div>
                            </div>
                          </div>
                          <button 
                            className="w-8 h-8 rounded-full flex items-center justify-center text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                            title="Delete Campaign"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Add specific website & Guides */}
                  <div className="w-full md:w-[480px] shrink-0 flex flex-col gap-6 self-start animate-in fade-in duration-300">
                    
                    <div className="bg-white border border-black/10 rounded-3xl p-6 shadow-sm flex flex-col items-center text-center">
                      <h3 className="text-lg font-bold text-black mb-2">Ready for more?</h3>
                      <p className="text-sm text-black/50 font-medium mb-6">Create a new popup campaign for another website or project.</p>
                      
                      <button className="w-full flex items-center justify-center h-12 rounded-2xl bg-black hover:bg-black/80 text-white font-bold shadow-md transition-all hover:shadow-lg">
                        <Plus className="w-4 h-4 mr-2" /> Add Website
                      </button>
                    </div>

                    {/* Integration Guide Card */}
                    <div className="bg-white border border-black/10 rounded-3xl p-6 shadow-sm flex flex-col">
                      <h3 className="text-lg font-bold text-black mb-1">How to Install</h3>
                      <p className="text-xs text-black/50 font-medium mb-4">Select your framework to see where to paste your embed code.</p>
                      
                      <div className="flex gap-2 mb-4 bg-zinc-100 p-1 rounded-xl">
                        <button 
                          onClick={() => setSelectedFramework('html')}
                          className={`flex-1 text-[11px] font-bold py-2 rounded-lg transition-all ${selectedFramework === 'html' ? 'bg-white shadow text-black' : 'text-black/50 hover:text-black'}`}
                        >HTML</button>
                        <button 
                          onClick={() => setSelectedFramework('nextjs')}
                          className={`flex-1 text-[11px] font-bold py-2 rounded-lg transition-all ${selectedFramework === 'nextjs' ? 'bg-white shadow text-black' : 'text-black/50 hover:text-black'}`}
                        >Next.js</button>
                        <button 
                          onClick={() => setSelectedFramework('react')}
                          className={`flex-1 text-[11px] font-bold py-2 rounded-lg transition-all ${selectedFramework === 'react' ? 'bg-white shadow text-black' : 'text-black/50 hover:text-black'}`}
                        >React/Vite</button>
                      </div>

                      <div className="mb-3 px-1">
                        {selectedFramework === 'html' && <p className="text-[13px] text-black/80 font-semibold leading-relaxed">Paste this right before the closing <code className="bg-black/5 px-1.5 py-0.5 rounded text-pink-600 border border-black/10">&lt;/body&gt;</code> tag of your website.</p>}
                        {selectedFramework === 'nextjs' && <p className="text-[13px] text-black/80 font-semibold leading-relaxed">Paste this inside your <code className="bg-black/5 px-1.5 py-0.5 rounded text-pink-600 border border-black/10">app/layout.tsx</code> or <code className="bg-black/5 px-1.5 py-0.5 rounded text-pink-600 border border-black/10">pages/_document.tsx</code> file.</p>}
                        {selectedFramework === 'react' && <p className="text-[13px] text-black/80 font-semibold leading-relaxed">Paste this inside the <code className="bg-black/5 px-1.5 py-0.5 rounded text-pink-600 border border-black/10">&lt;body&gt;</code> of your <code className="bg-black/5 px-1.5 py-0.5 rounded text-pink-600 border border-black/10">public/index.html</code> file.</p>}
                      </div>

                      <div className="bg-[#0D0D0D] rounded-xl p-5 overflow-auto relative border border-white/5 shadow-inner h-[120px]">
                        <pre className="text-[12px] leading-relaxed font-mono">
                          {selectedFramework === 'html' && (
                            <code dangerouslySetInnerHTML={{ __html: `
<span class="text-zinc-500">&lt;!-- HTML, WordPress, Webflow --&gt;</span>
<span class="text-zinc-500">&lt;!-- Paste inside your &lt;body&gt; tag --&gt;</span>

<span class="text-yellow-400 font-bold">&lt;!-- PASTE YOUR EMBED CODE HERE --&gt;</span>`.trim() }} />
                          )}
                          {selectedFramework === 'nextjs' && (
                            <code dangerouslySetInnerHTML={{ __html: `
<span class="text-zinc-500">// In app/layout.tsx</span>
<span class="text-purple-400">import</span> <span class="text-blue-300">Script</span> <span class="text-purple-400">from</span> <span class="text-green-300">'next/script'</span>

<span class="text-purple-400">export default function</span> <span class="text-blue-300">Layout</span>() {
  <span class="text-purple-400">return</span> (
    <span class="text-zinc-500">&lt;html&gt;</span>
      <span class="text-zinc-500">&lt;body&gt;</span>
        <span class="text-zinc-500">&lt;!-- PASTE YOUR SCRIPT HERE --&gt;</span>
      <span class="text-zinc-500">&lt;/body&gt;</span>
    <span class="text-zinc-500">&lt;/html&gt;</span>
  )
}`.trim() }} />
                          )}
                          {selectedFramework === 'react' && (
                            <code dangerouslySetInnerHTML={{ __html: `
<span class="text-zinc-500">&lt;!-- React / Vite --&gt;</span>
<span class="text-zinc-500">&lt;!-- Paste inside index.html --&gt;</span>

<span class="text-yellow-400 font-bold">&lt;!-- PASTE YOUR EMBED CODE HERE --&gt;</span>`.trim() }} />
                          )}
                        </pre>
                      </div>
                    </div>

                  </div>
                </>
              ) : (
                <div className="w-full flex-1 flex flex-col animate-in fade-in duration-300">
                  <div className="mb-8">
                    <button 
                      onClick={() => setActiveTab('overview')}
                      className="inline-flex items-center text-sm font-semibold text-black/50 hover:text-black transition-colors mb-6 bg-white border border-black/10 px-3 py-1.5 rounded-lg shadow-sm hover:bg-black/5"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                    </button>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-black mb-2">Analytics Overview</h1>
                    <p className="text-black/60 font-medium text-sm md:text-base">Track your widget performance and traffic over the last 30 days.</p>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-5 border border-black/10 shadow-sm flex items-center justify-between">
                       <div>
                         <p className="text-[10px] md:text-xs font-bold text-black/40 uppercase tracking-wider mb-1">Total Views (30d)</p>
                         <p className="text-2xl md:text-3xl font-black text-black">12,450</p>
                       </div>
                       <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-50 flex items-center justify-center">
                         <Eye className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
                       </div>
                    </div>
                    <div className="bg-white rounded-2xl p-5 border border-black/10 shadow-sm flex items-center justify-between">
                       <div>
                         <p className="text-[10px] md:text-xs font-bold text-black/40 uppercase tracking-wider mb-1">Views (Last 7d)</p>
                         <p className="text-2xl md:text-3xl font-black text-black">3,820</p>
                       </div>
                       <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-50 flex items-center justify-center">
                         <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
                       </div>
                    </div>
                    <div className="bg-white rounded-2xl p-5 border border-black/10 shadow-sm flex items-center justify-between">
                       <div>
                         <p className="text-[10px] md:text-xs font-bold text-black/40 uppercase tracking-wider mb-1">Active Campaigns</p>
                         <p className="text-2xl md:text-3xl font-black text-black">4</p>
                       </div>
                       <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-purple-50 flex items-center justify-center">
                         <Layout className="w-5 h-5 md:w-6 md:h-6 text-purple-500" />
                       </div>
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="bg-white rounded-3xl p-6 md:p-8 border border-black/10 shadow-sm">
                    <h2 className="text-base md:text-lg font-bold text-black mb-6">Traffic Over Time</h2>
                    <div className="w-full h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={fakeAnalyticsData} margin={{ top: 5, right: 0, bottom: 0, left: -20 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                          <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 12, fill: '#888' }} 
                            dy={10}
                            minTickGap={10}
                          />
                          <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 12, fill: '#888' }} 
                            dx={-10}
                            tickCount={5}
                            allowDecimals={false}
                          />
                          <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                            itemStyle={{ color: '#000', fontWeight: 'bold' }}
                            cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                          />
                          <Bar 
                            dataKey="views" 
                            fill="#000" 
                            radius={[4, 4, 0, 0]}
                            barSize={30}
                            background={{ fill: '#e5e7eb', radius: 4 }}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Decorative Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full max-h-[400px] bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-[100px] -z-20 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
