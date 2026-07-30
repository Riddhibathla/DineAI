"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";

const CONSENT_KEY = "dine-ai-cookie-notice";

export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(localStorage.getItem(CONSENT_KEY) !== "acknowledged");
  }, []);

  function acknowledge() {
    localStorage.setItem(CONSENT_KEY, "acknowledged");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside className="cookie-notice" aria-label="Cookie notice">
      <button className="cookie-close" onClick={acknowledge} aria-label="Close cookie notice">
        <X size={16} />
      </button>
      <div className="cookie-icon"><Cookie size={20} /></div>
      <div className="cookie-copy">
        <b>Your choices, clearly served.</b>
        <p>
          DINE AI uses essential cookies and device storage for secure sign-in,
          account sessions, and your dining experience. We do not use advertising
          or tracking cookies.
        </p>
        <nav aria-label="Legal information">
          <Link href="/legal/cookies">Cookie Policy</Link>
          <Link href="/legal/privacy">Privacy</Link>
          <Link href="/legal/terms">Terms</Link>
        </nav>
      </div>
      <button className="cookie-accept" onClick={acknowledge}>Understood</button>
    </aside>
  );
}
