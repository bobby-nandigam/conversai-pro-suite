import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Database } from 'lucide-react';

export default memo(({ data, selected }: NodeProps) => {
  return (
    <div
      className={`px-4 py-3 shadow-lg rounded-2xl bg-card border-2 min-w-[200px] transition-all duration-200 ${
        selected
          ? 'border-blue-500 shadow-blue-500/50 shadow-xl'
          : 'border-blue-500/30 hover:border-blue-500/60'
      }`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-blue-500 border-2 border-background"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-blue-500 border-2 border-background"
      />
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded-lg bg-blue-500/20">
          <Database className="w-4 h-4 text-blue-500" />
        </div>
        <div className="font-semibold text-sm text-foreground">{data.label}</div>
      </div>
      <div className="text-xs text-muted-foreground">{data.description}</div>
      {data.editingUser && (
        <div
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-bold text-white"
          style={{ backgroundColor: data.editingUser.color }}
        >
          {data.editingUser.initials}
        </div>
      )}
    </div>
  );
});
