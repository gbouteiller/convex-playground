"use client";

import { RhfForm } from "@/components/rhf";
import { signInAction } from "./actions";
import { zodResolver } from "./resolver";
import { zSignInValues } from "./utils";

// ROOT ------------------------------------------------------------------------------------------------------------------------------------
const ZodMiniForm = () => <RhfForm action={signInAction} resolver={zodResolver(zSignInValues)} />;
export default ZodMiniForm;
