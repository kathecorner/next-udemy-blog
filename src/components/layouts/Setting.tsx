import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "@/auth"
import { Button } from "@/components/ui/button"
import { Session } from "next-auth"

export default function Setting({session} : {session: Session}) {
    const handleLogout = async () => {
        'use server'
        await signOut()
    }
  return (
    
      <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="font-medium">
          {session.user?.name}
      </Button>
    </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="w-48">
    <DropdownMenuItem onClick={(handleLogout)} className="cursor-point">Logout</DropdownMenuItem>          

  </DropdownMenuContent>
</DropdownMenu>
    
  )
}
