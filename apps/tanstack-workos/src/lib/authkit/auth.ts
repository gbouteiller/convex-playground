import { createServerFn } from "@tanstack/react-start";
import { deleteCookie } from "@tanstack/react-start/server";
import { getConfig } from "./config";
import type { GetAuthURLOptions, NoUserInfo, UserInfo } from "./interfaces";
import { terminateSession, withAuth } from "./session";
import { getWorkOS } from "./workos";

export const getAuthorizationUrl = createServerFn({ method: "GET" })
	.validator((options?: GetAuthURLOptions) => options)
	.handler(({ data: options = {} }) => {
		const { returnPathname, screenHint, redirectUri } = options;

		return getWorkOS().userManagement.getAuthorizationUrl({
			provider: "authkit",
			clientId: getConfig("clientId"),
			redirectUri: redirectUri || getConfig("redirectUri"),
			state: returnPathname ? btoa(JSON.stringify({ returnPathname })) : undefined,
			screenHint,
		});
	});

// SIGNIN **********************************************************************************************************************************
export const getSignInUrl = createServerFn({ method: "GET" })
	.validator((data?: string) => data)
	.handler(async ({ data: returnPathname }) => {
		return await getAuthorizationUrl({ data: { returnPathname, screenHint: "sign-in" } });
	});

// SIGNUP **********************************************************************************************************************************
export const getSignUpUrl = createServerFn({ method: "GET" })
	.validator((data?: string) => data)
	.handler(async ({ data: returnPathname }) => {
		return getAuthorizationUrl({ data: { returnPathname, screenHint: "sign-up" } });
	});

// SIGNOUT *********************************************************************************************************************************
export const signOut = createServerFn({ method: "POST", response: "full" })
	.validator((data?: string) => data)
	.handler(async ({ data: returnTo }) => {
		const cookieName = getConfig("cookieName") || "wos_session";
		deleteCookie(cookieName);
		await terminateSession({ returnTo });
	});

// AUTH ************************************************************************************************************************************
export const getAuth = createServerFn({ method: "GET" }).handler(async (): Promise<UserInfo | NoUserInfo> => {
	const auth = await withAuth();
	return auth;
});
