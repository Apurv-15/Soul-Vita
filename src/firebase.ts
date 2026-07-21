import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDpEem7uPglcAxouQBUiziUTdVMW8TiEis",
  authDomain: "soul-viva.firebaseapp.com",
  projectId: "soul-viva",
  storageBucket: "soul-viva.firebasestorage.app",
  messagingSenderId: "58498008879",
  appId: "1:58498008879:web:7acdc22a1956232d4c03da"
};

// Initialize Firebase (SSR-safe)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

// Safe Analytics init for SSR environments
let analyticsInstance: any = null;
const pendingEvents: Array<{ eventName: string; eventParams?: Record<string, any> }> = [];

if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analyticsInstance = getAnalytics(app);
      // Process any events that were queued before initialization
      while (pendingEvents.length > 0) {
        const ev = pendingEvents.shift();
        if (ev) {
          try {
            logEvent(analyticsInstance, ev.eventName, ev.eventParams);
          } catch (error) {
            console.warn("Failed to log queued analytics event:", error);
          }
        }
      }
    }
  });
}

/**
 * Log a custom event to Firebase/Google Analytics
 */
export const logAnalyticsEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (analyticsInstance) {
    try {
      logEvent(analyticsInstance, eventName, eventParams);
    } catch (error) {
      console.warn("Failed to log analytics event:", error);
    }
  } else {
    // Queue the event if analytics is not yet initialized
    pendingEvents.push({ eventName, eventParams });
  }
};

export { app, db, auth };

