import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { 
  MessageSquare, 
  Users, 
  Search, 
  Filter,
  MoreVertical,
  Phone,
  Video,
  Send,
  Paperclip,
  Smile,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Bot,
  Globe,
  Facebook,
  MessageCircle,
  Zap,
  Tag,
  Star,
  Archive,
  Trash2,
  UserCheck,
  Building
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data for conversations
const mockConversations = [
  {
    id: "conv_001",
    customer: {
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      avatar: "https://avatar.vercel.sh/sarah",
      status: "online",
      location: "New York, USA",
      channel: "website"
    },
    status: "active",
    priority: "high",
    tags: ["billing", "urgent"],
    lastMessage: {
      text: "I need help with my recent payment",
      timestamp: "2 minutes ago",
      sender: "customer"
    },
    messages: [
      { id: 1, sender: "bot", text: "Hello! How can I help you today?", timestamp: "10:30 AM", type: "text" },
      { id: 2, sender: "customer", text: "I need help with my recent payment", timestamp: "10:32 AM", type: "text" },
      { id: 3, sender: "bot", text: "I'll help you with that. Let me check your payment history.", timestamp: "10:32 AM", type: "text" },
      { id: 4, sender: "customer", text: "Thank you", timestamp: "10:33 AM", type: "text" }
    ],
    satisfaction: 5,
    handoffRequested: false
  },
  {
    id: "conv_002", 
    customer: {
      name: "Mike Chen",
      email: "mike.chen@company.com",
      avatar: "https://avatar.vercel.sh/mike",
      status: "away",
      location: "San Francisco, USA",
      channel: "facebook"
    },
    status: "waiting",
    priority: "medium",
    tags: ["product-inquiry"],
    lastMessage: {
      text: "What are your pricing plans?",
      timestamp: "5 minutes ago", 
      sender: "customer"
    },
    messages: [
      { id: 1, sender: "customer", text: "Hi there", timestamp: "10:25 AM", type: "text" },
      { id: 2, sender: "bot", text: "Hello! Welcome to our support. How can I assist you today?", timestamp: "10:25 AM", type: "text" },
      { id: 3, sender: "customer", text: "What are your pricing plans?", timestamp: "10:26 AM", type: "text" }
    ],
    satisfaction: null,
    handoffRequested: true
  },
  {
    id: "conv_003",
    customer: {
      name: "Emily Davis",
      email: "emily.davis@email.com", 
      avatar: "https://avatar.vercel.sh/emily",
      status: "offline",
      location: "London, UK",
      channel: "whatsapp"
    },
    status: "resolved",
    priority: "low",
    tags: ["general-info"],
    lastMessage: {
      text: "Thank you for your help!",
      timestamp: "1 hour ago",
      sender: "customer"
    },
    messages: [
      { id: 1, sender: "customer", text: "Hello, I have a question about your services", timestamp: "9:15 AM", type: "text" },
      { id: 2, sender: "bot", text: "Of course! I'd be happy to help. What would you like to know?", timestamp: "9:15 AM", type: "text" },
      { id: 3, sender: "customer", text: "What are your business hours?", timestamp: "9:16 AM", type: "text" },
      { id: 4, sender: "bot", text: "We're available 24/7 through this chat, and our phone support is available Monday-Friday 9 AM - 6 PM EST.", timestamp: "9:16 AM", type: "text" },
      { id: 5, sender: "customer", text: "Thank you for your help!", timestamp: "9:17 AM", type: "text" }
    ],
    satisfaction: 5,
    handoffRequested: false
  }
]

const mockAgents = [
  { id: 1, name: "Alex Thompson", status: "online", avatar: "https://avatar.vercel.sh/alex", activeChats: 3 },
  { id: 2, name: "Maria Garcia", status: "busy", avatar: "https://avatar.vercel.sh/maria", activeChats: 5 },
  { id: 3, name: "David Kim", status: "away", avatar: "https://avatar.vercel.sh/david", activeChats: 1 },
  { id: 4, name: "Lisa Wang", status: "offline", avatar: "https://avatar.vercel.sh/lisa", activeChats: 0 }
]

const channelIcons = {
  website: Globe,
  facebook: Facebook, 
  whatsapp: MessageCircle,
  telegram: Send
}

export default function Conversations() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0])
  const [conversations, setConversations] = useState(mockConversations)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [newMessage, setNewMessage] = useState("")
  const [agents] = useState(mockAgents)
  const { toast } = useToast()

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || conv.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    
    const newMsg = {
      id: selectedConversation.messages.length + 1,
      sender: "agent" as const,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: "text" as const
    }
    
    setSelectedConversation(prev => ({
      ...prev,
      messages: [...prev.messages, newMsg]
    }))
    
    setNewMessage("")
    toast({
      title: "Message sent",
      description: "Your message has been delivered to the customer."
    })
  }

  const handleHandoffConversation = (conversationId: string) => {
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId 
        ? { ...conv, handoffRequested: true, status: "waiting" }
        : conv
    ))
    toast({
      title: "Handoff requested",
      description: "This conversation has been queued for human agent assignment."
    })
  }

  const handleAssignAgent = (conversationId: string, agentId: number) => {
    const agent = agents.find(a => a.id === agentId)
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId 
        ? { ...conv, handoffRequested: false, status: "active", assignedAgent: agent }
        : conv
    ))
    toast({
      title: "Agent assigned",
      description: `Conversation assigned to ${agent?.name}.`
    })
  }

  const handleStatusChange = (conversationId: string, newStatus: string) => {
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId 
        ? { ...conv, status: newStatus }
        : conv
    ))
    toast({
      title: "Status updated",
      description: `Conversation status changed to ${newStatus}.`
    })
  }

  const getChannelIcon = (channel: string) => {
    const IconComponent = channelIcons[channel as keyof typeof channelIcons] || Globe
    return IconComponent
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-success"
      case "waiting": return "text-warning" 
      case "resolved": return "text-muted-foreground"
      default: return "text-muted-foreground"
    }
  }

  const getAgentStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-success"
      case "busy": return "bg-warning"
      case "away": return "bg-orange-500"
      case "offline": return "bg-muted-foreground"
      default: return "bg-muted-foreground"
    }
  }

  return (
    <div className="flex-1 flex h-[calc(100vh-64px)]">
      {/* Conversations List */}
      <div className="w-80 border-r border-border bg-card/30 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Conversations</h2>
            <Badge variant="secondary" className="bg-gradient-primary text-white">
              {conversations.filter(c => c.status === "active").length} Active
            </Badge>
          </div>
          
          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {/* Filter Tabs */}
          <Tabs value={filterStatus} onValueChange={setFilterStatus}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
              <TabsTrigger value="active" className="text-xs">Active</TabsTrigger>
              <TabsTrigger value="waiting" className="text-xs">Queue</TabsTrigger>
              <TabsTrigger value="resolved" className="text-xs">Done</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Conversation List */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredConversations.map((conversation) => {
              const ChannelIcon = getChannelIcon(conversation.customer.channel)
              return (
                <Card 
                  key={conversation.id}
                  className={`mb-2 cursor-pointer hover-lift transition-all duration-200 ${
                    selectedConversation.id === conversation.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={conversation.customer.avatar} />
                          <AvatarFallback>{conversation.customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-card ${
                          conversation.customer.status === 'online' ? 'bg-success' : 
                          conversation.customer.status === 'away' ? 'bg-warning' : 'bg-muted-foreground'
                        }`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-sm truncate">{conversation.customer.name}</h4>
                          <div className="flex items-center gap-1">
                            <ChannelIcon className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{conversation.lastMessage.timestamp}</span>
                          </div>
                        </div>
                        
                        <p className="text-xs text-muted-foreground truncate mb-2">
                          {conversation.lastMessage.text}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getStatusColor(conversation.status)}`}
                            >
                              {conversation.status}
                            </Badge>
                            {conversation.priority === "high" && (
                              <AlertCircle className="w-3 h-3 text-destructive" />
                            )}
                          </div>
                          
                          <div className="flex gap-1">
                            {conversation.tags.map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="h-16 border-b border-border bg-card/50 backdrop-blur-sm px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={selectedConversation.customer.avatar} />
                <AvatarFallback>{selectedConversation.customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{selectedConversation.customer.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedConversation.customer.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={getStatusColor(selectedConversation.status)}>
                {selectedConversation.status}
              </Badge>
              {selectedConversation.handoffRequested && (
                <Badge variant="destructive">Handoff Requested</Badge>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {selectedConversation.messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'customer' ? 'justify-start' : 'justify-end'}`}>
                <div className={`flex gap-2 max-w-[70%] ${message.sender === 'customer' ? 'flex-row' : 'flex-row-reverse'}`}>
                  <Avatar className="w-6 h-6 mt-auto">
                    {message.sender === 'customer' ? (
                      <>
                        <AvatarImage src={selectedConversation.customer.avatar} />
                        <AvatarFallback><User className="w-3 h-3" /></AvatarFallback>
                      </>
                    ) : message.sender === 'bot' ? (
                      <AvatarFallback className="bg-gradient-primary text-white">
                        <Bot className="w-3 h-3" />
                      </AvatarFallback>
                    ) : (
                      <AvatarFallback className="bg-success text-white">
                        <UserCheck className="w-3 h-3" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  
                  <div className={`px-3 py-2 rounded-lg ${
                    message.sender === 'customer' 
                      ? 'bg-muted text-foreground' 
                      : message.sender === 'bot'
                      ? 'bg-gradient-primary text-white'
                      : 'bg-success text-white'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'customer' ? 'text-muted-foreground' : 'text-white/70'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Paperclip className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Smile className="w-4 h-4" />
            </Button>
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-gradient-primary hover:opacity-90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          {selectedConversation.handoffRequested && (
            <div className="mt-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-warning" />
                  <span className="text-sm">Customer requested human assistance</span>
                </div>
                <div className="flex gap-2">
                  {agents.filter(a => a.status === 'online').map(agent => (
                    <Button
                      key={agent.id}
                      variant="outline"
                      size="sm"
                      onClick={() => handleAssignAgent(selectedConversation.id, agent.id)}
                    >
                      Assign to {agent.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Customer Profile Sidebar */}
      <div className="w-80 border-l border-border bg-card/30 p-4">
        <div className="space-y-6">
          {/* Customer Info */}
          <Card className="card-ai">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <User className="w-4 h-4" />
                Customer Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={selectedConversation.customer.avatar} />
                  <AvatarFallback>{selectedConversation.customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{selectedConversation.customer.name}</h4>
                  <p className="text-sm text-muted-foreground">{selectedConversation.customer.email}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant="outline" className={getStatusColor(selectedConversation.customer.status)}>
                    {selectedConversation.customer.status}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Location:</span>
                  <span>{selectedConversation.customer.location}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Channel:</span>
                  <div className="flex items-center gap-1">
                    {(() => {
                      const ChannelIcon = getChannelIcon(selectedConversation.customer.channel)
                      return <ChannelIcon className="w-3 h-3" />
                    })()}
                    <span className="capitalize">{selectedConversation.customer.channel}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Conversation Actions */}
          <Card className="card-ai">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="glass" 
                className="w-full justify-start"
                onClick={() => handleHandoffConversation(selectedConversation.id)}
                disabled={selectedConversation.handoffRequested}
              >
                <UserCheck className="w-4 h-4 mr-2" />
                Request Human Handoff
              </Button>
              <Button variant="glass" className="w-full justify-start">
                <Tag className="w-4 h-4 mr-2" />
                Add Tags
              </Button>
              <Button variant="glass" className="w-full justify-start">
                <Star className="w-4 h-4 mr-2" />
                Mark Important
              </Button>
              <Button variant="glass" className="w-full justify-start">
                <Archive className="w-4 h-4 mr-2" />
                Archive Conversation
              </Button>
            </CardContent>
          </Card>

          {/* Live Agents */}
          <Card className="card-ai">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="w-4 h-4" />
                Available Agents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {agents.map(agent => (
                  <div key={agent.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={agent.avatar} />
                          <AvatarFallback className="text-xs">{agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-2 h-2 rounded-full border border-card ${getAgentStatusColor(agent.status)}`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{agent.name}</p>
                        <p className="text-xs text-muted-foreground">{agent.activeChats} active chats</p>
                      </div>
                    </div>
                    {agent.activeChats < 5 && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAssignAgent(selectedConversation.id, agent.id)}
                      >
                        Assign
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}