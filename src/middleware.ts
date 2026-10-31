import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/server/session-token";

/** Eerste verdedigingslinie voor /admin. Elke beheerpagina controleert daarnaast zelf rol en account. */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const ok = token ? await verifySession(token).catch(() => null) : null;
  if (!ok) {
    if (pathname.startsWith("/api/")) return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
    const url = req.nextUrl.clone(); url.pathname = "/admin/login"; url.search = "";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };
