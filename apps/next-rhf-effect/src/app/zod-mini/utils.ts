import { email, minLength, object, string } from "zod/mini";

// SCHEMAS ---------------------------------------------------------------------------------------------------------------------------------
export const zSignInValues = object({
	email: email(),
	password: string().check(minLength(3)),
});
