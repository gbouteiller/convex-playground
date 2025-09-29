import { createRouter } from "@tanstack/react-router";
import { ConvexReactClient } from "convex/react";
import { clientEnv } from "./config/env.client";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
	const convex = new ConvexReactClient(clientEnv.VITE_CONVEX_URL, { expectAuth: false, unsavedChangesWarning: false });

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
