import { api } from "@cvx/better-auth/convex/_generated/api";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import Form from "next/form";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getJWTToken } from "@/lib/auth/utils";
import { signOut } from "./actions";
// import { UserEmail } from "./user-email";

// ROOT ************************************************************************************************************************************
export default async function AdminPage() {
	const token = await getJWTToken();
	console.log("token", token);
	if (!token) redirect("/signin");

	try {
		const isAuthenticated = await fetchQuery(api.auth.isAuthenticated, {}, { token });
		console.log("isAuthenticated success", isAuthenticated);
		if (!isAuthenticated) redirect("/signin");
	} catch (e) {
		console.log("isAuthenticated error", e);
	}

	try {
		const preloaded = await preloadQuery(api.auth.getUserEmail, {}, { token });
		console.log("preloaded success", preloaded);
	} catch (e) {
		console.log("preloaded error", e);
	}

	return (
		<div className="flex flex-col gap-2">
			{/* <UserEmail preloaded={preloaded} /> */}
			<Form action={signOut} className="flex">
				<Button variant="secondary" className="w-full cursor-pointer">
					Sign out
				</Button>
			</Form>
		</div>
	);
}
