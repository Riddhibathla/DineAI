import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function LegalPage({
  eyebrow,
  title,
  summary,
  children,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  children: React.ReactNode;
}) {
  return (
    <main className="legal-shell">
      <header className="legal-header">
        <Link href="/" className="auth-logo" aria-label="DINE AI home">
          <span>D</span><b>DINE AI</b>
        </Link>
        <Link href="/" className="legal-back"><ArrowLeft size={16} /> Back home</Link>
      </header>
      <article className="legal-document">
        <aside className="legal-intro">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{summary}</p>
          <small>Last updated: July 29, 2026</small>
        </aside>
        <div className="legal-body">{children}</div>
      </article>
      <footer className="legal-footer">
        <span>© 2026 DINE AI</span>
        <nav>
          <Link href="/legal/privacy">Privacy</Link>
          <Link href="/legal/cookies">Cookies</Link>
          <Link href="/legal/terms">Terms</Link>
        </nav>
      </footer>
    </main>
  );
}
