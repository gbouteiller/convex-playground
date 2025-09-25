"use client";

import { effectTsResolver } from "@hookform/resolvers/effect-ts";
import { RhfForm } from "@/components/rhf";
import { signInAction } from "./actions";
import { sSignInValues } from "./utils";

// ROOT ------------------------------------------------------------------------------------------------------------------------------------
export const EffectForm = () => <RhfForm action={signInAction} resolver={effectTsResolver(sSignInValues)} />;
