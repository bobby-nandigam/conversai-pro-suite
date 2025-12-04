import { useState, useCallback, useRef, useEffect } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
  ReactFlowProvider,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Bot,
  Users,
  PanelLeftClose,
  PanelRightClose,
  Sparkles,
  Layers,
  ChevronDown
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import NodePalette, { NodeTemplate } from '@/components/builder/NodePalette';
import BuilderToolbar from '@/components/builder/BuilderToolbar';
import PropertiesPanel from '@/components/builder/PropertiesPanel';
import CollaborationPanel from '@/components/builder/CollaborationPanel';
import TriggerNode from '@/components/builder/nodes/TriggerNode';
import DataNode from '@/components/builder/nodes/DataNode';
import KnowledgeNode from '@/components/builder/nodes/KnowledgeNode';
import ConditionNode from '@/components/builder/nodes/ConditionNode';
import ActionNode from '@/components/builder/nodes/ActionNode';

const nodeTypes = {
  trigger: TriggerNode,
  data: DataNode,
  knowledge: KnowledgeNode,
  condition: ConditionNode,
  action: ActionNode,
};

const initialNodes: Node[] = [
  {
    id: 'trigger-message-1',
    type: 'trigger',
    position: { x: 100, y: 200 },
    data: { label: 'User Message', description: 'Triggered on user input' },
  },
  {
    id: 'ai-sentiment-1',
    type: 'knowledge',
    position: { x: 400, y: 100 },
    data: { 
      label: 'Sentiment Analysis', 
      description: 'Analyze user sentiment',
      editingUser: { initials: 'SC', color: '#3b82f6' }
    },
  },
  {
    id: 'condition-1',
    type: 'condition',
    position: { x: 400, y: 280 },
    data: { 
      label: 'Route by Intent', 
      description: 'Branch based on intent',
      editingUser: { initials: 'MJ', color: '#a855f7' }
    },
  },
  {
    id: 'int-database-1',
    type: 'data',
    position: { x: 750, y: 100 },
    data: { label: 'Query Database', description: 'Fetch relevant data' },
  },
  {
    id: 'ai-generate-1',
    type: 'knowledge',
    position: { x: 750, y: 280 },
    data: { label: 'Generate Response', description: 'AI-powered response' },
  },
  {
    id: 'action-output-1',
    type: 'action',
    position: { x: 1050, y: 200 },
    data: { label: 'Send Response', description: 'Output to user' },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: 'trigger-message-1', target: 'ai-sentiment-1', animated: true, style: { stroke: '#a855f7', strokeWidth: 2 } },
  { id: 'e1-3', source: 'trigger-message-1', target: 'condition-1', animated: true, style: { stroke: '#f97316', strokeWidth: 2 } },
  { id: 'e3-4', source: 'condition-1', target: 'int-database-1', sourceHandle: 'true', animated: true, style: { stroke: '#22c55e', strokeWidth: 2 } },
  { id: 'e3-5', source: 'condition-1', target: 'ai-generate-1', sourceHandle: 'false', animated: true, style: { stroke: '#ef4444', strokeWidth: 2 } },
  { id: 'e4-6', source: 'int-database-1', target: 'action-output-1', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
  { id: 'e5-6', source: 'ai-generate-1', target: 'action-output-1', animated: true, style: { stroke: '#a855f7', strokeWidth: 2 } },
];

const teamMembers = [
  { id: '1', name: 'Sarah Chen', color: '#3b82f6', status: 'online' },
  { id: '2', name: 'Mike Johnson', color: '#a855f7', status: 'online' },
  { id: '3', name: 'You', color: '#10b981', status: 'online' },
];

function AgentBuilderContent() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [rightTab, setRightTab] = useState<'properties' | 'collaboration'>('properties');
  const [agentName, setAgentName] = useState('Customer Support Agent');
  const [isSaving, setIsSaving] = useState(false);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { fitView, zoomIn, zoomOut } = useReactFlow();

  const onConnect = useCallback(
    (params: Connection | Edge) => {
      const newEdge = {
        ...params,
        animated: true,
        style: { stroke: '#a855f7', strokeWidth: 2 },
      };
      setEdges((eds) => addEdge(newEdge, eds));
      toast.success('Nodes connected');
    },
    [setEdges]
  );

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setRightTab('properties');
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const handleDragStart = useCallback((template: NodeTemplate) => {
    // Optional: Add visual feedback
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const data = event.dataTransfer.getData('application/json');
      if (!data) return;

      const template: NodeTemplate = JSON.parse(data);
      const bounds = reactFlowWrapper.current?.getBoundingClientRect();
      if (!bounds) return;

      const position = {
        x: event.clientX - bounds.left - 100,
        y: event.clientY - bounds.top - 40,
      };

      const newNode: Node = {
        id: `${template.id}-${Date.now()}`,
        type: template.type === 'action' ? 'action' : template.type,
        position,
        data: {
          label: template.label,
          description: template.description,
        },
      };

      setNodes((nds) => [...nds, newNode]);
      toast.success(`${template.label} added`);
    },
    [setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const handleUpdateNode = useCallback((nodeId: string, data: any) => {
    setNodes((nds) =>
      nds.map((node) => (node.id === nodeId ? { ...node, data } : node))
    );
  }, [setNodes]);

  const handleDeleteNode = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    setSelectedNode(null);
    toast.success('Node deleted');
  }, [setNodes, setEdges]);

  const handleDuplicateNode = useCallback((nodeId: string) => {
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;

    const newNode: Node = {
      ...node,
      id: `${node.id}-copy-${Date.now()}`,
      position: { x: node.position.x + 50, y: node.position.y + 50 },
      data: { ...node.data },
    };

    setNodes((nds) => [...nds, newNode]);
    toast.success('Node duplicated');
  }, [nodes, setNodes]);

  const handleSave = useCallback(() => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Agent saved successfully');
    }, 1000);
  }, []);

  const handleTest = useCallback(() => {
    toast.info('Running agent test...');
  }, []);

  const handleAutoLayout = useCallback(() => {
    toast.success('Auto-layout applied');
  }, []);

  const handleExport = useCallback(() => {
    toast.success('Workflow exported');
  }, []);

  const handleImport = useCallback(() => {
    toast.info('Import workflow');
  }, []);

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] bg-background overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-auto p-0 font-semibold text-lg hover:bg-transparent">
                    {agentName}
                    <ChevronDown className="w-4 h-4 ml-1 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>Rename Agent</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate Agent</DropdownMenuItem>
                  <DropdownMenuItem>View History</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <p className="text-xs text-muted-foreground">Last saved 2 minutes ago</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5" />
            Draft
          </Badge>
        </div>

        <div className="flex items-center gap-4">
          {/* Online Team Members */}
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {teamMembers.map((member) => (
                <Avatar key={member.id} className="w-8 h-8 border-2 border-background">
                  <AvatarFallback style={{ backgroundColor: member.color }} className="text-white text-xs font-semibold">
                    {member.name.split(' ').map((n) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <Button variant="outline" size="sm" className="h-8">
              <Users className="w-3.5 h-3.5 mr-1.5" />
              Invite
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Panel Toggles */}
          <div className="flex items-center gap-1">
            <Button
              variant={leftPanelOpen ? 'secondary' : 'ghost'}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setLeftPanelOpen(!leftPanelOpen)}
            >
              <Layers className="w-4 h-4" />
            </Button>
            <Button
              variant={rightPanelOpen ? 'secondary' : 'ghost'}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setRightPanelOpen(!rightPanelOpen)}
            >
              <Sparkles className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <BuilderToolbar
        onUndo={() => toast.info('Undo')}
        onRedo={() => toast.info('Redo')}
        onSave={handleSave}
        onTest={handleTest}
        onAutoLayout={handleAutoLayout}
        onZoomIn={() => zoomIn()}
        onZoomOut={() => zoomOut()}
        onFitView={() => fitView()}
        onExport={handleExport}
        onImport={handleImport}
        onDuplicate={() => selectedNode && handleDuplicateNode(selectedNode.id)}
        onDelete={() => selectedNode && handleDeleteNode(selectedNode.id)}
        nodeCount={nodes.length}
        edgeCount={edges.length}
        hasSelection={!!selectedNode}
        isSaving={isSaving}
      />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Node Palette */}
        {leftPanelOpen && (
          <div className="w-72 border-r border-border bg-card/30 backdrop-blur-sm flex flex-col">
            <NodePalette
              onDragStart={handleDragStart}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>
        )}

        {/* Canvas */}
        <div className="flex-1 relative" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
            snapToGrid
            snapGrid={[20, 20]}
            defaultEdgeOptions={{
              type: 'smoothstep',
              animated: true,
            }}
            className="bg-background"
          >
            <Controls className="!bg-card !border-border !shadow-lg" />
            <MiniMap
              className="!bg-card !border-border !shadow-lg"
              nodeColor={(node) => {
                switch (node.type) {
                  case 'trigger': return '#eab308';
                  case 'data': return '#3b82f6';
                  case 'condition': return '#f97316';
                  case 'knowledge': return '#a855f7';
                  case 'action': return '#10b981';
                  default: return '#6b7280';
                }
              }}
              maskColor="rgba(0, 0, 0, 0.1)"
            />
            <Background variant={BackgroundVariant.Dots} gap={20} size={1} className="!bg-muted/10" />
          </ReactFlow>

          {/* Empty State */}
          {nodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center mx-auto shadow-xl">
                  <Bot className="w-10 h-10 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Start Building Your Agent</h3>
                <p className="text-muted-foreground max-w-md">
                  Drag components from the left panel onto the canvas to create your AI agent workflow
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel */}
        {rightPanelOpen && (
          <div className="w-80 border-l border-border bg-card/30 backdrop-blur-sm flex flex-col">
            <div className="flex border-b border-border">
              <button
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  rightTab === 'properties'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setRightTab('properties')}
              >
                Properties
              </button>
              <button
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  rightTab === 'collaboration'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setRightTab('collaboration')}
              >
                Team
              </button>
            </div>
            {rightTab === 'properties' ? (
              <PropertiesPanel
                selectedNode={selectedNode}
                onUpdateNode={handleUpdateNode}
                onDeleteNode={handleDeleteNode}
                onDuplicateNode={handleDuplicateNode}
              />
            ) : (
              <CollaborationPanel />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AgentBuilderStudio() {
  return (
    <ReactFlowProvider>
      <AgentBuilderContent />
    </ReactFlowProvider>
  );
}
