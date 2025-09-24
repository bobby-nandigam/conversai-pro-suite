import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  Zap, 
  Search, 
  Settings, 
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Plus,
  Globe,
  MessageSquare,
  ShoppingCart,
  Headphones,
  Users,
  Database,
  Mail,
  Calendar,
  CreditCard,
  FileText,
  BarChart3,
  Slack,
  Github
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const integrationCategories = [
  {
    id: "crm",
    name: "CRM & Sales",
    icon: Users,
    description: "Connect with customer relationship management tools",
    integrations: [
      {
        id: "salesforce",
        name: "Salesforce",
        description: "Sync leads, contacts, and opportunities",
        icon: "https://logo.clearbit.com/salesforce.com",
        status: "connected",
        features: ["Lead sync", "Contact management", "Deal tracking"],
        setupComplexity: "Medium"
      },
      {
        id: "hubspot",
        name: "HubSpot",
        description: "Marketing, sales, and service platform",
        icon: "https://logo.clearbit.com/hubspot.com",
        status: "available",
        features: ["Contact sync", "Deal pipeline", "Email tracking"],
        setupComplexity: "Easy"
      },
      {
        id: "pipedrive",
        name: "Pipedrive",
        description: "Sales pipeline management",
        icon: "https://logo.clearbit.com/pipedrive.com",
        status: "available",
        features: ["Pipeline sync", "Activity tracking", "Lead scoring"],
        setupComplexity: "Easy"
      }
    ]
  },
  {
    id: "helpdesk",
    name: "Help Desk",
    icon: Headphones,
    description: "Integrate with customer support platforms",
    integrations: [
      {
        id: "zendesk",
        name: "Zendesk",
        description: "Customer service and support tickets",
        icon: "https://logo.clearbit.com/zendesk.com",
        status: "connected",
        features: ["Ticket creation", "Agent assignment", "SLA tracking"],
        setupComplexity: "Medium"
      },
      {
        id: "freshdesk",
        name: "Freshdesk",
        description: "Cloud-based customer support",
        icon: "https://logo.clearbit.com/freshworks.com",
        status: "available",
        features: ["Ticket management", "Knowledge base", "Automation"],
        setupComplexity: "Easy"
      },
      {
        id: "intercom",
        name: "Intercom",
        description: "Conversational relationship platform",
        icon: "https://logo.clearbit.com/intercom.com",
        status: "configured",
        features: ["Live chat", "User profiles", "Custom attributes"],
        setupComplexity: "Medium"
      }
    ]
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    icon: ShoppingCart,
    description: "Connect with online stores and marketplaces",
    integrations: [
      {
        id: "shopify",
        name: "Shopify",
        description: "E-commerce platform for online stores",
        icon: "https://logo.clearbit.com/shopify.com",
        status: "available",
        features: ["Order tracking", "Product catalog", "Customer data"],
        setupComplexity: "Easy"
      },
      {
        id: "woocommerce",
        name: "WooCommerce",
        description: "WordPress e-commerce plugin",
        icon: "https://logo.clearbit.com/woocommerce.com",
        status: "available",
        features: ["Order management", "Inventory sync", "Customer support"],
        setupComplexity: "Medium"
      },
      {
        id: "magento",
        name: "Magento",
        description: "Open-source e-commerce platform",
        icon: "https://logo.clearbit.com/magento.com",
        status: "available",
        features: ["Product management", "Order processing", "Customer accounts"],
        setupComplexity: "Hard"
      }
    ]
  },
  {
    id: "communication",
    name: "Communication",
    icon: MessageSquare,
    description: "Connect messaging and communication tools",
    integrations: [
      {
        id: "slack",
        name: "Slack",
        description: "Team communication and collaboration",
        icon: "https://logo.clearbit.com/slack.com",
        status: "connected",
        features: ["Channel notifications", "Direct messages", "File sharing"],
        setupComplexity: "Easy"
      },
      {
        id: "teams",
        name: "Microsoft Teams",
        description: "Business communication platform",
        icon: "https://logo.clearbit.com/microsoft.com",
        status: "available",
        features: ["Chat integration", "Meeting bots", "File collaboration"],
        setupComplexity: "Medium"
      },
      {
        id: "discord",
        name: "Discord",
        description: "Voice, video and text communication",
        icon: "https://logo.clearbit.com/discord.com",
        status: "available",
        features: ["Server management", "Voice channels", "Community features"],
        setupComplexity: "Easy"
      }
    ]
  }
]

const connectedIntegrations = [
  {
    id: "salesforce",
    name: "Salesforce",
    status: "active",
    lastSync: "2 minutes ago",
    dataPoints: 1250,
    health: "good"
  },
  {
    id: "zendesk", 
    name: "Zendesk",
    status: "active",
    lastSync: "5 minutes ago",
    dataPoints: 892,
    health: "good"
  },
  {
    id: "slack",
    name: "Slack",
    status: "active",
    lastSync: "1 minute ago",
    dataPoints: 156,
    health: "excellent"
  },
  {
    id: "intercom",
    name: "Intercom",
    status: "warning",
    lastSync: "2 hours ago",
    dataPoints: 445,
    health: "warning"
  }
]

export default function Integrations() {
  const [activeTab, setActiveTab] = useState("browse")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [integrations, setIntegrations] = useState(integrationCategories)
  const { toast } = useToast()

  const handleConnect = (integrationId: string, categoryId: string) => {
    setIntegrations(prev => prev.map(category => 
      category.id === categoryId 
        ? {
            ...category,
            integrations: category.integrations.map(integration =>
              integration.id === integrationId
                ? { ...integration, status: "connected" }
                : integration
            )
          }
        : category
    ))
    
    toast({
      title: "Integration Connected",
      description: "Integration has been successfully connected and configured."
    })
  }

  const handleDisconnect = (integrationId: string) => {
    toast({
      title: "Integration Disconnected", 
      description: "Integration has been safely disconnected."
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
      case "active":
        return <CheckCircle className="w-4 h-4 text-success" />
      case "configured":
      case "warning":
        return <AlertCircle className="w-4 h-4 text-warning" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
      case "active":
        return "text-success"
      case "configured":
      case "warning":
        return "text-warning"
      default:
        return "text-muted-foreground"
    }
  }

  const filteredCategories = integrations.map(category => ({
    ...category,
    integrations: category.integrations.filter(integration =>
      integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => 
    selectedCategory === "all" || category.id === selectedCategory
  )

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Integration Hub</h1>
          <p className="text-muted-foreground">Connect with CRMs, help desks, e-commerce platforms, and other business tools</p>
        </div>
        <Button variant="ai">
          <Plus className="w-4 h-4 mr-2" />
          Request Integration
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-ai">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Connected</p>
                <p className="text-2xl font-bold">{connectedIntegrations.filter(i => i.status === 'active').length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-ai">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Available</p>
                <p className="text-2xl font-bold">{integrations.reduce((acc, cat) => acc + cat.integrations.length, 0)}</p>
              </div>
              <Zap className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-ai">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Data Points</p>
                <p className="text-2xl font-bold">{connectedIntegrations.reduce((acc, i) => acc + i.dataPoints, 0)}</p>
              </div>
              <Database className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-ai">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Categories</p>
                <p className="text-2xl font-bold">{integrations.length}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="browse">Browse Integrations</TabsTrigger>
          <TabsTrigger value="connected">Connected ({connectedIntegrations.length})</TabsTrigger>
          <TabsTrigger value="api">API & Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          {/* Search and Filter */}
          <Card className="card-ai">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search integrations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant={selectedCategory === "all" ? "default" : "outline"}
                    onClick={() => setSelectedCategory("all")}
                  >
                    All
                  </Button>
                  {integrations.map(category => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Integration Categories */}
          {filteredCategories.map((category) => (
            <div key={category.id} className="space-y-4">
              <div className="flex items-center gap-3">
                <category.icon className="w-6 h-6 text-primary" />
                <div>
                  <h2 className="text-xl font-semibold">{category.name}</h2>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.integrations.map((integration) => (
                  <Card key={integration.id} className="card-ai hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-card">
                            <img 
                              src={integration.icon} 
                              alt={integration.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="m9 9 5 12 1.8-5.2L21 14Z"/></svg>`
                              }}
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold">{integration.name}</h3>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getStatusColor(integration.status)}`}
                            >
                              {getStatusIcon(integration.status)}
                              <span className="ml-1">{integration.status}</span>
                            </Badge>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {integration.setupComplexity}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4">{integration.description}</p>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium mb-2">Features:</p>
                          <div className="flex flex-wrap gap-1">
                            {integration.features.map(feature => (
                              <Badge key={feature} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          {integration.status === "connected" ? (
                            <>
                              <Button variant="outline" className="flex-1">
                                <Settings className="w-4 h-4 mr-2" />
                                Configure
                              </Button>
                              <Button 
                                variant="ghost" 
                                onClick={() => handleDisconnect(integration.id)}
                              >
                                Disconnect
                              </Button>
                            </>
                          ) : (
                            <Button 
                              className="flex-1 bg-gradient-primary"
                              onClick={() => handleConnect(integration.id, category.id)}
                            >
                              Connect
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="connected" className="space-y-4">
          <div className="grid gap-4">
            {connectedIntegrations.map((integration) => (
              <Card key={integration.id} className="card-ai">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{integration.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Last sync: {integration.lastSync}</span>
                          <span>{integration.dataPoints} data points</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <Badge 
                          variant="outline" 
                          className={`${getStatusColor(integration.status)}`}
                        >
                          {getStatusIcon(integration.status)}
                          <span className="ml-1">{integration.status}</span>
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          Health: {integration.health}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Switch checked={integration.status === "active"} />
                        <Button variant="ghost" size="icon">
                          <Settings className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-ai">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  API Keys
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div>
                      <p className="font-medium">Production API Key</p>
                      <p className="text-sm text-muted-foreground">pk_live_••••••••••••••••</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Regenerate
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div>
                      <p className="font-medium">Test API Key</p>
                      <p className="text-sm text-muted-foreground">pk_test_••••••••••••••••</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Copy
                    </Button>
                  </div>
                </div>
                
                <Button variant="ai" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Generate New Key
                </Button>
              </CardContent>
            </Card>

            <Card className="card-ai">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Webhooks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div>
                      <p className="font-medium">Conversation Events</p>
                      <p className="text-sm text-muted-foreground">https://api.yourapp.com/webhooks</p>
                    </div>
                    <Badge variant="outline" className="text-success">
                      Active
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div>
                      <p className="font-medium">Bot Updates</p>
                      <p className="text-sm text-muted-foreground">https://api.yourapp.com/bot-events</p>
                    </div>
                    <Badge variant="outline" className="text-warning">
                      Paused
                    </Badge>
                  </div>
                </div>
                
                <Button variant="ai" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Webhook Endpoint
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="card-ai">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                API Documentation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-border rounded-lg hover:bg-muted/20 transition-colors cursor-pointer">
                  <h4 className="font-medium mb-2">Getting Started</h4>
                  <p className="text-sm text-muted-foreground">Authentication, rate limits, and basic usage</p>
                </div>
                <div className="p-4 border border-border rounded-lg hover:bg-muted/20 transition-colors cursor-pointer">
                  <h4 className="font-medium mb-2">Conversation API</h4>
                  <p className="text-sm text-muted-foreground">Send messages, retrieve history, manage sessions</p>
                </div>
                <div className="p-4 border border-border rounded-lg hover:bg-muted/20 transition-colors cursor-pointer">
                  <h4 className="font-medium mb-2">Bot Management</h4>
                  <p className="text-sm text-muted-foreground">Create, update, and deploy bots programmatically</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}