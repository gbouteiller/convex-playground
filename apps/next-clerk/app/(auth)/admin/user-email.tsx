"use client";

import type { api } from "@cvx/clerk/convex/_generated/api";
import { type Preloaded, usePreloadedQuery } from "convex/react";

// ROOT ************************************************************************************************************************************
export function UserEmail({ preloaded }: UserEmailProps) {
	const email = usePreloadedQuery(preloaded);
	return <div>Email : {email}</div>;
}
type UserEmailProps = { preloaded: Preloaded<typeof api.auth.getUserEmail> };
