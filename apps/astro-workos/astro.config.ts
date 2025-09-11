import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField, fontProviders } from "astro/config";

export default defineConfig({
	adapter: vercel(),
	output: "server",
	integrations: [react()],
	vite: {
		plugins: [tailwindcss()],
	},
	env: {
		schema: {
			PUBLIC_CONVEX_URL: envField.string({ context: "client", access: "public" }),
			PUBLIC_WORKOS_CLIENT_ID: envField.string({ context: "client", access: "public" }),
			PUBLIC_WORKOS_LOGOUT_REDIRECT: envField.string({ context: "client", access: "public" }),
			PUBLIC_WORKOS_REDIRECT_URI: envField.string({ context: "client", access: "public" }),
			CONVEX_DEPLOYMENT: envField.string({ context: "server", access: "secret" }),
			WORKOS_API_KEY: envField.string({ context: "server", access: "secret" }),
			WORKOS_COOKIE_PASSWORD: envField.string({ context: "server", access: "secret" }),
		},
	},
	experimental: {
		fonts: [
			{
				provider: fontProviders.fontsource(),
				name: "Geist Sans",
				cssVariable: "--font-sans",
			},
		],
	},
});
