import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
  Building,
  Mail,
  MapPin,
  Calendar,
  TrendingUp,
  Activity,
  FileText,
  Image,
  Plus,
  X,
  ChevronDown,
  BarChart3,
  Target,
  Timer,
  Settings,
  Download,
  Upload,
  CheckCheck,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Lightbulb,
  Sparkles,
  BookOpen,
  Hash,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Bookmark,
  Flag,
  ShieldCheck,
  Lock,
  AlertTriangle,
  Info
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

// Types
type Message = {
  id: number
  sender: string
  text: string
  timestamp: string
  type: string
  read: boolean
}

type Conversation = {
  id: string
  customer: {
    name: string
    email: string
    avatar: string
    status: string
    location: string
    channel: string
    company: string
    phone: string
    lastSeen: string
    totalConversations: number
    customerSince: string
    lifetimeValue: string
  }
  status: string
  priority: string
  tags: string[]
  sentiment: string
  slaStatus: string
  responseTime: string
  lastMessage: {
    text: string
    timestamp: string
    sender: string
  }
  messages: Message[]
  satisfaction: number | null
  handoffRequested: boolean
  assignedAgent: { id: number, name: string } | null
  notes: string
  isTyping: boolean
}

// Enhanced mock data
const mockConversations: Conversation[] = [
  {
    id: "conv_001",
    customer: {
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      avatar: "https://avatar.vercel.sh/sarah",
      status: "online",
      location: "New York, USA",
      channel: "website",
      company: "TechCorp Inc",
      phone: "+1 (555) 123-4567",
      lastSeen: "Just now",
      totalConversations: 12,
      customerSince: "Jan 2023",
      lifetimeValue: "$12,450"
    },
    status: "active",
    priority: "high",
    tags: ["billing", "urgent", "vip"],
    sentiment: "negative",
    slaStatus: "warning",
    responseTime: "2m",
    lastMessage: {
      text: "I need help with my recent payment",
      timestamp: "2 minutes ago",
      sender: "customer"
    },
    messages: [
      { id: 1, sender: "bot", text: "Hello! How can I help you today?", timestamp: "10:30 AM", type: "text", read: true },
      { id: 2, sender: "customer", text: "I need help with my recent payment", timestamp: "10:32 AM", type: "text", read: true },
      { id: 3, sender: "bot", text: "I'll help you with that. Let me check your payment history.", timestamp: "10:32 AM", type: "text", read: true },
      { id: 4, sender: "customer", text: "Thank you", timestamp: "10:33 AM", type: "text", read: false }
    ],
    satisfaction: null,
    handoffRequested: false,
    assignedAgent: null,
    notes: "VIP customer - handle with priority",
    isTyping: false
  },
  {
    id: "conv_002", 
    customer: {
      name: "Mike Chen",
      email: "mike.chen@company.com",
      avatar: "https://avatar.vercel.sh/mike",
      status: "away",
      location: "San Francisco, USA",
      channel: "facebook",
      company: "StartupXYZ",
      phone: "+1 (555) 234-5678",
      lastSeen: "5 minutes ago",
      totalConversations: 8,
      customerSince: "Mar 2023",
      lifetimeValue: "$8,200"
    },
    status: "waiting",
    priority: "medium",
    tags: ["product-inquiry", "sales"],
    sentiment: "neutral",
    slaStatus: "ok",
    responseTime: "5m",
    lastMessage: {
      text: "What are your pricing plans?",
      timestamp: "5 minutes ago", 
      sender: "customer"
    },
    messages: [
      { id: 1, sender: "customer", text: "Hi there", timestamp: "10:25 AM", type: "text", read: true },
      { id: 2, sender: "bot", text: "Hello! Welcome to our support. How can I assist you today?", timestamp: "10:25 AM", type: "text", read: true },
      { id: 3, sender: "customer", text: "What are your pricing plans?", timestamp: "10:26 AM", type: "text", read: false }
    ],
    satisfaction: null,
    handoffRequested: true,
    assignedAgent: null,
    notes: "",
    isTyping: false
  },
  {
    id: "conv_003",
    customer: {
      name: "Emily Davis",
      email: "emily.davis@email.com", 
      avatar: "https://avatar.vercel.sh/emily",
      status: "offline",
      location: "London, UK",
      channel: "whatsapp",
      company: "Global Solutions",
      phone: "+44 20 1234 5678",
      lastSeen: "1 hour ago",
      totalConversations: 5,
      customerSince: "May 2023",
      lifetimeValue: "$5,600"
    },
    status: "resolved",
    priority: "low",
    tags: ["general-info", "satisfied"],
    sentiment: "positive",
    slaStatus: "met",
    responseTime: "1m",
    lastMessage: {
      text: "Thank you for your help!",
      timestamp: "1 hour ago",
      sender: "customer"
    },
    messages: [
      { id: 1, sender: "customer", text: "Hello, I have a question about your services", timestamp: "9:15 AM", type: "text", read: true },
      { id: 2, sender: "bot", text: "Of course! I'd be happy to help. What would you like to know?", timestamp: "9:15 AM", type: "text", read: true },
      { id: 3, sender: "customer", text: "What are your business hours?", timestamp: "9:16 AM", type: "text", read: true },
      { id: 4, sender: "bot", text: "We're available 24/7 through this chat, and our phone support is available Monday-Friday 9 AM - 6 PM EST.", timestamp: "9:16 AM", type: "text", read: true },
      { id: 5, sender: "customer", text: "Thank you for your help!", timestamp: "9:17 AM", type: "text", read: true }
    ],
    satisfaction: 5,
    handoffRequested: false,
    assignedAgent: { id: 1, name: "Alex Thompson" },
    notes: "Resolved quickly",
    isTyping: false
  },
  {
    id: "conv_004",
    customer: {
      name: "James Wilson",
      email: "james.w@enterprise.com",
      avatar: "https://avatar.vercel.sh/james",
      status: "online",
      location: "Toronto, Canada",
      channel: "website",
      company: "Enterprise Corp",
      phone: "+1 (555) 345-6789",
      lastSeen: "Just now",
      totalConversations: 24,
      customerSince: "Nov 2022",
      lifetimeValue: "$25,890"
    },
    status: "active",
    priority: "high",
    tags: ["enterprise", "technical", "urgent"],
    sentiment: "neutral",
    slaStatus: "warning",
    responseTime: "3m",
    lastMessage: {
      text: "The API integration is not working",
      timestamp: "3 minutes ago",
      sender: "customer"
    },
    messages: [
      { id: 1, sender: "customer", text: "The API integration is not working", timestamp: "10:35 AM", type: "text", read: false }
    ],
    satisfaction: null,
    handoffRequested: false,
    assignedAgent: null,
    notes: "Enterprise customer - escalate if needed",
    isTyping: true
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

const cannedResponses = [
  { id: 1, title: "Greeting", text: "Hello! Thank you for reaching out. How can I assist you today?" },
  { id: 2, title: "Thank You", text: "Thank you for your patience. Is there anything else I can help you with?" },
  { id: 3, title: "Transfer", text: "I'm transferring you to a specialist who can better assist with your request." },
  { id: 4, title: "Follow-up", text: "I'll follow up with you shortly regarding this matter." }
]

export default function Conversations() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation>(mockConversations[0])
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [newMessage, setNewMessage] = useState("")
  const [agents] = useState(mockAgents)
  const [showCannedResponses, setShowCannedResponses] = useState(false)
  const [showNotesDialog, setShowNotesDialog] = useState(false)
  const [conversationNotes, setConversationNotes] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const { toast } = useToast()

  const filteredConversations = conversations
    .filter(conv => {
      const matchesSearch = conv.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           conv.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           conv.customer.company.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === "all" || conv.status === filterStatus
      const matchesPriority = filterPriority === "all" || conv.priority === filterPriority
      return matchesSearch && matchesStatus && matchesPriority
    })
    .sort((a, b) => {
      if (sortBy === "recent") return 0
      if (sortBy === "priority") {
        const priorityOrder = { high: 0, medium: 1, low: 2 }
        return priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder]
      }
      return 0
    })

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    
    const newMsg: Message = {
      id: selectedConversation.messages.length + 1,
      sender: "agent",
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: "text",
      read: true
    }
    
    setSelectedConversation(prev => ({
      ...prev,
      messages: [...prev.messages, newMsg]
    }))
    
    setConversations(prevConvs => prevConvs.map(conv =>
      conv.id === selectedConversation.id
        ? { ...conv, messages: [...conv.messages, newMsg] }
        : conv
    ))
    
    setNewMessage("")
    toast({
      title: "Message sent",
      description: "Your message has been delivered to the customer."
    })
  }

  const handleUseCannedResponse = (text: string) => {
    setNewMessage(text)
    setShowCannedResponses(false)
  }

  const handleHandoffConversation = (conversationId: string) => {
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId 
        ? { ...conv, handoffRequested: true, status: "waiting" }
        : conv
    ))
    if (selectedConversation.id === conversationId) {
      setSelectedConversation(prev => ({ ...prev, handoffRequested: true, status: "waiting" }))
    }
    toast({
      title: "Handoff requested",
      description: "This conversation has been queued for human agent assignment."
    })
  }

  const handleAssignAgent = (conversationId: string, agentId: number) => {
    const agent = agents.find(a => a.id === agentId)
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId 
        ? { ...conv, handoffRequested: false, status: "active", assignedAgent: agent || null }
        : conv
    ))
    if (selectedConversation.id === conversationId) {
      setSelectedConversation(prev => ({ ...prev, handoffRequested: false, status: "active", assignedAgent: agent || null }))
    }
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
    if (selectedConversation.id === conversationId) {
      setSelectedConversation(prev => ({ ...prev, status: newStatus }))
    }
    toast({
      title: "Status updated",
      description: `Conversation status changed to ${newStatus}.`
    })
  }

  const handleSaveNotes = () => {
    setSelectedConversation(prev => ({ ...prev, notes: conversationNotes }))
    setShowNotesDialog(false)
    toast({
      title: "Notes saved",
      description: "Conversation notes have been updated."
    })
  }

  const handleAddTag = (tag: string) => {
    if (!selectedConversation.tags.includes(tag)) {
      setSelectedConversation(prev => ({ ...prev, tags: [...prev.tags, tag] }))
      setConversations(prevConvs => prevConvs.map(conv =>
        conv.id === selectedConversation.id
          ? { ...conv, tags: [...conv.tags, tag] }
          : conv
      ))
    }
  }

  const handleRemoveTag = (tag: string) => {
    setSelectedConversation(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }))
    setConversations(prevConvs => prevConvs.map(conv =>
      conv.id === selectedConversation.id
        ? { ...conv, tags: conv.tags.filter(t => t !== tag) }
        : conv
    ))
  }

  const getChannelIcon = (channel: string) => {
    const IconComponent = channelIcons[channel as keyof typeof channelIcons] || Globe
    return IconComponent
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-success border-success/30 bg-success/10"
      case "waiting": return "text-warning border-warning/30 bg-warning/10" 
      case "resolved": return "text-muted-foreground border-border bg-muted/30"
      default: return "text-muted-foreground border-border bg-muted/30"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-destructive border-destructive/30 bg-destructive/10"
      case "medium": return "text-warning border-warning/30 bg-warning/10"
      case "low": return "text-muted-foreground border-border bg-muted/30"
      default: return "text-muted-foreground border-border bg-muted/30"
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return <ThumbsUp className="w-3 h-3 text-success" />
      case "negative": return <ThumbsDown className="w-3 h-3 text-destructive" />
      case "neutral": return <Activity className="w-3 h-3 text-muted-foreground" />
      default: return null
    }
  }

  const getSLAColor = (slaStatus: string) => {
    switch (slaStatus) {
      case "met": return "bg-success"
      case "ok": return "bg-warning"
      case "warning": return "bg-destructive"
      default: return "bg-muted-foreground"
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
      <div className="w-[380px] border-r border-border bg-gradient-to-b from-background to-muted/20 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border bg-background/80 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-primary">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Conversations</h2>
                <p className="text-xs text-muted-foreground">Manage all customer chats</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-gradient-primary text-white font-semibold px-3 py-1">
              {conversations.filter(c => c.status === "active").length}
            </Badge>
          </div>
          
          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background/50"
            />
          </div>
          
          {/* Filters */}
          <div className="flex gap-2 mb-3">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="flex-1 h-9 text-xs">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="waiting">Waiting</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="flex-1 h-9 text-xs">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[100px] h-9 text-xs">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Recent</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-2">
            <Card className="p-2 bg-background/50">
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">Active</p>
                <p className="text-lg font-bold text-success">{conversations.filter(c => c.status === "active").length}</p>
              </div>
            </Card>
            <Card className="p-2 bg-background/50">
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">Waiting</p>
                <p className="text-lg font-bold text-warning">{conversations.filter(c => c.status === "waiting").length}</p>
              </div>
            </Card>
            <Card className="p-2 bg-background/50">
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">Resolved</p>
                <p className="text-lg font-bold text-muted-foreground">{conversations.filter(c => c.status === "resolved").length}</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Conversation List */}
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-2">
            {filteredConversations.map((conversation) => {
              const ChannelIcon = getChannelIcon(conversation.customer.channel)
              return (
                <Card 
                  key={conversation.id}
                  className={`cursor-pointer hover-lift transition-all duration-300 ${
                    selectedConversation.id === conversation.id 
                      ? 'ring-2 ring-primary shadow-lg bg-gradient-to-r from-primary/10 to-primary/5' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="relative flex-shrink-0">
                        <Avatar className="w-10 h-10 border-2 border-background">
                          <AvatarImage src={conversation.customer.avatar} />
                          <AvatarFallback className="text-xs font-semibold">
                            {conversation.customer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-background ${
                          conversation.customer.status === 'online' ? 'bg-success' : 
                          conversation.customer.status === 'away' ? 'bg-warning' : 'bg-muted-foreground'
                        }`} />
                        <div className={`absolute -top-1 -left-1 w-2 h-2 rounded-full ${getSLAColor(conversation.slaStatus)}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <h4 className="font-semibold text-sm truncate">{conversation.customer.name}</h4>
                              {getSentimentIcon(conversation.sentiment)}
                            </div>
                            <p className="text-xs text-muted-foreground truncate flex items-center gap-1">
                              <Building className="w-3 h-3" />
                              {conversation.customer.company}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-1 ml-2">
                            <div className="flex items-center gap-1">
                              <ChannelIcon className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{conversation.lastMessage.timestamp}</span>
                            </div>
                            {conversation.messages.some(m => !m.read) && (
                              <Badge variant="destructive" className="h-5 px-1.5 text-xs">New</Badge>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-xs text-muted-foreground truncate mb-2">
                          {conversation.lastMessage.text}
                        </p>
                        
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1 flex-wrap">
                            <Badge variant="outline" className={`text-xs px-2 py-0.5 ${getStatusColor(conversation.status)}`}>
                              {conversation.status}
                            </Badge>
                            <Badge variant="outline" className={`text-xs px-2 py-0.5 ${getPriorityColor(conversation.priority)}`}>
                              {conversation.priority}
                            </Badge>
                            {conversation.isTyping && (
                              <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-primary/10 text-primary animate-pulse">
                                typing...
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-1">
                            {conversation.tags.slice(0, 2).map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs px-1.5 py-0.5">
                                {tag}
                              </Badge>
                            ))}
                            {conversation.tags.length > 2 && (
                              <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                                +{conversation.tags.length - 2}
                              </Badge>
                            )}
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
      <div className="flex-1 flex flex-col bg-gradient-to-b from-background to-muted/10">
        {/* Chat Header */}
        <div className="h-20 border-b border-border bg-background/95 backdrop-blur-sm px-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="w-12 h-12 border-2 border-primary/20">
                  <AvatarImage src={selectedConversation.customer.avatar} />
                  <AvatarFallback className="text-sm font-semibold">
                    {selectedConversation.customer.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${
                  selectedConversation.customer.status === 'online' ? 'bg-success' : 
                  selectedConversation.customer.status === 'away' ? 'bg-warning' : 'bg-muted-foreground'
                }`} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-base">{selectedConversation.customer.name}</h3>
                  {getSentimentIcon(selectedConversation.sentiment)}
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    {selectedConversation.customer.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Building className="w-3 h-3" />
                    {selectedConversation.customer.company}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {selectedConversation.customer.lastSeen}
                  </span>
                </div>
              </div>
            </div>
            
            <Separator orientation="vertical" className="h-10" />

            <div className="flex items-center gap-2">
              <Badge variant="outline" className={`${getStatusColor(selectedConversation.status)} font-medium`}>
                <Activity className="w-3 h-3 mr-1" />
                {selectedConversation.status}
              </Badge>
              <Badge variant="outline" className={`${getPriorityColor(selectedConversation.priority)} font-medium`}>
                <Flag className="w-3 h-3 mr-1" />
                {selectedConversation.priority}
              </Badge>
              {selectedConversation.handoffRequested && (
                <Badge variant="destructive" className="animate-pulse">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Handoff Requested
                </Badge>
              )}
              {selectedConversation.assignedAgent && (
                <Badge variant="secondary" className="bg-success/10 text-success border-success/30">
                  <UserCheck className="w-3 h-3 mr-1" />
                  {selectedConversation.assignedAgent.name}
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="hover-lift">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" className="hover-lift">
              <Video className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" className="hover-lift">
              <Star className="w-4 h-4" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="hover-lift">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleStatusChange(selectedConversation.id, "active")}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark as Active
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange(selectedConversation.id, "resolved")}>
                  <CheckCheck className="w-4 h-4 mr-2" />
                  Mark as Resolved
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Archive className="w-4 h-4 mr-2" />
                  Archive Conversation
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="w-4 h-4 mr-2" />
                  Export Conversation
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Conversation
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6 max-w-4xl mx-auto">
            {selectedConversation.messages.map((message, index) => (
              <div key={message.id}>
                {/* Date separator */}
                {index === 0 && (
                  <div className="flex items-center gap-4 mb-6">
                    <Separator className="flex-1" />
                    <span className="text-xs text-muted-foreground font-medium px-3 py-1 bg-muted/50 rounded-full">
                      Today
                    </span>
                    <Separator className="flex-1" />
                  </div>
                )}
                
                <div className={`flex ${message.sender === 'customer' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`flex gap-3 max-w-[75%] ${message.sender === 'customer' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <Avatar className="w-8 h-8 mt-auto flex-shrink-0 border-2 border-background shadow-sm">
                      {message.sender === 'customer' ? (
                        <>
                          <AvatarImage src={selectedConversation.customer.avatar} />
                          <AvatarFallback className="bg-muted">
                            <User className="w-4 h-4" />
                          </AvatarFallback>
                        </>
                      ) : message.sender === 'bot' ? (
                        <AvatarFallback className="bg-gradient-primary text-white">
                          <Bot className="w-4 h-4" />
                        </AvatarFallback>
                      ) : (
                        <AvatarFallback className="bg-success text-white">
                          <UserCheck className="w-4 h-4" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    
                    <div className="flex flex-col gap-1">
                      <div className={`px-4 py-3 rounded-2xl shadow-sm ${
                        message.sender === 'customer' 
                          ? 'bg-card border border-border text-foreground rounded-tl-sm' 
                          : message.sender === 'bot'
                          ? 'bg-gradient-primary text-white rounded-tr-sm'
                          : 'bg-success text-white rounded-tr-sm'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      </div>
                      <div className={`flex items-center gap-2 px-2 ${message.sender === 'customer' ? 'flex-row' : 'flex-row-reverse'}`}>
                        <p className="text-xs text-muted-foreground">{message.timestamp}</p>
                        {message.sender !== 'customer' && (
                          <div className="flex items-center gap-1">
                            {message.read ? (
                              <CheckCheck className="w-3 h-3 text-primary" />
                            ) : (
                              <CheckCircle className="w-3 h-3 text-muted-foreground" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {selectedConversation.isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[75%]">
                  <Avatar className="w-8 h-8 mt-auto flex-shrink-0 border-2 border-background shadow-sm">
                    <AvatarImage src={selectedConversation.customer.avatar} />
                    <AvatarFallback className="bg-muted">
                      <User className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-card border border-border">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* AI Suggestions Banner */}
        {selectedConversation.sentiment === "negative" && (
          <div className="mx-6 mb-2">
            <Card className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/30">
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground mb-1">AI Suggestion</p>
                    <p className="text-xs text-muted-foreground">Customer seems frustrated. Consider offering a discount or escalating to a senior agent.</p>
                  </div>
                  <Button size="sm" variant="outline" className="border-amber-500/30 text-amber-600 hover:bg-amber-500/10">
                    Apply
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Handoff Banner */}
        {selectedConversation.handoffRequested && (
          <div className="mx-6 mb-2">
            <Card className="bg-gradient-to-r from-destructive/10 to-destructive/5 border-destructive/30">
              <CardContent className="p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">Handoff Requested</p>
                      <p className="text-xs text-muted-foreground">Customer requested human assistance</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {agents.filter(a => a.status === 'online').slice(0, 3).map(agent => (
                      <Button
                        key={agent.id}
                        variant="outline"
                        size="sm"
                        onClick={() => handleAssignAgent(selectedConversation.id, agent.id)}
                        className="hover-lift"
                      >
                        <UserCheck className="w-3 h-3 mr-1" />
                        {agent.name.split(' ')[0]}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Message Input */}
        <div className="border-t border-border bg-background/95 backdrop-blur-sm p-4">
          <div className="max-w-4xl mx-auto">
            {/* Quick Actions Bar */}
            <div className="flex items-center gap-2 mb-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCannedResponses(!showCannedResponses)}
                className="hover-lift"
              >
                <Sparkles className="w-3 h-3 mr-1" />
                Quick Reply
              </Button>
              <Button variant="outline" size="sm" className="hover-lift">
                <Paperclip className="w-3 h-3 mr-1" />
                Attach
              </Button>
              <Button variant="outline" size="sm" className="hover-lift">
                <Image className="w-3 h-3 mr-1" />
                Image
              </Button>
              <Button variant="outline" size="sm" className="hover-lift">
                <FileText className="w-3 h-3 mr-1" />
                Template
              </Button>
              
              <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
                <Timer className="w-3 h-3" />
                <span>Avg response: {selectedConversation.responseTime}</span>
                <div className={`w-2 h-2 rounded-full ml-2 ${getSLAColor(selectedConversation.slaStatus)}`} />
                <span>SLA {selectedConversation.slaStatus}</span>
              </div>
            </div>

            {/* Canned Responses */}
            {showCannedResponses && (
              <div className="mb-3 grid grid-cols-2 gap-2 p-3 bg-muted/30 rounded-lg border border-border animate-fade-in">
                {cannedResponses.map(response => (
                  <Button
                    key={response.id}
                    variant="outline"
                    size="sm"
                    onClick={() => handleUseCannedResponse(response.text)}
                    className="justify-start text-left hover-lift h-auto py-2"
                  >
                    <BookOpen className="w-3 h-3 mr-2 flex-shrink-0" />
                    <div className="overflow-hidden">
                      <p className="text-xs font-medium mb-0.5">{response.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{response.text}</p>
                    </div>
                  </Button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="flex items-end gap-2">
              <div className="flex-1 relative">
                <Textarea
                  placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  className="min-h-[52px] max-h-32 pr-10 resize-none"
                  rows={1}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 bottom-2 h-7 w-7"
                >
                  <Smile className="w-4 h-4" />
                </Button>
              </div>
              <Button 
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="bg-gradient-primary hover:opacity-90 h-[52px] px-6 hover-lift"
                size="lg"
              >
                <Send className="w-4 h-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Customer Profile Sidebar */}
      <div className="w-[340px] border-l border-border bg-gradient-to-b from-background to-muted/20 overflow-y-auto">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4">
            {/* Customer Profile Card */}
            <Card className="bg-gradient-to-br from-card to-card/50 shadow-lg border-border/50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-primary/10">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    Customer Profile
                  </CardTitle>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Settings className="w-3 h-3" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center text-center pb-4 border-b border-border">
                  <Avatar className="w-20 h-20 mb-3 border-4 border-background shadow-lg">
                    <AvatarImage src={selectedConversation.customer.avatar} />
                    <AvatarFallback className="text-lg font-bold">
                      {selectedConversation.customer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-lg mb-1">{selectedConversation.customer.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{selectedConversation.customer.email}</p>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">
                      {selectedConversation.customer.status}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Customer since {selectedConversation.customer.customerSince}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Card className="p-3 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                    <p className="text-xs text-muted-foreground mb-1">Total Value</p>
                    <p className="text-lg font-bold text-primary">{selectedConversation.customer.lifetimeValue}</p>
                  </Card>
                  <Card className="p-3 bg-gradient-to-br from-success/5 to-success/10 border-success/20">
                    <p className="text-xs text-muted-foreground mb-1">Conversations</p>
                    <p className="text-lg font-bold text-success">{selectedConversation.customer.totalConversations}</p>
                  </Card>
                </div>

                <Separator />
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Phone className="w-3 h-3" />
                      Phone
                    </span>
                    <span className="font-medium">{selectedConversation.customer.phone}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      Location
                    </span>
                    <span className="font-medium">{selectedConversation.customer.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Building className="w-3 h-3" />
                      Company
                    </span>
                    <span className="font-medium">{selectedConversation.customer.company}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      {(() => {
                        const ChannelIcon = getChannelIcon(selectedConversation.customer.channel)
                        return <ChannelIcon className="w-3 h-3" />
                      })()}
                      Channel
                    </span>
                    <span className="font-medium capitalize">{selectedConversation.customer.channel}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sentiment & SLA Card */}
            <Card className="bg-gradient-to-br from-card to-card/50 shadow-lg border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-primary/10">
                    <Activity className="w-4 h-4 text-primary" />
                  </div>
                  Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Sentiment</span>
                      <Badge variant="outline" className={
                        selectedConversation.sentiment === 'positive' ? 'text-success border-success/30' :
                        selectedConversation.sentiment === 'negative' ? 'text-destructive border-destructive/30' :
                        'text-muted-foreground'
                      }>
                        {getSentimentIcon(selectedConversation.sentiment)}
                        <span className="ml-1 capitalize">{selectedConversation.sentiment}</span>
                      </Badge>
                    </div>
                    <Progress 
                      value={
                        selectedConversation.sentiment === 'positive' ? 100 :
                        selectedConversation.sentiment === 'neutral' ? 50 : 20
                      } 
                      className="h-2"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Response Time</span>
                      <span className="text-sm font-semibold">{selectedConversation.responseTime}</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">SLA Status</span>
                      <Badge variant="outline" className={
                        selectedConversation.slaStatus === 'met' ? 'text-success border-success/30' :
                        selectedConversation.slaStatus === 'ok' ? 'text-warning border-warning/30' :
                        'text-destructive border-destructive/30'
                      }>
                        {selectedConversation.slaStatus.toUpperCase()}
                      </Badge>
                    </div>
                    <Progress 
                      value={
                        selectedConversation.slaStatus === 'met' ? 100 :
                        selectedConversation.slaStatus === 'ok' ? 60 : 30
                      } 
                      className="h-2"
                    />
                  </div>
                </div>

                {selectedConversation.satisfaction && (
                  <div className="pt-3 border-t border-border">
                    <span className="text-sm text-muted-foreground mb-2 block">Satisfaction Rating</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= selectedConversation.satisfaction!
                              ? 'fill-warning text-warning'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tags Card */}
            <Card className="bg-gradient-to-br from-card to-card/50 shadow-lg border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-primary/10">
                    <Tag className="w-4 h-4 text-primary" />
                  </div>
                  Tags
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {selectedConversation.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs pl-2 pr-1 py-1">
                      {tag}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 hover:bg-destructive/20"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Input 
                    placeholder="Add new tag..."
                    className="h-8 text-xs"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddTag((e.target as HTMLInputElement).value)
                        ;(e.target as HTMLInputElement).value = ''
                      }
                    }}
                  />
                  <Button size="sm" variant="outline" className="h-8 px-2">
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions Card */}
            <Card className="bg-gradient-to-br from-card to-card/50 shadow-lg border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-primary/10">
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start hover-lift"
                  onClick={() => handleHandoffConversation(selectedConversation.id)}
                  disabled={selectedConversation.handoffRequested}
                >
                  <UserCheck className="w-4 h-4 mr-2" />
                  Request Handoff
                </Button>
                
                <Dialog open={showNotesDialog} onOpenChange={setShowNotesDialog}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start hover-lift"
                      onClick={() => setConversationNotes(selectedConversation.notes)}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Add Notes
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Conversation Notes</DialogTitle>
                      <DialogDescription>
                        Add internal notes about this conversation
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <Textarea
                        value={conversationNotes}
                        onChange={(e) => setConversationNotes(e.target.value)}
                        placeholder="Enter notes..."
                        rows={5}
                      />
                      <Button onClick={handleSaveNotes} className="w-full">
                        Save Notes
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" className="w-full justify-start hover-lift">
                  <Star className="w-4 h-4 mr-2" />
                  Mark Important
                </Button>
                <Button variant="outline" className="w-full justify-start hover-lift">
                  <Archive className="w-4 h-4 mr-2" />
                  Archive
                </Button>
                <Button variant="outline" className="w-full justify-start hover-lift">
                  <Download className="w-4 h-4 mr-2" />
                  Export Chat
                </Button>
              </CardContent>
            </Card>

            {/* Available Agents Card */}
            <Card className="bg-gradient-to-br from-card to-card/50 shadow-lg border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-primary/10">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  Available Agents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {agents.map(agent => (
                    <div key={agent.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Avatar className="w-8 h-8 border-2 border-background">
                            <AvatarImage src={agent.avatar} />
                            <AvatarFallback className="text-xs font-semibold">
                              {agent.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getAgentStatusColor(agent.status)}`} />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{agent.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {agent.activeChats} {agent.activeChats === 1 ? 'chat' : 'chats'}
                          </p>
                        </div>
                      </div>
                      {agent.status === 'online' && agent.activeChats < 5 && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAssignAgent(selectedConversation.id, agent.id)}
                          className="hover-lift h-7 px-2 text-xs"
                        >
                          <UserCheck className="w-3 h-3 mr-1" />
                          Assign
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Notes Preview */}
            {selectedConversation.notes && (
              <Card className="bg-gradient-to-br from-amber-500/5 to-amber-500/10 border-amber-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2 text-amber-600">
                    <Info className="w-4 h-4" />
                    Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{selectedConversation.notes}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
