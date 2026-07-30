import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Providers } from "./providers";
import { CookieNotice } from "@/components/cookie-notice";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://dineai-uqol.onrender.com"),
  title: "DINE AI - every service beat, in sync",
  description:
    "A live restaurant operating system for guests, service, kitchen, inventory and SafePlate dietary handoffs.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "DINE AI - every service beat, in sync",
    description: "A live restaurant operating system for guests and teams.",
    images: ["/og.png"],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <CookieNotice />
          <Toaster richColors position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
