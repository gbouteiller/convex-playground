import { PUBLIC_CONVEX_URL } from "astro:env/client";
import { defineMiddleware } from "astro:middleware";
import { ConvexHttpClient } from "convex/browser";
import type { Preloaded } from "convex/react";
import { type ArgsAndOptions, type FunctionReference, type FunctionReturnType, getFunctionName } from "convex/server";
import { convexToJson } from "convex/values";

const convexClient = new ConvexHttpClient(PUBLIC_CONVEX_URL);
// @ts-expect-error
convexClient.setFetchOptions({ cache: "no-store" });

const fetchMutation = <M extends FunctionReference<"mutation">>(
	mutation: M,
	...args: ArgsAndOptions<M, { token?: string }>
): Promise<FunctionReturnType<M>> => {
	const [fnArgs, options] = args;
	if (options?.token) convexClient.setAuth(options.token);
	return convexClient.mutation(mutation, fnArgs);
};

const fetchQuery = <Q extends FunctionReference<"query">>(
	query: Q,
	...args: ArgsAndOptions<Q, { token?: string }>
): Promise<FunctionReturnType<Q>> => {
	const [fnArgs, options] = args;
	if (options?.token) convexClient.setAuth(options.token);
	return convexClient.query(query, fnArgs);
};

const preloadQuery = async <Q extends FunctionReference<"query">>(
	query: Q,
	...args: ArgsAndOptions<Q, { token?: string }>
): Promise<Preloaded<Q>> => {
	const value = await fetchQuery(query, ...args);
	return {
		_name: getFunctionName(query),
		_argsJSON: convexToJson(args[0] ?? {}),
		_valueJSON: convexToJson(value),
	} as Preloaded<Q>;
};

export const withConvex = defineMiddleware((context, next) => {
	context.locals.convex = { client: convexClient, fetchMutation, fetchQuery, preloadQuery };
	return next();
});
