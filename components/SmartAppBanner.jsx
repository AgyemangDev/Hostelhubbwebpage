"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

const APP_STORE_URL = "https://apps.apple.com/us/app/hostelhubb/id6738483533";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.Hostelhubb.Hostelhubb";
const APP_SCHEME = "hostelhubb://"; // matches "scheme" in your app.json
const DISMISS_KEY = "hh_app_banner_dismissed_at";
const DISMISS_DAYS = 0;
const AUTO_REDIRECT_KEY = "hh_auto_redirect_attempted";

function detectPlatform() {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent || navigator.vendor || "";
  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (ua.includes("Macintosh") && navigator.maxTouchPoints > 1);
  if (isIOS) return "ios";
  if (/android/i.test(ua)) return "android";
  return null;
}

export default function SmartAppBanner() {
  const [platform, setPlatform] = useState(null);
  const [visible, setVisible] = useState(false);
  const bannerRef = useRef(null);
  const fallbackTimer = useRef(null);
  const redirecting = useRef(false);

  useEffect(() => {
    const detected = detectPlatform();
    if (!detected) return;

    const dismissedAt = localStorage.getItem(DISMISS_KEY);
    if (dismissedAt) {
      const daysSince = (Date.now() - Number(dismissedAt)) / (1000 * 60 * 60 * 24);
      if (daysSince < DISMISS_DAYS) return;
    }

    setPlatform(detected);
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) {
      document.documentElement.style.setProperty("--app-banner-height", "0px");
      return;
    }

    const el = bannerRef.current;
    if (!el) return;

    const updateHeight = () => {
      document.documentElement.style.setProperty("--app-banner-height", `${el.offsetHeight}px`);
    };

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  // If the tab becomes hidden while we're waiting on the fallback timer,
  // the OS switched to the app — so cancel the store redirect. Also clears
  // state on `pageshow` (bfcache restore, e.g. tapping "back" from the store)
  // so a stale pending redirect can never fire again after returning.
  useEffect(() => {
    const clearPending = () => {
      if (fallbackTimer.current) {
        clearTimeout(fallbackTimer.current);
        fallbackTimer.current = null;
      }
      redirecting.current = false;
    };

    const onVisibilityChange = () => {
      if (document.hidden) clearPending();
    };
    const onPageShow = () => clearPending();

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pageshow", onPageShow);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);

  const storeUrl = platform === "ios" ? APP_STORE_URL : PLAY_STORE_URL;

  const attemptOpenApp = () => {
    if (redirecting.current) return; // ignore if one's already in flight
    redirecting.current = true;

    window.location.href = APP_SCHEME;

    fallbackTimer.current = setTimeout(() => {
      redirecting.current = false;
      fallbackTimer.current = null;
      window.location.href = storeUrl;
    }, 1500);
  };

  // Auto-attempt once per browser session on load. Must stay above any
  // early return — hooks can't run conditionally.
  useEffect(() => {
    if (!visible || !platform) return;

    const alreadyAttempted = sessionStorage.getItem(AUTO_REDIRECT_KEY);
    if (alreadyAttempted) return;
    sessionStorage.setItem(AUTO_REDIRECT_KEY, "true");

    attemptOpenApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, platform, storeUrl]);

  const handleDismiss = (e) => {
    e.stopPropagation();
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
    setVisible(false);
  };

  if (!visible || !platform) return null;

  return (
    <div
      ref={bannerRef}
      onClick={attemptOpenApp}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") attemptOpenApp();
      }}
      className="md:hidden sticky top-0 w-full z-[70] bg-white border-b border-gray-200 shadow-sm cursor-pointer"
    >
      <div className="flex items-center justify-between gap-3 px-4 py-2.5">

        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={handleDismiss}
            aria-label="Dismiss"
            className="shrink-0 text-gray-400 hover:text-gray-600 p-1 -ml-1"
          >
            <X size={18} />
          </button>

          <img src="/icon.png" alt="HostelHubb" className="h-9 w-9 rounded-xl shrink-0" />

          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900">HostelHubb</p>
            <p className="text-xs text-gray-500">Get the app for a better experience and simplied bookings</p>
          </div>
        </div>

        <span className="shrink-0 rounded-full bg-teal-700 px-4 py-1.5 text-sm font-semibold text-white">
          Get
        </span>

      </div>
    </div>
  );
}