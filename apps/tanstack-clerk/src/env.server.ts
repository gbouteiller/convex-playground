import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const envServer = createEnv({
	server: {
		CLERK_SECRET_KEY: z.string(),
		CONVEX_DEPLOYMENT: z.string(),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
