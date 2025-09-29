import { ConvexHttpClient } from "convex/browser";
import type { Preloaded } from "convex/react";
import { type FunctionReference, type FunctionReturnType, getFunctionName } from "convex/server";
import { convexToJson } from "convex/values";
import { clientEnv } from "@/config/env.client";
import { getJWTToken } from "../auth/server";

export async function fetchMutation<M extends FunctionReference<"mutation">>(
	mutation: M,
	args: M["_args"] = {},
): Promise<FunctionReturnType<M>> {
	const convex = await getConvexHttpClient();
	return convex.mutation(mutation, args);
}

export async function fetchQuery<Q extends FunctionReference<"query">>(query: Q, args: Q["_args"] = {}): Promise<FunctionReturnType<Q>> {
	const convex = await getConvexHttpClient();
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

export const getConvexHttpClient = async () => {
	const convex = new ConvexHttpClient(clientEnv.VITE_CONVEX_URL);
	const token = await getJWTToken();
	if (token) convex.setAuth(token);
	return convex;
};
