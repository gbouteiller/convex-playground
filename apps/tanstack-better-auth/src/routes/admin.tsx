import { createFileRoute } from "@tanstack/react-router";
import { usePreloadedQuery } from "convex/react";
import { Button } from "@/components/ui/button";
import { ensureAuthenticatedFn } from "@/lib/auth/functions";
import { preloadUserEmailFn, signOutFn } from "@/lib/convex/functions";

// ROUTE ***********************************************************************************************************************************
export const Route = createFileRoute("/admin")({
	beforeLoad: async () => await ensureAuthenticatedFn(),
	component: AdminPage,
	loader: async () => await preloadUserEmailFn(),
});

// ROOT ************************************************************************************************************************************
function AdminPage() {
	const preloaded = Route.useLoaderData();
	const email = usePreloadedQuery(preloaded);

	return (
		<div className="flex flex-col gap-2">
			<div>Email : {email}</div>
			<form method="post" action={signOutFn.url} className="flex">
				<Button variant="secondary" className="w-full cursor-pointer">
					Sign out
				</Button>
			</form>
		</div>
	);
}
