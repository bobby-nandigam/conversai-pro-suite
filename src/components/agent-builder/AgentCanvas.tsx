import { useState } from "react"
import { DndContext, DragEndEvent, useSensor, useSensors, PointerSensor, DragOverlay } from "@dnd-kit/core"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
  Download,
  Eye
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
}

const nodeTypes = [
  { id: "data-source", label: "Data Source", icon: Database, color: "bg-blue-500" },
  { id: "knowledge", label: "Knowledge Base", icon: Brain, color: "bg-purple-500" },
  { id: "action", label: "Action Node", icon: Zap, color: "bg-yellow-500" },
  { id: "nlp", label: "NLP Processor", icon: MessageSquare, color: "bg-green-500" },
  { id: "output", label: "Output Channel", icon: FileText, color: "bg-red-500" },
  { id: "logic", label: "Logic Block", icon: Settings, color: "bg-cyan-500" },
]

export function AgentCanvas() {
  const [nodes, setNodes] = useState<AgentNode[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const { toast } = useToast()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event

    if (active.id.toString().startsWith("palette-")) {
      // Adding new node from palette
      const nodeType = nodeTypes.find(t => `palette-${t.id}` === active.id)
      if (nodeType) {
        const newNode: AgentNode = {
          id: `${nodeType.id}-${Date.now()}`,
          type: nodeType.id,
          label: nodeType.label,
          x: delta.x + 100,
          y: delta.y + 100,
          icon: nodeType.icon,
          color: nodeType.color,
          connections: []
        }
        setNodes([...nodes, newNode])
        toast({
          title: "Node added",
          description: `${nodeType.label} has been added to the canvas.`
        })
      }
    } else {
      // Moving existing node
      setNodes(nodes.map(node => 
        node.id === active.id 
          ? { ...node, x: node.x + delta.x, y: node.y + delta.y }
          : node
      ))
    }
    setActiveId(null)
  }

  const handleDeleteNode = (id: string) => {
    setNodes(nodes.filter(node => node.id !== id))
    setSelectedNode(null)
    toast({
      title: "Node deleted",
      description: "Node has been removed from the canvas.",
      variant: "destructive"
    })
  }

  const handleSave = () => {
    toast({
      title: "Agent saved",
      description: "Your agent configuration has been saved successfully."
    })
  }

  const handleTest = () => {
    toast({
      title: "Testing agent",
      description: "Running test simulation of your agent workflow..."
    })
  }

  return (
    <div className="flex h-[calc(100vh-12rem)] gap-4">
      {/* Node Palette */}
      <div className="w-64 space-y-3">
        <h3 className="text-sm font-semibold text-foreground mb-4">Component Palette</h3>
        <div className="space-y-2">
          {nodeTypes.map((nodeType) => (
            <div
              key={nodeType.id}
              id={`palette-${nodeType.id}`}
              className="cursor-move"
            >
              <Card className="p-3 hover:border-primary transition-all hover-lift bg-card/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 ${nodeType.color} rounded-lg flex items-center justify-center`}>
                    <nodeType.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">{nodeType.label}</span>
                </div>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="pt-4 border-t border-border space-y-2">
          <Button onClick={handleTest} variant="outline" className="w-full" size="sm">
            <Play className="w-4 h-4 mr-2" />
            Test Agent
          </Button>
          <Button onClick={handleSave} variant="ai" className="w-full" size="sm">
            <Save className="w-4 h-4 mr-2" />
            Save Agent
          </Button>
        </div>
      </div>

      {/* Canvas */}
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <Card className="flex-1 relative overflow-hidden bg-gradient-to-br from-muted/20 to-muted/5 border-dashed">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
          
          {nodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <p className="text-muted-foreground text-lg">Drag components here to build your agent</p>
                <p className="text-sm text-muted-foreground/60">Connect nodes to create workflows</p>
              </div>
            </div>
          )}

          {nodes.map((node) => (
            <div
              key={node.id}
              style={{
                position: 'absolute',
                left: `${node.x}px`,
                top: `${node.y}px`,
                cursor: 'move',
                zIndex: selectedNode === node.id ? 10 : 1
              }}
              onClick={() => setSelectedNode(node.id)}
            >
              <Card className={`p-4 min-w-[200px] transition-all ${selectedNode === node.id ? 'border-primary shadow-glow scale-105' : 'hover:border-primary/50'}`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 ${node.color} rounded-lg flex items-center justify-center`}>
                        <node.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-sm">{node.label}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteNode(node.id)
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {node.type}
                  </Badge>
                </div>
              </Card>
            </div>
          ))}
        </Card>
      </DndContext>

      {/* Properties Panel */}
      <div className="w-64 space-y-3">
        <h3 className="text-sm font-semibold text-foreground mb-4">Properties</h3>
        {selectedNode ? (
          <Card className="p-4 space-y-3">
            {(() => {
              const node = nodes.find(n => n.id === selectedNode)
              return node ? (
                <>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${node.color} rounded-lg flex items-center justify-center`}>
                      <node.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{node.label}</p>
                      <p className="text-xs text-muted-foreground">{node.type}</p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-border space-y-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Position:</span>
                      <p className="font-mono">x: {Math.round(node.x)}, y: {Math.round(node.y)}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Connections:</span>
                      <p>{node.connections.length || "None"}</p>
                    </div>
                  </div>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleDeleteNode(node.id)}
                  >
                    <Trash2 className="w-3 h-3 mr-2" />
                    Delete Node
                  </Button>
                </>
              ) : null
            })()}
          </Card>
        ) : (
          <Card className="p-4 text-center text-sm text-muted-foreground">
            Select a node to view properties
          </Card>
        )}
      </div>
    </div>
  )
}
