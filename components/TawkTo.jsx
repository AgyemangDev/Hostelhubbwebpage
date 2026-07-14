// components/TawkTo.jsx
"use client";

import Script from "next/script";

const TAWK_PROPERTY_ID = "671fd5354304e3196ad9a21d";
const TAWK_WIDGET_ID = "1iba5hmlc";

export default function TawkTo() {
  return (
    <Script
      id="tawk-to"
      strategy="lazyOnload"
      src={`https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`}
      crossOrigin="*"
    />
  );
}