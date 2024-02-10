"use client"

import { OrganizationProfile } from "@clerk/nextjs"
import { Button } from "~/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog"
import { Plus } from "lucide-react"

const NavbarInviteButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <Plus className={"mr-2 h-4 w-4"} />
          Invite members
        </Button>
      </DialogTrigger>
      <DialogContent className={"max-w-[880px] border-none bg-transparent p-0"}>
        <OrganizationProfile />
      </DialogContent>
    </Dialog>
  )
}

export { NavbarInviteButton }
