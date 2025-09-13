import { authClient } from "@cvx/better-auth/auth/client";
import { api } from "@cvx/better-auth/convex/_generated/api";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Authenticated, AuthLoading, usePreloadedQuery } from "convex/react";
import { Button } from "@/components/ui/button";
import { preloadedQueryResult, preloadQuery } from "@/lib/convex";
import { ensureAuthenticatedFn } from "@/lib/functions";

// ROUTE ***********************************************************************************************************************************
export const Route = createFileRoute("/admin")({
	beforeLoad: async ({ context: { convexServer } }) => {
		const { token } = await ensureAuthenticatedFn();
		convexServer.setAuth(token);
	},
	component: AdminPage,
	loader: async ({ context: { convexServer } }) => preloadQuery(convexServer, api.auth.getUserEmail),
});

// ROOT ************************************************************************************************************************************
function AdminPage() {
	const preloaded = Route.useLoaderData();
	const email = usePreloadedQuery(preloaded);
	const preloadedEmail = preloadedQueryResult(preloaded);

	const navigate = useNavigate();
	const handleClick = () => authClient.signOut({}, { onSuccess: () => navigate({ to: "/" }) });

	return (
		<div className="flex flex-col gap-2">
			<div>Email : {email}</div>
			<div>
				Email hacked : <Authenticated>{email}</Authenticated>
				<AuthLoading>{preloadedEmail}</AuthLoading>
			</div>
			<Button variant="secondary" className="cursor-pointer" onClick={handleClick}>
				Sign out
			</Button>
		</div>
	)
}
