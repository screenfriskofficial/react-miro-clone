import { Skeleton } from "~/components/ui/skeleton"

const Participats = () => {
  return (
    <div
      className={
        "absolute right-2 top-2 flex h-12 items-center rounded-md bg-white p-3 shadow-md"
      }
    >
      List of users
    </div>
  )
}

export const ParticipatsSkeleton = () => {
  return (
    <Skeleton
      className={
        "absolute right-2 top-2 flex h-12 w-[200px] animate-pulse items-center rounded-md bg-white p-3 shadow-md"
      }
    />
  )
}

export { Participats }
