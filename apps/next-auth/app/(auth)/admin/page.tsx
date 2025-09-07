import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { SignOut } from "./signout";
import { UserEmail } from "./user-email";

// ROOT ************************************************************************************************************************************
export default async function AdminPage() {
  const token = await convexAuthNextjsToken();
  const preloaded = await preloadQuery(api.auth.getUserEmail, {}, { token });

  return (
    <div className="flex flex-col gap-2">
      <UserEmail preloaded={preloaded} />
      <SignOut />
    </div>
  );
}
