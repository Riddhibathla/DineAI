import Link from "next/link";
import { Utensils } from "lucide-react";
import { Suspense } from "react";
import { AuthForm } from "./auth-form";

export default function AuthPage() {
  return (
    <main className="auth-shell">
      <section className="auth-story">
        <Link href="/" className="auth-logo" aria-label="Dine AI home">
          <span>D</span>
          <b>DINE AI</b>
        </Link>
        <div>
          <p className="eyebrow">One account. Every dining moment.</p>
          <h1>Welcome back to a better table.</h1>
          <p>
            Save dietary preferences, revisit orders, and keep every restaurant
            visit effortless. Restaurant teams get the same calm, focused
            experience behind the scenes.
          </p>
        </div>
        <div className="auth-proof">
          <Utensils size={18} />
          <span>
            <b>Private by design</b>
            Your account is protected with verified email and secure sessions.
          </span>
        </div>
      </section>
      <section className="auth-panel">
        <Suspense fallback={<div className="auth-card">Preparing secure sign in…</div>}>
          <AuthForm />
        </Suspense>
      </section>
    </main>
  );
}
