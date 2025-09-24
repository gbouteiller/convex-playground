import { createRouter } from "@tanstack/react-router";
import { ConvexReactClient } from "convex/react";
import { envPublic } from "./env.public";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
	const convex = new ConvexReactClient(envPublic.VITE_CONVEX_URL, { expectAuth: true, unsavedChangesWarning: false });

	const router = createRouter({
		routeTree,
		context: { convex },
		scrollRestoration: true,
	});

	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
