import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Bot, 
  Save, 
  Play, 
  Undo,
  Redo,
  Plus,
  MessageCircle,
  GitBranch,
  Settings
} from "lucide-react"

const flowNodes = [
  { id: 1, type: "trigger", label: "Welcome Intent", x: 100, y: 100 },
  { id: 2, type: "response", label: "Greeting Response", x: 300, y: 100 },
  { id: 3, type: "condition", label: "User Type?", x: 500, y: 100 },
  { id: 4, type: "response", label: "New User Flow", x: 400, y: 250 },
  { id: 5, type: "response", label: "Existing User", x: 600, y: 250 },
]

export default function BotBuilder() {
  const [botName, setBotName] = useState("New AI Assistant")
  const [botDescription, setBotDescription] = useState("A helpful AI assistant")
  const [selectedIntent, setSelectedIntent] = useState<any>(null)
  const [flows, setFlows] = useState([
    {
      id: 1,
      name: "Welcome Flow",
      trigger: "greeting",
      nodes: [
        { id: "start", type: "trigger", label: "User says hello", x: 50, y: 100 },
        { id: "response", type: "response", label: "Welcome! How can I help?", x: 300, y: 100 },
        { id: "menu", type: "menu", label: "Show main menu", x: 550, y: 100 }
      ]
    },
    {
      id: 2, 
      name: "Support Flow",
      trigger: "help",
      nodes: [
        { id: "start", type: "trigger", label: "User needs help", x: 50, y: 200 },
        { id: "classify", type: "condition", label: "Classify issue type", x: 300, y: 200 },
        { id: "response", type: "response", label: "Provide relevant help", x: 550, y: 200 }
      ]
    }
  ])
  const [activeFlow, setActiveFlow] = useState(flows[0])
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const { toast } = useToast()

  const handleSaveBot = () => {
    toast({
      title: "Bot saved successfully!",
      description: `${botName} has been saved with ${flows.length} conversation flows.`,
    })
  }

  const handleTestBot = () => {
    setIsPreviewOpen(true)
    toast({
      title: "Bot test started",
      description: "Test your bot in the preview window.",
    })
  }

  const handleAddFlow = () => {
    const newFlow = {
      id: flows.length + 1,
      name: `New Flow ${flows.length + 1}`,
      trigger: "custom",
      nodes: [
        { id: "start", type: "trigger", label: "New trigger", x: 50, y: 100 }
      ]
    }
    setFlows([...flows, newFlow])
    setActiveFlow(newFlow)
    toast({
      title: "New flow created",
      description: "Start building your conversation flow.",
    })
  }

  const handleDeleteFlow = (flowId: number) => {
    const updatedFlows = flows.filter(flow => flow.id !== flowId)
    setFlows(updatedFlows)
    if (activeFlow.id === flowId && updatedFlows.length > 0) {
      setActiveFlow(updatedFlows[0])
    }
    toast({
      title: "Flow deleted",
      description: "Conversation flow has been removed.",
    })
  }

  const nodeTypes = [
    { type: "trigger", icon: Zap, label: "Trigger", color: "bg-blue-500" },
    { type: "response", icon: MessageSquare, label: "Response", color: "bg-green-500" },
    { type: "condition", icon: Brain, label: "Condition", color: "bg-yellow-500" },
    { type: "action", icon: Settings, label: "Action", color: "bg-purple-500" },
    { type: "menu", icon: FileText, label: "Menu", color: "bg-red-500" },
    { type: "handoff", icon: Link, label: "Handoff", color: "bg-gray-500" }
  ]

  return (
    <div className="flex-1 flex flex-col">
      {/* Builder Header */}
      <div className="h-16 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold">Customer Support Bot</h1>
                <Badge variant="outline" className="text-xs">Draft</Badge>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Undo className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Redo className="w-4 h-4" />
            </Button>
            <Button variant="glass">
              <Play className="w-4 h-4 mr-2" />
              Test Bot
            </Button>
            <Button variant="ai">
              <Save className="w-4 h-4 mr-2" />
              Save & Deploy
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar - Node Library */}
        <div className="w-64 border-r border-border bg-card/30 p-4">
          <h3 className="font-semibold mb-4">Components</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Triggers</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 bg-muted/20 rounded-lg cursor-pointer hover:bg-muted/40 transition-colors">
                  <MessageCircle className="w-4 h-4 text-primary" />
                  <span className="text-sm">User Intent</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Actions</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 bg-muted/20 rounded-lg cursor-pointer hover:bg-muted/40 transition-colors">
                  <MessageCircle className="w-4 h-4 text-success" />
                  <span className="text-sm">Bot Response</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-muted/20 rounded-lg cursor-pointer hover:bg-muted/40 transition-colors">
                  <GitBranch className="w-4 h-4 text-warning" />
                  <span className="text-sm">Condition</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Canvas */}
        <div className="flex-1 relative bg-background">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:20px_20px]">
            
            {/* Flow Nodes */}
            {flowNodes.map((node) => (
              <div
                key={node.id}
                className="absolute w-48 card-ai p-4 cursor-pointer hover-lift"
                style={{ left: node.x, top: node.y }}
              >
                <div className="flex items-center gap-2 mb-2">
                  {node.type === 'trigger' && <MessageCircle className="w-4 h-4 text-primary" />}
                  {node.type === 'response' && <MessageCircle className="w-4 h-4 text-success" />}
                  {node.type === 'condition' && <GitBranch className="w-4 h-4 text-warning" />}
                  <span className="text-sm font-medium">{node.label}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {node.type === 'trigger' && 'Detects user greeting messages'}
                  {node.type === 'response' && 'Sends welcome message to user'}
                  {node.type === 'condition' && 'Routes based on user profile'}
                </div>
                
                {/* Connection Points */}
                <div className="absolute -right-2 top-1/2 w-4 h-4 bg-primary rounded-full border-2 border-background transform -translate-y-1/2"></div>
                <div className="absolute -left-2 top-1/2 w-4 h-4 bg-muted-foreground rounded-full border-2 border-background transform -translate-y-1/2"></div>
              </div>
            ))}

            {/* Connection Lines (simplified) */}
            <svg className="absolute inset-0 pointer-events-none">
              <line x1="248" y1="125" x2="300" y2="125" stroke="hsl(var(--primary))" strokeWidth="2" />
              <line x1="448" y1="125" x2="500" y2="125" stroke="hsl(var(--primary))" strokeWidth="2" />
              <line x1="548" y1="150" x2="448" y2="275" stroke="hsl(var(--primary))" strokeWidth="2" />
              <line x1="548" y1="150" x2="648" y2="275" stroke="hsl(var(--primary))" strokeWidth="2" />
            </svg>
          </div>

          {/* Floating Action Button */}
          <Button 
            variant="ai" 
            className="absolute bottom-6 right-6 w-14 h-14 rounded-full shadow-glow"
            size="icon"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>

        {/* Properties Panel */}
        <div className="w-80 border-l border-border bg-card/30 p-4">
          <h3 className="font-semibold mb-4">Properties</h3>
          
          <Card className="card-ai">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-primary" />
                Welcome Intent
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Training Phrases</label>
                <div className="mt-2 space-y-1">
                  <Badge variant="outline" className="text-xs">Hello</Badge>
                  <Badge variant="outline" className="text-xs">Hi there</Badge>
                  <Badge variant="outline" className="text-xs">Good morning</Badge>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Response</label>
                <div className="mt-2 p-3 bg-muted/20 rounded-lg text-sm">
                  "Hello! Welcome to our support center. How can I help you today?"
                </div>
              </div>
              
              <Button variant="glass" className="w-full">
                <Settings className="w-4 h-4 mr-2" />
                Advanced Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}