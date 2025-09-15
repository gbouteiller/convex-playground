import { createClient, type GenericCtx } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { betterAuth } from "better-auth";
import { components } from "../convex/_generated/api";
import type { DataModel } from "../convex/_generated/dataModel";

const siteUrl = process.env.SITE_URL ?? import.meta.env.SITE_URL;

export const authComponent = createClient<DataModel>(components.betterAuth);

export const createAuth = (ctx: GenericCtx<DataModel>) =>
	betterAuth({
		baseURL: siteUrl,
		database: authComponent.adapter(ctx),
		emailAndPassword: {
			enabled: true,
			requireEmailVerification: false,
		},
		plugins: [convex()],
		trustedOrigins: [
			"http://localhost:3000",
			"https://astro-better-auth.vercel.app",
			"https://next-better-auth-tau.vercel.app",
			"https://tanstack-better-auth.vercel.app",
			"https://tanstack-better-auth-query.vercel.app",
		],
		advanced: {
			useSecureCookies: true,
		},
	});
