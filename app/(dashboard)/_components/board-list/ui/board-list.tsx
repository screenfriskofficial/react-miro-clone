"use client";

import { EmptySearch } from "~/app/(dashboard)/_components/empty-search/ui/empty-search";
import { EmptyFavorites } from "~/app/(dashboard)/_components/empty-favorites";
import { EmptyBoards } from "~/app/(dashboard)/_components/empty-boards";

interface BoardListProps {
  query: {
    q?: string;
    favorites?: string;
  };
  orgId: string;
}
const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = [];
  if (!data?.length && query?.q) {
    return <EmptySearch />;
  }

  if (!data?.length && query?.favorites) {
    return <EmptyFavorites />;
  }

  if (!data?.length) {
    return <EmptyBoards />;
  }
};

export { BoardList };
