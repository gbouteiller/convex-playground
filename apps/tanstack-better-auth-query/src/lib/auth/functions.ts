import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getJWTToken } from "./server";

export const ensureAuthenticatedFn = createServerFn({ method: "GET" }).handler(async () => {
	const token = getJWTToken();
	if (!token) throw redirect({ to: "/signin" });
	return { token };
});

export const ensureUnauthenticatedFn = createServerFn({ method: "GET" }).handler(async () => {
	const token = getJWTToken();
	if (token) redirect({ to: "/admin" });
});
