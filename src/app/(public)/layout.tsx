import type { Metadata } from "next";
import PublicHeader from "@/components/layouts/PublicHeader";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <PublicHeader />
        {children}
    </>
    
  );
}
