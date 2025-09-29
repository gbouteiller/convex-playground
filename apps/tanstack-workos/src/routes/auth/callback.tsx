import { createFileRoute, redirect } from "@tanstack/react-router";
import { setCookie } from "@tanstack/react-start/server";
import { clientEnv } from "@/config/env.client";
import { serverEnv } from "@/config/env.server";
import { getWorkOS } from "@/lib/auth/server";

export const Route = createFileRoute("/auth/callback")({
	server: {
		handlers: {
			GET: async ({ request }) => {
				const url = new URL(request.url);
				const code = url.searchParams.get("code");
				if (code) {
					try {
						const { sealedSession } = await getWorkOS().userManagement.authenticateWithCode({
							clientId: clientEnv.VITE_WORKOS_CLIENT_ID,
							code,
							session: { sealSession: true, cookiePassword: serverEnv.WORKOS_COOKIE_PASSWORD },
						});
						setCookie("wos-session", sealedSession as string, { path: "/", httpOnly: true, secure: true, sameSite: "lax" });
						return redirect({ to: "/admin" });
					} catch (error) {
						console.error(error instanceof Error ? error.message : String(error));
						return redirect({ to: "/auth/signin" });
					}
				}
			},
		},
	},
});
