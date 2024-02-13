"use client"

import React from "react"
import { useAuth } from "@clerk/nextjs"
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu"
import { ConfirmModal } from "~/components/confirm-modal"
import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { api } from "~/convex/_generated/api"
import { useApiMutation } from "~/hooks/use-api-mutation"
import { useRenameModal } from "~/store/use-rename-modal"
import { Link2, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"

interface ActionsProps {
  children: React.ReactNode
  side?: DropdownMenuContentProps["side"]
  sideOffset?: DropdownMenuContentProps["sideOffset"]
  id: string
  title: string
}

const Actions = ({ children, side, sideOffset, id, title }: ActionsProps) => {
  const { mutate, pending } = useApiMutation(api.board.remove)
  const { orgRole } = useAuth()
  const { onOpen } = useRenameModal()

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success("Link copied!"))
      .catch(() => toast.error("Failed to copy link!"))
  }

  const handleRemoveBoard = () => {
    mutate({
      id,
    })
      .then(() => toast.success("Board deleted!"))
      .catch(() => toast.error("Failed to delete board"))
  }

  if (orgRole === "org:admin")
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent
          side={side}
          sideOffset={sideOffset}
          className={"w-60"}
          onClick={(e) => e.stopPropagation()}
        >
          <DropdownMenuItem
            className={"cursor-pointer p-3"}
            onClick={handleCopyLink}
          >
            <Link2 className={"mr-2 h-4 w-4"} />
            Copy board link
          </DropdownMenuItem>
          <DropdownMenuItem
            className={"cursor-pointer p-3"}
            onClick={() => onOpen(id, title)}
          >
            <Pencil className={"mr-2 h-4 w-4"} />
            Rename
          </DropdownMenuItem>
          <ConfirmModal
            header={"Delete board?"}
            description={"This will delete the board and all of its contents."}
            disabled={pending}
            onConfirm={handleRemoveBoard}
          >
            <Button
              variant={"ghost"}
              className={
                "w-full cursor-pointer justify-start p-3 text-sm font-normal"
              }
            >
              <Trash2 className={"mr-2 h-4 w-4"} />
              Remove board
            </Button>
          </ConfirmModal>
        </DropdownMenuContent>
      </DropdownMenu>
    )
}

export { Actions }
