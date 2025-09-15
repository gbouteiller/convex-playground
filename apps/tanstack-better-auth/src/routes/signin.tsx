import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ensureUnauthenticatedFn } from "@/lib/auth/functions";
import { signInFn } from "@/lib/convex/functions";

// ROUTE ***********************************************************************************************************************************
export const Route = createFileRoute("/signin")({
	beforeLoad: async () => await ensureUnauthenticatedFn(),
	component: SigninPage,
});

// ROOT ************************************************************************************************************************************
function SigninPage() {
	const [error, setError] = useState<string | null>(null);

	return (
		<div className="flex flex-col gap-8 w-96 mx-auto h-screen justify-center items-center">
			<form method="post" action={signInFn.url} className="flex flex-col gap-2 w-full">
				<Input type="email" name="email" placeholder="Email" />
				<Input type="password" name="password" placeholder="Password" />
				<Button type="submit" className="cursor-pointer">
					Sign in
				</Button>
				{error && (
					<div className="bg-red-500/20 border-2 border-red-500/50 rounded-md p-2">
						<p className="text-foreground font-mono text-xs">Error signing in: {error}</p>
					</div>
				)}
			</form>
		</div>
	);
}
