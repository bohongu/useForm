import { getSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

const pulicUrls = new Set(["/", "/log-in", "/create-account"]);

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const url = pulicUrls.has(request.nextUrl.pathname);

  if (!session.id) {
    if (!url) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (url) {
      return NextResponse.redirect(new URL("/some-public", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
