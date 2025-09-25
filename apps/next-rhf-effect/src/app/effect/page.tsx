import dynamic from "next/dynamic";

const EffectForm = dynamic(() => import("./page.form"));

// ROOT ------------------------------------------------------------------------------------------------------------------------------------
export default function EffectPage() {
	return (
		<div className="w-full max-w-sm md:max-w-md">
			<EffectForm />
		</div>
	);
}
