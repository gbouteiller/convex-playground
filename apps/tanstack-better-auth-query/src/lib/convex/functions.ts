import { api } from "@cvx/better-auth/convex/_generated/api";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { deleteCookies, setCookies } from "../auth/server";
import { fetchMutation } from "./server";

export const signInFn = createServerFn({ method: "POST" })
	.validator((data: FormData) => z.object({ email: z.email(), password: z.string() }).parse(Object.fromEntries(data.entries())))
	.handler(async ({ data }) => {
		const cookieHeader = await fetchMutation(api.auth.signIn, data);
		setCookies(cookieHeader);
		throw redirect({ to: "/admin" });
	});

export const signOutFn = createServerFn({ method: "POST" }).handler(async () => {
	await fetchMutation(api.auth.signOut, {});
	deleteCookies();
	throw redirect({ to: "/" });
});
