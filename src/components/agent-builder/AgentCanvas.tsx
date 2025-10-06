import { useState } from "react"
import { DndContext, DragEndEvent, useSensor, useSensors, PointerSensor, MouseSensor } from "@dnd-kit/core"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Database, 
  Brain, 
  Zap, 
  MessageSquare, 
  FileText, 
  Settings,
  Trash2,
  Play,
  Save,
  Share2,
  ArrowRight,
  Plus,
  Globe,
  Mail,
  Phone,
  Filter,
  Code
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AgentNode {
  id: string
  type: string
  label: string
  x: number
  y: number
  icon: any
  color: string
  connections: string[]
  config?: Record<string, any>
}

const nodeTypes = [
  { id: "trigger", label: "Trigger", icon: Zap, color: "bg-yellow-500", description: "Start workflow" },
  { id: "data-source", label: "Data Source", icon: Database, color: "bg-blue-500", description: "Fetch data" },
  { id: "knowledge", label: "Knowledge Base", icon: Brain, color: "bg-purple-500", description: "AI knowledge" },
  { id: "condition", label: "Condition", icon: Filter, color: "bg-orange-500", description: "Logic branching" },
  { id: "nlp", label: "NLP Processor", icon: MessageSquare, color: "bg-green-500", description: "Process text" },
  { id: "api", label: "API Call", icon: Code, color: "bg-cyan-500", description: "External API" },
  { id: "email", label: "Send Email", icon: Mail, color: "bg-red-500", description: "Email action" },
  { id: "sms", label: "Send SMS", icon: Phone, color: "bg-pink-500", description: "SMS action" },
  { id: "web", label: "Web Action", icon: Globe, color: "bg-indigo-500", description: "Web integration" },
  { id: "output", label: "Output", icon: FileText, color: "bg-slate-500", description: "Final output" },
]

export function AgentCanvas() {
  const [nodes, setNodes] = useState<AgentNode[]>([])
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [isDraggingFromPalette, setIsDraggingFromPalette] = useState(false)
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null)
  const { toast } = useToast()

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  )

  const handleDragStart = (event: any) => {
    const id = event.active.id.toString()
    if (id.startsWith("palette-")) {
      setIsDraggingFromPalette(true)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta, over } = event
    const activeId = active.id.toString()

    if (activeId.startsWith("palette-")) {
      // Adding new node from palette
      const nodeType = nodeTypes.find(t => `palette-${t.id}` === activeId)
      if (nodeType && delta.x !== 0 && delta.y !== 0) {
        const newNode: AgentNode = {
          id: `${nodeType.id}-${Date.now()}`,
          type: nodeType.id,
          label: nodeType.label,
          x: Math.max(0, delta.x + 300),
          y: Math.max(0, delta.y + 100),
          icon: nodeType.icon,
          color: nodeType.color,
          connections: [],
          config: {}
        }
        setNodes([...nodes, newNode])
        setSelectedNode(newNode.id)
        toast({
          title: "Node added",
          description: `${nodeType.label} has been added to the canvas.`
        })
      }
    } else {
      // Moving existing node
      setNodes(nodes.map(node => 
        node.id === activeId 
          ? { ...node, x: Math.max(0, node.x + delta.x), y: Math.max(0, node.y + delta.y) }
          : node
      ))
    }
    setIsDraggingFromPalette(false)
  }

  const handleDeleteNode = (id: string) => {
    setNodes(nodes.filter(node => node.id !== id).map(node => ({
      ...node,
      connections: node.connections.filter(conn => conn !== id)
    })))
    setSelectedNode(null)
    toast({
      title: "Node deleted",
      description: "Node has been removed from the canvas.",
      variant: "destructive"
    })
  }

  const handleConnectNodes = (targetId: string) => {
    if (connectingFrom && connectingFrom !== targetId) {
      setNodes(nodes.map(node => 
        node.id === connectingFrom 
          ? { ...node, connections: [...new Set([...node.connections, targetId])] }
          : node
      ))
      toast({
        title: "Nodes connected",
        description: "Successfully created connection between nodes."
      })
    }
    setConnectingFrom(null)
  }

  const handleUpdateNodeConfig = (field: string, value: any) => {
    setNodes(nodes.map(node => 
      node.id === selectedNode
        ? { ...node, config: { ...node.config, [field]: value } }
        : node
    ))
  }

  const handleSave = () => {
    toast({
      title: "Agent saved",
      description: `Workflow saved with ${nodes.length} nodes and ${nodes.reduce((acc, n) => acc + n.connections.length, 0)} connections.`
    })
  }

  const handleTest = () => {
    if (nodes.length === 0) {
      toast({
        title: "Cannot test",
        description: "Add nodes to your workflow before testing.",
        variant: "destructive"
      })
      return
    }
    toast({
      title: "Testing agent",
      description: "Running simulation of your agent workflow..."
    })
  }

  const handleClearCanvas = () => {
    setNodes([])
    setSelectedNode(null)
    toast({
      title: "Canvas cleared",
      description: "All nodes have been removed."
    })
  }

  const selectedNodeData = nodes.find(n => n.id === selectedNode)

  return (
    <div className="flex h-[calc(100vh-16rem)] gap-4">
      {/* Node Palette */}
      <div className="w-64 space-y-3 overflow-y-auto">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">Components</h3>
          <Badge variant="secondary">{nodeTypes.length}</Badge>
        </div>
        
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="space-y-2">
            {nodeTypes.map((nodeType) => (
              <div
                key={nodeType.id}
                id={`palette-${nodeType.id}`}
                draggable
                className="cursor-grab active:cursor-grabbing"
              >
                <Card className="p-3 hover:border-primary transition-all hover-lift bg-card/80 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 ${nodeType.color} rounded-lg flex items-center justify-center shrink-0`}>
                      <nodeType.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{nodeType.label}</p>
                      <p className="text-xs text-muted-foreground truncate">{nodeType.description}</p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </DndContext>
        
        <div className="pt-4 border-t border-border space-y-2 sticky bottom-0 bg-background pb-2">
          <Button onClick={handleTest} variant="outline" className="w-full" size="sm">
            <Play className="w-4 h-4 mr-2" />
            Test Workflow
          </Button>
          <Button onClick={handleSave} variant="default" className="w-full bg-gradient-primary" size="sm">
            <Save className="w-4 h-4 mr-2" />
            Save Agent
          </Button>
          {nodes.length > 0 && (
            <Button onClick={handleClearCanvas} variant="ghost" className="w-full" size="sm">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>
      </div>

      {/* Canvas */}
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <Card className="flex-1 relative overflow-hidden bg-gradient-to-br from-muted/20 to-muted/5 border-2 border-dashed">
          {/* Grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(120,120,120,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(120,120,120,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
          
          {/* Empty state */}
          {nodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-3 max-w-md">
                <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Build Your AI Agent</h3>
                <p className="text-muted-foreground">Drag components from the left panel to create your workflow</p>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-2">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Add nodes</span>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Connect them</span>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Test & Deploy</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Connection lines */}
          <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
            {nodes.map((node) => 
              node.connections.map((targetId) => {
                const target = nodes.find(n => n.id === targetId)
                if (!target) return null
                
                const startX = node.x + 100
                const startY = node.y + 40
                const endX = target.x
                const endY = target.y + 40
                
                const midX = (startX + endX) / 2
                
                return (
                  <g key={`${node.id}-${targetId}`}>
                    <path
                      d={`M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`}
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.5"
                      strokeDasharray="5,5"
                    />
                    <circle cx={endX} cy={endY} r="4" fill="hsl(var(--primary))" />
                  </g>
                )
              })
            )}
          </svg>

          {/* Nodes */}
          {nodes.map((node) => (
            <div
              key={node.id}
              style={{
                position: 'absolute',
                left: `${node.x}px`,
                top: `${node.y}px`,
                cursor: 'move',
                zIndex: selectedNode === node.id ? 20 : 10
              }}
              onClick={() => setSelectedNode(node.id)}
              draggable
            >
              <Card className={`p-4 min-w-[200px] transition-all ${
                selectedNode === node.id 
                  ? 'border-primary shadow-glow scale-105 border-2' 
                  : 'hover:border-primary/50 hover:shadow-lg'
              }`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-9 h-9 ${node.color} rounded-lg flex items-center justify-center shrink-0`}>
                        <node.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-medium text-sm">{node.label}</span>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={(e) => {
                          e.stopPropagation()
                          if (connectingFrom === node.id) {
                            setConnectingFrom(null)
                          } else {
                            setConnectingFrom(node.id)
                          }
                        }}
                      >
                        <Share2 className={`w-3 h-3 ${connectingFrom === node.id ? 'text-primary' : ''}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteNode(node.id)
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {node.type}
                    </Badge>
                    {node.connections.length > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {node.connections.length} connection{node.connections.length > 1 ? 's' : ''}
                      </Badge>
                    )}
                  </div>

                  {connectingFrom && connectingFrom !== node.id && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleConnectNodes(node.id)
                      }}
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Connect Here
                    </Button>
                  )}
                </div>
              </Card>
            </div>
          ))}
        </Card>
      </DndContext>

      {/* Properties Panel */}
      <div className="w-72 space-y-3 overflow-y-auto">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">Properties</h3>
          {selectedNode && (
            <Badge variant="secondary">Selected</Badge>
          )}
        </div>
        
        {selectedNodeData ? (
          <Card className="p-4 space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-border">
              <div className={`w-12 h-12 ${selectedNodeData.color} rounded-lg flex items-center justify-center`}>
                <selectedNodeData.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold">{selectedNodeData.label}</p>
                <p className="text-xs text-muted-foreground">{selectedNodeData.type}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <Label className="text-xs">Node Label</Label>
                <Input 
                  value={selectedNodeData.label}
                  onChange={(e) => {
                    setNodes(nodes.map(n => 
                      n.id === selectedNode ? { ...n, label: e.target.value } : n
                    ))
                  }}
                  className="mt-1"
                />
              </div>

              {selectedNodeData.type === 'api' && (
                <>
                  <div>
                    <Label className="text-xs">API Endpoint</Label>
                    <Input 
                      placeholder="https://api.example.com"
                      value={selectedNodeData.config?.endpoint || ''}
                      onChange={(e) => handleUpdateNodeConfig('endpoint', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Method</Label>
                    <Select 
                      value={selectedNodeData.config?.method || 'GET'}
                      onValueChange={(value) => handleUpdateNodeConfig('method', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GET">GET</SelectItem>
                        <SelectItem value="POST">POST</SelectItem>
                        <SelectItem value="PUT">PUT</SelectItem>
                        <SelectItem value="DELETE">DELETE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {selectedNodeData.type === 'email' && (
                <>
                  <div>
                    <Label className="text-xs">To Email</Label>
                    <Input 
                      type="email"
                      placeholder="recipient@example.com"
                      value={selectedNodeData.config?.to || ''}
                      onChange={(e) => handleUpdateNodeConfig('to', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Subject</Label>
                    <Input 
                      placeholder="Email subject"
                      value={selectedNodeData.config?.subject || ''}
                      onChange={(e) => handleUpdateNodeConfig('subject', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Body</Label>
                    <Textarea 
                      placeholder="Email body"
                      value={selectedNodeData.config?.body || ''}
                      onChange={(e) => handleUpdateNodeConfig('body', e.target.value)}
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                </>
              )}

              {selectedNodeData.type === 'condition' && (
                <>
                  <div>
                    <Label className="text-xs">Condition Type</Label>
                    <Select 
                      value={selectedNodeData.config?.conditionType || 'equals'}
                      onValueChange={(value) => handleUpdateNodeConfig('conditionType', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="equals">Equals</SelectItem>
                        <SelectItem value="contains">Contains</SelectItem>
                        <SelectItem value="greater">Greater Than</SelectItem>
                        <SelectItem value="less">Less Than</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs">Value</Label>
                    <Input 
                      placeholder="Comparison value"
                      value={selectedNodeData.config?.value || ''}
                      onChange={(e) => handleUpdateNodeConfig('value', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </>
              )}

              <div className="pt-2 border-t border-border">
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Position:</span>
                    <span className="font-mono">x:{Math.round(selectedNodeData.x)} y:{Math.round(selectedNodeData.y)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Connections:</span>
                    <span>{selectedNodeData.connections.length}</span>
                  </div>
                </div>
              </div>
            </div>

            <Button 
              variant="destructive" 
              size="sm" 
              className="w-full"
              onClick={() => handleDeleteNode(selectedNodeData.id)}
            >
              <Trash2 className="w-3 h-3 mr-2" />
              Delete Node
            </Button>
          </Card>
        ) : (
          <Card className="p-8 text-center">
            <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-sm text-muted-foreground">Select a node to configure its properties</p>
          </Card>
        )}

        {nodes.length > 0 && (
          <Card className="p-4 bg-muted/50">
            <h4 className="text-xs font-semibold mb-2">Workflow Stats</h4>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Nodes:</span>
                <span className="font-semibold">{nodes.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Connections:</span>
                <span className="font-semibold">{nodes.reduce((acc, n) => acc + n.connections.length, 0)}</span>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}