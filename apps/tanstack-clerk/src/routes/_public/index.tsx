import { createFileRoute } from "@tanstack/react-router";
import { fetchPageHomeFn } from "@/lib/convex/functions";

// ROUTE ***********************************************************************************************************************************
export const Route = createFileRoute("/_public/")({
	component: HomePage,
	loader: async () => await fetchPageHomeFn(),
});

// ROOT ************************************************************************************************************************************
function HomePage() {
	const title = Route.useLoaderData();
	return <div>{title}</div>;
}
