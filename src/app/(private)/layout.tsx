import PrivateHeader from "@/components/layouts/PrivateHeader";

export default function PrivateLayout(
    {
    children,
}: Readonly<{
  children: React.ReactNode;
}>){
  return (
    <div>
        <>
        <PrivateHeader />
        {children}
        </>
      
    </div>
  )
}
