"use client";

import { toast } from "sonner";
import { ArrowUpRight } from "lucide-react";
import { WorkspaceLayout } from "@/components/workspace-layout";

export default function ServicePage() {
  return (
    <WorkspaceLayout page="service">
      <section className="floor-layout">
        <div className="floor-grid">
          {Array.from({ length: 14 }, (_, index) => (
            <button 
              key={index} 
              className={index === 7 ? "urgent" : index < 10 ? "seated" : "free"} 
              onClick={() => toast.info(`Table ${String(index + 1).padStart(2, "0")} selected`)}
            >
              <b>{String(index + 1).padStart(2, "0")}</b>
              <span>{index === 7 ? "safety" : index < 10 ? `${[2, 3, 4][index % 3]} guests` : "open"}</span>
            </button>
          ))}
        </div>
        <div className="service-trail">
          <p>THE NEXT THREE MOMENTS</p>
          {[["08", "Resolve soy substitution", "Safety-critical"], ["11", "Deliver ready dishes", "1 min ago"], ["04", "Bring water", "2 min ago"]].map(([table, title, note]) => (
            <button key={title} onClick={() => toast.success(`${title} assigned to you`)}>
              <span>T{table}</span>
              <b>{title}<small>{note}</small></b>
              <ArrowUpRight size={16} />
            </button>
          ))}
        </div>
      </section>
    </WorkspaceLayout>
  );
}
