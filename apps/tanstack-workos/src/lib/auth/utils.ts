import { WorkOS } from "@workos-inc/node";
import { envPublic } from "@/env.public";
import { envServer } from "@/env.server";

export function createWorkOSInstance() {
	return new WorkOS(envServer.WORKOS_API_KEY, { clientId: envPublic.VITE_WORKOS_CLIENT_ID });
}

export function lazy<T>(fn: () => T): () => T {
	let called = false;
	let result: T;
	return () => {
		if (!called) {
			result = fn();
			called = true;
		}
		return result;
	};
}

export const getWorkOS = lazy(createWorkOSInstance);
