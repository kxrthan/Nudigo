"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { BarChart2, Eye, Layout, TrendingUp, ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AnalyticsPage() {
  const [data, setData] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalViews: 0, views7d: 0, activeCampaigns: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch projects
      const { data: projects } = await supabase.from('projects').select('domain').eq('user_id', user.id);
      if (!projects || projects.length === 0) {
        setIsLoading(false);
        return;
      }
      
      const domains = projects.map(p => p.domain);
      
      // Fetch events
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
      const { data: events } = await supabase
        .from('events')
        .select('domain, event_type, created_at')
        .in('domain', domains)
        .eq('event_type', 'view')
        .gte('created_at', thirtyDaysAgo);
        
      if (events) {
        // Group by day
        const grouped: Record<string, number> = {};
        
        // Initialize last 30 days with 0
        for(let i=29; i>=0; i--) {
           const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
           const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
           grouped[dateStr] = 0;
        }

        let total = 0;
        let recent = 0;
        const sevenDaysAgoTime = Date.now() - 7 * 24 * 60 * 60 * 1000;
        
        const activeDomains = new Set();
        
        events.forEach(e => {
          total++;
          activeDomains.add(e.domain);
          
          const d = new Date(e.created_at);
          if (d.getTime() >= sevenDaysAgoTime) {
            recent++;
          }
          
          const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          if (grouped[dateStr] !== undefined) {
             grouped[dateStr]++;
          }
        });
        
        const chartData = Object.keys(grouped).map(date => ({
           name: date,
           views: grouped[date]
        }));
        
        setData(chartData);
        setStats({
          totalViews: total,
          views7d: recent,
          activeCampaigns: activeDomains.size
        });
      }
      setIsLoading(false);
    }
    
    fetchAnalytics();
  }, []);

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <Link href="/dashboard" className="inline-flex items-center text-sm font-semibold text-black/50 hover:text-black transition-colors mb-6 bg-white border border-black/10 px-3 py-1.5 rounded-lg shadow-sm hover:bg-black/5">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-black mb-2">Analytics Overview</h1>
        <p className="text-black/60 font-medium">Track your widget performance and traffic over the last 30 days.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-black/10 shadow-sm flex items-center justify-between">
           <div>
             <p className="text-sm font-bold text-black/40 uppercase tracking-wider mb-1">Total Views (30d)</p>
             <p className="text-4xl font-black text-black">{isLoading ? '-' : stats.totalViews}</p>
           </div>
           <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
             <Eye className="w-6 h-6 text-blue-500" />
           </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-black/10 shadow-sm flex items-center justify-between">
           <div>
             <p className="text-sm font-bold text-black/40 uppercase tracking-wider mb-1">Views (Last 7d)</p>
             <p className="text-4xl font-black text-black">{isLoading ? '-' : stats.views7d}</p>
           </div>
           <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
             <TrendingUp className="w-6 h-6 text-green-500" />
           </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-black/10 shadow-sm flex items-center justify-between">
           <div>
             <p className="text-sm font-bold text-black/40 uppercase tracking-wider mb-1">Active Campaigns</p>
             <p className="text-4xl font-black text-black">{isLoading ? '-' : stats.activeCampaigns}</p>
           </div>
           <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
             <Layout className="w-6 h-6 text-purple-500" />
           </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-3xl p-8 border border-black/10 shadow-sm min-h-[400px]">
        <h2 className="text-lg font-bold text-black mb-6">Traffic Over Time</h2>
        
        {isLoading ? (
          <div className="w-full h-[300px] flex items-center justify-center">
             <div className="text-black/40 font-medium">Loading analytics data...</div>
          </div>
        ) : (
          <div className="w-full h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#888' }} 
                  dy={10}
                  minTickGap={30}
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
        )}
      </div>
    </div>
  );
}
