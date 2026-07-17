import { createClient } from "@/lib/supabase/server";
import { PopupEditorClient } from "./PopupEditorClient";

export default async function PopupEditorPage({ params }: { params: Promise<{ domain: string }> }) {
  const resolvedParams = await params;
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('projects')
    .select('settings')
    .eq('domain', resolvedParams.domain)
    .single();
    
  const initialSettings = data?.settings || {};

  return (
    <PopupEditorClient initialSettings={initialSettings} domain={resolvedParams.domain} />
  );
}
