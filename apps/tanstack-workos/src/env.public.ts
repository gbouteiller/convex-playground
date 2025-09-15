import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const envPublic = createEnv({
	clientPrefix: "VITE_",
	client: {
		VITE_CONVEX_URL: z.url(),
		VITE_WORKOS_CLIENT_ID: z.string(),
		VITE_WORKOS_LOGOUT_REDIRECT: z.url(),
		VITE_WORKOS_REDIRECT_URI: z.url(),
	},
	runtimeEnv: import.meta.env,
	emptyStringAsUndefined: true,
});
