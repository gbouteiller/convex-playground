import { getAuth } from "@clerk/tanstack-react-start/server";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { getJWTToken } from "./utils";

export const ensureAuthenticatedFn = createServerFn({ method: "GET" }).handler(async () => {
	const token = await getJWTToken();
	if (!token) throw redirect({ to: "/signin/$" });
	return { token };
});

export const ensureUnauthenticatedFn = createServerFn({ method: "GET" }).handler(async () => {
	const request = getWebRequest();
	const auth = await getAuth(request);
	if (auth.isAuthenticated) redirect({ to: "/admin" });
});
