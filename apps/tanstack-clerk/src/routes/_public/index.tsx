import { createFileRoute } from "@tanstack/react-router";
import { api } from "convex/_generated/api";

// ROUTE ***********************************************************************************************************************************
export const Route = createFileRoute("/_public/")({
	component: HomePage,
	loader: async ({ context: { convexServer } }) => await convexServer.query(api.pages.home),
});

// ROOT ************************************************************************************************************************************
function HomePage() {
	const title = Route.useLoaderData();
	return <div>{title}</div>;
}
