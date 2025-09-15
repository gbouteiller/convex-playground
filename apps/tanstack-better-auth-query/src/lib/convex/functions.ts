import { api } from "@cvx/better-auth/convex/_generated/api";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { deleteCookies, setCookies } from "../auth/utils";
import { getConvexHttpClient } from "./utils";

export const signInFn = createServerFn({ method: "POST" })
	.validator((data: FormData) => z.object({ email: z.email(), password: z.string() }).parse(Object.fromEntries(data.entries())))
	.handler(async ({ data }) => {
		const convex = getConvexHttpClient();
		const cookieHeader = await convex.mutation(api.auth.signIn, data);
		setCookies(cookieHeader);
		throw redirect({ to: "/admin" });
	});

export const signOutFn = createServerFn({ method: "POST" }).handler(async () => {
	const convex = getConvexHttpClient();
	await convex.mutation(api.auth.signOut);
	deleteCookies();
	throw redirect({ to: "/" });
});
