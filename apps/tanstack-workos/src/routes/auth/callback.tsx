import { redirect } from "@tanstack/react-router";
import { createServerFileRoute, setCookie } from "@tanstack/react-start/server";
import { envPublic } from "@/env.public";
import { envServer } from "@/env.server";
import { getWorkOS } from "@/lib/auth/utils";

export const ServerRoute = createServerFileRoute("/auth/callback").methods({
	GET: async ({ request }) => {
		const url = new URL(request.url);
		const code = url.searchParams.get("code");
		if (code) {
			try {
				const { sealedSession } = await getWorkOS().userManagement.authenticateWithCode({
					clientId: envPublic.VITE_WORKOS_CLIENT_ID,
					code,
					session: { sealSession: true, cookiePassword: envServer.WORKOS_COOKIE_PASSWORD },
				});
				setCookie("wos-session", sealedSession as string, { path: "/", httpOnly: true, secure: true, sameSite: "lax" });
				throw redirect({ to: "/admin" });
			} catch (error) {
				console.error(error instanceof Error ? error.message : String(error));
				throw redirect({ to: "/auth/signin" });
			}
		}
	},
});
