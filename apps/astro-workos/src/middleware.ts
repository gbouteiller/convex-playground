import { sequence } from "astro/middleware";
import { withAuth } from "./lib/auth";
import { withConvex } from "./lib/convex";

export const onRequest = sequence(withConvex, withAuth);
