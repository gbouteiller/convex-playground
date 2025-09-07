import { getToken } from "@convex-dev/better-auth/nextjs";
import { createAuth } from "@cvx/better-auth/auth/server";
import { api } from "@cvx/better-auth/convex/_generated/api";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import { redirect } from "next/navigation";
import { SignOut } from "./sign-out";
import { UserEmail } from "./user-email";

// ROOT ************************************************************************************************************************************
export default async function AdminPage() {
	const token = await getToken(createAuth);
	if (!token) redirect("/signin");

	const isAuthenticated = await fetchQuery(api.auth.isAuthenticated, {}, { token });
	if (!isAuthenticated) redirect("/signin");

	const preloaded = await preloadQuery(api.auth.getUserEmail, {}, { token });

	return (
		<div className="flex flex-col gap-2">
			<UserEmail preloaded={preloaded} />
			<SignOut />
		</div>
	);
}
