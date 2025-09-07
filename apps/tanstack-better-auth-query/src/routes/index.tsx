import { convexQuery } from "@convex-dev/react-query";
import { api } from "@cvx/better-auth/convex/_generated/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

const query = convexQuery(api.pages.home, {});

// ROUTE ***********************************************************************************************************************************
export const Route = createFileRoute("/")({
	component: HomePage,
	loader: async ({ context: { queryClient } }) => await queryClient.ensureQueryData(query),
});

// ROOT ************************************************************************************************************************************
function HomePage() {
	const { data: title } = useSuspenseQuery(query);
	return <div>{title}</div>;
}
