import { setupFetchClient } from "@convex-dev/better-auth/react-start";
import { createAuth } from "@cvx/better-auth/auth/server";
import { getCookie } from "@tanstack/react-start/server";

export const { fetchQuery, fetchMutation, fetchAction } = await setupFetchClient(createAuth, getCookie);
