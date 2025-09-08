import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";

export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
	},
	integrations: [react()],
	adapter: vercel({ edgeMiddleware: false }),
	output: "server",
	env: {
		schema: {
			PUBLIC_CONVEX_SITE_URL: envField.string({ context: "client", access: "public" }),
			PUBLIC_CONVEX_URL: envField.string({ context: "client", access: "public" }),
			CONVEX_DEPLOYMENT: envField.string({ context: "server", access: "public" }),
			SITE_URL: envField.string({ context: "server", access: "public" }),
		},
	},
});
