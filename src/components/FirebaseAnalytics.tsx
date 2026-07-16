"use client";

import { useEffect } from "react";
import { logAnalyticsEvent } from "../firebase";

export default function FirebaseAnalytics() {
  useEffect(() => {
    // Log the initial page view when the application mounts in the client's browser
    logAnalyticsEvent("page_view", {
      page_path: window.location.pathname,
      page_title: document.title,
    });
  }, []);

  return null;
}
