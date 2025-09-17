import { api } from "@cvx/better-auth/convex/_generated/api";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import Form from "next/form";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getJWTToken } from "@/lib/auth/utils";
import { signOut } from "./actions";
import { UserEmail } from "./user-email";

// ROOT ************************************************************************************************************************************
export default async function AdminPage() {
	const token = await getJWTToken();
	console.log("token", token);
	if (!token) redirect("/signin");

	const isAuthenticated = await fetchQuery(api.auth.isAuthenticated, {}, { token });
	console.log("isAuthenticated", isAuthenticated);
	if (!isAuthenticated) redirect("/signin");

	const preloaded = await preloadQuery(api.auth.getUserEmail, {}, { token });

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
