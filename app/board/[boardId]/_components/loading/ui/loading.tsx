import { Loader } from "lucide-react"

import { Info } from "../../info"
import { Participats } from "../../participants"
import { Toolbar } from "../../toolbar"

const Loading = () => {
  return (
    <main
      className={
        "relative flex h-full w-full touch-none items-center justify-center bg-neutral-100"
      }
    >
      <Loader className={"h-6 w-6 animate-spin text-muted-foreground"} />
      <Info.Skeleton />
      <Participats.Skeleton />
      <Toolbar.Skeleton />
    </main>
  )
}

export { Loading }
