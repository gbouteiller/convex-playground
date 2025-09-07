import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request);
	if (!sessionCookie) return NextResponse.redirect(new URL("/signin", request.url));
}

export const config = {
	matcher: ["/admin"],
};
