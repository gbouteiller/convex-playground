import { PUBLIC_CONVEX_URL } from "astro:env/client";
import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import { authClient } from "@cvx/better-auth/auth/client";
import { ConvexReactClient } from "convex/react";
import type { ComponentType, JSX } from "react";

const client = new ConvexReactClient(PUBLIC_CONVEX_URL, { expectAuth: true });

export function withConvex<Props>(Component: ComponentType<Props>) {
	return (props: Props & JSX.IntrinsicAttributes) => (
		<ConvexBetterAuthProvider client={client} authClient={authClient}>
			<Component {...props} />
		</ConvexBetterAuthProvider>
	);
}
