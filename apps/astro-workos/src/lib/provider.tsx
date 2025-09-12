import { PUBLIC_CONVEX_URL, PUBLIC_WORKOS_CLIENT_ID } from "astro:env/client";
import { ConvexProviderWithAuthKit } from "@convex-dev/workos";
import { AuthKitProvider, useAuth } from "@workos-inc/authkit-react";
import { ConvexReactClient } from "convex/react";
import type { ComponentType, JSX } from "react";

const client = new ConvexReactClient(PUBLIC_CONVEX_URL, { expectAuth: true, verbose: true });

export function withConvex<Props>(Component: ComponentType<Props>) {
	return (props: Props & JSX.IntrinsicAttributes) => (
		<AuthKitProvider clientId={PUBLIC_WORKOS_CLIENT_ID}>
			<ConvexProviderWithAuthKit client={client} useAuth={useAuth}>
				<Component {...props} />
			</ConvexProviderWithAuthKit>
		</AuthKitProvider>
	);
}
