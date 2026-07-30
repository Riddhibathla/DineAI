"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, Eye, EyeOff, Loader2 } from "lucide-react";
import { createClient, isAuthConfigured } from "@/lib/supabase/client";
import Link from "next/link";

type Mode = "signin" | "signup";

const countryCodes = [
  { label: "India", dialCode: "+91", minLength: 10, maxLength: 10 },
  { label: "United States / Canada", dialCode: "+1", minLength: 10, maxLength: 10 },
  { label: "United Kingdom", dialCode: "+44", minLength: 10, maxLength: 11 },
  { label: "Australia", dialCode: "+61", minLength: 9, maxLength: 9 },
  { label: "United Arab Emirates", dialCode: "+971", minLength: 9, maxLength: 9 },
  { label: "Singapore", dialCode: "+65", minLength: 8, maxLength: 8 },
  { label: "Saudi Arabia", dialCode: "+966", minLength: 9, maxLength: 9 },
] as const;

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

  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [countryDialCode, setCountryDialCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);

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

  async function handlePhoneOtp(event: FormEvent) {
    event.preventDefault();
    if (!configured) return;
    const country = countryCodes.find((item) => item.dialCode === countryDialCode);
    const digits = phoneNumber.replace(/\D/g, "");
    if (
      !country ||
      digits.length < country.minLength ||
      digits.length > country.maxLength
    ) {
      setSuccess(false);
      setMessage(
        `Enter a valid ${country?.label ?? ""} phone number (${country?.minLength ?? 7}–${country?.maxLength ?? 15} digits).`,
      );
      return;
    }
    const phone = `${countryDialCode}${digits}`;
    setBusy(true);
    setMessage("");
    setSuccess(false);

    const supabase = createClient();
    
    if (!showOtp) {
      const { error } = await supabase.auth.signInWithOtp({ phone });
      setBusy(false);
      if (error) return setMessage(error.message);
      
      setShowOtp(true);
      setSuccess(true);
      setMessage("OTP sent successfully. Please check your phone.");
    } else {
      const { error } = await supabase.auth.verifyOtp({ phone, token: otp, type: 'sms' });
      setBusy(false);
      if (error) return setMessage(error.message);
      
      router.push(next);
      router.refresh();
    }
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
        <p>{mode === "signin" ? "Customers and restaurant teams use the same secure sign in." : "We’ll verify your email or phone before activating your account."}</p>
      </div>
      <button className="google-button" type="button" onClick={handleGoogle} disabled={busy || !configured}>
        <span className="google-mark">G</span>
        Continue with Google
      </button>
      
      <div className="auth-divider"><span>or use {loginMethod === "email" ? "phone" : "email"}</span></div>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
        <button 
          type="button" 
          onClick={() => { setLoginMethod(loginMethod === "email" ? "phone" : "email"); setShowOtp(false); setMessage(""); setSuccess(false); }} 
          style={{ background: 'none', border: 'none', color: 'var(--plum)', textDecoration: 'underline', cursor: 'pointer', fontSize: '13px', fontWeight: 700 }}
        >
          Switch to {loginMethod === "email" ? "Phone Authentication" : "Email Authentication"}
        </button>
      </div>

      {loginMethod === "email" ? (
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
      ) : (
        <form onSubmit={handlePhoneOtp}>
          <label>
            Phone number
            <span className="phone-number-field">
              <select
                aria-label="Country code"
                value={countryDialCode}
                onChange={(event) => setCountryDialCode(event.target.value)}
                disabled={showOtp}
              >
                {countryCodes.map((country) => (
                  <option key={country.dialCode} value={country.dialCode}>
                    {country.label} ({country.dialCode})
                  </option>
                ))}
              </select>
              <input
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                required
                value={phoneNumber}
                onChange={(event) =>
                  setPhoneNumber(event.target.value.replace(/\D/g, "").slice(0, 15))
                }
                placeholder="Mobile number"
                disabled={showOtp}
              />
            </span>
            <small>Choose your country code, then enter digits only.</small>
          </label>
          {showOtp && (
            <label>
              One-Time Password (OTP)
              <input type="text" required value={otp} onChange={(event) => setOtp(event.target.value)} placeholder="123456" />
            </label>
          )}
          <button className="auth-submit" disabled={busy || !configured}>
            {busy ? <Loader2 className="spin" size={18} /> : <>{showOtp ? "Verify OTP" : "Send OTP"} <ArrowRight size={18} /></>}
          </button>
        </form>
      )}
      {message && <p className={success ? "auth-message success" : "auth-message"}>{success && <CheckCircle2 size={16} />}{message}</p>}
      <p className="auth-terms">
        By continuing, you agree to DINE AI’s <Link href="/legal/terms">Terms</Link> and <Link href="/legal/privacy">Privacy Policy</Link>.
      </p>
    </div>
  );
}
