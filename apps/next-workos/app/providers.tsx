"use client";

import { AuthKitProvider, useAccessToken, useAuth } from "@workos-inc/authkit-nextjs/components";
import { ConvexProviderWithAuth, ConvexReactClient } from "convex/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ComponentProps, useCallback, useRef } from "react";

if (!process.env.NEXT_PUBLIC_CONVEX_URL) throw new Error("Missing env var");
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL, { expectAuth: true, verbose: true });

export function Providers({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
	return (
		<AuthKitProvider>
			<ConvexProviderWithAuth client={convex} useAuth={useAuthFromAuthKit}>
				<NextThemesProvider {...props} attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					{children}
				</NextThemesProvider>
			</ConvexProviderWithAuth>
		</AuthKitProvider>
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
