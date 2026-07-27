"use client";

import { useState } from "react";
import { toast } from "sonner";
import { WorkspaceLayout } from "@/components/workspace-layout";

export function QueueClient({ initialQueue }: { initialQueue: any[] }) {
  const [queue, setQueue] = useState(initialQueue);

  const handleSeat = (dbId: string, name: string) => {
    setQueue(prev => prev.filter(q => q.dbId !== dbId));
    toast.success(`${name} marked ready to seat`);
    // In a real app we would call a server action here to update the DB
  };

  return (
    <WorkspaceLayout page="queue">
      <section className="arrival-layout">
        <div className="arrival-core">
          <p>YOUR CURRENT ESTIMATE</p>
          <strong>18<span>min</span></strong>
          <h2>We’re setting the right table free.</h2>
          <div className="arrival-math">
            <span><b>02</b> parties ahead</span><i>+</i>
            <span><b>04</b> fitting tables</span><i>=</i>
            <span><b>18m</b> estimate</span>
          </div>
        </div>
        <div className="queue-list">
          {queue.map((entry) => (
            <article key={entry.dbId}>
              <span>{String(entry.position).padStart(2, "0")}</span>
              <div>
                <b>{entry.name}</b>
                <small>{entry.party} guests · {entry.note}</small>
              </div>
              <strong>{entry.estimate}m</strong>
              <button onClick={() => handleSeat(entry.dbId, entry.name)}>Seat</button>
            </article>
          ))}
        </div>
      </section>
    </WorkspaceLayout>
  );
}
