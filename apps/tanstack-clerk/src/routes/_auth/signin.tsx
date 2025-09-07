import { SignInButton } from "@clerk/tanstack-react-start";
import { getAuth } from "@clerk/tanstack-react-start/server";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { Button } from "@/components/ui/button";

// SERVER **********************************************************************************************************************************
const authStateFn = createServerFn({ method: "GET" }).handler(async () => {
	const auth = await getAuth(getWebRequest());
	if (auth.isAuthenticated) throw redirect({ to: "/admin" });
});

// ROUTE ***********************************************************************************************************************************
export const Route = createFileRoute("/_auth/signin")({
	beforeLoad: async () => await authStateFn(),
	component: SigninPage,
});

// ROOT ************************************************************************************************************************************
function SigninPage() {
	return (
		<div className="flex flex-col gap-8 w-96 mx-auto">
			<SignInButton>
				<Button>Sign in</Button>
			</SignInButton>
		</div>
	);
}
