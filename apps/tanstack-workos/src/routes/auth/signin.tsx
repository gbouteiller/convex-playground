import { createFileRoute, redirect } from "@tanstack/react-router";
import { getAuthorizationUrlFn } from "@/lib/auth/functions";

export const Route = createFileRoute("/auth/signin")({
	beforeLoad: async () => {
		const href = await getAuthorizationUrlFn();
		throw redirect({ href });
	},
});
