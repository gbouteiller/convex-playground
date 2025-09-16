import { getConvexHttpClient as nativeGetConvexHttpClient } from "@cvx/better-auth/auth/utils";
import { env } from "@/env";
import { getJWTToken } from "../auth/utils";

export const getConvexHttpClient = async () => {
	const token = await getJWTToken();
	return nativeGetConvexHttpClient(env.NEXT_PUBLIC_CONVEX_URL, token);
};
