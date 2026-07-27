"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { ArrowRight, BriefcaseBusiness, CircleUserRound, Eye, EyeOff } from "lucide-react";

type StaffType = "manager" | "employee";

export function SignInPanel() {
  const [staffType, setStaffType] = useState<StaffType>("manager");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const destination = staffType === "manager" ? "/analytics" : "/service";
    const result = await signIn("credentials", { email, password, redirect: false, callbackUrl: destination });
    setBusy(false);
    if (result?.error) {
      setError("We couldn’t verify those details. Check your email and password, then try again.");
      return;
    }
    window.location.assign(result?.url ?? destination);
  }

  return (
    <div className="staff-login-card">
      <div className="staff-switch" role="tablist" aria-label="Choose account type">
        <button type="button" className={staffType === "manager" ? "selected" : ""} onClick={() => setStaffType("manager")}><BriefcaseBusiness size={16} /> Manager</button>
        <button type="button" className={staffType === "employee" ? "selected" : ""} onClick={() => setStaffType("employee")}><CircleUserRound size={16} /> Employee</button>
      </div>
      <form onSubmit={submit}>
        <label>Email address<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder={staffType === "manager" ? "manager@restaurant.com" : "you@restaurant.com"} autoComplete="email" /></label>
        <label>Password<span className="password-box"><input required minLength={8} type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Your password" autoComplete="current-password" /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((value) => !value)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></span></label>
        {error && <p className="login-error" role="alert">{error}</p>}
        <button className="login-submit" disabled={busy}>{busy ? "Signing you in…" : `Enter ${staffType === "manager" ? "manager" : "staff"} workspace`} <ArrowRight size={17} /></button>
      </form>
    </div>
  );
}
