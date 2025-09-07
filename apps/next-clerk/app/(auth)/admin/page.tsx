import { SignOutButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { UserEmail } from "./user-email";

// ROOT ************************************************************************************************************************************
export default async function AdminPage() {
	const { getToken, isAuthenticated } = await auth();
	if (!isAuthenticated) redirect("/signin");

	const token = await getToken({ template: "convex" });
	if (!token) redirect("/signin");

	const preloaded = await preloadQuery(api.auth.getUserEmail, {}, { token });

	return (
		<div className="flex flex-col gap-2">
			<UserEmail preloaded={preloaded} />
			<SignOutButton>
				<Button variant="secondary" className="cursor-pointer">
					Sign out
				</Button>
			</SignOutButton>
		</div>
	);
}
