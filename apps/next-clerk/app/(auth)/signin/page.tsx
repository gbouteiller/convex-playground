import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

// ROOT ************************************************************************************************************************************
export default function SignInPage() {
	return (
		<div className="flex flex-col gap-8 w-96 mx-auto">
			<p>Log in to see the numbers</p>
			<SignInButton mode="modal">
				<Button>Sign in</Button>
			</SignInButton>
			<SignUpButton mode="modal">
				<Button>Sign up</Button>
			</SignUpButton>
		</div>
	);
}
