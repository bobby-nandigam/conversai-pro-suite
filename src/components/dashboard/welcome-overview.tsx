import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"
import { 
  Bot, 
  MessageSquare, 
  TrendingUp, 
  Users, 
  Play,
  BarChart3,
  Settings,
  BookOpen,
  CheckCircle,
  Clock,
  AlertCircle
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
  const [setupProgress, setSetupProgress] = useState(80)
  const [completedSteps, setCompletedSteps] = useState([0, 1, 2])
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleQuickAction = (action: any) => {
    toast({
      title: `${action.label} clicked!`,
      description: `Navigating to ${action.href}...`,
    })
    if (action.href.startsWith('/')) {
      navigate(action.href)
    } else {
      window.open(action.href, '_blank')
    }
  }

  const handleCompleteStep = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      const newCompletedSteps = [...completedSteps, stepIndex]
      setCompletedSteps(newCompletedSteps)
      setSetupProgress(newCompletedSteps.length * 20)
      toast({
        title: "Step completed!",
        description: "Great progress on your setup.",
      })
    }
  }

  const setupSteps = [
    { title: "Create your first bot", completed: completedSteps.includes(0) },
    { title: "Configure knowledge base", completed: completedSteps.includes(1) },
    { title: "Set up integrations", completed: completedSteps.includes(2) },
    { title: "Invite team members", completed: completedSteps.includes(3) },
    { title: "Deploy to production", completed: completedSteps.includes(4) },
  ]

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
              className="flex items-center gap-2 hover-lift"
              onClick={() => handleQuickAction(action)}
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
          <Dialog key={index}>
            <DialogTrigger asChild>
              <Card className="card-ai hover-lift cursor-pointer transition-all duration-200 hover:shadow-glow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <p className="text-2xl font-bold">{metric.value}</p>
                        <Badge variant="secondary" className="text-success bg-success/10">
                          {metric.change}
                        </Badge>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <metric.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <metric.icon className="w-5 h-5" />
                  {metric.label} Details
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="text-3xl font-bold">{metric.value}</div>
                <div className="text-success font-medium">{metric.change} from last period</div>
                <div className="h-32 bg-muted/20 rounded-lg flex items-center justify-center">
                  <span className="text-muted-foreground">Chart visualization would go here</span>
                </div>
              </div>
            </DialogContent>
          </Dialog>
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
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors cursor-pointer hover-lift">
                  <div className={`w-3 h-3 rounded-full mt-1 flex items-center justify-center ${
                    activity.status === 'success' ? 'bg-success' : 'bg-primary'
                  }`}>
                    {activity.status === 'success' ? (
                      <CheckCircle className="w-2 h-2 text-white" />
                    ) : (
                      <Clock className="w-2 h-2 text-white" />
                    )}
                  </div>
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
                <span className="text-sm text-muted-foreground">{setupProgress}%</span>
              </div>
              <Progress value={setupProgress} className="h-2" />
            </div>
            
            <div className="space-y-2">
              {setupSteps.map((step, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-2 text-sm cursor-pointer hover:bg-muted/20 p-1 rounded transition-colors ${
                    step.completed ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                  onClick={() => handleCompleteStep(index)}
                >
                  <div className={`w-2 h-2 rounded-full ${
                    step.completed ? 'bg-success' : 'bg-muted-foreground/30'
                  }`} />
                  {step.title}
                  {step.completed && <CheckCircle className="w-3 h-3 text-success ml-auto" />}
                </div>
              ))}
            </div>
            
            <Button 
              variant="ai" 
              className="w-full hover-lift"
              onClick={() => {
                const nextStep = setupSteps.findIndex(step => !step.completed)
                if (nextStep !== -1) {
                  handleCompleteStep(nextStep)
                } else {
                  toast({
                    title: "Setup Complete!",
                    description: "Congratulations! Your ConversaAI Pro setup is complete.",
                  })
                }
              }}
            >
              {setupProgress === 100 ? 'Setup Complete!' : 'Continue Setup'}
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
            {[
              { service: "API Status", status: "Operational", type: "success" },
              { service: "Bot Processing", status: "Healthy", type: "success" },
              { service: "Integrations", status: "All Connected", type: "success" },
              { service: "Maintenance", status: "Scheduled 2AM EST", type: "warning" }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/20 transition-colors cursor-pointer">
                <div className={`w-3 h-3 rounded-full animate-pulse-glow ${
                  item.type === 'success' ? 'bg-success' : 'bg-warning'
                }`}></div>
                <div>
                  <p className="text-sm font-medium">{item.service}</p>
                  <p className={`text-xs ${
                    item.type === 'success' ? 'text-success' : 'text-warning'
                  }`}>{item.status}</p>
                </div>
                {item.type === 'success' && <CheckCircle className="w-3 h-3 text-success ml-auto" />}
                {item.type === 'warning' && <AlertCircle className="w-3 h-3 text-warning ml-auto" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}