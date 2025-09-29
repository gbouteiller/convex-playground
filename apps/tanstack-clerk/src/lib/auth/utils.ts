import { getAuth } from "@clerk/tanstack-react-start/server";
import { getRequest } from "@tanstack/react-start/server";

export const getJWTToken = async () => {
	const request = getRequest();
	const auth = await getAuth(request);
	if (!auth.isAuthenticated) return null;
	const token = await auth.getToken({ template: "convex" });
	return token;
};
