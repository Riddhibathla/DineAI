"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Table2, ChefHat, LineChart, Box, ShieldAlert, Utensils, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const iconMap = {
  Utensils,
  Table2,
  ChefHat,
  LineChart,
  Box,
  ShieldAlert
};

const roleLinks = {
  SERVER: [
    { href: "/pos", label: "Terminal", icon: "Utensils" },
    { href: "/service", label: "Service Floor", icon: "Table2" },
  ],
  KITCHEN: [
    { href: "/kitchen", label: "Kitchen Board", icon: "ChefHat" },
  ],
  MANAGER: [
    { href: "/analytics", label: "Dashboard", icon: "LineChart" },
    { href: "/pos", label: "Terminal", icon: "Utensils" },
    { href: "/kitchen", label: "Kitchen", icon: "ChefHat" },
    { href: "/inventory", label: "Inventory", icon: "Box" },
  ],
  ADMIN: [
    { href: "/analytics", label: "Dashboard", icon: "LineChart" },
    { href: "/pos", label: "Terminal", icon: "Utensils" },
    { href: "/kitchen", label: "Kitchen", icon: "ChefHat" },
    { href: "/inventory", label: "Inventory", icon: "Box" },
    { href: "/safety", label: "Safety Config", icon: "ShieldAlert" },
  ],
};

export function StaffNavigation() {
  const pathname = usePathname();
  const { data: session } = useSession();
  
  if (pathname === "/sign-in") return null;

  const role = (session?.user as any)?.role as keyof typeof roleLinks || "SERVER";
  const links = roleLinks[role] || roleLinks.SERVER;

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-gray-900 border-r border-gray-800 p-4 flex flex-col z-50">
      <div className="mb-10 px-4 pt-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-3xl font-black tracking-tighter text-white">ZestPOS</span>
        </Link>
      </div>
      
      <div className="flex-1 space-y-2">
        {links.map((link) => {
          const Icon = iconMap[link.icon as keyof typeof iconMap];
          const active = pathname.startsWith(link.href);
          return (
            <Link 
              key={link.href} 
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold ${
                active 
                ? "bg-[hsl(var(--primary))] text-white shadow-lg shadow-[hsl(var(--primary))]/20" 
                : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <Icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </div>

      <div className="pt-4 border-t border-gray-800 mt-auto">
        <button 
          onClick={() => signOut({ callbackUrl: "/sign-in" })}
          className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl w-full transition-all"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </nav>
  );
}
