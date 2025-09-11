import { PUBLIC_CONVEX_URL, PUBLIC_WORKOS_CLIENT_ID } from "astro:env/client";
import { ConvexReactClient } from "convex/react";
import type { JSX } from "react";
import { AuthKitProvider, useAuth } from "@workos-inc/authkit-react";
import { ConvexProviderWithAuthKit } from "@convex-dev/workos";


const client = new ConvexReactClient(PUBLIC_CONVEX_URL, { expectAuth: true });

export function withConvex<Props extends JSX.IntrinsicAttributes>(Component: React.ComponentType<Props>) {
	return function WithConvexProvider(props: Props) {
		return (
			<AuthKitProvider clientId={PUBLIC_WORKOS_CLIENT_ID}>
				<ConvexProviderWithAuthKit client={client} useAuth={useAuth}>
					<Component {...props} />
				</ConvexProviderWithAuthKit>
			</AuthKitProvider>
		);
	};
}

