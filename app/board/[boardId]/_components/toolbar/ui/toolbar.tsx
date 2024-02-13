import { Skeleton } from "~/components/ui/skeleton"
import {
  Circle,
  MousePointer2,
  Pencil,
  Redo,
  Square,
  StickyNote,
  Type,
  Undo,
} from "lucide-react"

import { ToolButton } from "../../tool-button"

const Toolbar = () => {
  return (
    <div
      className={
        "absolute left-3 top-1/2 flex -translate-y-[50%] flex-col justify-center gap-y-4"
      }
    >
      <div
        className={
          "flex flex-col items-center gap-y-1 rounded-md bg-white p-1.5 shadow-md"
        }
      >
        <ToolButton
          label={"Select"}
          icon={MousePointer2}
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          label={"Text"}
          icon={Type}
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          label={"Sticky note"}
          icon={StickyNote}
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          label={"Rectangle"}
          icon={Square}
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          label={"Ellipse"}
          icon={Circle}
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          label={"Pen"}
          icon={Pencil}
          onClick={() => {}}
          isActive={false}
        />
      </div>
      <div
        className={
          "flex flex-col items-center rounded-md bg-white p-1.5 shadow-md"
        }
      >
        <ToolButton
          label={"Undo"}
          icon={Undo}
          onClick={() => {}}
          isDisabled={false}
        />
        <ToolButton
          label={"Redo"}
          icon={Redo}
          onClick={() => {}}
          isDisabled={false}
        />
      </div>
    </div>
  )
}

export const ToolbarSkeleton = () => {
  return (
    <Skeleton
      className={
        "absolute left-3 top-1/2 flex h-[360px] w-[52px] -translate-y-[50%] flex-col justify-center gap-y-4 rounded-md bg-white shadow-md"
      }
    />
  )
}

export { Toolbar }
