"use client"

import { CreateOrganization } from "@clerk/nextjs"
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog"
import { Plus } from "lucide-react"

import { Hint } from "../../../hint/ui/hint"

const SidebarButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className={"aspect-square"}>
          <Hint
            label={"Create Organization"}
            side={"right"}
            sideOffset={10}
            align={"center"}
          >
            <button
              className={
                "flex h-full w-full items-center justify-center rounded-md bg-white/25 opacity-60 shadow-md transition-opacity duration-300 hover:opacity-100"
              }
            >
              <Plus className={"text-white"} />
            </button>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className={"max-w-[480px] border-none bg-transparent p-0"}>
        <CreateOrganization />
      </DialogContent>
    </Dialog>
  )
}

export { SidebarButton }
