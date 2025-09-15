import { api } from "@cvx/workos/convex/_generated/api";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Authenticated, AuthLoading, usePreloadedQuery } from "convex/react";
import { Button } from "@/components/ui/button";
import { ensureAuthenticatedFn, getAccessTokenFn } from "@/lib/auth/functions";
import { preloadQueryFn } from "@/lib/convex/functions";
import { preloadedQueryResult } from "@/lib/convex/utils";

export const Route = createFileRoute("/admin")({
	beforeLoad: async () => {
		await ensureAuthenticatedFn();
		const token = await getAccessTokenFn();
		return { token };
	},
	component: AdminPage,
	loader: async ({ context: { token } }) => await preloadQueryFn({ data: { query: api.auth.getUserEmail, token } }),
});

function AdminPage() {
	const preloaded = Route.useLoaderData();
	const email = usePreloadedQuery(preloaded);
	const preloadedEmail = preloadedQueryResult(preloaded);

	return (
		<div className="flex flex-col gap-2">
			<div>Email : {email}</div>
			<div>
				Email hacked : <Authenticated>{email}</Authenticated>
				<AuthLoading>{preloadedEmail}</AuthLoading>
			</div>
			<Button variant="secondary" className="cursor-pointer">
				<Link to="/auth/signout" className="w-full">
					Sign out
				</Link>
			</Button>
		</div>
	);
}
