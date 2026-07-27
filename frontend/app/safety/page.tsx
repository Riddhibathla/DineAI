"use client";

import { toast } from "sonner";
import { ArrowUpRight, Check, CircleAlert, ShieldCheck } from "lucide-react";
import { WorkspaceLayout } from "@/components/workspace-layout";

export default function SafetyPage() {
  return (
    <WorkspaceLayout page="safety">
      <section className="safety-circuit">
        <div className="relay-card">
          <p>ORDER RP-1048 · TABLE 08</p>
          <h2>The sauce changed. The promise must stay visible.</h2>
          <div className="conflict">
            <CircleAlert size={19} />
            <span><b>Soy conflict detected</b>The new miso glaze is not compatible with Maya’s constraint.</span>
          </div>
          <button onClick={() => toast.success("Kitchen acknowledgement recorded")}>
            Acknowledge in kitchen <ShieldCheck size={17} />
          </button>
        </div>
        <div className="relay-path">
          {[["01", "Guest", "Soy saved with order", true], ["02", "Service", "Acknowledged by Sam", true], ["03", "Kitchen", "Waiting for confirmation", false], ["04", "Delivery", "Unlocks after prep", false]].map(([number, title, detail, done]) => (
            <article className={done ? "done" : ""} key={title as string}>
              <span>{done ? <Check size={15} /> : number}</span>
              <b>{title}<small>{detail}</small></b>
            </article>
          ))}
        </div>
        <div className="alternative-burst">
          <p>SAFE ALTERNATIVES</p>
          {["Heritage chicken", "Citrus garden", "Ember aubergine"].map((name) => (
            <button onClick={() => toast.success(`${name} sent to Maya for review`)} key={name}>
              {name}<small>Compatible and available</small>
              <ArrowUpRight size={15} />
            </button>
          ))}
        </div>
      </section>
    </WorkspaceLayout>
  );
}
