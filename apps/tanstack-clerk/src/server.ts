import { createClerkHandler } from "@clerk/tanstack-react-start/server";
import { createStartHandler, defaultStreamHandler } from "@tanstack/react-start/server";

export default {
	fetch: createClerkHandler(createStartHandler(defaultStreamHandler), { signInForceRedirectUrl: "/admin" }),
};
