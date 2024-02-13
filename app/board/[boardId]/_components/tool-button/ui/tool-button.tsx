"use client"

import { Hint } from "~/app/(dashboard)/_components/hint"
import { Button } from "~/components/ui/button"
import { LucideIcon } from "lucide-react"

interface ToolButtonProps {
  label: string
  icon: LucideIcon
  onClick: () => void
  isActive?: boolean
  isDisabled?: boolean
}

const ToolButton = ({
  label,
  icon: Icon,
  onClick,
  isActive,
  isDisabled,
}: ToolButtonProps) => {
  return (
    <Hint label={label} side={"right"} sideOffset={14}>
      <Button
        disabled={isDisabled}
        onClick={onClick}
        size={"icon"}
        variant={isActive ? "boardActive" : "board"}
      >
        <Icon className={"text-black"} />
      </Button>
    </Hint>
  )
}

export { ToolButton }
