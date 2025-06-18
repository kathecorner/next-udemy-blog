import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SearchBox from "@/components/post/SearchBox"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"



export default function PublicHeader() {
  return (
    <div>
      <header className="bg-blue-200 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link href="/" passHref>
                            <NavigationMenuLink className="text-lg font-bold">
                                Blog
                            </NavigationMenuLink>
                        </Link> 

                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center gap-4">
                <SearchBox />
                <Button variant="outline" asChild>
                    <Link href="/login" passHref>
                        Login
                    </Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/register" passHref>
                        Register 
                    </Link>
                </Button>
    
            </div>
        </div>
        </header>
    </div>
  )
}
