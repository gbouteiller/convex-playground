import type { FieldErrors } from "react-hook-form";
import z from "zod";

export const zSignInValues = z.object({
	email: z.email(),
	password: z.string().min(3),
});
export type SignInValues = z.infer<typeof zSignInValues>;

export const signInDefaultValues = { email: "", password: "" };

export type ActionState<V> = { errors?: FieldErrors; message?: string; status: "success" | "failure"; values: V };
