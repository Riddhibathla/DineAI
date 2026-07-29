"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, Eye, EyeOff, Loader2 } from "lucide-react";
import { createClient, isAuthConfigured } from "@/lib/supabase/client";

type Mode = "signin" | "signup";

export function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(searchParams.get("error") ?? "");
  const [success, setSuccess] = useState(false);
  const configured = isAuthConfigured();
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    (typeof window !== "undefined" ? window.location.origin : "");
  const requestedNext = searchParams.get("next");
  const next =
    requestedNext?.startsWith("/") && !requestedNext.startsWith("//")
      ? requestedNext
      : "/account";

  useEffect(() => {
    if (!configured) setMessage("Connect Supabase to activate secure sign in.");
  }, [configured]);

  async function handleEmail(event: FormEvent) {
    event.preventDefault();
    if (!configured) return;
    setBusy(true);
    setMessage("");
    setSuccess(false);

    const supabase = createClient();
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${siteUrl}/auth/callback?next=${encodeURIComponent(next)}`,
          data: { account_type: "customer" },
        },
      });
      setBusy(false);
      if (error) return setMessage(error.message);
      setSuccess(true);
      setMessage("Check your inbox to verify your email, then you’re ready to dine.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) return setMessage(error.message);
    router.push(next);
    router.refresh();
  }

  async function handleGoogle() {
    if (!configured) return;
    setBusy(true);
    setMessage("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${siteUrl}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
    if (error) {
      setBusy(false);
      setMessage(error.message);
    }
  }

  return (
    <div className="auth-card">
      <div className="auth-tabs" aria-label="Authentication mode">
        <button className={mode === "signin" ? "active" : ""} onClick={() => { setMode("signin"); setMessage(""); }}>
          Sign in
        </button>
        <button className={mode === "signup" ? "active" : ""} onClick={() => { setMode("signup"); setMessage(""); }}>
          Create account
        </button>
      </div>
      <div className="auth-intro">
        <p className="eyebrow">{mode === "signin" ? "Good to see you" : "Join Dine AI"}</p>
        <h2>{mode === "signin" ? "Sign in to continue" : "Create your account"}</h2>
        <p>{mode === "signin" ? "Customers and restaurant teams use the same secure sign in." : "We’ll verify your email before activating your account."}</p>
      </div>
      <button className="google-button" type="button" onClick={handleGoogle} disabled={busy || !configured}>
        <span className="google-mark">G</span>
        Continue with Google
      </button>
      <div className="auth-divider"><span>or use email</span></div>
      <form onSubmit={handleEmail}>
        <label>
          Email address
          <input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
        </label>
        <label>
          Password
          <span className="password-field">
            <input type={showPassword ? "text" : "password"} autoComplete={mode === "signin" ? "current-password" : "new-password"} minLength={8} required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"}>
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </span>
        </label>
        <button className="auth-submit" disabled={busy || !configured}>
          {busy ? <Loader2 className="spin" size={18} /> : <>{mode === "signin" ? "Sign in" : "Create account"} <ArrowRight size={18} /></>}
        </button>
      </form>
      {message && <p className={success ? "auth-message success" : "auth-message"}>{success && <CheckCircle2 size={16} />}{message}</p>}
      <p className="auth-terms">
        By continuing, you agree to Dine AI’s Terms and Privacy Policy.
      </p>
    </div>
  );
}
