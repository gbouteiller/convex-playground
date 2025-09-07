import { PUBLIC_CONVEX_URL } from "astro:env/client";
import { authClient, ConvexBetterAuthProvider } from "@cvx/better-auth/auth/client";
import { ConvexReactClient } from "convex/react";
import type { JSX } from "react";

const client = new ConvexReactClient(PUBLIC_CONVEX_URL, { expectAuth: true });

export function withConvex<Props extends JSX.IntrinsicAttributes>(Component: React.ComponentType<Props>) {
	return function WithConvexProvider(props: Props) {
		return (
			<ConvexBetterAuthProvider client={client} authClient={authClient}>
				<Component {...props} />
			</ConvexBetterAuthProvider>
		);
	};
}
