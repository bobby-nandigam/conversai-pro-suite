import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
  Users,
  Settings
} from "lucide-react"

const bots = [
  {
    id: 1,
    name: "Customer Support Bot",
    description: "Handles customer inquiries and support tickets",
    status: "active",
    conversations: 1247,
    accuracy: 94.2,
    lastActive: "2 minutes ago"
  },
  {
    id: 2,
    name: "Sales Assistant",
    description: "Qualified leads and product recommendations",
    status: "active", 
    conversations: 892,
    accuracy: 91.8,
    lastActive: "5 minutes ago"
  },
  {
    id: 3,
    name: "HR Helper",
    description: "Employee onboarding and HR processes",
    status: "paused",
    conversations: 156,
    accuracy: 88.5,
    lastActive: "1 hour ago"
  },
  {
    id: 4,
    name: "Product Guide",
    description: "Product demos and technical documentation",
    status: "testing",
    conversations: 45,
    accuracy: 96.1,
    lastActive: "30 minutes ago"
  }
]

export default function BotManagement() {
  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bot Management</h1>
          <p className="text-muted-foreground">Create, configure, and monitor your AI assistants</p>
        </div>
        <Button variant="ai" className="flex items-center gap-2" onClick={() => window.open('/bots/builder', '_blank')}>
          <Plus className="w-4 h-4" />
          Create New Bot
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="card-ai">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Bots</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Bot className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-ai">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Bots</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <Play className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-ai">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Conversations</p>
                <p className="text-2xl font-bold">2.3k</p>
              </div>
              <MessageSquare className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-ai">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Accuracy</p>
                <p className="text-2xl font-bold">92.6%</p>
              </div>
              <BarChart3 className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bots Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {bots.map((bot) => (
          <Card key={bot.id} className="card-ai hover-lift">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{bot.name}</CardTitle>
                    <Badge variant={
                      bot.status === 'active' ? 'default' : 
                      bot.status === 'paused' ? 'secondary' : 
                      'outline'
                    }>
                      {bot.status}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{bot.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Conversations</p>
                  <p className="text-lg font-semibold">{bot.conversations}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Accuracy</p>
                  <p className="text-lg font-semibold">{bot.accuracy}%</p>
                </div>
              </div>
              
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground">Last active: {bot.lastActive}</p>
              </div>
              
              <div className="flex gap-2">
                <Button variant="glass" size="sm" className="flex-1">
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button variant="glass" size="sm" className="flex-1">
                  <BarChart3 className="w-3 h-3 mr-1" />
                  Analytics
                </Button>
                <Button variant="glass" size="sm">
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}