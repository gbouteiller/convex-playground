"use client";

import { authClient } from "@cvx/better-auth/auth/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function SignOut() {
	const router = useRouter();
	const handleClick = () => authClient.signOut({}, { onSuccess: () => router.push("/") });

	return (
		<Button variant="secondary" className="cursor-pointer" onClick={handleClick}>
			Sign out
		</Button>
	);
}
