import { createServerFn } from "@tanstack/react-start";
import { ConvexHttpClient } from "convex/browser";
import { type FunctionReference, getFunctionName } from "convex/server";
import { convexToJson } from "convex/values";
import { envPublic } from "@/env.public";

export const queryFn = createServerFn({ method: "GET" })
	.validator(<Q extends FunctionReference<"query">>(query: Q) => query)
	.handler(async ({ data: query }) => {
		const convex = new ConvexHttpClient(envPublic.VITE_CONVEX_URL);
		return await convex.query(query);
	});

export const preloadQueryFn = createServerFn({ method: "GET" })
	.validator(<Q extends FunctionReference<"query">>(data: { query: Q; args?: Q["_args"]; token?: string }) => data)
	.handler(async ({ data: { args = {}, query, token } }) => {
		const convex = new ConvexHttpClient(envPublic.VITE_CONVEX_URL);
		if (token) convex.setAuth(token);
		const value = await convex.query(query, args);
		const preloaded = {
			_name: getFunctionName(query),
			_argsJSON: convexToJson(args[0] ?? {}),
			_valueJSON: convexToJson(value),
		};
		return preloaded as any;
	});
