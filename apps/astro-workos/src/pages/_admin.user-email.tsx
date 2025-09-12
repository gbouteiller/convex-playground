"use client";

import type { api } from "@cvx/workos/convex/_generated/api";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import { useEffect } from "react";
import { withConvex } from "@/lib/provider";

// ROOT ************************************************************************************************************************************
export const UserEmail = withConvex(({ preloaded }: UserEmailProps) => {
	const email = usePreloadedQuery(preloaded);
	useEffect(() => console.log("email changed", email), [email]);
	return <div>Email : {email}</div>;
});
type UserEmailProps = { preloaded: Preloaded<typeof api.auth.getUserEmail> };
