import { ConvexHttpClient } from "convex/browser";
import type { Preloaded } from "convex/react";
import { type FunctionReference, type FunctionReturnType, getFunctionName } from "convex/server";
import { convexToJson } from "convex/values";
import { envPublic } from "@/env.public";
import { getJWTToken } from "../auth/utils";

export async function fetchQuery<Q extends FunctionReference<"query">>(query: Q, args: Q["_args"] = {}): Promise<FunctionReturnType<Q>> {
	const convex = new ConvexHttpClient(envPublic.VITE_CONVEX_URL);
	const token = await getJWTToken();
	if (token) convex.setAuth(token);
	return convex.query(query, args);
}

export async function preloadQuery<Q extends FunctionReference<"query">>(query: Q, args: Q["_args"] = {}): Promise<Preloaded<Q>> {
	const value = await fetchQuery(query, args);
	const preloaded = {
		_name: getFunctionName(query),
		_argsJSON: convexToJson(args[0] ?? {}),
		_valueJSON: convexToJson(value),
	} as Preloaded<Q>;
	return preloaded;
}
