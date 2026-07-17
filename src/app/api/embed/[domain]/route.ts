import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Required for Next.js App Router dynamic route parameter typing in Next 15
export async function GET(
  request: Request,
  context: { params: Promise<{ domain: string }> }
) {
  const params = await context.params;
  const domain = params.domain;
  
  if (!domain) {
    return new NextResponse('console.error("Nudigo: Domain not provided");', {
      headers: { 'Content-Type': 'application/javascript' }
    });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase
    .from('projects')
    .select('settings')
    .eq('domain', domain)
    .single();

  if (error || !data || !data.settings) {
    return new NextResponse(`console.error("Nudigo: No active configuration found for ${domain}.");`, {
      headers: { 'Content-Type': 'application/javascript' }
    });
  }

  const settings = data.settings;
  const theme = settings.theme || 'light';
  const accentColor = settings.accentColor || '';
  const startDelay = parseInt(settings.startDelay) || 500;
  const messageInterval = parseInt(settings.messageInterval) || 1000;
  const hideAfter = parseInt(settings.hideAfter) || 3000;
  const messages = Array.isArray(settings.messages) ? settings.messages : [];

  if (messages.length === 0) {
    return new NextResponse('console.log("Nudigo: No messages configured.");', {
      headers: { 'Content-Type': 'application/javascript' }
    });
  }

  const scriptContent = `
(function() {
  const settings = ${JSON.stringify({theme, accentColor, startDelay, messageInterval, hideAfter, messages})};
  
  // Inject Scoped CSS
  const style = document.createElement('style');
  style.innerHTML = \`
    #nudigo-container {
      position: fixed;
      top: 56px;
      right: 48px;
      z-index: 2147483647;
      display: flex;
      flex-direction: column;
      gap: 16px;
      pointer-events: none;
      font-family: system-ui, -apple-system, sans-serif;
    }
    .nudigo-popup {
      pointer-events: auto;
      background: \${settings.theme === 'dark' ? '#1a1a1a' : '#ffffff'};
      border: 1px solid \${settings.accentColor ? settings.accentColor : (settings.theme === 'dark' ? '#333333' : '#e5e5e5')};
      color: \${settings.theme === 'dark' ? '#ffffff' : '#000000'};
      border-radius: 24px;
      padding: 16px;
      box-shadow: \${settings.accentColor ? \`0 0 30px \${settings.accentColor}33, 0 10px 50px -10px rgba(0,0,0,0.4)\` : (settings.theme === 'dark' ? '0 0 30px rgba(255,255,255,0.04), 0 10px 50px -10px rgba(0,0,0,0.6)' : '0 0 30px rgba(0,0,0,0.08), 0 10px 50px -10px rgba(0,0,0,0.15)')};
      display: flex;
      align-items: center;
      gap: 16px;
      width: 320px;
      opacity: 0;
      transform: translateX(50px);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .nudigo-popup.nudigo-show {
      opacity: 1;
      transform: translateX(0);
    }
    .nudigo-popup.nudigo-hide {
      opacity: 0;
      transform: translateX(50px);
    }
    .nudigo-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
      overflow: hidden;
    }
    .nudigo-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .nudigo-content {
      flex: 1;
      min-width: 0;
    }
    .nudigo-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 2px;
    }
    .nudigo-title {
      font-weight: 700;
      font-size: 15px;
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .nudigo-time {
      font-size: 11px;
      font-weight: 500;
      opacity: 0.5;
      margin-left: 8px;
    }
    .nudigo-subtitle {
      font-size: 13px;
      font-weight: 500;
      margin: 0;
      opacity: 0.8;
      line-height: 1.4;
      white-space: pre-wrap;
    }
  \`;
  document.head.appendChild(style);

  // Initialize Container
  const container = document.createElement('div');
  container.id = 'nudigo-container';
  document.body.appendChild(container);

  let currentIndex = 0;
  let lastHideTime = 0;

  function showNext() {
    if (currentIndex >= settings.messages.length) return;
    
    const msg = settings.messages[currentIndex];
    
    const popup = document.createElement('div');
    popup.className = 'nudigo-popup';
    
    // Process Avatar (Text Emoji vs Base64 Image)
    let avatarHtml = '';
    const isImage = msg.avatarUrl && msg.avatarUrl.startsWith('data:image');
    if (isImage) {
      avatarHtml = \`<img src="\${msg.avatarUrl}" alt="Avatar" />\`;
    } else {
      avatarHtml = msg.avatarUrl || '✨';
    }

    // Map Tailwind color classes to hex
    const bgColorClasses = {
      'bg-zinc-200': '#e4e4e7',
      'bg-blue-100': '#dbeafe',
      'bg-green-100': '#dcfce3',
      'bg-purple-100': '#f3e8ff',
      'bg-orange-100': '#ffedd5',
      'bg-pink-100': '#fce7f3'
    };
    const mappedBgColor = bgColorClasses[msg.avatarBgColor] || (settings.theme === 'dark' ? '#333' : '#e4e4e7');

    popup.innerHTML = \`
      <div class="nudigo-avatar" style="background-color: \${mappedBgColor}">
        \${avatarHtml}
      </div>
      <div class="nudigo-content">
        <div class="nudigo-header">
          <h4 class="nudigo-title">\${msg.title || 'Notification'}</h4>
          \${msg.timeText ? \`<span class="nudigo-time">\${msg.timeText}</span>\` : ''}
        </div>
        <p class="nudigo-subtitle">\${msg.subtitle || ''}</p>
      </div>
    \`;

    container.prepend(popup);

    // Trigger animate in (using requestAnimationFrame to ensure DOM is updated first)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        popup.classList.add('nudigo-show');
      });
    });

    // Sequential hide timing matching the preview editor
    const now = Date.now();
    const hideDelay = settings.hideAfter;
    
    let hideAt = 0;
    if (lastHideTime < now) {
      hideAt = now + hideDelay;
    } else {
      hideAt = lastHideTime + hideDelay;
    }
    lastHideTime = hideAt;
    const timeUntilHide = hideAt - now;

    // Hide after timeout
    setTimeout(() => {
      popup.classList.remove('nudigo-show');
      popup.classList.add('nudigo-hide');
      
      // Remove from DOM after animation finishes
      setTimeout(() => {
        if (popup.parentNode === container) {
          container.removeChild(popup);
        }
      }, 500); 
    }, timeUntilHide);

    currentIndex++;
    
    // Queue next message
    if (currentIndex < settings.messages.length) {
      setTimeout(showNext, settings.messageInterval);
    }
  }

  // Start sequence
  setTimeout(showNext, settings.startDelay);

  // Track page view
  try {
    const trackingUrl = new URL('/api/events', window.location.origin);
    // Since this script is hosted on our domain, but runs on their domain, we need absolute URL of our API
    // The easiest way is to inject our host into the script
    fetch(\`\${'${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}'}/api/events?domain=${domain}&type=view\`, { mode: 'no-cors' });
  } catch(e) {}

})();
  `;

  return new NextResponse(scriptContent, {
    headers: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'public, max-age=60' // Cache slightly for performance
    }
  });
}
