import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import clerk from "@clerk/astro";
import { defineConfig, envField } from "astro/config";

export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
	},
	integrations: [react(), clerk()],
	adapter: vercel(),
	env: {
		schema: {
			PUBLIC_CLERK_FRONTEND_API_URL: envField.string({ context: "client", access: "public" }),
			PUBLIC_CLERK_PUBLISHABLE_KEY: envField.string({ context: "client", access: "public" }),
			PUBLIC_CONVEX_URL: envField.string({ context: "client", access: "public" }),
			CLERK_SECRET_KEY: envField.string({ context: "server", access: "secret" }),
			CONVEX_DEPLOYMENT: envField.string({ context: "server", access: "secret" }),
		},
	},
});
