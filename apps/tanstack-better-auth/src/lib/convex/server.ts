import { getConvexHttpClient as nativeGetConvexHttpClient } from "@cvx/better-auth/auth/utils";
import type { Preloaded } from "convex/react";
import { type FunctionReference, type FunctionReturnType, getFunctionName } from "convex/server";
import { convexToJson } from "convex/values";
import { envPublic } from "@/env.public";
import { getJWTToken } from "../auth/server";

export async function fetchMutation<M extends FunctionReference<"mutation">>(
	mutation: M,
	args: M["_args"] = {},
): Promise<FunctionReturnType<M>> {
	const convex = getConvexHttpClient();
	return convex.mutation(mutation, args);
}

export async function fetchQuery<Q extends FunctionReference<"query">>(query: Q, args: Q["_args"] = {}): Promise<FunctionReturnType<Q>> {
	const convex = getConvexHttpClient();
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

export const getConvexHttpClient = () => nativeGetConvexHttpClient(envPublic.VITE_CONVEX_URL, getJWTToken());
