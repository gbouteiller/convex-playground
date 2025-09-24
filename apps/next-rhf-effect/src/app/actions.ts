import { type ActionState, type SignInValues, zSignInValues } from "./utils";

export const signInAction = async (_: ActionState<SignInValues> | undefined, formData: FormData): ActionState<SignInValues> => {
	await new Promise((resolve) => setTimeout(resolve, 1000));
	const values = Object.fromEntries(formData.entries()) as SignInValues;
	const parsed = zSignInValues.safeParse(values);
	if (!parsed.success) return { status: "failure", values };
	const { email, password } = parsed.data;
	if (email !== "john@doe.com" || password !== "secret") return { message: "Invalid credentials", status: "failure", values };
	return { message: "Welcome back John Doe!", status: "success", values };
};
