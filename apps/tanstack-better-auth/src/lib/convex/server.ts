import { setupFetchClient } from "@convex-dev/better-auth/react-start";
import { createAuth } from "@cvx/better-auth/auth/server";
import { getCookie } from "@tanstack/react-start/server";
import type { Preloaded } from "convex/react";
import { type FunctionReference, getFunctionName } from "convex/server";
import { convexToJson } from "convex/values";

export const { fetchQuery, fetchMutation, fetchAction } = await setupFetchClient(createAuth, getCookie);

export async function preloadQuery<Q extends FunctionReference<"query">>(query: Q, args: Q["_args"] = {}): Promise<Preloaded<Q>> {
	const value = await fetchQuery(query, args);
	const preloaded = {
		_name: getFunctionName(query),
		_argsJSON: convexToJson(args[0] ?? {}),
		_valueJSON: convexToJson(value),
	} as Preloaded<Q>;
	return preloaded;
}
