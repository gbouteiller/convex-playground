import { defineMiddleware } from "astro:middleware";
import { getSessionCookie } from "better-auth/cookies";
import { getToken } from "./utils";

export const withAuth = defineMiddleware(async (context, next) => {
	context.locals.auth = { getToken: () => getToken(context.cookies) };
	const sessionCookie = getSessionCookie(context.request);
	if (!sessionCookie && context.url.pathname.startsWith("/admin")) return context.redirect("/signin");
	return next();
});
