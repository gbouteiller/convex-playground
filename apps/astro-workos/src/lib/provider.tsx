import { PUBLIC_CONVEX_URL, PUBLIC_WORKOS_CLIENT_ID } from "astro:env/client";
import { AuthKitProvider, useAuth } from "@workos-inc/authkit-react";
import { ConvexProviderWithAuth, ConvexReactClient } from "convex/react";
import { type ComponentType, type JSX, useCallback, useMemo } from "react";

const client = new ConvexReactClient(PUBLIC_CONVEX_URL, { expectAuth: true, verbose: true });

export function withConvex<Props>(Component: ComponentType<Props>) {
	return (props: Props & JSX.IntrinsicAttributes) => (
		<AuthKitProvider clientId={PUBLIC_WORKOS_CLIENT_ID}>
			<ConvexProviderWithAuth client={client} useAuth={useAuthFromWorkOS}>
				<Component {...props} />
			</ConvexProviderWithAuth>
		</AuthKitProvider>
	);
}

function useAuthFromWorkOS() {
	const { isLoading, user, getAccessToken } = useAuth();

	const fetchAccessToken = useCallback(async () => {
		try {
			const token = await getAccessToken();
			return token;
		} catch (error) {
			console.error("Error fetching WorkOS access token:", error);
			return null;
		}
	}, [getAccessToken]);

	return useMemo(
		() => ({
			isLoading,
			isAuthenticated: !!user,
			fetchAccessToken,
		}),
		[isLoading, user, fetchAccessToken],
	);
}
