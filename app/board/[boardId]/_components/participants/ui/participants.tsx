import { Skeleton } from '~/components/ui/skeleton';

const Participats = () => {
  return (
    <div
      className={'absolute h-12 top-2 right-2 bg-white rounded-md shadow-md flex items-center p-3'}
    >
      List of users
    </div>
  );
};

Participats.Skeleton = function ParticipatsSkeleton() {
  return (
    <Skeleton
      className={
        'absolute h-12 top-2 right-2 bg-white rounded-md shadow-md flex items-center p-3 w-[200px] animate-pulse'
      }
    />
  );
};

export { Participats };
