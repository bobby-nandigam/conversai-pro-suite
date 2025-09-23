import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { 
  Bot, 
  MessageSquare, 
  TrendingUp, 
  Users, 
  Play,
  BarChart3,
  Settings,
  BookOpen
} from "lucide-react"

const quickActions = [
  { label: "Create New Bot", icon: Bot, variant: "ai" as const, href: "/bots/new" },
  { label: "View Analytics", icon: BarChart3, variant: "glass" as const, href: "/analytics" },
  { label: "Manage Knowledge", icon: BookOpen, variant: "glass" as const, href: "/knowledge" },
  { label: "Team Settings", icon: Settings, variant: "glass" as const, href: "/settings" },
]

const metrics = [
  { label: "Active Bots", value: "12", change: "+3", trend: "up", icon: Bot },
  { label: "Conversations Today", value: "1,247", change: "+18%", trend: "up", icon: MessageSquare },
  { label: "Success Rate", value: "94.2%", change: "+2.1%", trend: "up", icon: TrendingUp },
  { label: "Active Users", value: "8,432", change: "+156", trend: "up", icon: Users },
]

const recentActivity = [
  { action: "Bot 'Customer Support' handled 89 conversations", time: "2 minutes ago", status: "success" },
  { action: "New user Sarah Johnson joined team", time: "15 minutes ago", status: "info" },
  { action: "Integration with Slack completed", time: "1 hour ago", status: "success" },
  { action: "Knowledge base updated with 12 new articles", time: "2 hours ago", status: "info" },
  { action: "Bot 'Sales Assistant' reached 95% satisfaction", time: "3 hours ago", status: "success" },
]

export function WelcomeOverview() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, John! 👋</h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your AI assistants today.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action, index) => (
            <Button 
              key={index} 
              variant={action.variant} 
              className="flex items-center gap-2"
            >
              <action.icon className="w-4 h-4" />
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="card-ai hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <span className="text-sm text-success font-medium">
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dashboard Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Activity */}
        <Card className="lg:col-span-2 card-ai">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'success' ? 'bg-success' : 'bg-primary'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Start Guide */}
        <Card className="card-ai">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="w-5 h-5" />
              Quick Start Guide
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Setup complete</span>
                <span className="text-sm text-muted-foreground">80%</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-success rounded-full" />
                Create your first bot
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-success rounded-full" />
                Configure knowledge base
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-success rounded-full" />
                Set up integrations
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-muted-foreground/30 rounded-full" />
                Invite team members
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-muted-foreground/30 rounded-full" />
                Deploy to production
              </div>
            </div>
            
            <Button variant="ai" className="w-full">
              Continue Setup
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card className="card-ai">
        <CardHeader>
          <CardTitle>System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse-glow"></div>
              <div>
                <p className="text-sm font-medium">API Status</p>
                <p className="text-xs text-success">Operational</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse-glow"></div>
              <div>
                <p className="text-sm font-medium">Bot Processing</p>
                <p className="text-xs text-success">Healthy</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse-glow"></div>
              <div>
                <p className="text-sm font-medium">Integrations</p>
                <p className="text-xs text-success">All Connected</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-warning rounded-full animate-pulse-glow"></div>
              <div>
                <p className="text-sm font-medium">Maintenance</p>
                <p className="text-xs text-warning">Scheduled 2AM EST</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}