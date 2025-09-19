import { setupFetchClient } from "@convex-dev/better-auth/react-start";
import { createAuth } from "@cvx/better-auth/auth/server";
import { getCookie } from "@tanstack/react-start/server";

export const { fetchQuery, fetchMutation, fetchAction } = setupFetchClient(createAuth, getCookie) as unknown as Awaited<
	ReturnType<typeof setupFetchClient>
>;
