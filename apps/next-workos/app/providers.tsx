"use client";

import { AuthKitProvider, useAccessToken, useAuth } from "@workos-inc/authkit-nextjs/components";
import { ConvexProviderWithAuth, ConvexReactClient } from "convex/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ComponentProps, useCallback } from "react";

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
	const { getAccessToken, refresh } = useAccessToken();

	const isAuthenticated = !!user;

	const fetchAccessToken = useCallback(
		async ({ forceRefreshToken }: { forceRefreshToken?: boolean } = {}) => {
			if (!user) return null;
			try {
				if (forceRefreshToken) return (await refresh()) ?? null;
				return (await getAccessToken()) ?? null;
			} catch (error) {
				console.error("Failed to get access token:", error);
				return null;
			}
		},
		[user, refresh, getAccessToken],
	);

	return { fetchAccessToken, isAuthenticated, isLoading };
}
