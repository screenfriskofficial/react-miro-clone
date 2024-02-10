import { Skeleton } from '~/components/ui/skeleton';

const Toolbar = () => {
  return (
    <div
      className={'absolute top-1/2 -translate-y-[50%] left-3 flex flex-col justify-center gap-y-4'}
    >
      <div className={'bg-white shadow-md rounded-md p-1.5 flex gap-y-1 flex-col items-center'}>
        <div>pencil</div>
        <div>square</div>
        <div>circle</div>
        <div>ellipsis</div>
      </div>
      <div className={'bg-white shadow-md rounded-md p-1.5 flex flex-col items-center'}>
        <div>Undo</div>
        <div>Redo</div>
      </div>
    </div>
  );
};

Toolbar.Skeleton = function ToolbarSkeleton() {
  return (
    <Skeleton
      className={
        'absolute top-1/2 -translate-y-[50%] rounded-md bg-white left-3 flex flex-col justify-center gap-y-4 h-[360px] w-[52px] shadow-md'
      }
    />
  );
};

export { Toolbar };
