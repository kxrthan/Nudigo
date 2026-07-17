"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Camera, Plus, Trash2, Play, Square, Loader2, Code, Check, Edit2, X } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type PopupMessage = {
  id: string;
  title: string;
  subtitle: string;
  timeText: string;
  avatarUrl: string;
  avatarBgColor: string;
};

export function PopupEditorClient({ initialSettings, domain }: { initialSettings: any, domain: string }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isTimingUpdated, setIsTimingUpdated] = useState(false);
  
  // Renaming state
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(domain);
  const [isRenaming, setIsRenaming] = useState(false);

  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(initialSettings?.theme || 'light');
  const [accentColor, setAccentColor] = useState<string>(initialSettings?.accentColor || '');

  const ACCENT_COLORS = [
    { name: 'Default', hex: '' },
    { name: 'Blue', hex: '#3b82f6' },
    { name: 'Green', hex: '#22c55e' },
    { name: 'Purple', hex: '#a855f7' },
    { name: 'Pink', hex: '#ec4899' },
    { name: 'Orange', hex: '#f97316' }
  ];

  // Timing states
  const [startDelay, setStartDelay] = useState(initialSettings?.startDelay || "500");
  const [messageInterval, setMessageInterval] = useState(initialSettings?.messageInterval || "1000");
  const [hideAfter, setHideAfter] = useState(initialSettings?.hideAfter || "3000");

  const [appliedTimings, setAppliedTimings] = useState(initialSettings?.appliedTimings || {
    startDelay: "500",
    messageInterval: "1000",
    hideAfter: "3000"
  });

  const defaultMessages = [{ id: "1", title: "Gym Chad", subtitle: "Still in couch?", timeText: "30d", avatarUrl: "🧔🏻‍♂️", avatarBgColor: "bg-zinc-200" }];
  
  // Messages State
  const [messages, setMessages] = useState<PopupMessage[]>(
    initialSettings?.messages?.length ? initialSettings.messages : defaultMessages
  );

  const [activeUploadId, setActiveUploadId] = useState<string | null>(null);
  
  // Test Preview State
  type ActiveToast = {
    instanceId: string;
    messageId: string;
  };
  
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [activeToasts, setActiveToasts] = useState<ActiveToast[]>([]);
  const messagesRef = useRef(messages);
  const sequenceIndexRef = useRef(0);
  const timingRef = useRef(appliedTimings);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    timingRef.current = appliedTimings;
  }, [appliedTimings]);

  useEffect(() => {
    if (!isPreviewMode || messagesRef.current.length === 0) {
      setActiveToasts([]);
      sequenceIndexRef.current = 0;
      return;
    }

    let isCancelled = false;
    let currentTimer: NodeJS.Timeout;
    let lastHideTime = 0;

    const spawnToast = () => {
      if (isCancelled) return;
      
      const msgs = messagesRef.current;
      if (msgs.length === 0) return;

      // Stop if we have shown all messages once
      if (sequenceIndexRef.current >= msgs.length) {
        return;
      }

      const currentIndex = sequenceIndexRef.current;
      const msg = msgs[currentIndex];
      const instanceId = Math.random().toString(36).substring(7);

      // Add toast
      setActiveToasts(prev => [...prev, { instanceId, messageId: msg.id }]);

      // Calculate sequential hide time
      const now = Date.now();
      const hideDelay = Number(timingRef.current.hideAfter) || 3000;
      
      let hideAt = 0;
      if (lastHideTime < now) {
        hideAt = now + hideDelay;
      } else {
        hideAt = lastHideTime + hideDelay;
      }
      lastHideTime = hideAt;
      const timeUntilHide = hideAt - now;

      // Remove after timeUntilHide
      setTimeout(() => {
        if (!isCancelled) {
          setActiveToasts(prev => prev.filter(t => t.instanceId !== instanceId));
        }
      }, timeUntilHide);

      // Advance sequence
      sequenceIndexRef.current = currentIndex + 1;

      // Schedule next
      currentTimer = setTimeout(spawnToast, Number(timingRef.current.messageInterval) || 1000);
    };

    currentTimer = setTimeout(spawnToast, Number(appliedTimings.startDelay) || 500);

    return () => {
      isCancelled = true;
      clearTimeout(currentTimer);
    };
  }, [isPreviewMode, appliedTimings]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeUploadId) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updateMessage(activeUploadId, 'avatarUrl', event.target.result as string);
          updateMessage(activeUploadId, 'avatarBgColor', 'bg-transparent');
        }
      };
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const updateMessage = (id: string, field: keyof PopupMessage, value: string) => {
    setMessages(prev => prev.map(msg => msg.id === id ? { ...msg, [field]: value } : msg));
  };

  const addMessage = () => {
    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        title: "New Visitor",
        subtitle: "Just signed up",
        timeText: "now",
        avatarUrl: "✨",
        avatarBgColor: "bg-zinc-200"
      }
    ]);
  };

  const removeMessage = (id: string) => {
    if (messages.length > 1) {
      setMessages(prev => prev.filter(msg => msg.id !== id));
    }
  };

  const renderAvatar = (msg: PopupMessage) => {
    if (msg.avatarUrl.startsWith('data:image')) {
      return <img src={msg.avatarUrl} alt="Avatar" className="w-full h-full object-cover rounded-full" />;
    }
    return <span className="text-3xl">{msg.avatarUrl}</span>;
  };

  const handleSave = async () => {
    setIsSaving(true);
    setIsSaved(false);
    const settings = { theme, accentColor, startDelay, messageInterval, hideAfter, appliedTimings, messages };
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.error("User not authenticated");
        alert("Please log in to save changes.");
        setIsSaving(false);
        return;
      }

      await supabase.from('projects').upsert({
        domain: domain,
        settings,
        user_id: user.id
      });
      setIsSaved(true);
      
      // Wait for 1 second so they see the success animation, then redirect
      setTimeout(() => {
        router.push('/dashboard');
      }, 1200);
      
    } catch (err) {
      console.error("Error saving data:", err);
      setIsSaving(false);
    }
  };

  const handleRename = async () => {
    if (!newName.trim() || newName.trim() === domain) {
      setIsEditingName(false);
      return;
    }

    setIsRenaming(true);
    let updatedDomain = newName.trim();
    
    // Auto-clean domain
    try {
      const urlToParse = updatedDomain.includes('http') ? updatedDomain : `https://${updatedDomain}`;
      const url = new URL(urlToParse);
      updatedDomain = url.hostname.replace(/^www\./, '');
    } catch (e) {
      updatedDomain = updatedDomain.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
    }

    if (!updatedDomain) {
      setIsRenaming(false);
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('projects')
        .update({ domain: updatedDomain })
        .eq('domain', domain);
        
      if (error) throw error;
      
      // Redirect to the new URL
      router.push(`/dashboard/${encodeURIComponent(updatedDomain)}`);
    } catch (err: any) {
      console.error("Error renaming:", err);
      alert(`Failed to rename: ${err.message}`);
      setIsRenaming(false);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-[calc(100vh-140px)] w-full text-black/50 font-medium">Loading project settings...</div>;
  }

  return (
    <div className="w-full flex flex-col min-h-[calc(100vh-140px)] lg:h-[calc(100vh-140px)] animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-8 mb-8">
        <div className="flex items-center gap-4 w-full lg:w-[400px] shrink-0">
          <Link href="/dashboard" className="w-10 h-10 shrink-0 rounded-full bg-white flex items-center justify-center hover:bg-black/5 transition-colors shadow-sm">
            <ArrowLeft className="w-5 h-5 text-black" />
          </Link>
          <div className="min-w-0 flex-1">
            {isEditingName ? (
              <div className="flex items-center gap-2">
                <Input
                  autoFocus
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleRename()}
                  className="h-8 text-lg font-bold bg-white border-black/20 focus-visible:ring-black px-2 w-full max-w-[250px]"
                />
                <Button 
                  size="sm" 
                  onClick={handleRename} 
                  disabled={isRenaming}
                  className="h-8 px-3 bg-black text-white hover:bg-black/80"
                >
                  {isRenaming ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => { setIsEditingName(false); setNewName(domain); }}
                  className="h-8 w-8 p-0 text-black/50 hover:text-black hover:bg-black/5"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3 group">
                <h1 className="text-2xl font-bold tracking-tight text-black truncate">{domain}</h1>
                <button 
                  onClick={() => setIsEditingName(true)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 rounded-full flex items-center justify-center bg-black/5 hover:bg-black/10 text-black/60 hover:text-black shrink-0"
                  title="Rename Project"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
              </div>
            )}
            <p className="text-black/50 text-sm font-medium truncate mt-0.5">Editing active popup campaign</p>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-4 lg:mt-0">
          <Button 
            onClick={() => {
              const origin = window.location.origin;
              const script = `<script src="${origin}/api/embed/${domain}" defer></script>`;
              if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(script);
              } else {
                const textArea = document.createElement("textarea");
                textArea.value = script;
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                  document.execCommand('copy');
                } catch (err) {
                  console.error('Fallback: Oops, unable to copy', err);
                }
                document.body.removeChild(textArea);
              }
              setIsCopied(true);
              setTimeout(() => setIsCopied(false), 2000);
            }}
            variant="outline" 
            className="rounded-lg h-10 px-4 border-black/10 bg-white shadow-sm text-black hover:bg-black/5"
          >
            {isCopied ? <Check className="w-4 h-4 mr-2 text-green-600" /> : <Code className="w-4 h-4 mr-2" />}
            {isCopied ? "Copied!" : "Embed Code"}
          </Button>
          <Button 
            onClick={handleSave}
            disabled={isSaving || isSaved}
            className={`h-10 px-8 rounded-lg font-bold shadow-md transition-all duration-300 flex items-center gap-2 ${
              isSaved 
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-black hover:bg-black/80 text-white'
            }`}
          >
            {isSaving && !isSaved ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isSaved ? (
              <Check className="w-4 h-4" />
            ) : null}
            {isSaving ? 'Saving...' : isSaved ? 'Saved!' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-8 min-h-0">
        
        {/* Left Column: Configuration */}
        <div className="w-full lg:w-[400px] flex flex-col bg-white border border-black/20 rounded-3xl p-6 shadow-sm overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          
          <div className="space-y-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <label className="text-[13px] font-bold text-black/70">Popup Theme</label>
                <div className="flex gap-2.5">
                  <button 
                    onClick={() => setTheme('light')}
                    title="Light Mode"
                    className={`w-6 h-6 rounded-full shadow-sm bg-[#EFEFEF] transition-all outline-none flex items-center justify-center border border-black/20 ${theme === 'light' ? 'ring-2 ring-black ring-offset-[3px]' : 'hover:border-black/40'}`}
                  />
                  <button 
                    onClick={() => setTheme('dark')}
                    title="Dark Mode"
                    className={`w-6 h-6 rounded-full shadow-sm bg-[#1a1a1a] transition-all outline-none flex items-center justify-center border border-black/20 ${theme === 'dark' ? 'ring-2 ring-black ring-offset-[3px]' : 'hover:border-black/60'}`}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-[13px] font-bold text-black/70">Accent Color</label>
                <div className="flex gap-2">
                  {ACCENT_COLORS.map(color => (
                    <button
                      key={color.name}
                      onClick={() => setAccentColor(color.hex)}
                      title={color.name}
                      className={`w-5 h-5 rounded-full shadow-sm transition-all outline-none border border-black/10 ${accentColor === color.hex ? 'ring-2 ring-black ring-offset-[2px] scale-110' : 'hover:scale-110'}`}
                      style={{ 
                        background: color.hex || (theme === 'dark' ? '#ffffff' : '#000000') 
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="h-px bg-black/5 w-full"></div>

            <div>
              <label className="block text-[13px] font-bold text-black/70 mb-1.5">Start PoopUp after (ms)</label>
              <Input 
                value={startDelay}
                onChange={(e) => setStartDelay(e.target.value)}
                className="h-10 rounded-full bg-zinc-100 hover:bg-zinc-200 focus-visible:ring-black/20 focus-visible:bg-zinc-200 border-none text-black font-semibold px-5 shadow-inner transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-[13px] font-bold text-black/70 mb-1.5">Send message every (ms)</label>
              <Input 
                value={messageInterval}
                onChange={(e) => setMessageInterval(e.target.value)}
                className="h-10 rounded-full bg-zinc-100 hover:bg-zinc-200 focus-visible:ring-black/20 focus-visible:bg-zinc-200 border-none text-black font-semibold px-5 shadow-inner transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-[13px] font-bold text-black/70 mb-1.5">Hide message after (ms)</label>
              <Input 
                value={hideAfter}
                onChange={(e) => setHideAfter(e.target.value)}
                className="h-10 rounded-full bg-zinc-100 hover:bg-zinc-200 focus-visible:ring-black/20 focus-visible:bg-zinc-200 border-none text-black font-semibold px-5 shadow-inner transition-colors"
              />
            </div>
            
            <div className="pt-1">
              <Button 
                onClick={() => {
                  setAppliedTimings({ startDelay, messageInterval, hideAfter });
                  setIsTimingUpdated(true);
                  setTimeout(() => setIsTimingUpdated(false), 2000);
                }}
                className="w-full h-10 rounded-lg bg-black hover:bg-black/80 text-white font-bold transition-all border-none shadow-sm"
              >
                {isTimingUpdated ? <Check className="w-4 h-4 mr-2 text-green-400" /> : null}
                {isTimingUpdated ? "Updated!" : "Update"}
              </Button>
            </div>
          </div>
          
        </div>

        {/* Right Column: Live Preview & Inline Editor */}
        <div className="flex-1 bg-white rounded-3xl border border-black/20 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.02)] flex flex-col relative overflow-hidden min-h-[500px] lg:min-h-0">
          
          {/* Faint background grid for "canvas" feel */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

          <div className="absolute top-0 left-0 right-0 p-4 lg:p-6 px-4 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 z-30 bg-white/95 backdrop-blur-md border-b border-black/10">
            <div>
              <div className="text-sm font-bold text-black/40 uppercase tracking-widest">
                Live Preview
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <Button 
                onClick={addMessage}
                variant="outline"
                size="sm"
                className="rounded-lg bg-white shadow-sm border-black/5 hover:bg-black/5 text-black font-semibold h-8 px-4 text-xs shrink-0"
              >
                <Plus className="w-3 h-3 mr-1" /> Add Message
              </Button>
              <Button 
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                variant="default"
                size="sm"
                className="rounded-lg shadow-sm font-semibold h-8 px-4 text-xs bg-black hover:bg-black/80 text-white shrink-0"
              >
                {isPreviewMode ? (
                  <><Square className="w-3 h-3 mr-1 fill-current" /> Stop Test</>
                ) : (
                  <><Play className="w-3 h-3 mr-1 fill-current" /> Test Preview</>
                )}
              </Button>
            </div>
          </div>

          {/* Hidden File Input for Avatars */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            accept="image/*" 
            className="hidden" 
          />

          {/* Messages List Area (Inline Editing Mode) */}
          <div className="relative z-20 w-full max-w-[380px] h-full overflow-y-auto overflow-x-hidden flex flex-col gap-4 pt-32 sm:pt-24 pb-10 px-3 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {messages.map((msg) => (
              <div key={msg.id} className="relative group/popup">
                <div 
                  className={`${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-[#EFEFEF]'} rounded-[24px] p-4 flex items-center gap-4 cursor-default border transition-all`}
                  style={{
                    borderColor: accentColor || (theme === 'dark' ? '#333' : 'rgba(255,255,255,0.4)'),
                    boxShadow: accentColor 
                      ? `0 0 30px ${accentColor}20, 0 10px 40px -10px rgba(0,0,0,0.3)`
                      : (theme === 'dark' 
                          ? '0 0 30px rgba(255,255,255,0.03), 0 10px 40px -10px rgba(0,0,0,0.5)'
                          : '0 0 30px rgba(0,0,0,0.06), 0 10px 40px -10px rgba(0,0,0,0.12)')
                  }}
                >
                  
                  {/* Delete Button (Visible on hover) */}
                  <button
                    onClick={() => removeMessage(msg.id)}
                    className="absolute -top-2 -right-2 w-7 h-7 bg-white text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover/popup:opacity-100 transition-opacity shadow-md border border-black/5 z-30 hover:bg-red-50 hover:scale-105"
                    title="Remove Message"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className={`relative w-12 h-12 shrink-0 rounded-full flex items-center justify-center shadow-inner overflow-hidden group cursor-pointer ${theme === 'dark' && msg.avatarBgColor === 'bg-zinc-200' ? 'bg-white/10' : msg.avatarBgColor}`}>
                    {renderAvatar(msg)}
                    
                    <div 
                      className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => {
                        setActiveUploadId(msg.id);
                        fileInputRef.current?.click();
                      }}
                    >
                      <Camera className="w-4 h-4 text-white mb-0.5" />
                      <span className="text-[9px] font-bold text-white uppercase tracking-wider">Edit</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col flex-1 min-w-0 pr-2 group/text relative">
                    <div className="flex justify-between items-baseline gap-2">
                      <input
                        value={msg.title}
                        onChange={(e) => updateMessage(msg.id, 'title', e.target.value)}
                        className={`flex-1 min-w-0 font-bold text-[16px] tracking-tight ${theme === 'dark' ? 'text-white bg-white/5 hover:bg-white/10 border-white/20 focus:border-white/40 focus:bg-black placeholder:text-white/30' : 'text-black bg-black/5 hover:bg-black/10 border-black/20 focus:border-black/40 focus:bg-white placeholder:text-black/30'} border border-dashed focus:border-solid outline-none rounded px-1.5 py-0.5 -ml-1.5 transition-all cursor-text`}
                        placeholder="Title"
                      />
                      <input
                        value={msg.timeText}
                        onChange={(e) => updateMessage(msg.id, 'timeText', e.target.value)}
                        className={`w-12 text-[11px] font-medium text-center shrink-0 ${theme === 'dark' ? 'text-white/50 bg-white/5 hover:bg-white/10 border-white/20 focus:border-white/40 focus:bg-black placeholder:text-white/30' : 'text-black/50 bg-black/5 hover:bg-black/10 border-black/20 focus:border-black/40 focus:bg-white placeholder:text-black/30'} border border-dashed focus:border-solid outline-none rounded px-1 py-0.5 transition-all cursor-text`}
                        placeholder="Time"
                      />
                    </div>
                    <textarea
                      value={msg.subtitle}
                      rows={1}
                      onInput={(e) => {
                        e.currentTarget.style.height = 'auto';
                        e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
                      }}
                      onChange={(e) => updateMessage(msg.id, 'subtitle', e.target.value)}
                      className={`w-full text-[14px] leading-snug font-medium resize-none overflow-hidden ${theme === 'dark' ? 'text-white/80 bg-white/5 hover:bg-white/10 border-white/20 focus:border-white/40 focus:bg-black placeholder:text-white/30' : 'text-black/60 bg-black/5 hover:bg-black/10 border-black/20 focus:border-black/40 focus:bg-white placeholder:text-black/30'} border border-dashed focus:border-solid outline-none rounded px-1.5 py-0.5 -ml-1.5 transition-all cursor-text`}
                      placeholder="Subtitle Message"
                    />
                  </div>
                </div>

                {/* Delete button (only show if more than 1 message) */}
                {messages.length > 1 && (
                  <button 
                    onClick={() => removeMessage(msg.id)}
                    className="absolute -right-3 -top-3 w-8 h-8 bg-white text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover/popup:opacity-100 transition-all shadow-md border border-black/5 hover:bg-red-50"
                    title="Delete Message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            
            {/* Inline Tip Text */}
            <div className="text-sm font-medium text-black/40 text-center mt-6 mb-8 shrink-0">
              Tip: Click the text or image to edit directly.
            </div>
          </div>

        </div>

      </div>

      {/* Global Toast Notifications for Test Preview */}
      {isPreviewMode && (
        <div className="fixed bottom-4 sm:bottom-auto sm:top-14 right-4 sm:right-12 left-4 sm:left-auto z-[100] flex flex-col gap-4 items-center sm:items-end pointer-events-none">
          {[...activeToasts].reverse().map(toast => {
            const msg = messages.find(m => m.id === toast.messageId);
            if (!msg) return null;
            return (
              <div 
                key={toast.instanceId} 
                className={`pointer-events-auto ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-[#EFEFEF]'} rounded-[24px] p-4 flex items-center gap-4 cursor-default border w-full sm:max-w-[360px] min-w-0 sm:min-w-[300px] animate-in slide-in-from-bottom-8 sm:slide-in-from-right-8 fade-in duration-300 shadow-2xl`}
                style={{
                  borderColor: accentColor || (theme === 'dark' ? '#333' : 'rgba(255,255,255,0.4)'),
                  boxShadow: accentColor 
                    ? `0 0 30px ${accentColor}33, 0 10px 50px -10px rgba(0,0,0,0.4)`
                    : (theme === 'dark' 
                        ? '0 0 30px rgba(255,255,255,0.04), 0 10px 50px -10px rgba(0,0,0,0.6)'
                        : '0 0 30px rgba(0,0,0,0.08), 0 10px 50px -10px rgba(0,0,0,0.15)')
                }}
              >
                <div className={`relative w-12 h-12 shrink-0 rounded-full flex items-center justify-center shadow-inner overflow-hidden ${theme === 'dark' && msg.avatarBgColor === 'bg-zinc-200' ? 'bg-white/10' : msg.avatarBgColor}`}>
                  {renderAvatar(msg)}
                </div>
                <div className="flex flex-col flex-1 min-w-0 pr-2">
                  <div className="flex justify-between items-baseline gap-2">
                    <h4 className={`font-bold text-[16px] tracking-tight truncate ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{msg.title || "Untitled"}</h4>
                    {msg.timeText && <span className={`text-[11px] font-medium ml-2 shrink-0 ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>{msg.timeText}</span>}
                  </div>
                  <p className={`text-[14px] leading-snug font-medium whitespace-pre-wrap break-words ${theme === 'dark' ? 'text-white/80' : 'text-black/70'}`}>
                    {msg.subtitle || "Add a message"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
