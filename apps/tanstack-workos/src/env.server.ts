import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const envServer = createEnv({
	server: {
		CONVEX_DEPLOYMENT: z.string(),
		WORKOS_API_KEY: z.string(),
		WORKOS_COOKIE_PASSWORD: z.string(),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
