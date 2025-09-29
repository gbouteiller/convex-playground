import { z } from "zod";

const zClientEnv = z.object({
	VITE_CONVEX_URL: z.url(),
	VITE_WORKOS_CLIENT_ID: z.string(),
	VITE_WORKOS_LOGOUT_REDIRECT: z.url(),
	VITE_WORKOS_REDIRECT_URI: z.url(),
});

// Validate client environment
export const clientEnv = zClientEnv.parse(import.meta.env);
