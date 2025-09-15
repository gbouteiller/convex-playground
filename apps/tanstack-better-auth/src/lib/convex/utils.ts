import { getConvexHttpClient as nativeGetConvexHttpClient } from "@cvx/better-auth/auth/utils";
import type { Preloaded } from "convex/react";
import { type FunctionReference, type FunctionReturnType, getFunctionName } from "convex/server";
import { convexToJson, jsonToConvex } from "convex/values";
import { envPublic } from "@/env.public";
import { getJWTToken } from "../auth/utils";

export async function preloadQuery<Q extends FunctionReference<"query">>(query: Q, args: Q["_args"] = {}): Promise<Preloaded<Q>> {
	const convex = getConvexHttpClient();
	const value = await convex.query(query, args);
	const preloaded = {
		_name: getFunctionName(query),
		_argsJSON: convexToJson(args[0] ?? {}),
		_valueJSON: convexToJson(value),
	};
	return preloaded as any;
}

export const preloadedQueryResult = <Query extends FunctionReference<"query">>(preloaded: Preloaded<Query>): FunctionReturnType<Query> =>
	jsonToConvex(preloaded._valueJSON);

export const getConvexHttpClient = () => nativeGetConvexHttpClient(envPublic.VITE_CONVEX_URL, getJWTToken());
