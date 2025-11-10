import { useState, useCallback, useEffect, useRef } from "react";
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
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  MessageSquare, 
  Lock, 
  AtSign, 
  Clock, 
  Activity,
  Undo2,
  Redo2,
  Save,
  AlignLeft,
  Sparkles,
  Trash2,
  Settings2
} from "lucide-react";
import TriggerNode from "@/components/workflow/TriggerNode";
import DataNode from "@/components/workflow/DataNode";
import ConditionNode from "@/components/workflow/ConditionNode";
import KnowledgeNode from "@/components/workflow/KnowledgeNode";
import CollaborativeCursors from "@/components/workflow/CollaborativeCursors";
import { toast } from "sonner";

interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  color: string;
  status: "online" | "offline" | "away";
  currentNode?: string;
}

interface Comment {
  id: string;
  author: TeamMember;
  content: string;
  timestamp: Date;
  nodeId: string;
  mentions: string[];
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "",
    color: "#3b82f6",
    status: "online",
    currentNode: "2",
  },
  {
    id: "2",
    name: "Mike Johnson",
    avatar: "",
    color: "#8b5cf6",
    status: "online",
    currentNode: "3",
  },
  {
    id: "3",
    name: "Emma Davis",
    avatar: "",
    color: "#ec4899",
    status: "away",
  },
  {
    id: "4",
    name: "Alex Turner",
    avatar: "",
    color: "#f59e0b",
    status: "offline",
  },
];

const nodeTypes = {
  trigger: TriggerNode,
  data: DataNode,
  condition: ConditionNode,
  knowledge: KnowledgeNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'trigger',
    position: { x: 100, y: 100 },
    data: { 
      label: 'User Message',
      description: 'Triggers when user sends a message',
    },
  },
  {
    id: '2',
    type: 'knowledge',
    position: { x: 400, y: 50 },
    data: { 
      label: 'Sentiment Analysis',
      description: 'Analyze user sentiment',
      editingUser: {
        initials: 'SC',
        color: '#3b82f6'
      }
    },
  },
  {
    id: '3',
    type: 'condition',
    position: { x: 400, y: 200 },
    data: { 
      label: 'Check Intent',
      description: 'Route based on user intent',
      editingUser: {
        initials: 'MJ',
        color: '#8b5cf6'
      }
    },
  },
  {
    id: '4',
    type: 'data',
    position: { x: 700, y: 100 },
    data: { 
      label: 'Query Database',
      description: 'Fetch relevant information',
    },
  },
  {
    id: '5',
    type: 'knowledge',
    position: { x: 700, y: 300 },
    data: { 
      label: 'Generate Response',
      description: 'AI-powered response generation',
    },
  },
];

const initialEdges: Edge[] = [
  { 
    id: 'e1-2', 
    source: '1', 
    target: '2',
    animated: true,
    style: { stroke: '#3b82f6', strokeWidth: 2 }
  },
  { 
    id: 'e1-3', 
    source: '1', 
    target: '3',
    animated: true,
    style: { stroke: '#8b5cf6', strokeWidth: 2 }
  },
  { 
    id: 'e3-4', 
    source: '3', 
    target: '4',
    sourceHandle: 'true',
    animated: true,
    style: { stroke: '#f97316', strokeWidth: 2 }
  },
  { 
    id: 'e3-5', 
    source: '3', 
    target: '5',
    sourceHandle: 'false',
    animated: true,
    style: { stroke: '#f97316', strokeWidth: 2 }
  },
];

const mockComments: Comment[] = [
  {
    id: "1",
    author: teamMembers[0],
    content: "Should we add a sentiment analysis step here before routing?",
    timestamp: new Date("2025-01-15T10:30:00"),
    nodeId: "node-3",
    mentions: ["Mike Johnson"],
  },
  {
    id: "2",
    author: teamMembers[1],
    content: "@Sarah Chen Good idea! Let me add that now.",
    timestamp: new Date("2025-01-15T10:32:00"),
    nodeId: "node-3",
    mentions: ["Sarah Chen"],
  },
];

export default function CollaborativeEditing() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState("");
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [cursors, setCursors] = useState([
    { id: '1', name: 'Sarah Chen', color: '#3b82f6', x: 450, y: 120 },
    { id: '2', name: 'Mike Johnson', color: '#8b5cf6', x: 450, y: 270 },
  ]);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursors(prev => prev.map(cursor => ({
        ...cursor,
        x: cursor.x + (Math.random() - 0.5) * 20,
        y: cursor.y + (Math.random() - 0.5) * 20,
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: TeamMember["status"]) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "offline":
        return "bg-muted-foreground";
    }
  };

  const onConnect = useCallback(
    (params: Connection | Edge) => {
      const newEdge = {
        ...params,
        animated: true,
        style: { stroke: '#a855f7', strokeWidth: 2 }
      };
      setEdges((eds) => addEdge(newEdge, eds));
      toast.success('Nodes connected!');
    },
    [setEdges]
  );

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const handleAutoLayout = () => {
    toast.success('Auto-layout applied!');
  };

  const handleUndo = () => {
    toast.info('Undo action');
  };

  const handleRedo = () => {
    toast.info('Redo action');
  };

  const handleSave = () => {
    toast.success('Workflow saved successfully!');
  };

  const addComment = () => {
    if (!newComment.trim() || !selectedNode) return;

    const comment: Comment = {
      id: `comment-${Date.now()}`,
      author: teamMembers[0],
      content: newComment,
      timestamp: new Date(),
      nodeId: selectedNode.id,
      mentions: [],
    };

    setComments([...comments, comment]);
    setNewComment("");
    toast.success('Comment added!');
  };

  const handleDeleteNode = () => {
    if (!selectedNode) return;
    setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));
    setSelectedNode(null);
    toast.success('Node deleted!');
  };

  return (
    <div className="flex-1 p-6 space-y-6 bg-background">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Real-Time Collaborative Editing
          </h1>
          <p className="text-muted-foreground mt-1">
            Build and refine agents together with your team in real-time
          </p>
        </div>
        <Button className="shadow-lg">
          <Users className="w-4 h-4 mr-2" />
          Invite Members
        </Button>
      </div>

      {/* Team Members Online */}
      <Card className="border-border bg-card shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-foreground">Team Members</span>
              </div>
              <div className="flex -space-x-2">
                {teamMembers.map((member) => (
                  <div key={member.id} className="relative group cursor-pointer">
                    <Avatar className="border-2 border-card transition-transform group-hover:scale-110">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback style={{ backgroundColor: member.color }} className="text-white font-semibold">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${getStatusColor(
                        member.status
                      )}`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2 text-sm">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                <Users className="w-3 h-3 mr-1" />
                {teamMembers.filter((m) => m.status === "online").length} online
              </Badge>
              <Badge variant="secondary" className="bg-accent/10 text-accent-foreground border-accent/20">
                <Lock className="w-3 h-3 mr-1" />
                2 nodes locked
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Toolbar */}
      <Card className="border-border bg-card shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleUndo}>
                <Undo2 className="w-4 h-4 mr-2" />
                Undo
              </Button>
              <Button variant="outline" size="sm" onClick={handleRedo}>
                <Redo2 className="w-4 h-4 mr-2" />
                Redo
              </Button>
              <Separator orientation="vertical" className="h-8" />
              <Button variant="outline" size="sm" onClick={handleAutoLayout}>
                <AlignLeft className="w-4 h-4 mr-2" />
                Auto Layout
              </Button>
              <Button variant="outline" size="sm" onClick={handleAutoLayout}>
                <Sparkles className="w-4 h-4 mr-2" />
                Align Nodes
              </Button>
            </div>
            <Button size="sm" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Workflow
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Canvas */}
        <div className="lg:col-span-3">
          <Card className="border-border bg-card shadow-sm">
            <CardHeader className="border-b border-border">
              <CardTitle className="flex items-center justify-between text-foreground">
                <span>Agent Workflow Canvas</span>
                <div className="flex gap-2">
                  {teamMembers
                    .filter((m) => m.status === "online" && m.currentNode)
                    .map((member) => (
                      <Badge key={member.id} variant="outline" style={{ borderColor: member.color }}>
                        <div
                          className="w-2 h-2 rounded-full mr-2"
                          style={{ backgroundColor: member.color }}
                        />
                        {member.name} editing
                      </Badge>
                    ))}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[700px] relative" ref={reactFlowWrapper}>
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  onNodeClick={onNodeClick}
                  nodeTypes={nodeTypes}
                  fitView
                  snapToGrid
                  snapGrid={[15, 15]}
                  defaultEdgeOptions={{
                    type: 'smoothstep',
                    animated: true,
                  }}
                  className="bg-muted/20"
                >
                  <Controls className="!bg-card !border-border" />
                  <MiniMap 
                    className="!bg-card !border-border"
                    nodeColor={(node) => {
                      switch (node.type) {
                        case 'trigger': return '#eab308';
                        case 'data': return '#3b82f6';
                        case 'condition': return '#f97316';
                        case 'knowledge': return '#a855f7';
                        default: return '#6b7280';
                      }
                    }}
                  />
                  <Background variant={BackgroundVariant.Dots} gap={15} size={1} className="bg-muted/20" />
                  <CollaborativeCursors cursors={cursors} />
                </ReactFlow>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Properties & Comments */}
        <div className="space-y-6">
          <Card className="border-border bg-card shadow-sm">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-base text-foreground">Properties Panel</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {selectedNode ? (
                <Tabs defaultValue="general">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  </TabsList>
                  <TabsContent value="general" className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Node Type</label>
                      <p className="text-sm text-muted-foreground capitalize mt-1">{selectedNode.type}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Label</label>
                      <p className="text-sm text-muted-foreground mt-1">{selectedNode.data.label}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <p className="text-sm text-muted-foreground mt-1">{selectedNode.data.description}</p>
                    </div>
                    <Button variant="destructive" size="sm" className="w-full" onClick={handleDeleteNode}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Node
                    </Button>
                  </TabsContent>
                  <TabsContent value="advanced" className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Node ID</label>
                      <p className="text-sm text-muted-foreground mt-1 font-mono">{selectedNode.id}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Position</label>
                      <p className="text-sm text-muted-foreground mt-1">
                        X: {Math.round(selectedNode.position.x)}, Y: {Math.round(selectedNode.position.y)}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <Settings2 className="w-4 h-4 mr-2" />
                      Advanced Settings
                    </Button>
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  Select a node to view properties
                </div>
              )}
            </CardContent>
          </Card>
          {/* Active Team Members */}
          <Card className="border-border bg-card shadow-sm">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-base text-foreground">Active Now</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {teamMembers
                  .filter((m) => m.status === "online")
                  .map((member) => (
                    <div key={member.id} className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback style={{ backgroundColor: member.color }}>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border border-background ${getStatusColor(
                            member.status
                          )}`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{member.name}</p>
                        {member.currentNode && (
                          <p className="text-xs text-muted-foreground">Editing {member.currentNode}</p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Comments */}
          <Card className="flex flex-col h-[480px] border-border bg-card shadow-sm">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-base flex items-center gap-2 text-foreground">
                <MessageSquare className="w-4 h-4 text-primary" />
                Comments
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback style={{ backgroundColor: comment.author.color }}>
                            {comment.author.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-medium">{comment.author.name}</p>
                            <Badge variant="outline" className="text-xs">
                              {comment.nodeId}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{comment.content}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                            <p className="text-xs text-muted-foreground">
                              {comment.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="space-y-2">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment... Use @name to mention"
                  className="min-h-[80px]"
                />
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <AtSign className="w-3 h-3 mr-1" />
                    Mention
                  </Button>
                  <Button size="sm" onClick={addComment} className="flex-1">
                    Comment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader className="border-b border-border">
          <CardTitle className="text-base flex items-center gap-2 text-foreground">
            <Clock className="w-4 h-4 text-primary" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Avatar className="w-6 h-6">
                <AvatarFallback style={{ backgroundColor: teamMembers[0].color }}>SC</AvatarFallback>
              </Avatar>
              <span className="text-muted-foreground">
                <span className="font-medium text-foreground">{teamMembers[0].name}</span> added a sentiment
                analysis node
              </span>
              <span className="text-xs text-muted-foreground ml-auto">2m ago</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Avatar className="w-6 h-6">
                <AvatarFallback style={{ backgroundColor: teamMembers[1].color }}>MJ</AvatarFallback>
              </Avatar>
              <span className="text-muted-foreground">
                <span className="font-medium text-foreground">{teamMembers[1].name}</span> updated trigger
                configuration
              </span>
              <span className="text-xs text-muted-foreground ml-auto">5m ago</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Avatar className="w-6 h-6">
                <AvatarFallback style={{ backgroundColor: teamMembers[0].color }}>SC</AvatarFallback>
              </Avatar>
              <span className="text-muted-foreground">
                <span className="font-medium text-foreground">{teamMembers[0].name}</span> commented on
                node-3
              </span>
              <span className="text-xs text-muted-foreground ml-auto">12m ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
