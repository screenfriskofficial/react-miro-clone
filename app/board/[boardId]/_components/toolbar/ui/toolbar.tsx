import { Skeleton } from "~/components/ui/skeleton"

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
        <div>pencil</div>
        <div>square</div>
        <div>circle</div>
        <div>ellipsis</div>
      </div>
      <div
        className={
          "flex flex-col items-center rounded-md bg-white p-1.5 shadow-md"
        }
      >
        <div>Undo</div>
        <div>Redo</div>
      </div>
    </div>
  )
}

Toolbar.Skeleton = function ToolbarSkeleton() {
  return (
    <Skeleton
      className={
        "absolute left-3 top-1/2 flex h-[360px] w-[52px] -translate-y-[50%] flex-col justify-center gap-y-4 rounded-md bg-white shadow-md"
      }
    />
  )
}

export { Toolbar }
