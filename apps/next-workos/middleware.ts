import { authkitMiddleware } from "@workos-inc/authkit-nextjs";

export default authkitMiddleware({
	eagerAuth: true,
	middlewareAuth: {
		enabled: true,
		unauthenticatedPaths: [],
	},
});

export const config = {
	matcher: ["/admin"],
};
