import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, ChefHat, LogOut, UserRound } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = (await supabase?.auth.getUser()) ?? { data: { user: null } };

  if (!user) redirect("/auth");
  const isManager = user.app_metadata.role === "manager";

  return (
    <main className="account-shell">
      <Link href="/" className="auth-logo"><span>D</span><b>DINE AI</b></Link>
      <section className="account-card">
        <div className="account-avatar">{isManager ? <ChefHat /> : <UserRound />}</div>
        <p className="eyebrow">{isManager ? "Restaurant management" : "Customer account"}</p>
        <h1>Welcome, {user.user_metadata.full_name?.split(" ")[0] ?? "there"}.</h1>
        <p>{user.email}</p>
        <div className="account-actions">
          <Link href={isManager ? "/service" : "/guest"}>
            {isManager ? "Open operations" : "Explore the menu"} <ArrowRight size={17} />
          </Link>
          <form action="/auth/signout" method="post">
            <button><LogOut size={16} /> Sign out</button>
          </form>
        </div>
      </section>
    </main>
  );
}
