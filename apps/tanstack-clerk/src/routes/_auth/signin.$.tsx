import { SignIn } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";
import { ensureUnauthenticatedFn } from "@/lib/auth/functions";

// ROUTE ***********************************************************************************************************************************
export const Route = createFileRoute("/_auth/signin/$")({
	beforeLoad: async () => await ensureUnauthenticatedFn(),
	component: SigninPage,
});

// ROOT ************************************************************************************************************************************
function SigninPage() {
	return <SignIn fallbackRedirectUrl="/admin" />;
}
