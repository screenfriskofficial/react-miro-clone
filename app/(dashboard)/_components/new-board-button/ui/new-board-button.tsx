'use client';

import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '~/convex/_generated/api';
import { useApiMutation } from '~/hooks/use-api-mutation';
import { cn } from '~/lib/utils';

interface NewBoardButtonProps {
  orgId: string;
  disabled?: boolean;
}

const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
  const { mutate, pending } = useApiMutation(api.board.create);

  const handleCreateBoard = () => {
    mutate({ orgId, title: 'Untitled' })
      .then((_) => {
        toast.success('Board created');
      })
      .catch((_) => {
        toast.error('Failed to create board');
      });
  };

  return (
    <button
      disabled={pending || disabled}
      onClick={handleCreateBoard}
      className={cn(
        'col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6',
        (disabled || pending) && 'opacity-75 hover:bg-blue-600 cursor-not-allowed',
      )}
    >
      <div />
      <Plus className={'w-12 h-12 text-white stroke-1'} />
      <p className="text-sm text-white font-light">New board</p>
    </button>
  );
};

export { NewBoardButton };
