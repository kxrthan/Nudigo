import { createClient } from "@/lib/supabase/server";
import { DashboardClient } from "./DashboardClient";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  let projectsWithStats: any[] = [];
  let planTier = 'free';

  try {
    const { data } = await supabase
      .from('projects')
      .select('domain')
      .eq('user_id', user.id);
      
    if (data) {
      // Fetch events from last 24h
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      const { data: eventsData } = await supabase
        .from('events')
        .select('domain')
        .eq('event_type', 'view')
        .gte('created_at', twentyFourHoursAgo);
        
      const viewCounts: Record<string, number> = {};
      if (eventsData) {
         eventsData.forEach(e => {
           viewCounts[e.domain] = (viewCounts[e.domain] || 0) + 1;
         });
      }
      
      projectsWithStats = data.map(p => ({
         ...p,
         views24h: viewCounts[p.domain] || 0
      }));
      
      // Fetch plan tier
      const { data: profileData } = await supabase.from('profiles').select('plan_tier').eq('id', user.id).single();
      if (profileData) {
        planTier = profileData.plan_tier || 'free';
      }
    }
  } catch (err) {
    console.error("Failed to load dashboard data:", err);
  }

  return (
    <DashboardClient initialProjects={projectsWithStats} initialPlanTier={planTier} />
  );
}
