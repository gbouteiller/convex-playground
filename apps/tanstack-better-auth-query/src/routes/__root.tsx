/// <reference types="vite/client" />

import { createRootRouteWithContext, HeadContent, Link, Outlet, Scripts } from "@tanstack/react-router";
import type { ConvexReactClient } from "convex/react";
import { Button } from "@/components/ui/button";
import appCss from "@/styles/app.css?url";
import "@fontsource/geist-sans";
import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import type { ConvexQueryClient } from "@convex-dev/react-query";
import { authClient } from "@cvx/better-auth/auth/client";
import type { QueryClient } from "@tanstack/react-query";
import { ThemeProvider } from "@/lib/theme";

// ROUTE ***********************************************************************************************************************************
export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
	convexClient: ConvexReactClient;
	convexQueryClient: ConvexQueryClient;
}>()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "tanstack-better-auth-query" },
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "icon", href: "/convex.svg" },
		],
	}),
	component: RootLayout,
});

// ROOT ************************************************************************************************************************************
function RootLayout() {
	const { convexClient } = Route.useRouteContext();

	return (
		<ConvexBetterAuthProvider client={convexClient} authClient={authClient}>
			<html lang="en">
				<head>
					<HeadContent />
				</head>
				<body>
					<ThemeProvider>
						<header className="p-2 border-b-1">
							<Button variant="ghost">
								<Link to="/">Home</Link>
							</Button>
							<Button variant="ghost">
								<Link to="/admin">Admin</Link>
							</Button>
						</header>
						<main className="p-10">
							<Outlet />
						</main>
					</ThemeProvider>
					<Scripts />
				</body>
			</html>
		</ConvexBetterAuthProvider>
	);
}
