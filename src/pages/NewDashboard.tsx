import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ModularWidget } from "@/components/futuristic/ModularWidget"
import { HolographicChart } from "@/components/futuristic/HolographicChart"
import { DragDropCanvas } from "@/components/futuristic/DragDropCanvas"
import { useNavigate } from "react-router-dom"
import {
  Bot,
  Brain,
  Sparkles,
  Zap,
  TrendingUp,
  Activity,
  Users,
  MessageSquare,
  Database,
  Shield,
  Globe,
  Cpu,
  BarChart3,
  Clock,
  CheckCircle2,
} from "lucide-react"

export default function NewDashboard() {
  const navigate = useNavigate()
  const [activeView, setActiveView] = useState<"overview" | "builder">("overview")

  const metrics = [
    {
      label: "Active Agents",
      value: "24",
      change: "+12%",
      trend: "up" as const,
      icon: Bot,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      label: "Total Interactions",
      value: "1.2M",
      change: "+28%",
      trend: "up" as const,
      icon: MessageSquare,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      label: "Success Rate",
      value: "96.8%",
      change: "+3.2%",
      trend: "up" as const,
      icon: TrendingUp,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      label: "Active Users",
      value: "48.3K",
      change: "+18%",
      trend: "up" as const,
      icon: Users,
      gradient: "from-orange-500 to-red-500",
    },
  ]

  const chartData = [
    { label: "Mon", value: 42 },
    { label: "Tue", value: 58 },
    { label: "Wed", value: 71 },
    { label: "Thu", value: 65 },
    { label: "Fri", value: 89 },
    { label: "Sat", value: 76 },
    { label: "Sun", value: 82 },
  ]

  const recentActivity = [
    { action: "Agent 'Customer Support Pro' deployed", time: "2m ago", type: "success" },
    { action: "New training data uploaded (2.4GB)", time: "15m ago", type: "info" },
    { action: "Integration with Slack completed", time: "1h ago", type: "success" },
    { action: "Performance optimization completed", time: "2h ago", type: "success" },
    { action: "Team member added: Alex Chen", time: "3h ago", type: "info" },
  ]

  const systemStatus = [
    { service: "AI Processing", status: "Optimal", uptime: "99.9%", icon: Brain },
    { service: "Database", status: "Healthy", uptime: "100%", icon: Database },
    { service: "API Gateway", status: "Optimal", uptime: "99.8%", icon: Globe },
    { service: "Security", status: "Protected", uptime: "100%", icon: Shield },
  ]

  return (
    <div className="min-h-screen scan-lines">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 blur-3xl" />
        <div className="relative p-8 border-b border-primary/20 bg-card/30 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Pixelmind Labs
              </h1>
              <p className="text-muted-foreground">
                Next-Generation AI Agent Control System
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant={activeView === "overview" ? "default" : "outline"}
                onClick={() => setActiveView("overview")}
                className={activeView === "overview" ? "btn-ai" : "btn-holographic"}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Overview
              </Button>
              <Button
                variant={activeView === "builder" ? "default" : "outline"}
                onClick={() => setActiveView("builder")}
                className={activeView === "builder" ? "btn-ai" : "btn-holographic"}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Agent Builder
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, i) => (
              <div
                key={i}
                className="card-holographic p-4 hover-lift cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                    <p className="text-3xl font-bold">{metric.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.gradient} flex items-center justify-center shadow-neon`}>
                    <metric.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-success/50 text-success">
                    {metric.change}
                  </Badge>
                  <span className="text-xs text-muted-foreground">vs last period</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      {activeView === "builder" ? (
        <div className="h-[calc(100vh-280px)]">
          <DragDropCanvas />
        </div>
      ) : (
        <div className="p-6 space-y-6">
          {/* Analytics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ModularWidget
                title="Performance Analytics"
                icon={<Activity className="w-5 h-5" />}
                variant="holographic"
              >
                <HolographicChart
                  data={chartData}
                  title="Agent Interactions (Last 7 Days)"
                  trend="up"
                  trendValue="+24.5%"
                />
              </ModularWidget>
            </div>

            <ModularWidget
              title="System Health"
              icon={<Cpu className="w-5 h-5" />}
              variant="neon"
            >
              <div className="space-y-4">
                {systemStatus.map((system, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-primary/10 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <system.icon className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">{system.service}</p>
                        <p className="text-xs text-success">{system.status}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{system.uptime}</p>
                      <p className="text-xs text-muted-foreground">Uptime</p>
                    </div>
                  </div>
                ))}
              </div>
            </ModularWidget>
          </div>

          {/* Activity & Templates */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ModularWidget
              title="Recent Activity"
              icon={<Clock className="w-5 h-5" />}
              variant="glass"
            >
              <div className="space-y-3">
                {recentActivity.map((activity, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-lg bg-background/30 hover:bg-background/50 transition-colors cursor-pointer hover-lift"
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === "success" ? "status-online" : "status-processing"
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-success" />
                  </div>
                ))}
              </div>
            </ModularWidget>

            <ModularWidget
              title="Quick Actions"
              icon={<Zap className="w-5 h-5" />}
              variant="holographic"
            >
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Create Agent", icon: Bot, route: "/bots/builder" },
                  { label: "View Analytics", icon: BarChart3, route: "/analytics" },
                  { label: "Manage Data", icon: Database, route: "/knowledge" },
                  { label: "Team Settings", icon: Users, route: "/team" },
                  { label: "Integrations", icon: Globe, route: "/integrations" },
                  { label: "Security", icon: Shield, route: "/security" },
                ].map((action, i) => (
                  <Button
                    key={i}
                    className="btn-holographic h-auto py-4 flex-col gap-2 hover-float"
                    onClick={() => navigate(action.route)}
                  >
                    <action.icon className="w-6 h-6" />
                    <span className="text-xs">{action.label}</span>
                  </Button>
                ))}
              </div>
            </ModularWidget>
          </div>

          {/* Agent Templates */}
          <ModularWidget
            title="Agent Templates"
            icon={<Sparkles className="w-5 h-5" />}
            variant="holographic"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: "Customer Support", desc: "24/7 support automation", color: "from-blue-500 to-cyan-500", icon: MessageSquare },
                { name: "Sales Assistant", desc: "Lead qualification & nurturing", color: "from-purple-500 to-pink-500", icon: TrendingUp },
                { name: "Data Analyst", desc: "Automated insights & reporting", color: "from-green-500 to-emerald-500", icon: BarChart3 },
                { name: "Content Creator", desc: "AI-powered content generation", color: "from-orange-500 to-red-500", icon: Sparkles },
              ].map((template, i) => (
                <div
                  key={i}
                  className="card-neon p-4 cursor-pointer hover-float group"
                  onClick={() => navigate("/bots/builder")}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${template.color} flex items-center justify-center mb-3 shadow-neon`}>
                    <template.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold mb-1">{template.name}</h4>
                  <p className="text-xs text-muted-foreground">{template.desc}</p>
                  <Button size="sm" className="w-full mt-3 btn-holographic text-xs">
                    Use Template
                  </Button>
                </div>
              ))}
            </div>
          </ModularWidget>
        </div>
      )}
    </div>
  )
}
