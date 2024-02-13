"use client"

import React, { useCallback, useState } from "react"
import { pointerEventToCanvasPoint } from "~/lib/utils"
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
} from "~/liveblocks.config"
import { Camera, CanvasMode, CanvasState } from "~/types/canvas"

import { CursorsPresence } from "../../cursors-presence"
import { Info } from "../../info"
import { Participats } from "../../participants"
import { Toolbar } from "../../toolbar"

interface CanvasProps {
  boardId: string
}

const Canvas = ({ boardId }: CanvasProps) => {
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 })
  const [canvas, setCanvas] = useState<CanvasState>({ mode: CanvasMode.None })

  const history = useHistory()
  const canUndo = useCanUndo()
  const canRedo = useCanRedo()

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }))
  }, [])

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault()

      const current = pointerEventToCanvasPoint(e, camera)

      setMyPresence({ cursor: current })
    },
    []
  )

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null })
  }, [])

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
      <svg
        className={"h-screen w-screen"}
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <g>
          <CursorsPresence />
        </g>
      </svg>
    </main>
  )
}

export { Canvas }
