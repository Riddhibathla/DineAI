import Link from "next/link";

type Props = { variant?: "light" | "dark"; compact?: boolean; className?: string };

export function DineAILogo({ variant = "light", compact = false, className = "" }: Props) {
  return <Link href="/" className={`dine-ai-logo ${variant} ${className}`} aria-label="DineAI home">
    <svg viewBox="0 0 40 40" aria-hidden="true"><rect x="2" y="2" width="36" height="36" rx="11" /><path d="M12 20h16M20 12v16" /><circle cx="20" cy="20" r="5.5" /></svg>
    {!compact && <b><span>Dine</span><i>AI</i></b>}
  </Link>;
}
