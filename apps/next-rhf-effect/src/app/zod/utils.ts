import z from "zod";

// SCHEMAS ---------------------------------------------------------------------------------------------------------------------------------
export const zSignInValues = z.object({
	email: z.email(),
	password: z.string().min(3),
});
