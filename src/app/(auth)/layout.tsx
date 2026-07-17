export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      {/* Left side: Form */}
      <div className="flex items-center justify-center p-8 relative">
        <div className="w-full max-w-md relative z-10">
          {children}
        </div>
      </div>

      {/* Right side: Abstract Art / Branding */}
      {/* Right side: Abstract Art / Branding */}
      <div className="hidden md:flex flex-col items-center justify-center bg-zinc-50 relative overflow-hidden p-12 border-l border-black/5">
        
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,transparent_20%,#fafafa_100%)]"></div>

        <div className="relative z-10 w-full max-w-[440px] flex flex-col items-center">
           
           {/* Floating Badge (Top Right) */}
           <div className="absolute -top-6 -right-6 z-20 bg-white border border-black/10 px-4 py-2 rounded-full shadow-[0_8px_16px_-6px_rgba(0,0,0,0.1)] flex items-center gap-2 animate-[bounce_4s_infinite]">
              <div className="w-2 h-2 rounded-full bg-black"></div>
              <span className="text-xs font-bold tracking-widest uppercase text-black">Live Tracking</span>
           </div>

           {/* Floating Badge (Bottom Left) */}
           <div className="absolute -bottom-8 -left-8 z-20 bg-white border border-black/10 px-4 py-2 rounded-full shadow-[0_8px_16px_-6px_rgba(0,0,0,0.1)] flex items-center gap-2 animate-[bounce_5s_infinite_reverse]">
              <span className="text-xs font-bold tracking-tight text-black">A/B Test Winner 🏆</span>
           </div>

           {/* The Main Analytics Card */}
           <div className="w-full bg-black text-white rounded-[32px] p-8 md:p-10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.4)] relative overflow-hidden group">
              
              {/* Subtle inner gradient */}
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.15),_transparent_60%)]"></div>

              {/* Chart Graphic */}
              <div className="h-32 w-full border-b border-white/10 mb-8 flex items-end justify-between gap-2 pb-4">
                 {[40, 30, 45, 25, 60, 50, 85, 75, 100].map((height, i) => (
                    <div 
                       key={i} 
                       className="w-full bg-white/20 rounded-t-sm relative group-hover:bg-white/30 transition-colors"
                       style={{ height: `${height}%` }}
                    >
                       {/* Highlight the last bar */}
                       {i === 8 && <div className="absolute inset-0 bg-white rounded-t-sm shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>}
                    </div>
                 ))}
              </div>

              {/* Content */}
              <div className="relative z-10">
                 <p className="text-white/60 text-sm font-medium uppercase tracking-widest mb-2">Revenue Recovered</p>
                 <div className="flex items-baseline gap-3 mb-4">
                    <h3 className="text-5xl md:text-6xl font-bold tracking-tighter text-white">
                      +34<span className="text-3xl text-white/50">%</span>
                    </h3>
                    <div className="bg-white/10 text-white px-2 py-1 rounded-md text-xs font-bold">
                       vs last month
                    </div>
                 </div>
                 <p className="text-white/70 text-sm leading-relaxed">
                   Join thousands of businesses turning bouncing traffic into explosive growth using exit-intent.
                 </p>
              </div>

           </div>

        </div>

      </div>
    </div>
  );
}
