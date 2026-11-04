'use client';

import React, { useEffect, useState } from 'react';
import { Download, X, Smartphone } from 'lucide-react';

export const PwaProvider: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState<boolean>(false);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);

  useEffect(() => {
    // Check if running in standalone mode (already installed)
    const isInStandaloneMode =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(isInStandaloneMode);

    // Register Service Worker
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('[PWA] Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('[PWA] Service Worker registration failed:', error);
        });
    }

    // Capture install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!isInStandaloneMode) {
        setShowInstallBanner(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`[PWA] User response to install prompt: ${outcome}`);
    setDeferredPrompt(null);
    setShowInstallBanner(false);
  };

  if (!showInstallBanner || isStandalone) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-96 z-50 p-4 rounded-2xl bg-[#0f1320] border border-purple-500/40 shadow-2xl shadow-purple-950/80 backdrop-blur-md animate-in slide-in-from-bottom-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center shrink-0 shadow-md">
            <Smartphone className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Install AI Music Studio</h4>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Add to Home Screen for fast mobile access and full-screen studio controls.
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowInstallBanner(false)}
          className="text-slate-400 hover:text-white p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center justify-end gap-2 mt-3 pt-3 border-t border-[#1c2438]">
        <button
          onClick={() => setShowInstallBanner(false)}
          className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200"
        >
          Maybe Later
        </button>
        <button
          onClick={handleInstallClick}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-900/50"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Install App</span>
        </button>
      </div>
    </div>
  );
};
