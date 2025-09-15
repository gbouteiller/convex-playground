import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const envServer = createEnv({
	server: {
		CONVEX_DEPLOYMENT: z.string(),
		SITE_URL: z.url(),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
