"use client"

import { useState } from "react"
import { useCanRedo, useCanUndo, useHistory } from "~/liveblocks.config"
import { CanvasMode, CanvasState } from "~/types/canvas"

import { Info } from "../../info"
import { Participats } from "../../participants"
import { Toolbar } from "../../toolbar"

interface CanvasProps {
  boardId: string
}

const Canvas = ({ boardId }: CanvasProps) => {
  const [canvas, setCanvas] = useState<CanvasState>({ mode: CanvasMode.None })

  const history = useHistory()
  const canUndo = useCanUndo()
  const canRedo = useCanRedo()

  return (
    <main className={"relative h-full w-full touch-none bg-neutral-100"}>
      <Info boardId={boardId} />
      <Participats />
      <Toolbar
        canvasState={canvas}
        setCanvasState={setCanvas}
        canUndo={canUndo}
        canRedo={canRedo}
        undo={history.undo}
        redo={history.redo}
      />
    </main>
  )
}

export { Canvas }
