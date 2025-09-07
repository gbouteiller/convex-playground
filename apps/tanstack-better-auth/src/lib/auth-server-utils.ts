import { reactStartHelpers } from "@cvx/better-auth/auth/react-start";
import { createAuth } from "@cvx/better-auth/auth/server";

export const { fetchSession, reactStartHandler, getCookieName } = reactStartHelpers(createAuth, {
	convexSiteUrl: import.meta.env.VITE_CONVEX_SITE_URL,
});
