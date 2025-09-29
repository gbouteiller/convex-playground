import { createFileRoute } from "@tanstack/react-router";
import { Authenticated, AuthLoading, usePreloadedQuery } from "convex/react";
import { Button } from "@/components/ui/button";
import { ensureAuthenticatedFn, signoutFn } from "@/lib/auth/functions";
import { preloadedQueryResult } from "@/lib/convex/client";
import { preloadUserEmailFn } from "@/lib/convex/functions";

export const Route = createFileRoute("/admin")({
	beforeLoad: async () => await ensureAuthenticatedFn(),
	component: AdminPage,
	loader: async () => await preloadUserEmailFn(),
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
			<form method="post" action={signoutFn.url} className="flex">
				<Button variant="secondary" className="cursor-pointer w-full">
					{/* <Link to="/auth/signout" className="w-full">
					Sign out
				</Link> */}
					Sign out
				</Button>
			</form>
		</div>
	);
}
