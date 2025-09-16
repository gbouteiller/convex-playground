import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		CONVEX_DEPLOYMENT: z.string(),
		SITE_URL: z.url(),
	},
	client: {
		NEXT_PUBLIC_CONVEX_URL: z.url(),
		NEXT_PUBLIC_CONVEX_SITE_URL: z.url(),
	},
	experimental__runtimeEnv: {
		NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
		NEXT_PUBLIC_CONVEX_SITE_URL: process.env.NEXT_PUBLIC_CONVEX_SITE_URL,
	},
});
