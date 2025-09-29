import { getCookie } from "@tanstack/react-start/server";
import { WorkOS } from "@workos-inc/node";
import { clientEnv } from "@/config/env.client";
import { serverEnv } from "@/config/env.server";

export function createWorkOSInstance() {
	return new WorkOS(serverEnv.WORKOS_API_KEY, { clientId: clientEnv.VITE_WORKOS_CLIENT_ID });
}

export function lazy<T>(fn: () => T): () => T {
	let called = false;
	let result: T;
	return () => {
		if (!called) {
			result = fn();
			called = true;
		}
		return result;
	};
}

export const getWorkOS = lazy(createWorkOSInstance);

export const getJWTToken = async () => {
	const cookie = getCookie("wos-session");
	if (!cookie) return;

	const session = getWorkOS().userManagement.loadSealedSession({
		sessionData: cookie,
		cookiePassword: serverEnv.WORKOS_COOKIE_PASSWORD,
	});

	const result = await session.authenticate();

	if (result.authenticated) return result.accessToken;

	try {
		const result = await session.refresh();
		if (result.authenticated) return result.session?.accessToken;
	} catch {}
};
