import { cn } from '~/lib/utils';
import { Star } from 'lucide-react';
import { MouseEvent } from 'react';

interface BoardFooterProps {
  authorLabel: string;
  createdAtLabel: string;
  disabled: boolean;
  isFavorite: boolean;
  title: string;
  onClick: () => void;
}

const BoardFooter = ({
  authorLabel,
  createdAtLabel,
  disabled,
  title,
  isFavorite,
  onClick,
}: BoardFooterProps) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    onClick();
  };

  return (
    <footer className={'relative bg-white p-3'}>
      <p className={'text-[13px] truncate max-w-[calc(100%-20px)]'}>{title}</p>
      <p
        className={
          'opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate'
        }
      >
        {authorLabel},&nbsp;{createdAtLabel}
      </p>
      <button
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          'opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground hover:text-blue-600',
          disabled && 'cursor-not-allowed opacity-75',
        )}
      >
        <Star className={cn('h-4 w-4', isFavorite && 'fill-blue-600 text-blue-600')} />
      </button>
    </footer>
  );
};

export { BoardFooter };
