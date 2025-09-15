import { getCookiesFromHeader, getCookiesToDelete, getJWTCookieName } from "@cvx/better-auth/auth/utils";
import type { AstroCookies } from "astro";

export const getJWTToken = (cookies: AstroCookies) => cookies.get(getJWTCookieName())?.value;

export const deleteCookies = (cookies: AstroCookies) => getCookiesToDelete().map(({ name, options }) => cookies.delete(name, options));

export const setCookies = (cookies: AstroCookies, cookieHeader: string | null) =>
	getCookiesFromHeader(cookieHeader).map(({ key, value, options }) => cookies.set(key, value, options));
