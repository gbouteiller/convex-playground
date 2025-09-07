"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { type FormEvent, useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ROOT ************************************************************************************************************************************
export default function SignInPage() {
	const { signIn } = useAuthActions();
	const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	const handleSubmit = useCallback(
		async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			const formData = new FormData(e.target as HTMLFormElement);
			formData.set("flow", flow);
			try {
				await signIn("password", formData);
				router.push("/admin");
			} catch (error) {
				setError((error as Error).message);
			}
		},
		[flow, router, signIn],
	);

	return (
		<div className="flex flex-col gap-8 w-96 mx-auto h-screen justify-center items-center">
			<form className="flex flex-col gap-2" onSubmit={handleSubmit}>
				<Input type="email" name="email" placeholder="Email" />
				<Input type="password" name="password" placeholder="Password" />
				<Button type="submit" className="cursor-pointer">
					{flow === "signIn" ? "Sign in" : "Sign up"}
				</Button>
				<div className="flex flex-row gap-2">
					<span>{flow === "signIn" ? "Don't have an account?" : "Already have an account?"}</span>
					<span
						className="text-foreground underline hover:no-underline cursor-pointer"
						onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
					>
						{flow === "signIn" ? "Sign up instead" : "Sign in instead"}
					</span>
				</div>
				{error && (
					<div className="bg-red-500/20 border-2 border-red-500/50 rounded-md p-2">
						<p className="text-foreground font-mono text-xs">Error signing in: {error}</p>
					</div>
				)}
			</form>
		</div>
	);
}
