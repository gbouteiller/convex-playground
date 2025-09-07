import { convexQuery } from "@convex-dev/react-query";
import { authClient } from "@cvx/better-auth/auth/client";
import { api } from "@cvx/better-auth/convex/_generated/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { Button } from "@/components/ui/button";
import { getCookieName } from "@/lib/auth-server-utils";

const query = convexQuery(api.auth.getUserEmail, {});

// SERVER **********************************************************************************************************************************
const ensureAuthenticatedFn = createServerFn({ method: "GET" }).handler(async () => {
	const sessionCookieName = await getCookieName();
	const token = getCookie(sessionCookieName);
	if (!token) throw redirect({ to: "/signin" });
	return { token };
});

// ROUTE ***********************************************************************************************************************************
export const Route = createFileRoute("/admin")({
	beforeLoad: async ({ context: { convexQueryClient } }) => {
		const { token } = await ensureAuthenticatedFn();
		convexQueryClient.serverHttpClient?.setAuth(token);
	},
	component: AdminPage,
	loader: async ({ context: { queryClient } }) => await queryClient.ensureQueryData(query),
});

// ROOT ************************************************************************************************************************************
function AdminPage() {
	const { data: email } = useSuspenseQuery(query);

	const navigate = useNavigate();
	const handleClick = () => authClient.signOut({}, { onSuccess: () => navigate({ to: "/" }) });

	return (
		<div className="flex flex-col gap-2">
			<div>Email : {email}</div>
			<Button variant="secondary" className="cursor-pointer" onClick={handleClick}>
				Sign out
			</Button>
		</div>
	);
}
