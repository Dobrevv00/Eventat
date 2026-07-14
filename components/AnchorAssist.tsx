"use client";

import { useEffect } from "react";
import { ensureAnchorScroll } from "@/lib/scrollToAnchor";

// Makes sure that opening a URL with a #hash actually lands on the target
// section, even in browsers where the native on-load anchor scroll stalls.
export default function AnchorAssist() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) ensureAnchorScroll(hash);
  }, []);

  return null;
}
