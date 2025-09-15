import { getConvexHttpClient as nativeGetConvexHttpClient } from "@cvx/better-auth/auth/utils";
import { envPublic } from "@/env.public";
import { getJWTToken } from "../auth/utils";

export const getConvexHttpClient = () => nativeGetConvexHttpClient(envPublic.VITE_CONVEX_URL, getJWTToken());
