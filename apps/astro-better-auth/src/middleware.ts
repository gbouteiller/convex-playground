import { sequence } from "astro/middleware";
import { withAuth } from "./lib/auth/middleware";
import { withConvex } from "./lib/convex/middleware";

export const onRequest = sequence(withConvex, withAuth);
