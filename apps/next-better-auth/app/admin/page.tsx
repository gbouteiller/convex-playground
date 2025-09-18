import { api } from "@cvx/better-auth/convex/_generated/api";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import type { Preloaded } from "convex/react";
import Form from "next/form";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getJWTToken } from "@/lib/auth/utils";
import { signOut } from "./actions";
import { UserEmail } from "./user-email";

// ROOT ************************************************************************************************************************************
export default async function AdminPage() {
	let preloaded: Preloaded<typeof api.auth.getUserEmail>;

	try {
		const token = await getJWTToken();
		if (!token) throw new Error("Not authenticated");
		const isAuthenticated = await fetchQuery(api.auth.isAuthenticated, {}, { token });
		if (!isAuthenticated) throw new Error("Not authenticated");
		preloaded = await preloadQuery(api.auth.getUserEmail, {}, { token });
	} catch {
		redirect("/signin");
	}

	return (
		<div className="flex flex-col gap-2">
			<UserEmail preloaded={preloaded} />
			<Form action={signOut} className="flex">
				<Button variant="secondary" className="w-full cursor-pointer">
					Sign out
				</Button>
			</Form>
		</div>
	);
}
