import { api } from "@cvx/better-auth/convex/_generated/api";
import { createFileRoute } from "@tanstack/react-router";

// ROUTE ***********************************************************************************************************************************
export const Route = createFileRoute("/")({
	component: HomePage,
	loader: async ({ context: { convexServer } }) => await convexServer.query(api.pages.home),
});

// ROOT ************************************************************************************************************************************
function HomePage() {
	const title = Route.useLoaderData();
	return <div>{title}</div>;
}
