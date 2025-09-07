"use client";

import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import { authClient } from "@cvx/better-auth/auth/client";
import { ConvexReactClient } from "convex/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

if (!process.env.NEXT_PUBLIC_CONVEX_URL) throw new Error("Missing env var");
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL, { expectAuth: true });

export function Providers({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
	return (
		<ConvexBetterAuthProvider client={convex} authClient={authClient}>
			<NextThemesProvider {...props} attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
				{children}
			</NextThemesProvider>
		</ConvexBetterAuthProvider>
	);
}
