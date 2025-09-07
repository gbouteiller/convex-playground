import { SignOutButton } from "@clerk/tanstack-react-start";
import { getAuth } from "@clerk/tanstack-react-start/server";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { api } from "convex/_generated/api";
import { usePreloadedQuery } from "convex/react";
import { Button } from "@/components/ui/button";
import { preloadQuery } from "@/lib/convex";

// SERVER **********************************************************************************************************************************
const authStateFn = createServerFn({ method: "GET" }).handler(async () => {
	const auth = await getAuth(getWebRequest());
	if (!auth.isAuthenticated) throw redirect({ to: "/signin" });
	const token = await auth.getToken({ template: "convex" });
	if (!token) throw redirect({ to: "/signin" });
	return { token };
});

// ROUTE ***********************************************************************************************************************************
export const Route = createFileRoute("/_auth/admin")({
	beforeLoad: async ({ context: { convexServer } }) => {
		const { token } = await authStateFn();
		convexServer.setAuth(token);
	},
	component: AdminPage,
	loader: async ({ context: { convexServer } }) => await preloadQuery(convexServer, api.auth.getUserEmail),
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
