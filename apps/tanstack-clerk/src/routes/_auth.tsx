import { ClerkProvider, useAuth } from "@clerk/tanstack-react-start";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ConvexProviderWithClerk } from "convex/react-clerk";

// ROUTE ***********************************************************************************************************************************
export const Route = createFileRoute("/_auth")({
	component: AuthLayout,
});

// ROOT ************************************************************************************************************************************
function AuthLayout() {
	const { convex } = Route.useRouteContext();
	return (
		<ClerkProvider>
			<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
				<Outlet />
			</ConvexProviderWithClerk>
		</ClerkProvider>
	);
}
