"use server";

import { api } from "@cvx/better-auth/convex/_generated/api";
import { redirect } from "next/navigation";
import { deleteCookies } from "@/lib/auth/utils";
import { getConvexHttpClient } from "@/lib/convex/utils";

export async function signOut() {
	const convex = await getConvexHttpClient();
	await convex.mutation(api.auth.signOut);
	await deleteCookies();
	redirect(`/`);
}
