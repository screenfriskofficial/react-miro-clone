"use client"

import React, { useCallback, useMemo, useState } from "react"
import { LiveObject } from "@liveblocks/client"
import {
  connectionIdToColor,
  pointerEventToCanvasPoint,
  resizingBounds,
} from "~/lib/utils"
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
  useOthersMapped,
  useStorage,
} from "~/liveblocks.config"
import {
  Camera,
  CanvasMode,
  CanvasState,
  Color,
  LayerType,
  Point,
  Side,
  XYWH,
} from "~/types/canvas"
import { nanoid } from "nanoid"

import { CursorsPresence } from "../../cursors-presence"
import { Info } from "../../info"
import { LayerPreview } from "../../layer-preview"
import { Participats } from "../../participants"
import { SelectionBox } from "../../selection-box"
import { SelectionTools } from "../../selection-tools"
import { Toolbar } from "../../toolbar"

const MAX_LAYERS = 100

interface CanvasProps {
  boardId: string
}

const Canvas = ({ boardId }: CanvasProps) => {
  const layerIds = useStorage((root) => root.layerIds)

  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 })
  const [canvas, setCanvas] = useState<CanvasState>({ mode: CanvasMode.None })
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0,
  })

  const history = useHistory()
  const canUndo = useCanUndo()
  const canRedo = useCanRedo()

  const insertLayout = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Text
        | LayerType.Note,
      position: Point
    ) => {
      const liveLayers = storage.get("layers")

      if (liveLayers.size >= MAX_LAYERS) {
        return
      }

      const liveLayerIds = storage.get("layerIds")
      const layerId = nanoid()
      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: lastUsedColor,
      })

      liveLayerIds.push(layerId)
      liveLayers.set(layerId, layer)

      setMyPresence({ selection: [layerId] }, { addToHistory: true })
      setCanvas({ mode: CanvasMode.None })
    },
    [lastUsedColor]
  )

  const translateSelectedLayers = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvas.mode !== CanvasMode.Translating) {
        return
      }

      const offset = {
        x: point.x - canvas.current.x,
        y: point.y - canvas.current.y,
      }

      const liveLayers = storage.get("layers")

      for (const id of self.presence.selection) {
        const layer = liveLayers.get(id)

        if (layer) {
          layer.update({
            x: layer.get("x") + offset.x,
            y: layer.get("y") + offset.y,
          })
        }
      }
      setCanvas({ mode: CanvasMode.Translating, current: point })
    },
    [canvas]
  )

  const unselectLayers = useMutation(({ self, setMyPresence }) => {
    if (self.presence.selection.length > 0) {
      setMyPresence({ selection: [] }, { addToHistory: true })
    }
  }, [])

  const resizeSelectedLayer = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvas.mode !== CanvasMode.Resizing) {
        return
      }

      const bounds = resizingBounds(canvas.initialBounds, canvas.corner, point)
      const layers = storage.get("layers")
      const layer = layers.get(self.presence.selection[0])

      if (layer) {
        layer.update(bounds)
      }
    },

    [canvas]
  )

  const onResizeHandlePointerDown = useCallback(
    (corner: Side, initialBounds: XYWH) => {
      history.pause()
      setCanvas({
        mode: CanvasMode.Resizing,
        initialBounds,
        corner,
      })
    },
    [history]
  )

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

      if (canvas.mode === CanvasMode.Translating) {
        translateSelectedLayers(current)
      } else if (canvas.mode === CanvasMode.Resizing) {
        resizeSelectedLayer(current)
      }

      setMyPresence({ cursor: current })
    },
    [canvas, camera, resizeSelectedLayer, translateSelectedLayers]
  )

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null })
  }, [])

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      const point = pointerEventToCanvasPoint(e, camera)

      if (canvas.mode === CanvasMode.Inserting) {
        return
      }

      setCanvas({ origin: point, mode: CanvasMode.Pressing })
    },
    [camera, canvas.mode, setCanvas]
  )

  const onPointerUp = useMutation(
    ({}, e) => {
      const point = pointerEventToCanvasPoint(e, camera)

      if (
        canvas.mode === CanvasMode.None ||
        canvas.mode === CanvasMode.Pressing
      ) {
        unselectLayers()
        setCanvas({ mode: CanvasMode.None })
      } else if (canvas.mode === CanvasMode.Inserting) {
        insertLayout(canvas.layerType, point)
      } else {
        setCanvas({
          mode: CanvasMode.None,
        })
      }
      history.resume()
    },
    [camera, canvas, insertLayout, history, unselectLayers]
  )

  const selections = useOthersMapped((other) => other.presence.selection)

  const onLayerPointerDown = useMutation(
    ({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
      if (
        canvas.mode === CanvasMode.Pencil ||
        canvas.mode === CanvasMode.Inserting
      ) {
        return
      }

      history.pause()
      e.stopPropagation()

      const point = pointerEventToCanvasPoint(e, camera)

      if (!self.presence.selection.includes(layerId)) {
        setMyPresence({ selection: [layerId] }, { addToHistory: true })
      }
      setCanvas({ mode: CanvasMode.Translating, current: point })
    },
    [canvas.mode, history, setCanvas, camera]
  )

  const layerIdsToColorSelection = useMemo(() => {
    const layerIdsToColorSelection: Record<string, string> = {}

    for (const user of selections) {
      const [connectionId, selection] = user

      for (const layerId of selection) {
        layerIdsToColorSelection[layerId] = connectionIdToColor(connectionId)
      }
    }
    return layerIdsToColorSelection
  }, [selections])

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
      <SelectionTools camera={camera} setLastUsedColor={setLastUsedColor} />
      <svg
        className={"h-screen w-screen"}
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px)`,
          }}
        >
          {layerIds.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={onLayerPointerDown}
              selectionColor={layerIdsToColorSelection[layerId]}
            />
          ))}
          <CursorsPresence />
          <SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown} />
        </g>
      </svg>
    </main>
  )
}

export { Canvas }
