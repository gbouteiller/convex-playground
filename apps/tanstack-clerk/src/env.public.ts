import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const envPublic = createEnv({
	clientPrefix: "VITE_",
	client: {
		VITE_CLERK_FRONTEND_API_URL: z.url(),
		VITE_CLERK_PUBLISHABLE_KEY: z.string(),
		VITE_CONVEX_URL: z.url(),
	},
	runtimeEnv: import.meta.env,
	emptyStringAsUndefined: true,
});
