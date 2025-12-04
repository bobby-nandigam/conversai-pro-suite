import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Mail, Phone, Globe, FileText } from 'lucide-react';

const iconMap: Record<string, any> = {
  'action-email': Mail,
  'action-sms': Phone,
  'action-web': Globe,
  'action-output': FileText,
};

export default memo(({ data, selected, id }: NodeProps) => {
  const nodeKey = id.split('-').slice(0, 2).join('-');
  const Icon = iconMap[nodeKey] || FileText;
  
  return (
    <div
      className={`px-4 py-3 shadow-lg rounded-2xl bg-card border-2 min-w-[200px] transition-all duration-200 ${
        selected
          ? 'border-emerald-500 shadow-emerald-500/30 shadow-xl scale-105'
          : 'border-emerald-500/30 hover:border-emerald-500/60 hover:shadow-lg'
      }`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-emerald-500 border-2 border-background"
      />
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-xl bg-emerald-500/20 shadow-sm">
          <Icon className="w-5 h-5 text-emerald-500" />
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
