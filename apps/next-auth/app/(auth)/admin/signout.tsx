"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";

// ROOT ************************************************************************************************************************************
export function SignOut() {
	const { isAuthenticated } = useConvexAuth();
	const { signOut } = useAuthActions();
	const router = useRouter();

	const handleClick = useCallback(async () => {
		await signOut();
		router.push("/signin");
	}, [router, signOut]);

	return (
		<>
			{isAuthenticated && (
				<Button onClick={handleClick} variant="secondary" className="cursor-pointer">
					Sign out
				</Button>
			)}
		</>
	);
}
