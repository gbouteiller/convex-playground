import { createFileRoute, redirect } from "@tanstack/react-router";
import { deleteCookie, getCookie } from "@tanstack/react-start/server";
import { envPublic } from "@/env.public";
import { envServer } from "@/env.server";
import { getWorkOS } from "@/lib/auth/utils";

export const Route = createFileRoute("/auth/signout")({
	beforeLoad: async () => {
		const cookie = getCookie("wos-session");

		if (!cookie) throw redirect({ to: "/" });

		const session = getWorkOS().userManagement.loadSealedSession({
			sessionData: cookie,
			cookiePassword: envServer.WORKOS_COOKIE_PASSWORD,
		});

		const url = await session.getLogoutUrl({ returnTo: envPublic.VITE_WORKOS_LOGOUT_REDIRECT });

		deleteCookie("wos-session", { path: "/" });

		throw redirect({ href: url });
	},
});
