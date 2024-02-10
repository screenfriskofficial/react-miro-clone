"use client"

import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs"
import { Actions } from "~/components/actions"
import { Skeleton } from "~/components/ui/skeleton"
import { api } from "~/convex/_generated/api"
import { useApiMutation } from "~/hooks/use-api-mutation"
import { formatDistanceToNow } from "date-fns"
import { MoreHorizontal } from "lucide-react"
import { toast } from "sonner"

import { BoardFooter } from "./components/board-footer"
import { BoardOverlay } from "./components/board-overlay"

interface BoardCardProps {
  id: string
  title: string
  imageUrl: string
  authorId: string
  authorName: string
  createdAt: number
  orgId: string
  isFavorite: boolean
}

const BoardCard = ({
  id,
  title,
  imageUrl,
  authorId,
  authorName,
  createdAt,
  orgId,
  isFavorite,
}: BoardCardProps) => {
  const { userId } = useAuth()
  const { mutate: onFavorite, pending: onPendingFavorite } = useApiMutation(
    api.board.favorite
  )
  const { mutate: onUnfavorite, pending: onPendingUnfavorite } = useApiMutation(
    api.board.unfavortie
  )

  const authorLabel = userId === authorId ? "You" : authorName
  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  })

  const handleClickFavorite = () => {
    if (isFavorite) {
      onUnfavorite({ id }).catch(() => {
        toast.error("Failed to unfavorite")
      })
    } else {
      onFavorite({ id, orgId }).catch(() => {
        toast.error("Failed to favorite")
      })
    }
  }

  return (
    <Link href={`/board/${id}`}>
      <div
        className={
          "group flex aspect-[100/127] flex-col justify-between overflow-hidden rounded-lg border"
        }
      >
        <div className={"relative flex-1 bg-amber-50"}>
          <Image src={imageUrl} alt={title} fill className={"object-fill"} />
          <BoardOverlay />

          <Actions id={id} title={title} side={"right"}>
            <button
              className={
                "absolute right-1 top-1 px-3 py-2 opacity-0 outline-none transition-opacity group-hover:opacity-100"
              }
            >
              <MoreHorizontal
                className={
                  "text-white opacity-75 transition-opacity hover:opacity-100"
                }
              />
            </button>
          </Actions>
        </div>
        <BoardFooter
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          title={title}
          isFavorite={isFavorite}
          disabled={onPendingFavorite || onPendingUnfavorite}
          onClick={handleClickFavorite}
        />
      </div>
    </Link>
  )
}

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className={"aspect-[100/127] overflow-hidden rounded-lg"}>
      <Skeleton className={"h-full w-full"} />
    </div>
  )
}

export { BoardCard }
