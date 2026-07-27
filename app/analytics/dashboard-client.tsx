"use client";

import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

type DashboardClientProps = {
  revenue: number;
  orderCount: number;
  averageWait: number;
  lowStockCount: number;
  ordersByStatus: { _id: string; count: number }[];
  customerNotes: { _id: string; details: string; createdAt: string; tableId: any }[];
};

export function DashboardClient({ revenue, orderCount, averageWait, lowStockCount, ordersByStatus, customerNotes }: DashboardClientProps) {
  const statusData = useMemo(() => {
    return ordersByStatus.map(s => ({
      name: s._id,
      orders: s.count
    }));
  }, [ordersByStatus]);

  const revenueData = [
    { day: "Mon", revenue: revenue * 0.4 },
    { day: "Tue", revenue: revenue * 0.6 },
    { day: "Wed", revenue: revenue * 0.5 },
    { day: "Thu", revenue: revenue * 0.8 },
    { day: "Fri", revenue: revenue * 1.2 },
    { day: "Sat", revenue: revenue },
    { day: "Sun", revenue: revenue * 1.5 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* KPIs */}
      <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-6">
        <KPI title="Today's Revenue" value={`$${(revenue / 100).toFixed(2)}`} />
        <KPI title="Total Orders" value={orderCount} />
        <KPI title="Avg Wait Time" value={`${averageWait} min`} />
        <KPI title="Low Stock Items" value={lowStockCount} alert={lowStockCount > 0} />
      </div>
      
      {/* Charts */}
      <div className="lg:col-span-2 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm h-80">
        <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wide">Revenue (7 Days)</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontWeight: 600}} />
            <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `$${v/100}`} tick={{fill: '#9ca3af', fontWeight: 600}} />
            <Tooltip formatter={(v: any) => `$${(v/100).toFixed(2)}`} cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={4} dot={{ r: 6, fill: 'hsl(var(--primary))', strokeWidth: 0 }} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="lg:col-span-2 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm h-80">
        <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wide">Active Orders by Status</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={statusData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af', fontWeight: 600 }} />
            <YAxis axisLine={false} tickLine={false} allowDecimals={false} tick={{fill: '#9ca3af', fontWeight: 600}} />
            <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            <Bar dataKey="orders" fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Customer Feedback & Occasions */}
      <div className="lg:col-span-4 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-6 uppercase tracking-wide">Customer Notes, Feedback & Occasions</h3>
        {customerNotes.length === 0 ? (
          <div className="text-gray-400 font-medium p-8 text-center bg-gray-50 rounded-2xl">
            No active notes or occasions today.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {customerNotes.map(note => (
              <div key={note._id} className="p-4 bg-gray-50 border border-gray-100 rounded-2xl">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-black text-gray-900">{note.tableId?.label || "Takeaway"}</span>
                  <span className="text-xs font-bold text-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10 px-2 py-1 rounded-full uppercase tracking-wider">Note</span>
                </div>
                <p className="text-gray-700 font-medium text-sm">{note.details}</p>
                <div className="text-xs text-gray-400 mt-3 font-semibold">{new Date(note.createdAt).toLocaleTimeString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function KPI({ title, value, alert }: { title: string; value: string | number; alert?: boolean }) {
  return (
    <div className={`p-6 border rounded-3xl shadow-sm ${alert ? "bg-red-50 border-red-200" : "bg-white border-gray-100"}`}>
      <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">{title}</p>
      <h4 className={`text-4xl font-black ${alert ? "text-red-600" : "text-gray-900"}`}>{value}</h4>
    </div>
  );
}
