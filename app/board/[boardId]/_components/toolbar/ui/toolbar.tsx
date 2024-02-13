import { Skeleton } from "~/components/ui/skeleton"
import { CanvasMode, CanvasState, LayerType } from "~/types/canvas"
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

interface ToolbarProps {
  canvasState: CanvasState
  setCanvasState: (newState: CanvasState) => void
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean
}

const Toolbar = ({
  canRedo,
  canUndo,
  redo,
  undo,
  setCanvasState,
  canvasState,
}: ToolbarProps) => {
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
          onClick={() => setCanvasState({ mode: CanvasMode.None })}
          isActive={
            canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Translating ||
            canvasState.mode === CanvasMode.Resizing ||
            canvasState.mode === CanvasMode.Pressing ||
            canvasState.mode === CanvasMode.SelectionNet
          }
        />
        <ToolButton
          label={"Text"}
          icon={Type}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Text,
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Text
          }
        />
        <ToolButton
          label={"Sticky note"}
          icon={StickyNote}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Note,
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Note
          }
        />
        <ToolButton
          label={"Rectangle"}
          icon={Square}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Rectangle,
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Rectangle
          }
        />
        <ToolButton
          label={"Ellipse"}
          icon={Circle}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Ellipse,
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Ellipse
          }
        />
        <ToolButton
          label={"Pen"}
          icon={Pencil}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Pencil,
            })
          }
          isActive={canvasState.mode === CanvasMode.Pencil}
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
          onClick={undo}
          isDisabled={!canUndo}
        />
        <ToolButton
          label={"Redo"}
          icon={Redo}
          onClick={redo}
          isDisabled={!canRedo}
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
