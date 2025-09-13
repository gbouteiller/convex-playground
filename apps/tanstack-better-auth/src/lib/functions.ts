import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { getCookieName } from "@/lib/auth-server-utils";

export const ensureAuthenticatedFn = createServerFn({ method: "GET" }).handler(async () => {
	const sessionCookieName = await getCookieName();
	const token = getCookie(sessionCookieName);
	if (!token) throw redirect({ to: "/signin" });
	return { token };
});
