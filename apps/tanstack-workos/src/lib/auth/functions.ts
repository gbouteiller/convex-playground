import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { deleteCookie, getCookie } from "@tanstack/react-start/server";
import { clientEnv } from "@/config/env.client";
import { serverEnv } from "@/config/env.server";
import { getJWTToken, getWorkOS } from "./server";

export const getAuthorizationUrlFn = createServerFn({ method: "GET" }).handler(() =>
	getWorkOS().userManagement.getAuthorizationUrl({
		provider: "authkit",
		clientId: clientEnv.VITE_WORKOS_CLIENT_ID,
		redirectUri: clientEnv.VITE_WORKOS_REDIRECT_URI,
	}),
);

export const getJWTTokenFn = createServerFn({ method: "GET" }).handler(getJWTToken);

export const ensureAuthenticatedFn = createServerFn({ method: "GET" }).handler(async () => {
	const token = getCookie("wos-session");
	if (!token) throw redirect({ to: "/auth/signin" });
	return { token };
});

export const ensureUnauthenticatedFn = createServerFn({ method: "GET" }).handler(async () => {
	const token = getCookie("wos-session");
	if (token) redirect({ to: "/admin" });
});

export const signoutFn = createServerFn({ method: "POST" }).handler(async () => {
	const cookie = getCookie("wos-session");
	if (!cookie) throw redirect({ to: "/" });
	const session = getWorkOS().userManagement.loadSealedSession({
		sessionData: cookie,
		cookiePassword: serverEnv.WORKOS_COOKIE_PASSWORD,
	});
	const url = await session.getLogoutUrl({ returnTo: clientEnv.VITE_WORKOS_LOGOUT_REDIRECT });
	deleteCookie("wos-session", { path: "/" });
	throw redirect({ href: url });
});
