import { Providers } from "./providers";

// ROOT ************************************************************************************************************************************
export default function PublicLayout({ children }: LayoutProps<"/">) {
  return <Providers>{children}</Providers>;
}
