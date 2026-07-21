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

      let pageTitle = "Soul Viva | Transparent Glycerin Bathing Bars";
      if (hash) {
        if (hash === "range") pageTitle = "Soul Viva | Product Catalog";
        else if (hash === "story") pageTitle = "Soul Viva | About Us";
        else if (hash === "inquire") pageTitle = "Soul Viva | Contact Us / Inquiry";
        else if (hash.startsWith("product-")) {
          const prodSlug = hash.replace("product-", "").replace(/-/g, " ");
          const formattedProd = prodSlug.charAt(0).toUpperCase() + prodSlug.slice(1);
          pageTitle = `Soul Viva | Product - ${formattedProd}`;
        }
      } else {
        pageTitle = "Soul Viva | Home";
      }

      // Update browser document title so standard GA auto-collection catches distinct titles
      document.title = pageTitle;

      logAnalyticsEvent("page_view", {
        page_path: pagePath,
        page_title: pageTitle,
        page_location: window.location.href
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
