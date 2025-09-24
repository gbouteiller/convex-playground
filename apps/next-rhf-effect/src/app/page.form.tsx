"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircleIcon, LogInIcon } from "lucide-react";
import { type ComponentProps, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { signInAction } from "./actions";
import { type SignInValues, signInDefaultValues, zSignInValues } from "./utils";

export function HomeForm({ className, ...props }: ComponentProps<"div">) {
	const [state, action, isPending] = useActionState(signInAction, undefined);

	const form = useForm<SignInValues>({
		defaultValues: state?.values ?? signInDefaultValues,
		errors: state?.errors,
		mode: "onTouched",
		resolver: zodResolver(zSignInValues),
	});

	useEffect(() => {
		if (state?.status === "success") form.reset();
		if (state?.message && !isPending) state.status === "success" ? toast.success(state.message) : toast.error(state.message);
	}, [form.reset, isPending, state?.message, state?.status]);

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card className="overflow-hidden p-0">
				<CardContent className="p-0">
					<Form {...form}>
						<form action={action} onSubmit={form.formState.isValid ? undefined : form.handleSubmit(() => {})} className="p-6 md:p-8">
							<div className="flex flex-col gap-6">
								<div className="flex flex-col items-center text-center">
									<h1 className="text-2xl font-bold">Welcome back</h1>
									<p className="text-muted-foreground text-balance">Login to your Playground account</p>
								</div>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input type="email" placeholder="m@example.com" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input type="password" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="submit" className="w-full cursor-pointer" disabled={isPending}>
									{isPending ? <LoaderCircleIcon className="animate-spin" /> : <LogInIcon />}
									Login
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
