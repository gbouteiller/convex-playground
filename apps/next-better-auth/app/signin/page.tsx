"use client";

import Form from "next/form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "./actions";

// ROOT ************************************************************************************************************************************
export default function SignInPage() {
	const [error, setError] = useState<string | null>(null);

	return (
		<div className="flex flex-col gap-8 w-96 mx-auto h-screen justify-center items-center">
			<Form action={signIn} className="flex flex-col gap-2 w-full">
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
			</Form>
		</div>
	);
}
