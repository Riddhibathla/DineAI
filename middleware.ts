import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const role = req.auth?.user?.role;

  // Protect internal routes
  if (pathname.startsWith("/analytics") && role !== "MANAGER" && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
  if (pathname.startsWith("/inventory") && role !== "MANAGER" && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
  if (pathname.startsWith("/kitchen") && role !== "KITCHEN" && role !== "MANAGER" && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
  if (pathname.startsWith("/service") && role !== "SERVER" && role !== "MANAGER" && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
  if (pathname.startsWith("/queue") && role !== "SERVER" && role !== "MANAGER" && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
  if (pathname.startsWith("/billing") && role !== "SERVER" && role !== "MANAGER" && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
  if (pathname.startsWith("/safety") && !role) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Handle root redirect based on role
  if (pathname === "/" && role) {
    if (role === "MANAGER" || role === "ADMIN") return NextResponse.redirect(new URL("/analytics", req.url));
    if (role === "KITCHEN") return NextResponse.redirect(new URL("/kitchen", req.url));
    if (role === "SERVER") return NextResponse.redirect(new URL("/service", req.url));
    if (role === "CUSTOMER") return NextResponse.redirect(new URL("/guest", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
