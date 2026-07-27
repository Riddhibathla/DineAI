import { SignInPanel } from "@/components/sign-in-panel";

export default function SignInPage() {
  return (
    <main className="staff-login">
      <div className="signin-brand"><span>D</span><b>Dine<i>AI</i></b><small>RESTAURANT OPERATIONS</small></div>
      <section className="staff-login-layout">
        <div className="staff-login-copy">
          <p className="eyebrow">ONE COMMAND CENTRE</p>
          <h1>Run every shift<br /><em>with clarity.</em></h1>
          <p>Coordinate orders, the service floor, kitchen fulfilment, inventory, and team handoffs from one live operating view.</p>
          <div className="staff-perks"><span>Manager</span><small>Orders, guest feedback, inventory and operational insights</small><span>Employee</span><small>Service status, safety context and kitchen coordination</small></div>
        </div>
        <div><div className="login-heading"><p>TEAM ACCESS</p><h2>Open your operations workspace</h2></div><SignInPanel /></div>
      </section>
    </main>
  );
}
