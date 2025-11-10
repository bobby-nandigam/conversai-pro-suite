import { memo } from 'react';
import { Badge } from '@/components/ui/badge';

interface Cursor {
  id: string;
  name: string;
  color: string;
  x: number;
  y: number;
}

interface Props {
  cursors: Cursor[];
}

export default memo(({ cursors }: Props) => {
  return (
    <>
      {cursors.map((cursor) => (
        <div
          key={cursor.id}
          className="absolute pointer-events-none transition-all duration-100 ease-out"
          style={{
            left: cursor.x,
            top: cursor.y,
            transform: 'translate(-2px, -2px)',
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={cursor.color}
            className="drop-shadow-lg"
          >
            <path d="M5.65376 12.3673L0 0L11.2877 5.65376L9.54351 9.54351L5.65376 12.3673Z" />
          </svg>
          <Badge
            className="ml-6 -mt-5 text-xs shadow-lg"
            style={{ backgroundColor: cursor.color, color: 'white' }}
          >
            {cursor.name}
          </Badge>
        </div>
      ))}
    </>
  );
});
