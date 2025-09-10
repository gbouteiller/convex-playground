import { api } from "@cvx/workos/convex/_generated/api";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useQuery } from "convex/react";
import { getFunctionName, makeFunctionReference } from "convex/server";
import { convexToJson, jsonToConvex } from "convex/values";
import { useMemo } from "react";

const authStateFn = createServerFn({ method: "GET" }).handler(async () => {
	// const auth = await getAuth(getWebRequest());
	// if (!auth.isAuthenticated) throw redirect({ to: "/signin" });
	// const token = await auth.getToken({ template: "convex" });
	// if (!token) throw redirect({ to: "/signin" });
	// return { token };
});

export const Route = createFileRoute("/_auth/admin")({
	beforeLoad: async ({ context: { convexServer } }) => {
		// const { token } = await authStateFn();
		// convexServer.setAuth(token);
	},
	component: RouteComponent,
	loader: async ({ context: { convexServer } }) => {
		const value = await convexServer.query(api.auth.getUserEmail);
		return {
			_name: getFunctionName(api.auth.getUserEmail),
			_argsJSON: convexToJson({}),
			_valueJSON: convexToJson(value),
		};
	},
});

function RouteComponent() {
	const preloaded = Route.useLoaderData();
	const args = useMemo(() => jsonToConvex(preloaded._argsJSON), [preloaded._argsJSON]);
	const preloadedResult = useMemo(() => jsonToConvex(preloaded._valueJSON), [preloaded._valueJSON]);
	const result = useQuery(makeFunctionReference<"query">(preloaded._name), args);
	const email = useMemo(() => (result === undefined ? preloadedResult : result), [result, preloadedResult]);

	return (
		<div className="flex flex-col gap-2">
			<div>Email : {email}</div>
			{/* <SignOutButton>
				<Button variant="secondary" className="cursor-pointer">
					Sign out
				</Button>
			</SignOutButton> */}
		</div>
	);
}
