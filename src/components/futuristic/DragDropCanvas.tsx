import { useState, useRef, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Database,
  Zap,
  MessageSquare,
  GitBranch,
  Play,
  Save,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Grid,
  Sparkles
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Node {
  id: string
  type: string
  label: string
  icon: any
  x: number
  y: number
  color: string
}

interface Connection {
  from: string
  to: string
}

const nodeTypes = [
  { type: "data", label: "Data Source", icon: Database, color: "from-blue-500 to-cyan-500" },
  { type: "nlp", label: "NLP Block", icon: Brain, color: "from-purple-500 to-pink-500" },
  { type: "action", label: "Action Node", icon: Zap, color: "from-yellow-500 to-orange-500" },
  { type: "output", label: "Output Channel", icon: MessageSquare, color: "from-green-500 to-emerald-500" },
  { type: "logic", label: "Logic Gate", icon: GitBranch, color: "from-red-500 to-rose-500" },
]

export function DragDropCanvas() {
  const [nodes, setNodes] = useState<Node[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [zoom, setZoom] = useState(1)
  const [showGrid, setShowGrid] = useState(true)
  const canvasRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const addNode = (type: string) => {
    const nodeType = nodeTypes.find(n => n.type === type)!
    const newNode: Node = {
      id: `node-${Date.now()}`,
      type,
      label: nodeType.label,
      icon: nodeType.icon,
      x: Math.random() * 400 + 100,
      y: Math.random() * 300 + 100,
      color: nodeType.color,
    }
    setNodes([...nodes, newNode])
    toast({
      title: "Node Added",
      description: `${nodeType.label} added to canvas`,
    })
  }

  const handleDragStart = (e: React.DragEvent, nodeId: string) => {
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("nodeId", nodeId)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const nodeId = e.dataTransfer.getData("nodeId")
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = (e.clientX - rect.left) / zoom
    const y = (e.clientY - rect.top) / zoom

    setNodes(nodes.map(node => 
      node.id === nodeId ? { ...node, x, y } : node
    ))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const testFlow = () => {
    toast({
      title: "Testing Agent Flow",
      description: "Running simulation...",
    })
    setTimeout(() => {
      toast({
        title: "Test Complete",
        description: "All nodes processed successfully ✓",
      })
    }, 2000)
  }

  const saveAgent = () => {
    toast({
      title: "Agent Saved",
      description: `${nodes.length} nodes and ${connections.length} connections saved`,
    })
  }

  return (
    <div className="h-full flex flex-col">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-primary/20 bg-card/50 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Agent Flow Builder
          </h2>
          <Badge variant="outline" className="border-primary/50">
            {nodes.length} Nodes
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setZoom(z => Math.min(z + 0.1, 2))}>
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setZoom(z => Math.max(z - 0.1, 0.5))}>
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setShowGrid(!showGrid)}>
            <Grid className="w-4 h-4" />
          </Button>
          <div className="w-px h-6 bg-border mx-2" />
          <Button variant="ghost" size="icon">
            <Undo className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Redo className="w-4 h-4" />
          </Button>
          <div className="w-px h-6 bg-border mx-2" />
          <Button onClick={testFlow} className="btn-holographic">
            <Play className="w-4 h-4 mr-2" />
            Test Flow
          </Button>
          <Button onClick={saveAgent} className="btn-ai">
            <Save className="w-4 h-4 mr-2" />
            Save Agent
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Left Panel - Node Library */}
        <div className="w-64 border-r border-primary/20 bg-card/30 backdrop-blur-xl p-4 space-y-3">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4">
            Component Library
          </h3>
          {nodeTypes.map((nodeType) => (
            <Card
              key={nodeType.type}
              className="card-holographic p-3 cursor-pointer hover-lift"
              onClick={() => addNode(nodeType.type)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${nodeType.color} flex items-center justify-center shadow-neon`}>
                  <nodeType.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-sm">{nodeType.label}</p>
                  <p className="text-xs text-muted-foreground">Click to add</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Canvas */}
        <div
          ref={canvasRef}
          className={`flex-1 relative overflow-hidden ${showGrid ? 'grid-bg' : ''} bg-background/50`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}
        >
          {/* Connections */}
          <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
            {connections.map((conn, i) => {
              const fromNode = nodes.find(n => n.id === conn.from)
              const toNode = nodes.find(n => n.id === conn.to)
              if (!fromNode || !toNode) return null

              return (
                <line
                  key={i}
                  x1={fromNode.x + 50}
                  y1={fromNode.y + 50}
                  x2={toNode.x + 50}
                  y2={toNode.y + 50}
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  className="drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                />
              )
            })}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(195 100% 50%)" />
                <stop offset="50%" stopColor="hsl(280 80% 50%)" />
                <stop offset="100%" stopColor="hsl(320 100% 50%)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Nodes */}
          {nodes.map((node) => (
            <div
              key={node.id}
              draggable
              onDragStart={(e) => handleDragStart(e, node.id)}
              onClick={() => setSelectedNode(node.id)}
              className={`absolute cursor-move transition-all duration-200 ${
                selectedNode === node.id ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
              }`}
              style={{
                left: node.x,
                top: node.y,
                transform: selectedNode === node.id ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              <Card className="card-neon p-4 w-32 hover-float">
                <div className={`w-12 h-12 mx-auto rounded-lg bg-gradient-to-br ${node.color} flex items-center justify-center mb-2 shadow-neon`}>
                  <node.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-xs text-center font-medium">{node.label}</p>
              </Card>
            </div>
          ))}

          {/* Empty State */}
          {nodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Sparkles className="w-16 h-16 mx-auto text-primary/30 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Start Building Your Agent</h3>
                <p className="text-muted-foreground">
                  Click on components from the left panel to add them to the canvas
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Properties */}
        <div className="w-80 border-l border-primary/20 bg-card/30 backdrop-blur-xl p-4">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4">
            Properties
          </h3>
          {selectedNode ? (
            <Card className="card-holographic p-4">
              <p className="text-sm text-muted-foreground">
                Node: {nodes.find(n => n.id === selectedNode)?.label}
              </p>
              <div className="mt-4 space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground">Label</label>
                  <input
                    type="text"
                    className="w-full mt-1 px-3 py-2 bg-background border border-primary/20 rounded-lg text-sm"
                    defaultValue={nodes.find(n => n.id === selectedNode)?.label}
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Type</label>
                  <input
                    type="text"
                    className="w-full mt-1 px-3 py-2 bg-background border border-primary/20 rounded-lg text-sm"
                    defaultValue={nodes.find(n => n.id === selectedNode)?.type}
                    disabled
                  />
                </div>
              </div>
            </Card>
          ) : (
            <div className="text-center text-muted-foreground text-sm py-8">
              Select a node to view properties
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
