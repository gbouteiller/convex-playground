import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { ConvexHttpClient } from "convex/browser";
import { ConvexReactClient } from "convex/react";
import { envPublic } from "./env.public";
import { routeTree } from "./routeTree.gen";

export function createRouter() {
	const convex = new ConvexReactClient(envPublic.VITE_CONVEX_URL, { expectAuth: true, unsavedChangesWarning: false });
	const convexServer = new ConvexHttpClient(envPublic.VITE_CONVEX_URL);

	const router = createTanStackRouter({
		routeTree,
		context: { convex, convexServer },
		scrollRestoration: true,
	});

	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof createRouter>;
	}
}
