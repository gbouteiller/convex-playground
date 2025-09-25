"use server";

import { Either, Schema as S } from "effect";
import type { ActionState, SignInValues } from "@/components/rhf";
import { sSignInValues } from "./utils";

export const signInAction = async (_: ActionState<SignInValues> | undefined, formData: FormData): Promise<ActionState<SignInValues>> => {
	await new Promise((resolve) => setTimeout(resolve, 1000));
	const values = Object.fromEntries(formData.entries()) as SignInValues;
	const parsed = S.decodeUnknownEither(sSignInValues)(values);
	if (Either.isLeft(parsed)) return { status: "failure", values };
	const { email, password } = parsed.right;
	if (email !== "john@doe.com" || password !== "secret") return { message: "Invalid credentials", status: "failure", values };
	return { message: "Welcome back John Doe!", status: "success", values };
};
