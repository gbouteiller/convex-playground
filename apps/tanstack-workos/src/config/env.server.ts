import { z } from "zod";

const zServerEnv = z.object({
	CONVEX_DEPLOYMENT: z.string(),
	WORKOS_API_KEY: z.string(),
	WORKOS_COOKIE_PASSWORD: z.string(),
});

// Validate server environment
export const serverEnv = zServerEnv.parse(process.env);
