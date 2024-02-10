"use client"

import { api } from "~/convex/_generated/api"
import { useQuery } from "convex/react"

import { BoardCard } from "../../board-card/ui/board-card"
import { EmptyBoards } from "../../empty-boards"
import { EmptyFavorites } from "../../empty-favorites"
import { EmptySearch } from "../../empty-search"
import { NewBoardButton } from "../../new-board-button"

interface BoardListProps {
  query: {
    q?: string
    favorites?: string
  }
  orgId: string
}
const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = useQuery(api.boards.get, { orgId, ...query })

  if (data === undefined) {
    return (
      <div>
        <h2 className={"text-3xl"}>
          {query.favorites ? "Favorites boards" : "Team boards"}
        </h2>
        <div
          className={
            "mt-8 grid grid-cols-1 gap-5 pb-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
          }
        >
          <NewBoardButton orgId={orgId} disabled />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    )
  }

  if (!data?.length && query.q) return <EmptySearch />

  if (!data?.length && query.favorites) return <EmptyFavorites />

  if (!data?.length) return <EmptyBoards />

  return (
    <div>
      <h2 className={"text-3xl"}>
        {query.favorites ? "Favorites boards" : "Team boards"}
      </h2>
      <div
        className={
          "mt-8 grid grid-cols-1 gap-5 pb-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
        }
      >
        <NewBoardButton orgId={orgId} />
        {data.map((board) => (
          <BoardCard
            key={board._id}
            id={board._id}
            title={board.title}
            authorId={board.authorId}
            authorName={board.authorName}
            imageUrl={board.imageUrl}
            createdAt={board._creationTime}
            orgId={board.orgId}
            isFavorite={board.isFavorite}
          />
        ))}
      </div>
    </div>
  )
}

export { BoardList }
