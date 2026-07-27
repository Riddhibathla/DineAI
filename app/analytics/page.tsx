"use client";

import { toast } from "sonner";
import { Check, Sparkles } from "lucide-react";
import { WorkspaceLayout } from "@/components/workspace-layout";

export default function AnalyticsPage() {
  return (
    <WorkspaceLayout page="analytics">
      <section className="signal-field">
        <article className="signal-card main">
          <Sparkles size={24} />
          <p>THE STRONGEST SIGNAL</p>
          <h2>The hearth is about to create a four-minute drag between 7:30 and 8:00pm.</h2>
          <span>Move one service teammate to expediting and show faster compatible alternatives first.</span>
          <button onClick={() => toast.success("Signal marked as reviewed")}>
            Mark reviewed <Check size={15} />
          </button>
        </article>
        <article className="signal-card">
          <p>TABLE TURN</p>
          <h3>72 min</h3>
          <b>6 min faster</b>
        </article>
        <article className="signal-card">
          <p>SAFEPLATE</p>
          <h3>100%</h3>
          <b>All checks complete</b>
        </article>
        <article className="signal-card">
          <p>STOCKOUTS AVOIDED</p>
          <h3>08</h3>
          <b>+3 this week</b>
        </article>
      </section>
    </WorkspaceLayout>
  );
}
