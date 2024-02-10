import { Loader } from 'lucide-react';

import { Info } from '../../info';
import { Participats } from '../../participants';
import { Toolbar } from '../../toolbar';

const Loading = () => {
  return (
    <main
      className={
        'h-full w-full relative flex items-center justify-center touch-none bg-neutral-100'
      }
    >
      <Loader className={'h-6 w-6 text-muted-foreground animate-spin'} />
      <Info.Skeleton />
      <Participats.Skeleton />
      <Toolbar.Skeleton />
    </main>
  );
};

export { Loading };
