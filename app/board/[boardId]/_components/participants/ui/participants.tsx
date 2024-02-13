"use client"

import { Skeleton } from "~/components/ui/skeleton"
import { connectionIdToColor } from "~/lib/utils"
import { useOthers, useSelf } from "~/liveblocks.config"

import { UserAvatar } from "../../user-avatar"

const MAX_SHOWN_USERS = 2

const Participats = () => {
  const others = useOthers()
  const self = useSelf()

  const hasMoreUsers = others.length > MAX_SHOWN_USERS

  return (
    <div
      className={
        "absolute right-2 top-2 flex h-12 items-center rounded-md bg-white p-3 shadow-md"
      }
    >
      <div className={"flex gap-x-2"}>
        {others.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => {
          return (
            <UserAvatar
              borderColor={connectionIdToColor(connectionId)}
              key={connectionId}
              src={info?.picture}
              name={info?.name}
              fallback={info?.name?.[0] || "A"}
            />
          )
        })}
        {self && (
          <UserAvatar
            borderColor={connectionIdToColor(self.connectionId)}
            src={self.info?.picture}
            name={`${self.info?.name} (You)`}
            fallback={self.info?.name?.[0] || "A"}
          />
        )}
        {hasMoreUsers && (
          <UserAvatar
            name={`${others.length - MAX_SHOWN_USERS} more`}
            fallback={`+${others.length - MAX_SHOWN_USERS}`}
          />
        )}
      </div>
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
