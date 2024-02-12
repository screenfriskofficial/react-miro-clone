import { Loader } from "lucide-react"

import { InfoSkeleton } from "../../info/ui/info"
import { ParticipatsSkeleton } from "../../participants/ui/participants"
import { ToolbarSkeleton } from "../../toolbar/ui/toolbar"

const Loading = () => {
  return (
    <main
      className={
        "relative flex h-full w-full touch-none items-center justify-center bg-neutral-100"
      }
    >
      <Loader className={"h-6 w-6 animate-spin text-muted-foreground"} />
      <InfoSkeleton />
      <ParticipatsSkeleton />
      <ToolbarSkeleton />
    </main>
  )
}

export { Loading }
