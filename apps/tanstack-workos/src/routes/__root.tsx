/// <reference types="vite/client" />

import { createRootRouteWithContext, HeadContent, Link, Outlet, Scripts } from "@tanstack/react-router";
import type { ConvexHttpClient } from "convex/browser";
import { ConvexProviderWithAuth, type ConvexReactClient } from "convex/react";
import { type PropsWithChildren, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import appCss from "@/styles/app.css?url";

export const Route = createRootRouteWithContext<{ convex: ConvexReactClient; convexServer: ConvexHttpClient }>()({
	head: () => ({
		meta: [{ charSet: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { title: "tanstack-workos" }],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "icon", href: "/convex.svg" },
		],
	}),
	component: RootComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument({ children }: PropsWithChildren) {
	const { convex } = Route.useRouteContext();

	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<ConvexProviderWithAuth client={convex} useAuth={useAuthFromAuthKit}>
					<header className="p-2 border-b-1">
						<Button variant="ghost">
							<Link to="/">Home</Link>
						</Button>
						<Button variant="ghost">
							<Link to="/admin">Admin</Link>
						</Button>
					</header>
					<main className="p-10">{children}</main>
				</ConvexProviderWithAuth>
				<Scripts />
			</body>
		</html>
	);
}

function useAuthFromAuthKit() {
	const { user, loading: isLoading } = useAuth();
	const { accessToken, loading: tokenLoading, error: tokenError } = useAccessToken();
	const loading = (isLoading ?? false) || (tokenLoading ?? false);
	const authenticated = !!user && !!accessToken && !loading;

	const stableAccessToken = useRef<string | null>(null);
	if (accessToken && !tokenError) stableAccessToken.current = accessToken;

	const fetchAccessToken = useCallback(async () => {
		if (stableAccessToken.current && !tokenError) return stableAccessToken.current;
		return null;
	}, [tokenError]);

	return {
		isLoading: loading,
		isAuthenticated: authenticated,
		fetchAccessToken,
	};
}
