import { createClerkHandler } from "@clerk/tanstack-react-start/server";
import { createStartHandler, defaultStreamHandler, defineHandlerCallback } from "@tanstack/react-start/server";
import { getRouter } from "./router";

const handlerFactory = createClerkHandler(
	createStartHandler({
		getRouter,
	}),
	{ signInForceRedirectUrl: "/admin" },
);

export default defineHandlerCallback(async (event) => {
	const startHandler = await handlerFactory(defaultStreamHandler);
	return startHandler(event);
});
