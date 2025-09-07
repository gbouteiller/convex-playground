"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import type { PropsWithChildren } from "react";

if (!process.env.NEXT_PUBLIC_CONVEX_URL) throw new Error("Missing env var");
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export function Providers({ children }: PropsWithChildren) {
	return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
