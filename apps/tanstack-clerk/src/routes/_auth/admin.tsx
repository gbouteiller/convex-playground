import { SignOutButton } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";
import { Authenticated, AuthLoading, usePreloadedQuery } from "convex/react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ensureAuthenticatedFn } from "@/lib/auth/functions";
import { preloadUserEmailFn } from "@/lib/convex/functions";
import { preloadedQueryResult } from "@/lib/convex/utils";

// ROUTE ***********************************************************************************************************************************
export const Route = createFileRoute("/_auth/admin")({
	beforeLoad: async () => await ensureAuthenticatedFn(),
	component: AdminPage,
	loader: async () => await preloadUserEmailFn(),
});

// ROOT ************************************************************************************************************************************
function AdminPage() {
	const preloaded = Route.useLoaderData();
	const email = usePreloadedQuery(preloaded);
	const preloadedEmail = preloadedQueryResult(preloaded);

	useEffect(() => console.log("email changed", email), [email]);

	return (
		<div className="flex flex-col gap-2">
			<div>Email : {email}</div>
			<div>
				Email hacked : <Authenticated>{email}</Authenticated>
				<AuthLoading>{preloadedEmail}</AuthLoading>
			</div>
			<SignOutButton>
				<Button variant="secondary" className="cursor-pointer">
					Sign out
				</Button>
			</SignOutButton>
		</div>
	);
}
