import { WORKOS_API_KEY, WORKOS_COOKIE_PASSWORD } from "astro:env/server";
import { defineMiddleware } from "astro:middleware";
import { WorkOS } from "@workos-inc/node";
import { PUBLIC_WORKOS_CLIENT_ID } from "astro:env/client";

export const withAuth = defineMiddleware(async ({ cookies, locals, redirect, url }, next) => {
	locals.auth =  {client: new WorkOS(WORKOS_API_KEY, { clientId: PUBLIC_WORKOS_CLIENT_ID })};

	if (!url.pathname.startsWith("/admin")) return next();

	const cookie = cookies.get("wos-session");
	if (!cookie) return redirect("/auth/signin");

	const session = locals.auth.client.userManagement.loadSealedSession({
		sessionData: cookie.value,
		cookiePassword: WORKOS_COOKIE_PASSWORD,
	});

	const result = await session.authenticate();

	if (result.authenticated) {
    locals.auth.accessToken = result.accessToken;
    return next();
  }

	// If the cookie is missing, redirect to login
	if (!result.authenticated && result.reason === "no_session_cookie_provided") return redirect("/auth/signin");

	// If the session is invalid, attempt to refresh
	try {
		const result = await session.refresh();

		if (!result.authenticated) return redirect("/auth/signin");
    
    locals.auth.accessToken = result.session?.accessToken;

		// update the cookie
		cookies.set("wos-session", result.sealedSession as string, { path: "/", httpOnly: true, secure: true, sameSite: "lax" });

		// Redirect to the same route to ensure the updated cookie is used
		return redirect(url.pathname);
	} catch (error) {
		console.error("error", error);
		// Failed to refresh access token, redirect user to login page
		// after deleting the cookie
		cookies.delete("wos-session");
		return redirect("/auth/signin");
	}
});
