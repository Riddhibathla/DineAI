"use client";

import { toast } from "sonner";
import { ArrowUpRight, Check, CreditCard } from "lucide-react";
import { WorkspaceLayout } from "@/components/workspace-layout";

export default function BillingPage() {
  return (
    <WorkspaceLayout page="billing">
      <section className="close-layout">
        <div className="receipt">
          <p>READY TO CLOSE · TABLE 11</p>
          <h2>Ava Patel</h2>
          <span>Ember aubergine <b>$14.50</b></span>
          <span>Wild mushroom pasta <b>$22.00</b></span>
          <span>Tax <b>$3.01</b></span>
          <footer>
            <b>Total</b><strong>$39.51</strong>
          </footer>
          <button onClick={() => toast.success("Payment recorded. Receipt LU-1046 is ready.")}>
            Mark paid <CreditCard size={16} />
          </button>
        </div>
        <div className="receipt-stream">
          <p>RECENT RECEIPTS</p>
          {["LU-1045 · $27.06", "LU-1044 · $61.37", "LU-1043 · $48.72"].map((receipt) => (
            <button key={receipt} onClick={() => toast.info(`${receipt} opened`)}>
              <Check size={15} />{receipt}
              <ArrowUpRight size={15} />
            </button>
          ))}
        </div>
      </section>
    </WorkspaceLayout>
  );
}
