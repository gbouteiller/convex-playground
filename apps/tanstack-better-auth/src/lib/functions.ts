import { getCookieName } from "@convex-dev/better-auth/react-start";
import { createAuth } from "@cvx/better-auth/auth/server";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";

export const ensureAuthenticatedFn = createServerFn({ method: "GET" }).handler(async () => {
	const sessionCookieName = getCookieName(createAuth);
	const token = getCookie(sessionCookieName);
	if (!token) throw redirect({ to: "/signin" });
	return { token };
});

export const ensureUnauthenticatedFn = createServerFn({ method: "GET" }).handler(async () => {
	const sessionCookieName = getCookieName(createAuth);
	const token = getCookie(sessionCookieName);
	if (token) redirect({ to: "/admin" });
});
