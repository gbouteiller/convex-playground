import { JWT_COOKIE_NAME } from "@convex-dev/better-auth/plugins";
import type { CookieOptions } from "better-auth";
import { createCookieGetter, getCookies, parseSetCookieHeader } from "better-auth/cookies";
import { ConvexHttpClient } from "convex/browser";
import { createAuth } from "./server";

export const authOptions = () => createAuth({} as any).options;

export const getCookieInfos = (cookieName: string) => {
	const { attributes: options, name } = createCookieGetter(authOptions())(cookieName);
	return { name, options };
};

export const getJWTCookieInfos = () => getCookieInfos(JWT_COOKIE_NAME);

export const getJWTCookieName = () => getJWTCookieInfos().name;

export const getCookiesInfos = () => ({ ...getCookies(authOptions()), jwt: getJWTCookieInfos() });

export const getConvexHttpClient = (convexUrl: string, token?: string) => {
	const client = new ConvexHttpClient(convexUrl);
	if (token) client.setAuth(token);
	return client;
};

export const getCookiesToDelete = () =>
	Object.values(getCookiesInfos()).map(({ name, options }) => ({ name, options: encodeCookieOptions(options) }));

export const encodeCookieOptions = ({ httpOnly, maxAge, sameSite, ...rest }: CookieOptions) => ({
	...rest,
	httponly: httpOnly,
	"max-age": maxAge,
	samesite: sameSite,
});

export const cookieOptionsFrom = (attrs: CookieAttributes): CookieOptions => ({
	domain: attrs.domain,
	httpOnly: attrs.httponly,
	maxAge: attrs["max-age"],
	path: attrs.path,
	sameSite: attrs.samesite,
	secure: attrs.secure,
});

export const getCookiesFromHeader = (cookieHeader: string | null) => {
	if (!cookieHeader) return [];
	const parsed = parseSetCookieHeader(cookieHeader);
	return [...parsed.entries()].map(([key, value]) => ({
		key,
		value: decodeURIComponent(value.value),
		options: encodeCookieOptions(cookieOptionsFrom(value)),
	}));
};

interface CookieAttributes {
	value: string;
	"max-age"?: number;
	expires?: Date;
	domain?: string;
	path?: string;
	secure?: boolean;
	httponly?: boolean;
	samesite?: "strict" | "lax" | "none";
	[key: string]: any;
}
