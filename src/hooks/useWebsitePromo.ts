"use client";

import {
  getPromoCountdown,
  getPromoStatus,
  isPromoActive,
  isPromoVisible,
  type PromoCountdown,
  type PromoStatus,
} from "@/lib/promo";
import { useEffect, useState, useSyncExternalStore } from "react";

const DISMISS_KEY = "earlsdwara-august-promo-2026";
const DISMISS_EVENT = "earlsdwara-promo-dismiss";

function subscribeToDismiss(onStoreChange: () => void) {
  window.addEventListener(DISMISS_EVENT, onStoreChange);
  return () => window.removeEventListener(DISMISS_EVENT, onStoreChange);
}

function getDismissedSnapshot() {
  return sessionStorage.getItem(DISMISS_KEY) === "1";
}

function getDismissedServerSnapshot() {
  return false;
}

export function useWebsitePromo() {
  const [now, setNow] = useState(() => new Date());
  const dismissed = useSyncExternalStore(
    subscribeToDismiss,
    getDismissedSnapshot,
    getDismissedServerSnapshot,
  );

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const status: PromoStatus = getPromoStatus(now);
  const visible = isPromoVisible(now);
  const active = isPromoActive(now);
  const countdown: PromoCountdown | null = getPromoCountdown(now);

  const dismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, "1");
    window.dispatchEvent(new Event(DISMISS_EVENT));
  };

  return {
    status,
    visible,
    active,
    countdown,
    dismissed,
    showBanner: visible && !dismissed,
    dismiss,
  };
}
