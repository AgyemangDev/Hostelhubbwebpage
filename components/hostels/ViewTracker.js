"use client";

import { useEffect, useRef } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3002";

export default function ViewTracker({ accommodationId }) {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    fetch(`${API_BASE}/api/accommodations/${accommodationId}/view`, { method: "PATCH" }).catch(() => {});
  }, [accommodationId]);
  return null;
}
