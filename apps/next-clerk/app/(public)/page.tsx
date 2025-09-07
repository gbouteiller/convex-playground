import { api } from "@cvx/clerk/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

// ROOT ************************************************************************************************************************************
export default async function Home() {
	const title = await fetchQuery(api.pages.home);
	return <div>{title}</div>;
}
