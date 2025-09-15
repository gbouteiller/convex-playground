import { api } from "@cvx/workos/convex/_generated/api";
import { createFileRoute } from "@tanstack/react-router";
import { queryFn } from "@/lib/convex/functions";

export const Route = createFileRoute("/")({
	component: HomePage,
	loader: async () => await queryFn({ data: api.pages.home }),
});

function HomePage() {
	const title = Route.useLoaderData();
	return <div>{title}</div>;
}
