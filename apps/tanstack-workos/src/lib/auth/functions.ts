import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { envPublic } from "@/env.public";
import { envServer } from "@/env.server";
import { getWorkOS } from "./utils";

export const getAuthorizationUrlFn = createServerFn({ method: "GET" }).handler(() =>
	getWorkOS().userManagement.getAuthorizationUrl({
		provider: "authkit",
		clientId: envPublic.VITE_WORKOS_CLIENT_ID,
		redirectUri: envPublic.VITE_WORKOS_REDIRECT_URI,
		// state: returnPathname ? btoa(JSON.stringify({ returnPathname })) : undefined,
		// screenHint,
	}),
);

export const getAccessTokenFn = createServerFn({ method: "GET" }).handler(async () => {
	const cookie = getCookie("wos-session");
	if (!cookie) return;

	const session = getWorkOS().userManagement.loadSealedSession({
		sessionData: cookie,
		cookiePassword: envServer.WORKOS_COOKIE_PASSWORD,
	});

	const result = await session.authenticate();

	if (result.authenticated) return result.accessToken;

	try {
		const result = await session.refresh();
		if (result.authenticated) return result.session?.accessToken;
	} catch {}
});

export const ensureAuthenticatedFn = createServerFn({ method: "GET" }).handler(async () => {
	const token = getCookie("wos-session");
	if (!token) throw redirect({ to: "/auth/signin" });
	return { token };
});

export const ensureUnauthenticatedFn = createServerFn({ method: "GET" }).handler(async () => {
	const token = getCookie("wos-session");
	if (token) redirect({ to: "/admin" });
});
