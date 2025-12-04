import { memo } from 'react';
import { Node } from 'reactflow';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Settings2,
  Trash2,
  Copy,
  ChevronDown,
  ChevronRight,
  Zap,
  Database,
  Brain,
  GitBranch,
  Lock,
  Unlock
} from 'lucide-react';
import { useState } from 'react';

interface Props {
  selectedNode: Node | null;
  onUpdateNode: (nodeId: string, data: any) => void;
  onDeleteNode: (nodeId: string) => void;
  onDuplicateNode: (nodeId: string) => void;
}

export default memo(({ selectedNode, onUpdateNode, onDeleteNode, onDuplicateNode }: Props) => {
  const [expandedSections, setExpandedSections] = useState({
    general: true,
    inputs: true,
    outputs: false,
    advanced: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'trigger': return Zap;
      case 'data': return Database;
      case 'knowledge': return Brain;
      case 'condition': return GitBranch;
      default: return Settings2;
    }
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'trigger': return '#eab308';
      case 'data': return '#3b82f6';
      case 'knowledge': return '#a855f7';
      case 'condition': return '#f97316';
      default: return '#6b7280';
    }
  };

  if (!selectedNode) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Properties</h3>
          <p className="text-xs text-muted-foreground mt-1">Select a node to edit</p>
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto">
              <Settings2 className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              Click on a node to view and edit its properties
            </p>
          </div>
        </div>
      </div>
    );
  }

  const NodeIcon = getNodeIcon(selectedNode.type || 'trigger');
  const nodeColor = getNodeColor(selectedNode.type || 'trigger');

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
            style={{ backgroundColor: nodeColor }}
          >
            <NodeIcon className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-foreground truncate">
              {selectedNode.data.label}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <Badge variant="secondary" className="text-xs capitalize">
                {selectedNode.type}
              </Badge>
              <span className="text-xs text-muted-foreground font-mono">
                #{selectedNode.id.slice(-6)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 h-8"
            onClick={() => onDuplicateNode(selectedNode.id)}
          >
            <Copy className="w-3.5 h-3.5 mr-1.5" />
            Duplicate
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="h-8"
            onClick={() => onDeleteNode(selectedNode.id)}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* General Info */}
          <Collapsible open={expandedSections.general} onOpenChange={() => toggleSection('general')}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:bg-muted/50 rounded-lg px-2 -mx-2">
              <span className="text-sm font-medium text-foreground">General Info</span>
              {expandedSections.general ? (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 pt-2">
              <div>
                <Label className="text-xs text-muted-foreground">Label</Label>
                <Input
                  value={selectedNode.data.label || ''}
                  onChange={(e) =>
                    onUpdateNode(selectedNode.id, { ...selectedNode.data, label: e.target.value })
                  }
                  className="mt-1.5 h-9"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Description</Label>
                <Textarea
                  value={selectedNode.data.description || ''}
                  onChange={(e) =>
                    onUpdateNode(selectedNode.id, { ...selectedNode.data, description: e.target.value })
                  }
                  className="mt-1.5 min-h-[80px] resize-none"
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Separator />

          {/* Input Parameters */}
          <Collapsible open={expandedSections.inputs} onOpenChange={() => toggleSection('inputs')}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:bg-muted/50 rounded-lg px-2 -mx-2">
              <span className="text-sm font-medium text-foreground">Input Parameters</span>
              {expandedSections.inputs ? (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 pt-2">
              {selectedNode.type === 'data' && (
                <>
                  <div>
                    <Label className="text-xs text-muted-foreground">Data Source</Label>
                    <Select defaultValue="database">
                      <SelectTrigger className="mt-1.5 h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="database">Database</SelectItem>
                        <SelectItem value="api">External API</SelectItem>
                        <SelectItem value="file">File Upload</SelectItem>
                        <SelectItem value="webhook">Webhook</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Query</Label>
                    <Textarea
                      placeholder="SELECT * FROM users WHERE..."
                      className="mt-1.5 min-h-[60px] font-mono text-xs"
                    />
                  </div>
                </>
              )}

              {selectedNode.type === 'condition' && (
                <>
                  <div>
                    <Label className="text-xs text-muted-foreground">Condition Type</Label>
                    <Select defaultValue="equals">
                      <SelectTrigger className="mt-1.5 h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="equals">Equals</SelectItem>
                        <SelectItem value="contains">Contains</SelectItem>
                        <SelectItem value="greater">Greater Than</SelectItem>
                        <SelectItem value="less">Less Than</SelectItem>
                        <SelectItem value="regex">Regex Match</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Value</Label>
                    <Input className="mt-1.5 h-9" placeholder="Enter comparison value" />
                  </div>
                </>
              )}

              {selectedNode.type === 'knowledge' && (
                <>
                  <div>
                    <Label className="text-xs text-muted-foreground">AI Model</Label>
                    <Select defaultValue="gpt4">
                      <SelectTrigger className="mt-1.5 h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt4">GPT-4</SelectItem>
                        <SelectItem value="gpt35">GPT-3.5 Turbo</SelectItem>
                        <SelectItem value="claude">Claude 3</SelectItem>
                        <SelectItem value="gemini">Gemini Pro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">System Prompt</Label>
                    <Textarea
                      placeholder="You are a helpful assistant..."
                      className="mt-1.5 min-h-[80px]"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Temperature</Label>
                    <Input type="number" min="0" max="2" step="0.1" defaultValue="0.7" className="mt-1.5 h-9" />
                  </div>
                </>
              )}

              {selectedNode.type === 'trigger' && (
                <div>
                  <Label className="text-xs text-muted-foreground">Trigger Event</Label>
                  <Select defaultValue="message">
                    <SelectTrigger className="mt-1.5 h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="message">User Message</SelectItem>
                      <SelectItem value="webhook">Webhook Received</SelectItem>
                      <SelectItem value="schedule">Scheduled Time</SelectItem>
                      <SelectItem value="event">Custom Event</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>

          <Separator />

          {/* Advanced Settings */}
          <Collapsible open={expandedSections.advanced} onOpenChange={() => toggleSection('advanced')}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:bg-muted/50 rounded-lg px-2 -mx-2">
              <span className="text-sm font-medium text-foreground">Advanced Settings</span>
              {expandedSections.advanced ? (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 pt-2">
              <div>
                <Label className="text-xs text-muted-foreground">Timeout (ms)</Label>
                <Input type="number" defaultValue="30000" className="mt-1.5 h-9" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Retry Count</Label>
                <Input type="number" defaultValue="3" className="mt-1.5 h-9" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Error Handling</Label>
                <Select defaultValue="continue">
                  <SelectTrigger className="mt-1.5 h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="continue">Continue on Error</SelectItem>
                    <SelectItem value="stop">Stop Workflow</SelectItem>
                    <SelectItem value="retry">Retry Node</SelectItem>
                    <SelectItem value="fallback">Use Fallback</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </ScrollArea>
    </div>
  );
});
