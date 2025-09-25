import dynamic from "next/dynamic";

const ZodMiniForm = dynamic(() => import("./page.form"));

// ROOT ------------------------------------------------------------------------------------------------------------------------------------
export default function ZodMiniPage() {
	return (
		<div className="w-full max-w-sm md:max-w-md">
			<ZodMiniForm />
		</div>
	);
}
