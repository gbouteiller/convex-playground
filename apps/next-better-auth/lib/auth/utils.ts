import { getCookiesFromHeader, getCookiesToDelete, getJWTCookieName } from "@cvx/better-auth/auth/utils";
import { cookies } from "next/headers";

export const getJWTToken = async () => {
	const cookieStore = await cookies();
	return cookieStore.get(getJWTCookieName())?.value;
};

export const deleteCookies = async () => {
	const cookieStore = await cookies();
	getCookiesToDelete().map(({ name, options }) => cookieStore.delete({ name, ...options }));
};

export const setCookies = async (cookieHeader: string | null) => {
	const cookieStore = await cookies();
	getCookiesFromHeader(cookieHeader).map(({ key, value, options }) => cookieStore.set(key, value, options));
};
