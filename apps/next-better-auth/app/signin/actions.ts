"use server";

import { api } from "@cvx/better-auth/convex/_generated/api";
import { redirect } from "next/navigation";
import { setCookies } from "@/lib/auth/utils";
import { getConvexHttpClient } from "@/lib/convex/utils";

export async function signIn(formData: FormData) {
	const data = { email: formData.get("email") as string, password: formData.get("password") as string };
	const convex = await getConvexHttpClient();
	const cookieHeader = await convex.mutation(api.auth.signIn, data);
	setCookies(cookieHeader);
	redirect("/admin");
}
