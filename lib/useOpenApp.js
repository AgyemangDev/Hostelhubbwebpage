// lib/useOpenApp.js
"use client";

import { useRef, useState } from "react";

const APP_STORE_URL = "https://apps.apple.com/us/app/hostelhubb/id6738483533";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.Hostelhubb.Hostelhubb";
const APP_SCHEME = "hostelhubb://";

// iOS needs longer — the "Open in HostelHubb?" confirmation dialog eats time
// before the tab actually backgrounds. Android's intent handoff is faster.
const FALLBACK_DELAY_MS = { ios: 2500, android: 1800 };

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

/**
 * Returns { handleClick, isModalOpen, closeModal }.
 * - On iOS/Android: handleClick tries the app scheme, falls back to the store.
 * - On desktop/unknown: handleClick opens a "get the app" modal instead of
 *   navigating anywhere — there's no app or store to send a desktop user to.
 */
export function useOpenApp(scheme = APP_SCHEME) {
  const pendingRef = useRef(null); // holds { timeoutId, cleanup } for the in-flight attempt
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cancelPending = () => {
    if (pendingRef.current) {
      clearTimeout(pendingRef.current.timeoutId);
      pendingRef.current.cleanup();
      pendingRef.current = null;
    }
  };

  const handleClick = () => {
    const platform = detectPlatform();

    if (!platform) {
      setIsModalOpen(true);
      return;
    }

    // A second tap while one attempt is already pending shouldn't stack timers.
    if (pendingRef.current) return;

    const storeUrl = platform === "ios" ? APP_STORE_URL : PLAY_STORE_URL;
    let settled = false;

    const markAppOpened = () => {
      if (settled) return;
      settled = true;
      cancelPending();
    };

    // Any of these signal the OS actually switched away to the app.
    const onVisibilityChange = () => {
      if (document.hidden) markAppOpened();
    };
    const onBlur = () => markAppOpened();
    const onPageHide = () => markAppOpened();

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("blur", onBlur);
    window.addEventListener("pagehide", onPageHide);

    const cleanup = () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("pagehide", onPageHide);
    };

    const timeoutId = setTimeout(() => {
      cleanup();
      pendingRef.current = null;
      if (!settled) {
        window.location.href = storeUrl;
      }
    }, FALLBACK_DELAY_MS[platform]);

    pendingRef.current = { timeoutId, cleanup };

    // Fire the scheme last, after listeners are wired up.
    window.location.href = scheme;
  };

  return {
    handleClick,
    isModalOpen,
    closeModal: () => setIsModalOpen(false),
  };
}

/** True on iOS/Android, false on desktop or SSR — use to conditionally show/hide app-only triggers. */
export function isAppPlatform() {
  return detectPlatform() !== null;
}