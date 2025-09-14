import { v } from "convex/values";
import { authComponent, createAuth } from "../auth/server";
import { mutation, query } from "./_generated/server";

// Example function for getting the current user
// Feel free to edit, omit, etc.
export const getCurrentUser = query({
	args: {},
	handler: async (ctx) => authComponent.getAuthUser(ctx),
});

export const isAuthenticated = query({
	args: {},
	handler: async (ctx) => {
		try {
			authComponent.getAuthUser(ctx);
			return true;
		} catch {
			return false;
		}
	},
});

export const getUserEmail = query({
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();
		return identity?.email;
	},
});

export const signIn = mutation({
	args: { email: v.string(), password: v.string() },
	handler: async (ctx, { email, password }) => {
		const auth = createAuth(ctx);
		const response = await auth.api.signInEmail({ body: { email, password }, asResponse: true });
		return response.headers.get("set-cookie");
	},
});

export const signOut = mutation({
	args: {},
	handler: async (ctx) => {
		const auth = createAuth(ctx);
		const headers = await authComponent.getHeaders(ctx);
		if (!headers) return false;
		const { success } = await auth.api.signOut({ headers });
		return success;
	},
});

export const getSession = query({
	args: {},
	handler: async (ctx) => {
		const auth = createAuth(ctx);
		const headers = await authComponent.getHeaders(ctx);
		if (!headers) return false;
		const session = await auth.api.getSession({ headers });
		const user1 = await ctx.auth.getUserIdentity();
		const user2 = await authComponent.getAuthUser(ctx);
		return { session, user1, user2 };
	},
});
