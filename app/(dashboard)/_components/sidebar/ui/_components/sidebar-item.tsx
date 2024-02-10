"use client"

import Image from "next/image"
import { useOrganization, useOrganizationList } from "@clerk/nextjs"
import { Hint } from "~/app/(dashboard)/_components/hint/ui/hint"
import { cn } from "~/lib/utils"

interface SidebarItemProps {
  id: string
  name: string
  imageUrl: string
}

const SidebarItem = ({ id, name, imageUrl }: SidebarItemProps) => {
  const { organization } = useOrganization()
  const { setActive } = useOrganizationList()

  const isActive = organization?.id === id

  const handleClick = () => {
    if (!setActive) return null
    setActive?.({ organization: id })
  }
  return (
    <div className={"relative aspect-square "}>
      <Hint label={name} side={"right"} sideOffset={10} align={"center"}>
        <Image
          fill
          src={imageUrl}
          alt={name}
          onClick={handleClick}
          className={cn(
            "cursor-pointer rounded-md opacity-75 transition-opacity duration-300 hover:opacity-100",
            isActive && "opacity-100"
          )}
        />
      </Hint>
    </div>
  )
}

export { SidebarItem }
