import z from "zod/mini";

// SCHEMAS ---------------------------------------------------------------------------------------------------------------------------------
export const zSignInValues = z.object({
	email: z.email(),
	password: z.string().check(z.minLength(3)),
});
