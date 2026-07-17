"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Zap, Play, Plus, X, Loader2, Trash2, BarChart2, Edit2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function DashboardClient({ 
  initialProjects, 
  initialPlanTier 
}: { 
  initialProjects: any[], 
  initialPlanTier: string 
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [projects, setProjects] = useState<any[]>(initialProjects);
  const [isCreating, setIsCreating] = useState(false);
  const [popupToDelete, setPopupToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [popupToRename, setPopupToRename] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [isRenaming, setIsRenaming] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState<'html' | 'nextjs' | 'react'>('html');
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const router = useRouter();

  const planTier = initialPlanTier;

  const handleOpenModal = () => {
    if (planTier !== 'pro' && projects.length >= 1) {
       setIsUpgradeModalOpen(true);
       return;
    }
    setIsModalOpen(true);
  };

  const handleCreatePopup = async (domainName: string) => {
    if (!domainName.trim() || isCreating) return;
    
    setIsCreating(true);
    let domain = domainName.trim();
    
    try {
      const urlToParse = domain.includes('http') ? domain : `https://${domain}`;
      const url = new URL(urlToParse);
      domain = url.hostname.replace(/^www\./, '');
    } catch (e) {
      domain = domain.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
    }

    if (!domain) {
      setIsCreating(false);
      return;
    }

    router.push(`/dashboard/${encodeURIComponent(domain)}`);
  };

  const confirmDeletePopup = (domain: string, e: React.MouseEvent) => {
    e.preventDefault();
    setPopupToDelete(domain);
  };

  const executeDelete = async () => {
    if (!popupToDelete) return;
    setIsDeleting(true);
    const supabase = createClient();
    try {
      const { error } = await supabase.from('projects').delete().eq('domain', popupToDelete);
      
      if (error) {
        console.error("Supabase delete error:", error);
        alert(`Failed to delete: ${error.message}.`);
        setPopupToDelete(null);
        return;
      }
      
      setProjects(prev => prev.filter(p => p.domain !== popupToDelete));
      setPopupToDelete(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const confirmRenamePopup = (domain: string, e: React.MouseEvent) => {
    e.preventDefault();
    setPopupToRename(domain);
    setRenameValue(domain);
  };

  const executeRename = async () => {
    if (!popupToRename || !renameValue.trim() || popupToRename === renameValue.trim()) {
      setPopupToRename(null);
      return;
    }
    
    setIsRenaming(true);
    let newDomain = renameValue.trim();
    
    try {
      const urlToParse = newDomain.includes('http') ? newDomain : `https://${newDomain}`;
      const url = new URL(urlToParse);
      newDomain = url.hostname.replace(/^www\./, '');
    } catch (e) {
      newDomain = newDomain.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
    }

    if (!newDomain) {
      setIsRenaming(false);
      return;
    }

    const supabase = createClient();
    try {
      const { error } = await supabase
        .from('projects')
        .update({ domain: newDomain })
        .eq('domain', popupToRename);
      
      if (error) {
        console.error("Supabase rename error:", error);
        alert(`Failed to rename: ${error.message}`);
      } else {
        setProjects(prev => prev.map(p => p.domain === popupToRename ? { ...p, domain: newDomain } : p));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsRenaming(false);
      setPopupToRename(null);
    }
  };

  return (
    <>
      <main className="max-w-7xl mx-auto w-full px-8 py-8 animate-in fade-in duration-500">
        
        <div className="flex flex-col md:flex-row gap-8 min-h-[500px]">
          
          {/* Left Column: List of PopUps */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-6 max-w-sm">
              <h2 className="text-xl font-bold tracking-tight text-black">{projects.length} PopUps</h2>
              <Button 
                onClick={handleOpenModal}
                variant="outline" 
                size="sm" 
                className="rounded-full bg-transparent border-black/10 hover:bg-black/5 text-black font-semibold h-8 px-4 text-xs"
              >
                <Plus className="w-3 h-3 mr-1" /> New Popup
              </Button>
            </div>
            
            <div className="flex flex-col gap-3 max-w-sm">
              {projects.length === 0 ? (
                <div className="text-sm text-black/50 p-4 border border-dashed border-black/10 rounded-2xl text-center">
                  You don't have any popups yet. Create one!
                </div>
              ) : (
                projects.map((popup) => {
                  return (
                    <Link
                      key={popup.domain}
                      href={`/dashboard/${popup.domain}`}
                      className="group flex items-center justify-between p-4 rounded-3xl bg-white border border-black/5 hover:border-black/20 hover:bg-zinc-50 transition-all shadow-sm"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-black bg-zinc-100">
                          <Zap className="w-4 h-4 fill-current" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-black text-sm">{popup.domain}</span>
                          <div className="flex items-center text-[10px] font-medium text-black/40">
                            <BarChart2 className="w-3 h-3 mr-1 text-blue-500" />
                            {popup.views24h} visitors in last 24h
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={(e) => confirmRenamePopup(popup.domain, e)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-black/60 hover:text-black hover:bg-black/5"
                          title="Rename Campaign"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={(e) => confirmDeletePopup(popup.domain, e)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50"
                          title="Delete Campaign"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </Link>
                  )
                })
              )}
            </div>
          </div>

          {/* Right Column: Add specific website & Guides */}
          <div className="w-full md:w-[480px] shrink-0 flex flex-col gap-6 self-start">
            
            <div className="bg-white border border-black/10 rounded-3xl p-6 shadow-sm flex flex-col items-center text-center">
              <h3 className="text-lg font-bold text-black mb-2">Ready for more?</h3>
              <p className="text-sm text-black/50 font-medium mb-6">Create a new popup campaign for another website or project.</p>
              
              <Button 
                onClick={handleOpenModal}
                className="w-full h-12 rounded-2xl bg-black hover:bg-black/80 text-white font-bold shadow-md transition-all hover:shadow-lg"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Website
              </Button>
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

              <div className="bg-[#0D0D0D] rounded-xl p-5 overflow-x-auto relative border border-white/5 shadow-inner">
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
        <span class="text-zinc-500">{/* Your App content */}</span>
        
        <span class="text-yellow-400 font-bold">{/* PASTE YOUR EMBED CODE HERE */}</span>
      <span class="text-zinc-500">&lt;/body&gt;</span>
    <span class="text-zinc-500">&lt;/html&gt;</span>
  )
}`.trim() }} />
                  )}
                  {selectedFramework === 'react' && (
                    <code dangerouslySetInnerHTML={{ __html: `
<span class="text-zinc-500">&lt;!-- In public/index.html --&gt;</span>
<span class="text-zinc-500">&lt;body&gt;</span>
  <span class="text-zinc-500">&lt;div id="root"&gt;&lt;/div&gt;</span>
  
  <span class="text-yellow-400 font-bold">&lt;!-- PASTE YOUR EMBED CODE HERE --&gt;</span>
<span class="text-zinc-500">&lt;/body&gt;</span>`.trim() }} />
                  )}
                </pre>
              </div>
            </div>

          </div>
          
        </div>

      </main>

      {/* Create New Popup Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-black/40 hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold text-black mb-2">Create New Popup</h2>
            <p className="text-black/60 text-sm mb-6">Enter a project name to get started.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-black mb-2">Project Name</label>
                <Input 
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="e.g. My Awesome Site"
                  className="h-12 rounded-xl bg-black/5 border-none text-black font-medium px-4"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handleCreatePopup(newProjectName)}
                />
              </div>
              <Button 
                onClick={() => handleCreatePopup(newProjectName)}
                disabled={isCreating}
                className="w-full h-12 rounded-xl bg-black text-white font-bold hover:bg-black/80 transition-all"
              >
                {isCreating ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Required Modal */}
      {isUpgradeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative animate-in zoom-in-95 duration-200 flex flex-col items-center text-center">
            <button 
              onClick={() => setIsUpgradeModalOpen(false)}
              className="absolute top-6 right-6 text-black/40 hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-16 h-16 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <Zap className="w-8 h-8 fill-current" />
            </div>
            <h2 className="text-2xl font-bold text-black mb-2">Upgrade Required</h2>
            <p className="text-black/60 text-sm mb-8 leading-relaxed">
              You've reached your plan's limit of 1 website. Upgrade to the <strong className="text-black font-bold">Pro Plan</strong> to unlock unlimited websites.
            </p>
            
            <Link 
              href="/dashboard/billing"
              className="w-full flex items-center justify-center h-12 rounded-xl bg-black hover:bg-black/80 text-white font-bold transition-all shadow-md border-none"
            >
              Upgrade to Pro
            </Link>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {popupToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative animate-in zoom-in-95 duration-200 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <Trash2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-black mb-2">Delete Campaign?</h2>
            <p className="text-black/60 text-sm mb-8 leading-relaxed">
              Are you sure you want to delete <strong className="text-black font-bold">{popupToDelete}</strong>? This action cannot be undone.
            </p>
            
            <div className="flex gap-3 w-full">
              <Button 
                onClick={() => setPopupToDelete(null)}
                disabled={isDeleting}
                className="flex-1 h-12 rounded-xl bg-black/5 hover:bg-black/10 text-black font-bold transition-all border-none"
              >
                Cancel
              </Button>
              <Button 
                onClick={executeDelete}
                disabled={isDeleting}
                className="flex-1 h-12 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition-all shadow-md shadow-red-500/20 border-none"
              >
                {isDeleting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Yes, Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Rename Modal */}
      {popupToRename && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setPopupToRename(null)}
              className="absolute top-6 right-6 text-black/40 hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold text-black mb-2">Rename Project</h2>
            <p className="text-black/60 text-sm mb-6">Enter a new name for your project.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-black mb-2">Project Name</label>
                <Input 
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  placeholder="e.g. My Awesome Site"
                  className="h-12 rounded-xl bg-black/5 border-none text-black font-medium px-4"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && executeRename()}
                />
              </div>
              <Button 
                onClick={executeRename}
                disabled={isRenaming}
                className="w-full h-12 rounded-xl bg-black text-white font-bold hover:bg-black/80 transition-all"
              >
                {isRenaming ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
