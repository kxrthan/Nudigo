import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 min-h-[500px]">
      <div className="flex flex-col items-center gap-4 text-black/40">
        <Loader2 className="w-8 h-8 animate-spin" />
        <p className="text-sm font-medium animate-pulse">Loading dashboard...</p>
      </div>
      
      {/* Optional: Add a skeleton for the projects list below the spinner if desired */}
      <div className="w-full max-w-sm mt-12 space-y-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="w-full h-20 bg-black/5 rounded-3xl animate-pulse" />
        ))}
      </div>
    </div>
  );
}
