import { SignIn } from "@clerk/tanstack-react-start";
import { getAuth } from "@clerk/tanstack-react-start/server";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";

// SERVER **********************************************************************************************************************************
const authStateFn = createServerFn({ method: "GET" }).handler(async () => {
	const request = getWebRequest();
	const auth = await getAuth(request);
	if (auth.isAuthenticated) throw redirect({ to: "/admin" });
});

// ROUTE ***********************************************************************************************************************************
export const Route = createFileRoute("/_auth/signin/$")({
	beforeLoad: async () => await authStateFn(),
	component: SigninPage,
});

// ROOT ************************************************************************************************************************************
function SigninPage() {
	return <SignIn fallbackRedirectUrl="/admin" />;
}
