"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { RhfForm } from "@/components/rhf";
import { signInAction } from "./actions";
import { zSignInValues } from "./utils";

// ROOT ------------------------------------------------------------------------------------------------------------------------------------
export const NativeForm = () => <RhfForm action={signInAction} resolver={zodResolver(zSignInValues)} />;
