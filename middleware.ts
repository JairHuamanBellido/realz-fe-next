import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const isGithubJWTExist = request.cookies.get("next-auth.session-token");
  const isLobbyPage = request.nextUrl.pathname.startsWith("/lobby");
  const isChatRoomPage = request.nextUrl.pathname.startsWith("/chat");
  const isRootPage = request.nextUrl.pathname === "/";
  if (isGithubJWTExist && isRootPage) {
    return NextResponse.redirect(new URL("/lobby", request.url));
  } else if (!isGithubJWTExist && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/auth", request.url));
  } else if (isGithubJWTExist && (isLobbyPage || isChatRoomPage)) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
}
export const config = {
  matcher: ["/lobby", "/chat/:path*", "/"],
};
