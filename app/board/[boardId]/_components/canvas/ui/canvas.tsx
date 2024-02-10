import { Info } from '../../info';
import { Participats } from '../../participants';
import { Toolbar } from '../../toolbar';

interface CanvasProps {
  boardId: string;
}

const Canvas = ({ boardId }: CanvasProps) => {
  return (
    <main className={'h-full w-full relative bg-neutral-100 touch-none'}>
      <Info />
      <Participats />
      <Toolbar />
    </main>
  );
};

export { Canvas };
