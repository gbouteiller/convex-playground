import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

// ROOT ************************************************************************************************************************************
export default async function Home() {
  const title = await fetchQuery(api.pages.home);
  return <div>{title}</div>;
}
