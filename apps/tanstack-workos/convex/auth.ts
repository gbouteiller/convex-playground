import { query } from "./_generated/server";

export const getUserEmail = query({
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();
		return identity?.email;
	},
});
