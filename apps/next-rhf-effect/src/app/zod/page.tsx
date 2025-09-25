import dynamic from "next/dynamic";

const ZodForm = dynamic(() => import("./page.form"));

// ROOT ------------------------------------------------------------------------------------------------------------------------------------
export default function ZodPage() {
	return (
		<div className="w-full max-w-sm md:max-w-md">
			<ZodForm />
		</div>
	);
}
