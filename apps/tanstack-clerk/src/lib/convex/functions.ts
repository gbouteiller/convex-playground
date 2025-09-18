import { api } from "@cvx/clerk/convex/_generated/api";
import { createServerFn } from "@tanstack/react-start";
import { fetchQuery, preloadQuery } from "./utils";

export const fetchPageHomeFn = createServerFn({ method: "GET" }).handler(async () => fetchQuery(api.pages.home));

export const preloadUserEmailFn = createServerFn({ method: "GET" }).handler(async () => preloadQuery(api.auth.getUserEmail));
