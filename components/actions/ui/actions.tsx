'use client';

import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';
import { Link2, Pencil, Trash2 } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { api } from '~/convex/_generated/api';
import { useApiMutation } from '~/hooks/use-api-mutation';
import { ConfirmModal } from '~/components/confirm-modal';
import { Button } from '~/components/ui/button';
import { useRenameModal } from '~/store/use-rename-modal';

interface ActionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps['side'];
  sideOffset?: DropdownMenuContentProps['sideOffset'];
  id: string;
  title: string;
}

const Actions = ({ children, side, sideOffset, id, title }: ActionsProps) => {
  const { mutate, pending } = useApiMutation(api.board.remove);
  const { onOpen } = useRenameModal();

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success('Link copied!'))
      .catch(() => toast.error('Failed to copy link!'));
  };

  const handleRemoveBoard = () => {
    mutate({
      id,
    })
      .then(() => toast.success('Board deleted!'))
      .catch(() => toast.error('Failed to delete board'));
  };

  return (
    <div className={'absolute z-50 top-1 right-1'}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent
          side={side}
          sideOffset={sideOffset}
          className={'w-60'}
          onClick={(e) => e.stopPropagation()}
        >
          <DropdownMenuItem className={'p-3 cursor-pointer'} onClick={handleCopyLink}>
            <Link2 className={'h-4 w-4 mr-2'} />
            Copy board link
          </DropdownMenuItem>
          <DropdownMenuItem className={'p-3 cursor-pointer'} onClick={() => onOpen(id, title)}>
            <Pencil className={'h-4 w-4 mr-2'} />
            Rename
          </DropdownMenuItem>
          <ConfirmModal
            header={'Delete board?'}
            description={'This will delete the board and all of its contents.'}
            disabled={pending}
            onConfirm={handleRemoveBoard}
          >
            <Button
              variant={'ghost'}
              className={'p-3 cursor-pointer text-sm w-full justify-start font-normal'}
            >
              <Trash2 className={'h-4 w-4 mr-2'} />
              Remove board
            </Button>
          </ConfirmModal>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export { Actions };
