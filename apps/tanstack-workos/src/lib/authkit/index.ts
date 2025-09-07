import { getSignInUrl, getSignUpUrl, signOut, switchToOrganization } from "./auth";
import { handleAuth } from "./authkit-callback-route";
import { authkit, authkitMiddleware } from "./middleware";
import { getTokenClaims, refreshSession, saveSession, withAuth } from "./session";
import { getWorkOS } from "./workos";

export * from "./interfaces";

export {
	authkit,
	authkitMiddleware,
	getSignInUrl,
	getSignUpUrl,
	getWorkOS,
	handleAuth,
	refreshSession,
	saveSession,
	signOut,
	switchToOrganization,
	withAuth,
	getTokenClaims,
};
