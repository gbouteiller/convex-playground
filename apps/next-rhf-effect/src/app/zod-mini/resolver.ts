import { toNestErrors, validateFieldsNatively } from "@hookform/resolvers";
import { appendErrors, type FieldError, type FieldValues, type Resolver, type ResolverError, type ResolverSuccess } from "react-hook-form";
import * as z4 from "zod/v4/core";

const isZod4Error = (error: any): error is z4.$ZodError => {
	// instanceof is safe in Zod 4 (uses Symbol.hasInstance)
	return error instanceof z4.$ZodError;
};

function parseZod4Issues(zodErrors: z4.$ZodIssue[], validateAllFieldCriteria: boolean) {
	const errors: Record<string, FieldError> = {};
	// const _zodErrors = zodErrors as z4.$ZodISsue; //
	for (; zodErrors.length; ) {
		const error = zodErrors[0];
		const { code, message, path } = error;
		const _path = path.join(".");

		if (!errors[_path]) {
			if (error.code === "invalid_union" && error.errors.length > 0) {
				const unionError = error.errors[0][0];

				errors[_path] = {
					message: unionError.message,
					type: unionError.code,
				};
			} else {
				errors[_path] = { message, type: code };
			}
		}

		if (error.code === "invalid_union") {
			error.errors.forEach((unionError) => {
				unionError.forEach((e) => {
					zodErrors.push(e);
				});
			});
		}

		if (validateAllFieldCriteria) {
			const types = errors[_path].types;
			const messages = types && types[error.code];

			errors[_path] = appendErrors(
				_path,
				validateAllFieldCriteria,
				errors,
				code,
				messages ? ([] as string[]).concat(messages as string[], error.message) : error.message,
			) as FieldError;
		}

		zodErrors.shift();
	}

	return errors;
}

type RawResolverOptions = {
	mode?: "async" | "sync";
	raw: true;
};
type NonRawResolverOptions = {
	mode?: "async" | "sync";
	raw?: false;
};

type Zod4ParseParams = z4.ParseContext<z4.$ZodIssue>;

export function zodResolver<Input extends FieldValues, Context, Output, T extends z4.$ZodType<Output, Input> = z4.$ZodType<Output, Input>>(
	schema: T,
	schemaOptions?: Zod4ParseParams, // already partial
	resolverOptions?: NonRawResolverOptions,
): Resolver<z4.input<T>, Context, z4.output<T>>;
export function zodResolver<Input extends FieldValues, Context, Output, T extends z4.$ZodType<Output, Input> = z4.$ZodType<Output, Input>>(
	schema: z4.$ZodType<Output, Input>,
	schemaOptions: Zod4ParseParams | undefined, // already partial
	resolverOptions: RawResolverOptions,
): Resolver<z4.input<T>, Context, z4.input<T>>;
export function zodResolver<Input extends FieldValues, Context, Output>(
	schema: z4.$ZodType<Output, Input>,
	schemaOptions?: Zod4ParseParams,
	resolverOptions: {
		mode?: "async" | "sync";
		raw?: boolean;
	} = {},
): Resolver<Input, Context, Output | Input> {
	return async (values: Input, _, options) => {
		try {
			const parseFn = resolverOptions.mode === "sync" ? z4.parse : z4.parseAsync;
			const data: any = await parseFn(schema, values, schemaOptions);

			options.shouldUseNativeValidation && validateFieldsNatively({}, options);

			return {
				errors: {},
				values: resolverOptions.raw ? Object.assign({}, values) : data,
			} satisfies ResolverSuccess<Output | Input>;
		} catch (error) {
			if (isZod4Error(error)) {
				return {
					values: {},
					errors: toNestErrors(
						parseZod4Issues(error.issues, !options.shouldUseNativeValidation && options.criteriaMode === "all"),
						options,
					),
				} satisfies ResolverError<Input>;
			}

			throw error;
		}
	};
}
