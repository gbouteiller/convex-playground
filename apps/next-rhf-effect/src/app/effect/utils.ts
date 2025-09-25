import { Schema as S } from "effect";

// SCHEMAS ---------------------------------------------------------------------------------------------------------------------------------
export const sSignInValues = S.Struct({
	email: S.String.pipe(S.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: () => "Please enter a valid email address" })),
	password: S.NonEmptyString,
});
