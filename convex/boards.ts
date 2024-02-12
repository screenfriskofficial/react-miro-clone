import { getAllOrThrow } from "convex-helpers/server/relationships"
import { v } from "convex/values"

import { query } from "./_generated/server"

export const get = query({
  args: {
    orgId: v.string(),
    q: v.optional(v.string()),
    favorites: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error("Unauthorized")
    }

    if (args.favorites) {
      const favoirtedBoards = await ctx.db
        .query("userFavorites")
        .withIndex("by_user_org", (q) => q.eq("userId", identity.subject).eq("orgId", args.orgId))
        .order("desc")
        .collect()

      const ids = favoirtedBoards.map((b) => b.boardId)

      const boards = await getAllOrThrow(ctx.db, ids)

      return boards.map((board) => ({
        ...board,
        isFavorite: true,
      }))
    }

    const title = args.q as string

    let boards = []

    if (title) {
      boards = await ctx.db
        .query("boards")
        .withSearchIndex("search_title", (q) => q.search("title", title).eq("orgId", args.orgId))
        .collect()
    } else {
      boards = await ctx.db
        .query("boards")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
        .order("desc")
        .collect()
    }

    const boardsWithFavorites = boards.map((board) =>
      ctx.db
        .query("userFavorites")
        .withIndex("by_user_board", (q) =>
          q.eq("userId", identity.subject).eq("boardId", board._id)
        )
        .unique()
        .then((favorite) => ({
          ...board,
          isFavorite: !!favorite,
        }))
    )
    const boardsWithFavoritesBoolean = Promise.all(boardsWithFavorites)
    return boardsWithFavoritesBoolean
  },
})
