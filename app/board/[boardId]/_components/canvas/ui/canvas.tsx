"use client"

import { Info } from "../../info"
import { Participats } from "../../participants"
import { Toolbar } from "../../toolbar"

interface CanvasProps {
  boardId: string
}

const Canvas = ({ boardId }: CanvasProps) => {
  return (
    <main className={"relative h-full w-full touch-none bg-neutral-100"}>
      <Info boardId={boardId} />
      <Participats />
      <Toolbar />
    </main>
  )
}

export { Canvas }
