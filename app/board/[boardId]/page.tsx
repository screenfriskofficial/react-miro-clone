import { Canvas } from './_components/canvas';

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

const BoardIdPage = ({ params }: BoardIdPageProps) => {
  return (
    <div className={'h-full w-full'}>
      <Canvas boardId={params.boardId} />
    </div>
  );
};

export default BoardIdPage;
