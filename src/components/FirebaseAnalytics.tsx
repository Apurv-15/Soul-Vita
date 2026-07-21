"use client";

import { useEffect } from "react";
import { logAnalyticsEvent } from "../firebase";

export default function FirebaseAnalytics() {
  useEffect(() => {
    // Function to track the current page view based on pathname + hash
    const trackPageView = () => {
      const hash = window.location.hash.replace("#", "");
      
      let pagePath = window.location.pathname;
      if (hash) {
        // If there's a hash, we treat it as the sub-page path for GA
        if (hash.startsWith("product-")) {
          pagePath = `/product/${hash.replace("product-", "")}`;
        } else {
          pagePath = `/${hash}`;
        }
      } else if (pagePath === "/") {
        pagePath = "/home";
      }

      // Determine a friendly page title
      let pageTitle = document.title;
      if (hash) {
        if (hash === "range") pageTitle = "Soul Viva | Product Catalog";
        else if (hash === "story") pageTitle = "Soul Viva | About Us";
        else if (hash === "inquire") pageTitle = "Soul Viva | Contact Us / Inquiry";
        else if (hash.startsWith("product-")) pageTitle = "Soul Viva | Product Details";
      }

      logAnalyticsEvent("page_view", {
        page_path: pagePath,
        page_title: pageTitle,
      });
    };

    // Track on initial mount
    trackPageView();

    // Track on hash changes (since the app uses hash-based client routing)
    window.addEventListener("hashchange", trackPageView);
    return () => {
      window.removeEventListener("hashchange", trackPageView);
    };
  }, []);

  return null;
}
