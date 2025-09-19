import type { Preloaded } from "convex/react";
import type { FunctionReference, FunctionReturnType } from "convex/server";
import { jsonToConvex } from "convex/values";

export const preloadedQueryResult = <Query extends FunctionReference<"query">>(preloaded: Preloaded<Query>): FunctionReturnType<Query> =>
	jsonToConvex(preloaded._valueJSON);
