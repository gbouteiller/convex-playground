import { convexQuery } from "@convex-dev/react-query";
import { api } from "@cvx/better-auth/convex/_generated/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ensureAuthenticatedFn } from "@/lib/auth/functions";
import { signOutFn } from "@/lib/convex/functions";

const query = convexQuery(api.auth.getUserEmail, {});

// ROUTE ***********************************************************************************************************************************
export const Route = createFileRoute("/admin")({
	beforeLoad: async () => await ensureAuthenticatedFn(),
	component: AdminPage,
	loader: async ({ context: { convexQueryClient } }) => await convexQueryClient.queryClient.ensureQueryData(query),
});

// ROOT ************************************************************************************************************************************
function AdminPage() {
	const { data: email } = useSuspenseQuery(query);

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
