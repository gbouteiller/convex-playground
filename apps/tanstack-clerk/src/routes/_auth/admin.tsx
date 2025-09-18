import { SignOutButton } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";
import { usePreloadedQuery } from "convex/react";
import { Button } from "@/components/ui/button";
import { ensureAuthenticatedFn } from "@/lib/auth/functions";
import { preloadUserEmailFn } from "@/lib/convex/functions";

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

	return (
		<div className="flex flex-col gap-2">
			<div>Email : {email}</div>
			<SignOutButton>
				<Button variant="secondary" className="cursor-pointer">
					Sign out
				</Button>
			</SignOutButton>
		</div>
	);
}
