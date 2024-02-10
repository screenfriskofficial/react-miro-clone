import { favorite } from './board';
import { v } from 'convex/values';

import { query } from './_generated/server';

export const get = query({
  args: {
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthorized');
    }

    const boards = await ctx.db
      .query('boards')
      .withIndex('by_org', (q) => q.eq('orgId', args.orgId))
      .order('desc')
      .collect();

    const boardsWithFavorites = boards.map((board) =>
      ctx.db
        .query('userFavorites')
        .withIndex('by_user_board', (q) =>
          q.eq('userId', identity.subject).eq('boardId', board._id),
        )
        .unique()
        .then((favorite) => ({
          ...board,
          favorite: !!favorite,
        })),
    );
    const boardsWithFavoritesBoolean = Promise.all(boardsWithFavorites);
    return boardsWithFavoritesBoolean;
  },
});
