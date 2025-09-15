import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { api } from "@cvx/better-auth/convex/_generated/api";
import { deleteCookies, getJWTToken, setCookies } from "@/lib/auth/utils";

export const server = {
	signIn: defineAction({
		accept: "form",
		input: z.object({ email: z.string(), password: z.string() }),
		handler: async (input, { cookies, locals: { convex } }) => {
			try {
				const cookieHeader = await convex.fetchMutation(api.auth.signIn, input);
				setCookies(cookies, cookieHeader);
				return true;
			} catch (error) {
				console.error(error);
				throw new ActionError({ code: "BAD_REQUEST", message: "Unknown error" });
			}
		},
	}),
	signOut: defineAction({
		accept: "form",
		handler: async (_, { cookies, locals: { convex } }) => {
			try {
				await convex.fetchMutation(api.auth.signOut, {}, { token: getJWTToken(cookies) });
				deleteCookies(cookies);
				return true;
			} catch (error) {
				console.error(error);
				throw new ActionError({ code: "BAD_REQUEST", message: "Unknown error" });
			}
		},
	}),
};
