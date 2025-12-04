import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { GitBranch, Filter, BarChart3 } from 'lucide-react';

const iconMap: Record<string, any> = {
  'condition': GitBranch,
  'filter': Filter,
  'loop': BarChart3,
};

export default memo(({ data, selected, id }: NodeProps) => {
  const nodeKey = id.split('-')[0];
  const Icon = iconMap[nodeKey] || GitBranch;
  
  return (
    <div
      className={`px-4 py-3 shadow-lg rounded-2xl bg-card border-2 min-w-[200px] transition-all duration-200 ${
        selected
          ? 'border-orange-500 shadow-orange-500/30 shadow-xl scale-105'
          : 'border-orange-500/30 hover:border-orange-500/60 hover:shadow-lg'
      }`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-orange-500 border-2 border-background"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="true"
        style={{ top: '35%' }}
        className="w-3 h-3 !bg-green-500 border-2 border-background"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="false"
        style={{ top: '65%' }}
        className="w-3 h-3 !bg-red-500 border-2 border-background"
      />
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-xl bg-orange-500/20 shadow-sm">
          <Icon className="w-5 h-5 text-orange-500" />
        </div>
        <div className="flex-1">
          <div className="font-semibold text-sm text-foreground">{data.label}</div>
          <div className="text-xs text-muted-foreground">{data.description}</div>
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-2">
        <span className="text-[10px] text-green-500 font-medium">True</span>
        <span className="text-[10px] text-red-500 font-medium">False</span>
      </div>
      {data.editingUser && (
        <div
          className="absolute -top-2 -right-2 w-7 h-7 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-bold text-white shadow-lg"
          style={{ backgroundColor: data.editingUser.color }}
        >
          {data.editingUser.initials}
        </div>
      )}
    </div>
  );
});
