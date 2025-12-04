import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Brain, Sparkles, Bot, MessageSquare } from 'lucide-react';

const iconMap: Record<string, any> = {
  'ai-knowledge': Brain,
  'ai-sentiment': Sparkles,
  'ai-nlp': Bot,
  'ai-generate': MessageSquare,
};

export default memo(({ data, selected, id }: NodeProps) => {
  const nodeKey = id.split('-').slice(0, 2).join('-');
  const Icon = iconMap[nodeKey] || Brain;
  
  return (
    <div
      className={`px-4 py-3 shadow-lg rounded-2xl bg-card border-2 min-w-[200px] transition-all duration-200 ${
        selected
          ? 'border-purple-500 shadow-purple-500/30 shadow-xl scale-105'
          : 'border-purple-500/30 hover:border-purple-500/60 hover:shadow-lg'
      }`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-purple-500 border-2 border-background"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-purple-500 border-2 border-background"
      />
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-xl bg-purple-500/20 shadow-sm">
          <Icon className="w-5 h-5 text-purple-500" />
        </div>
        <div className="flex-1">
          <div className="font-semibold text-sm text-foreground">{data.label}</div>
          <div className="text-xs text-muted-foreground">{data.description}</div>
        </div>
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
