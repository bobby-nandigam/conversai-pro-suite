import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"
import { AgentCanvas } from "@/components/agent-builder/AgentCanvas"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Bot, 
  Plus, 
  MoreVertical, 
  Play, 
  Pause, 
  Edit,
  Copy,
  BarChart3,
  MessageSquare,
  Settings,
  Trash2,
  CheckCircle,
  AlertCircle,
  Clock,
  Workflow,
  Zap,
  Database,
  Brain,
  Upload,
  FileText,
  TrendingUp
} from "lucide-react"

const initialAgents = [
  {
    id: 1,
    name: "Customer Support Agent",
    description: "Handles customer inquiries and support tickets",
    status: "active",
    conversations: 1247,
    accuracy: 94.2,
    lastActive: "2 minutes ago"
  },
  {
    id: 2,
    name: "Sales Assistant Agent",
    description: "Qualified leads and product recommendations",
    status: "active", 
    conversations: 892,
    accuracy: 91.8,
    lastActive: "5 minutes ago"
  },
  {
    id: 3,
    name: "HR Helper Agent",
    description: "Employee onboarding and HR processes",
    status: "paused",
    conversations: 156,
    accuracy: 88.5,
    lastActive: "1 hour ago"
  },
  {
    id: 4,
    name: "Product Guide Agent",
    description: "Product demos and technical documentation",
    status: "testing",
    conversations: 45,
    accuracy: 96.1,
    lastActive: "30 minutes ago"
  }
]

export default function AgentManagement() {
  const [agents, setAgents] = useState(initialAgents)
  const [editingAgent, setEditingAgent] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleStatusToggle = (agentId: number) => {
    setAgents(agents.map(agent => 
      agent.id === agentId 
        ? { ...agent, status: agent.status === 'active' ? 'paused' : 'active' }
        : agent
    ))
    const agent = agents.find(a => a.id === agentId)
    toast({
      title: `Agent ${agent?.status === 'active' ? 'paused' : 'activated'}`,
      description: `${agent?.name} is now ${agent?.status === 'active' ? 'paused' : 'active'}.`,
    })
  }

  const handleEditAgent = (agent: any) => {
    setEditingAgent({...agent})
  }

  const handleSaveAgent = () => {
    if (editingAgent) {
      setAgents(agents.map(agent => 
        agent.id === editingAgent.id ? editingAgent : agent
      ))
      toast({
        title: "Agent updated",
        description: `${editingAgent.name} has been updated successfully.`,
      })
      setEditingAgent(null)
    }
  }

  const handleDeleteAgent = (agentId: number) => {
    const agent = agents.find(a => a.id === agentId)
    setAgents(agents.filter(agent => agent.id !== agentId))
    toast({
      title: "Agent deleted",
      description: `${agent?.name} has been deleted.`,
      variant: "destructive"
    })
  }

  const handleCloneAgent = (agent: any) => {
    const newAgent = {
      ...agent,
      id: Math.max(...agents.map(a => a.id)) + 1,
      name: `${agent.name} (Copy)`,
      status: 'testing',
      conversations: 0,
      lastActive: 'Just created'
    }
    setAgents([...agents, newAgent])
    toast({
      title: "Agent cloned",
      description: `${newAgent.name} has been created.`,
    })
  }

  const handleViewAnalytics = (agent: any) => {
    navigate('/analytics', { state: { selectedAgent: agent } })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-3 h-3 text-success" />
      case 'paused': return <Pause className="w-3 h-3 text-warning" />
      case 'testing': return <Clock className="w-3 h-3 text-accent" />
      default: return <AlertCircle className="w-3 h-3 text-muted-foreground" />
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default'
      case 'paused': return 'secondary'
      case 'testing': return 'outline'
      default: return 'secondary'
    }
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agent Management</h1>
          <p className="text-muted-foreground">Build, configure, and monitor your AI agents</p>
        </div>
        <Button 
          variant="ai" 
          className="flex items-center gap-2 hover-lift" 
          onClick={() => setActiveTab("builder")}
        >
          <Plus className="w-4 h-4" />
          Create New Agent
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-2xl grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Bot className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="builder" className="flex items-center gap-2">
            <Workflow className="w-4 h-4" />
            Builder
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="training" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Training
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="card-ai hover-lift cursor-pointer transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Agents</p>
                    <p className="text-2xl font-bold">{agents.length}</p>
                  </div>
                  <Bot className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="card-ai hover-lift cursor-pointer transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Agents</p>
                    <p className="text-2xl font-bold">{agents.filter(agent => agent.status === 'active').length}</p>
                  </div>
                  <Play className="w-8 h-8 text-success" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="card-ai hover-lift cursor-pointer transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Conversations</p>
                    <p className="text-2xl font-bold">{agents.reduce((sum, agent) => sum + agent.conversations, 0).toLocaleString()}</p>
                  </div>
                  <MessageSquare className="w-8 h-8 text-accent" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="card-ai hover-lift cursor-pointer transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Accuracy</p>
                    <p className="text-2xl font-bold">{(agents.reduce((sum, agent) => sum + agent.accuracy, 0) / agents.length).toFixed(1)}%</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-warning" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Agents Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <Card key={agent.id} className="card-ai hover-lift transition-all duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{agent.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={getStatusVariant(agent.status)} className="flex items-center gap-1">
                            {getStatusIcon(agent.status)}
                            {agent.status}
                          </Badge>
                          <Switch 
                            checked={agent.status === 'active'}
                            onCheckedChange={() => handleStatusToggle(agent.id)}
                          />
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="hover-lift">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditAgent(agent)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Agent
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleViewAnalytics(agent)}>
                          <BarChart3 className="w-4 h-4 mr-2" />
                          View Analytics
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleCloneAgent(agent)}>
                          <Copy className="w-4 h-4 mr-2" />
                          Clone Agent
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteAgent(agent.id)} className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Agent
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{agent.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Conversations</p>
                      <p className="text-lg font-semibold">{agent.conversations.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Accuracy</p>
                      <p className="text-lg font-semibold">{agent.accuracy}%</p>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground">Last active: {agent.lastActive}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="glass" 
                      size="sm" 
                      className="flex-1 hover-lift"
                      onClick={() => handleEditAgent(agent)}
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="glass" 
                      size="sm" 
                      className="flex-1 hover-lift"
                      onClick={() => handleViewAnalytics(agent)}
                    >
                      <BarChart3 className="w-3 h-3 mr-1" />
                      Analytics
                    </Button>
                    <Button 
                      variant="glass" 
                      size="sm"
                      className="hover-lift"
                      onClick={() => handleCloneAgent(agent)}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="builder" className="mt-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold">Visual Agent Builder</h2>
                <p className="text-muted-foreground">Drag and drop components to build your AI agent workflow</p>
              </div>
              <AgentCanvas />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: 'api', name: 'REST API', icon: Database, status: 'active', color: 'bg-blue-500' },
              { id: 'webhook', name: 'Webhooks', icon: Zap, status: 'configured', color: 'bg-yellow-500' },
              { id: 'database', name: 'Database', icon: Database, status: 'active', color: 'bg-green-500' },
              { id: 'crm', name: 'CRM Systems', icon: Bot, status: 'available', color: 'bg-purple-500' },
              { id: 'messaging', name: 'Messaging Apps', icon: MessageSquare, status: 'available', color: 'bg-pink-500' },
              { id: 'analytics', name: 'Analytics', icon: BarChart3, status: 'configured', color: 'bg-orange-500' }
            ].map((integration) => (
              <Card key={integration.id} className="card-ai hover-lift transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 ${integration.color} rounded-lg flex items-center justify-center`}>
                        <integration.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{integration.name}</h3>
                        <Badge variant={integration.status === 'active' ? 'default' : 'secondary'} className="text-xs mt-1">
                          {integration.status === 'active' && <CheckCircle className="w-3 h-3 mr-1" />}
                          {integration.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      {integration.status === 'active' ? 'Connected and syncing' : 'Available to configure'}
                    </p>
                    <Button 
                      variant={integration.status === 'active' ? 'outline' : 'ai'} 
                      className="w-full"
                      size="sm"
                    >
                      {integration.status === 'active' ? (
                        <><Settings className="w-3 h-3 mr-2" />Configure</>
                      ) : (
                        <><Plus className="w-3 h-3 mr-2" />Connect</>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="training" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="card-ai lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Training Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm font-medium mb-2">Upload training documents</p>
                  <p className="text-xs text-muted-foreground">Drag and drop files or click to browse</p>
                  <p className="text-xs text-muted-foreground mt-2">Supports PDF, TXT, CSV, JSON</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">product_catalog.pdf</p>
                        <p className="text-xs text-muted-foreground">2.4 MB • Uploaded 2 days ago</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Processed</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">faq_database.csv</p>
                        <p className="text-xs text-muted-foreground">1.1 MB • Uploaded 5 days ago</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Processed</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-ai">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Training Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Documents</span>
                      <span className="text-sm font-semibold">24</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-primary w-3/4" />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Data Points</span>
                      <span className="text-sm font-semibold">12.5K</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-success w-4/5" />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Accuracy</span>
                      <span className="text-sm font-semibold">94.2%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-warning w-[94%]" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <Button variant="ai" className="w-full">
                    <Brain className="w-4 h-4 mr-2" />
                    Start Training
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="card-ai">
            <CardHeader>
              <CardTitle>Knowledge Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Database className="w-6 h-6" />
                  <span className="text-sm">Import from URL</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <MessageSquare className="w-6 h-6" />
                  <span className="text-sm">Chat History</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <FileText className="w-6 h-6" />
                  <span className="text-sm">Documentation</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Agent Modal */}
      <Dialog open={!!editingAgent} onOpenChange={() => setEditingAgent(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Agent</DialogTitle>
          </DialogHeader>
          {editingAgent && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="agentName">Agent Name</Label>
                <Input 
                  id="agentName"
                  value={editingAgent.name}
                  onChange={(e) => setEditingAgent({...editingAgent, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="agentDescription">Description</Label>
                <Textarea 
                  id="agentDescription"
                  value={editingAgent.description}
                  onChange={(e) => setEditingAgent({...editingAgent, description: e.target.value})}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSaveAgent} className="flex-1">
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setEditingAgent(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
