import { createClerkHandler } from "@clerk/tanstack-react-start/server";
import { createStartHandler, defaultStreamHandler } from "@tanstack/react-start/server";

// const handlerFactory = createClerkHandler(
// 	createStartHandler({
// 		getRouter,
// 	}),
// 	{ signInForceRedirectUrl: "/admin" },
// );

// export default defineHandlerCallback(async (event) => {
// 	const startHandler = await handlerFactory(defaultStreamHandler);
// 	return startHandler(event);
// });

export default {
	fetch: createClerkHandler(createStartHandler(defaultStreamHandler), { signInForceRedirectUrl: "/admin" }),
};
