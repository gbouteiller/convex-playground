/// <reference types="vite/client" />

import { ConvexProviderWithAuthKit } from "@convex-dev/workos";
import { createRootRouteWithContext, HeadContent, Link, Outlet, Scripts } from "@tanstack/react-router";
import { AuthKitProvider, useAuth } from "@workos-inc/authkit-react";
import { type ConvexReactClient } from "convex/react";
import type { PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";
import { envPublic } from "@/env.public";
import appCss from "@/styles/app.css?url";

export const Route = createRootRouteWithContext<{ convex: ConvexReactClient }>()({
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
				<AuthKitProvider clientId={envPublic.VITE_WORKOS_CLIENT_ID}>
					<ConvexProviderWithAuthKit client={convex} useAuth={useAuth}>
						<header className="p-2 border-b-1">
							<Button variant="ghost">
								<Link to="/">Home</Link>
							</Button>
							<Button variant="ghost">
								<Link to="/admin">Admin</Link>
							</Button>
						</header>
						<main className="p-10">{children}</main>
					</ConvexProviderWithAuthKit>
				</AuthKitProvider>
				<Scripts />
			</body>
		</html>
	);
}
