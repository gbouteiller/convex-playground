import { Providers } from "./providers";

// ROOT ************************************************************************************************************************************
export default function AuthLayout({ children }: LayoutProps<"/">) {
	return <Providers>{children}</Providers>;
}
