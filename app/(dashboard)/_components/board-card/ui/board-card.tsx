'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BoardOverlay } from './components/board-overlay';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '@clerk/nextjs';
import { BoardFooter } from './components/board-footer';
import { Skeleton } from '~/components/ui/skeleton';
import { MoreHorizontal } from 'lucide-react';
import { Actions } from '~/components/actions';

interface BoardCardProps {
  id: string;
  title: string;
  imageUrl: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  orgId: string;
  isFavorite: boolean;
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
  const { userId } = useAuth();

  const authorLabel = userId === authorId ? 'You' : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });

  const handleClickFavorite = () => {};

  return (
    <Link href={`/board/${id}`}>
      <div
        className={
          'group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden'
        }
      >
        <div className={'relative flex-1 bg-amber-50'}>
          <Image src={imageUrl} alt={title} fill className={'object-fill'} />
          <BoardOverlay />

          <Actions id={id} title={title} side={'right'}>
            <button
              className={
                'absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none'
              }
            >
              <MoreHorizontal
                className={'text-white opacity-75 hover:opacity-100 transition-opacity'}
              />
            </button>
          </Actions>
        </div>
        <BoardFooter
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          title={title}
          isFavorite={isFavorite}
          disabled={false}
          onClick={() => {}}
        />
      </div>
    </Link>
  );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className={'aspect-[100/127] rounded-lg overflow-hidden'}>
      <Skeleton className={'h-full w-full'} />
    </div>
  );
};

export { BoardCard };
