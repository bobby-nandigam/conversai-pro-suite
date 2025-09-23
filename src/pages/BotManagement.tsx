import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"
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
  Settings,
  Trash2,
  Eye,
  CheckCircle,
  AlertCircle,
  Clock
} from "lucide-react"

const initialBots = [
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
  const [bots, setBots] = useState(initialBots)
  const [editingBot, setEditingBot] = useState<any>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleStatusToggle = (botId: number) => {
    setBots(bots.map(bot => 
      bot.id === botId 
        ? { ...bot, status: bot.status === 'active' ? 'paused' : 'active' }
        : bot
    ))
    const bot = bots.find(b => b.id === botId)
    toast({
      title: `Bot ${bot?.status === 'active' ? 'paused' : 'activated'}`,
      description: `${bot?.name} is now ${bot?.status === 'active' ? 'paused' : 'active'}.`,
    })
  }

  const handleEditBot = (bot: any) => {
    setEditingBot({...bot})
  }

  const handleSaveBot = () => {
    if (editingBot) {
      setBots(bots.map(bot => 
        bot.id === editingBot.id ? editingBot : bot
      ))
      toast({
        title: "Bot updated",
        description: `${editingBot.name} has been updated successfully.`,
      })
      setEditingBot(null)
    }
  }

  const handleDeleteBot = (botId: number) => {
    const bot = bots.find(b => b.id === botId)
    setBots(bots.filter(bot => bot.id !== botId))
    toast({
      title: "Bot deleted",
      description: `${bot?.name} has been deleted.`,
      variant: "destructive"
    })
  }

  const handleCloneBot = (bot: any) => {
    const newBot = {
      ...bot,
      id: Math.max(...bots.map(b => b.id)) + 1,
      name: `${bot.name} (Copy)`,
      status: 'testing',
      conversations: 0,
      lastActive: 'Just created'
    }
    setBots([...bots, newBot])
    toast({
      title: "Bot cloned",
      description: `${newBot.name} has been created.`,
    })
  }

  const handleViewAnalytics = (bot: any) => {
    navigate('/analytics', { state: { selectedBot: bot } })
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
          <h1 className="text-3xl font-bold tracking-tight">Bot Management</h1>
          <p className="text-muted-foreground">Create, configure, and monitor your AI assistants</p>
        </div>
        <Button 
          variant="ai" 
          className="flex items-center gap-2 hover-lift" 
          onClick={() => navigate('/bots/builder')}
        >
          <Plus className="w-4 h-4" />
          Create New Bot
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="card-ai hover-lift cursor-pointer transition-all duration-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Bots</p>
                <p className="text-2xl font-bold">{bots.length}</p>
              </div>
              <Bot className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-ai hover-lift cursor-pointer transition-all duration-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Bots</p>
                <p className="text-2xl font-bold">{bots.filter(bot => bot.status === 'active').length}</p>
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
                <p className="text-2xl font-bold">{bots.reduce((sum, bot) => sum + bot.conversations, 0).toLocaleString()}</p>
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
                <p className="text-2xl font-bold">{(bots.reduce((sum, bot) => sum + bot.accuracy, 0) / bots.length).toFixed(1)}%</p>
              </div>
              <BarChart3 className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bots Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {bots.map((bot) => (
          <Card key={bot.id} className="card-ai hover-lift transition-all duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{bot.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={getStatusVariant(bot.status)} className="flex items-center gap-1">
                        {getStatusIcon(bot.status)}
                        {bot.status}
                      </Badge>
                      <Switch 
                        checked={bot.status === 'active'}
                        onCheckedChange={() => handleStatusToggle(bot.id)}
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
                    <DropdownMenuItem onClick={() => handleEditBot(bot)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Bot
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleViewAnalytics(bot)}>
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Analytics
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleCloneBot(bot)}>
                      <Copy className="w-4 h-4 mr-2" />
                      Clone Bot
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeleteBot(bot.id)} className="text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Bot
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{bot.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Conversations</p>
                  <p className="text-lg font-semibold">{bot.conversations.toLocaleString()}</p>
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
                <Button 
                  variant="glass" 
                  size="sm" 
                  className="flex-1 hover-lift"
                  onClick={() => handleEditBot(bot)}
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="glass" 
                  size="sm" 
                  className="flex-1 hover-lift"
                  onClick={() => handleViewAnalytics(bot)}
                >
                  <BarChart3 className="w-3 h-3 mr-1" />
                  Analytics
                </Button>
                <Button 
                  variant="glass" 
                  size="sm"
                  className="hover-lift"
                  onClick={() => handleCloneBot(bot)}
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Bot Modal */}
      <Dialog open={!!editingBot} onOpenChange={() => setEditingBot(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Bot</DialogTitle>
          </DialogHeader>
          {editingBot && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="botName">Bot Name</Label>
                <Input 
                  id="botName"
                  value={editingBot.name}
                  onChange={(e) => setEditingBot({...editingBot, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="botDescription">Description</Label>
                <Textarea 
                  id="botDescription"
                  value={editingBot.description}
                  onChange={(e) => setEditingBot({...editingBot, description: e.target.value})}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSaveBot} className="flex-1">
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setEditingBot(null)}>
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