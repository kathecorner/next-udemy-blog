import Link from "next/link"
import { Input } from "@/components/ui/input"
import Setting from "./Setting"
import { auth } from "@/auth"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"


export default async function PrivateHeader() {
    const session = await auth()
    if (!session?.user?.email)  throw new Error("Unauthorized access")
  return (
    <header className="bg-blue-400 border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link href="/dashboard" passHref>
                        <NavigationMenuLink className="text-xl font-bold">
                            Dashboard Header
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                </NavigationMenuList>
        </NavigationMenu>
        <Setting session={session} />
      </div>
    </header>
  )
}
