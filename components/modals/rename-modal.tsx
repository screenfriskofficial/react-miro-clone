'use clinet';

import { useRenameModal } from '~/store/use-rename-modal';
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogHeader,
} from '../ui/dialog';
import { FormEventHandler, useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useApiMutation } from '~/hooks/use-api-mutation';
import { api } from '~/convex/_generated/api';
import { toast } from 'sonner';

const RenameModal = () => {
  const { isOpen, onClose, initialValues } = useRenameModal();
  const [title, setTitle] = useState(initialValues.title);

  const { mutate, pending } = useApiMutation(api.board.update);

  useEffect(() => {
    setTitle(initialValues.title);
  }, [initialValues.title]);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate({
      id: initialValues.id,
      title,
    })
      .then(() => {
        toast.success('Board renamed');
        onClose();
      })
      .catch(() => toast.error('Failed to rename board'));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit board title</DialogTitle>
        </DialogHeader>
        <DialogDescription>Enter a new title for this board</DialogDescription>
        <form onSubmit={onSubmit} className={'space-y-4'}>
          <Input
            disabled={pending}
            required
            value={title}
            placeholder={'Board title'}
            maxLength={60}
            onChange={(e) => setTitle(e.target.value)}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type={'button'} variant={'outline'}>
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={title.length <= 7 || pending} type={'submit'}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { RenameModal };
