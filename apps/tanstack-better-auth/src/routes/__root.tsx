/// <reference types="vite/client" />

import { authClient } from "@cvx/better-auth/auth/client";
import { createRootRouteWithContext, HeadContent, Link, Outlet, Scripts } from "@tanstack/react-router";
import type { ConvexReactClient } from "convex/react";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/lib/theme";
import appCss from "@/styles/app.css?url";
import "@fontsource/geist-sans";
import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";

// ROUTE ***********************************************************************************************************************************
export const Route = createRootRouteWithContext<{ convex: ConvexReactClient }>()({
	head: () => ({
		meta: [{ charSet: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { title: "tanstack-better-auth" }],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "icon", href: "/convex.svg" },
		],
	}),
	component: RootLayout,
});

// ROOT ************************************************************************************************************************************
function RootLayout() {
	const { convex } = Route.useRouteContext();

	return (
		<ConvexBetterAuthProvider client={convex} authClient={authClient}>
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
