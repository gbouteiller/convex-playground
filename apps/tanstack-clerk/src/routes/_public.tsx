import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ConvexProvider } from "convex/react";

// ROUTE ***********************************************************************************************************************************
export const Route = createFileRoute("/_public")({
	component: PublicLayout,
});

// ROOT ************************************************************************************************************************************
function PublicLayout() {
	const { convex } = Route.useRouteContext();

	return (
		<ConvexProvider client={convex}>
			<Outlet />
		</ConvexProvider>
	);
}
