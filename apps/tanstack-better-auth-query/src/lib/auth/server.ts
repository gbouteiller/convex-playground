import { getCookiesFromHeader, getCookiesToDelete, getJWTCookieName } from "@cvx/better-auth/auth/utils";
import { deleteCookie, getCookie, setCookie } from "@tanstack/react-start/server";

export const getJWTToken = () => getCookie(getJWTCookieName());

export const deleteCookies = () => getCookiesToDelete().map(({ name, options }) => deleteCookie(name, options));

export const setCookies = (cookieHeader: string | null) =>
	getCookiesFromHeader(cookieHeader).map(({ key, value, options }) => setCookie(key, value, options));
