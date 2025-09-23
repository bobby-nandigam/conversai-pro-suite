import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  TrendingUp, 
  MessageSquare, 
  Users, 
  Clock,
  Download
} from "lucide-react"

const performanceMetrics = [
  { label: "Total Conversations", value: "12,847", change: "+18.2%", trend: "up" },
  { label: "Resolution Rate", value: "94.2%", change: "+2.1%", trend: "up" },
  { label: "Avg Response Time", value: "1.2s", change: "-0.3s", trend: "up" },
  { label: "User Satisfaction", value: "4.8/5", change: "+0.2", trend: "up" },
]

const topBots = [
  { name: "Customer Support Bot", conversations: 5247, satisfaction: 4.9 },
  { name: "Sales Assistant", conversations: 3892, satisfaction: 4.7 },
  { name: "Product Guide", conversations: 2156, satisfaction: 4.8 },
  { name: "HR Helper", conversations: 1552, satisfaction: 4.6 },
]

export default function Analytics() {
  const location = useLocation()
  const selectedBot = location.state?.selectedBot
  const [timeRange, setTimeRange] = useState("7d")
  const [selectedMetric, setSelectedMetric] = useState("conversations")
  
  // Mock analytics data
  const [analyticsData, setAnalyticsData] = useState({
    totalConversations: 12847,
    activeUsers: 8432,
    avgResponseTime: 1.2,
    satisfactionScore: 94.2,
    successRate: 89.5,
    peakHours: "2PM - 4PM",
    topIntents: [
      { name: "Product Inquiry", count: 3247, percentage: 25.3 },
      { name: "Order Status", count: 2891, percentage: 22.5 },
      { name: "Technical Support", count: 2156, percentage: 16.8 },
      { name: "Billing Questions", count: 1823, percentage: 14.2 },
      { name: "General Info", count: 1456, percentage: 11.3 }
    ],
    performanceMetrics: [
      { period: "This Week", conversations: 2847, accuracy: 94.2, satisfaction: 4.7 },
      { period: "Last Week", conversations: 2654, accuracy: 92.8, satisfaction: 4.5 },
      { period: "This Month", conversations: 12847, accuracy: 93.5, satisfaction: 4.6 },
      { period: "Last Month", conversations: 11892, accuracy: 91.2, satisfaction: 4.4 }
    ]
  })

  useEffect(() => {
    // Simulate data refresh when time range changes
    if (timeRange) {
      setAnalyticsData(prev => ({
        ...prev,
        totalConversations: Math.floor(Math.random() * 15000) + 8000
      }))
    }
  }, [timeRange])

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case 'conversations': return MessageSquare
      case 'users': return Users
      case 'satisfaction': return ThumbsUp
      case 'response-time': return Clock
      default: return BarChart3
    }
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Monitor performance and gain insights into your AI assistants</p>
        </div>
        <Button variant="glass" className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </Button>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <Card key={index} className="card-ai">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <span className="text-sm text-success font-medium flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                  {index === 0 && <MessageSquare className="w-6 h-6 text-white" />}
                  {index === 1 && <BarChart3 className="w-6 h-6 text-white" />}
                  {index === 2 && <Clock className="w-6 h-6 text-white" />}
                  {index === 3 && <Users className="w-6 h-6 text-white" />}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Conversation Volume Chart */}
        <Card className="lg:col-span-2 card-ai">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Conversation Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 bg-muted/10 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Interactive chart would be displayed here</p>
                <p className="text-sm text-muted-foreground">Showing 7-day conversation trends</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Bots */}
        <Card className="card-ai">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Top Performing Bots
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topBots.map((bot, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{bot.name}</p>
                    <p className="text-xs text-muted-foreground">{bot.conversations} conversations</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{bot.satisfaction}/5</p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < Math.floor(bot.satisfaction) ? 'bg-warning' : 'bg-muted-foreground/20'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <Card className="card-ai">
          <CardHeader>
            <CardTitle>Real-time Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Active Conversations</span>
                <span className="text-2xl font-bold">47</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Queue Length</span>
                <span className="text-2xl font-bold">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Avg. Wait Time</span>
                <span className="text-2xl font-bold">0.8s</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-ai">
          <CardHeader>
            <CardTitle>Success Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Intent Recognition</span>
                <span className="text-2xl font-bold text-success">96.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Task Completion</span>
                <span className="text-2xl font-bold text-success">91.8%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Handoff Rate</span>
                <span className="text-2xl font-bold text-warning">5.7%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}