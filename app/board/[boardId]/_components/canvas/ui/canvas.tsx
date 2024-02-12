"use client"

import { useSelf } from "~/liveblocks.config"

import { Info } from "../../info"
import { Participats } from "../../participants"
import { Toolbar } from "../../toolbar"

interface CanvasProps {
  boardId: string
}

const Canvas = ({ boardId }: CanvasProps) => {
  const info = useSelf((me) => me.info)
  return (
    <main className={"relative h-full w-full touch-none bg-neutral-100"}>
      <Info />
      <Participats />
      <Toolbar />
    </main>
  )
}

export { Canvas }
