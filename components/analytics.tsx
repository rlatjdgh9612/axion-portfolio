"use client";

import { GoogleAnalytics, sendGAEvent } from "@next/third-parties/google";
import { useEffect } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

function toSnakeCase(value: string) {
  return value
    .replace(/^[A-Z]/, (letter) => letter.toLowerCase())
    .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function Analytics() {
  useEffect(() => {
    if (!GA_ID) return;

    const trackClick = (event: MouseEvent) => {
      const target = event.target instanceof Element
        ? event.target.closest<HTMLElement>("[data-analytics-event]")
        : null;

      if (!target?.dataset.analyticsEvent) return;

      const params = Object.fromEntries(
        Object.entries(target.dataset)
          .filter(([key, value]) => key.startsWith("analytics") && key !== "analyticsEvent" && value)
          .map(([key, value]) => [toSnakeCase(key.replace(/^analytics/, "")), value])
      );

      sendGAEvent("event", target.dataset.analyticsEvent, params);
    };

    document.addEventListener("click", trackClick);
    return () => document.removeEventListener("click", trackClick);
  }, []);

  return GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null;
}
