import { api } from "@cvx/workos/convex/_generated/api";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: Home,
	loader: async ({ context: { convexServer } }) => await convexServer.query(api.pages.home),
});

function Home() {
	const title = Route.useLoaderData();
	return <div>{title}</div>;
}
