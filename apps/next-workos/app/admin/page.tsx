import { signOut, withAuth } from "@workos-inc/authkit-nextjs";
import { preloadQuery } from "convex/nextjs";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { UserEmail } from "./user-email";

// ROOT ************************************************************************************************************************************
export default async function AdminPage() {
	const { accessToken } = await withAuth({ ensureSignedIn: true });
	const preloaded = await preloadQuery(api.auth.getUserEmail, {}, { token: accessToken });

	return (
		<div className="flex flex-col gap-2">
			<UserEmail preloaded={preloaded} />
			<form
				action={async () => {
					"use server";
					await signOut();
				}}
				className="w-full flex flex-col"
			>
				<Button type="submit" variant="secondary" className="cursor-pointer">
					Sign out
				</Button>
			</form>
		</div>
	);
}
