import { 
  Bot, 
  BarChart3, 
  MessageSquare, 
  Settings, 
  Users, 
  BookOpen,
  Zap,
  Shield,
  Brain,
  Phone,
  TestTube,
  FileText,
  Workflow,
  Store,
  Lightbulb,
  UserCircle,
  Clock,
  HeartPulse,
  Mic,
  Activity,
  LayoutDashboard,
  Layers
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

const mainItems = [
  { title: "Agent Builder", url: "/", icon: Layers, highlight: true },
  { title: "My Agents", url: "/agents", icon: Bot },
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Conversations", url: "/conversations", icon: MessageSquare },
  { title: "Knowledge Base", url: "/knowledge", icon: BookOpen },
]

const advancedItems = [
  { title: "Workflow Builder", url: "/workflow-builder", icon: Workflow },
  { title: "Explainable AI", url: "/explainable-ai", icon: Lightbulb },
  { title: "Collaborative Editing", url: "/collaborative-editing", icon: UserCircle },
  { title: "Marketplace", url: "/marketplace", icon: Store },
  { title: "Temporal Debugger", url: "/temporal-debugger", icon: Clock },
  { title: "Self-Healing", url: "/self-healing", icon: HeartPulse },
  { title: "Multimodal Interface", url: "/multimodal-interface", icon: Mic },
  { title: "AI Agent Monitoring", url: "/agent-monitoring", icon: Activity },
]

const toolsItems = [
  { title: "Integrations", url: "/integrations", icon: Zap },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Team Management", url: "/team", icon: Users },
  { title: "Testing Suite", url: "/testing", icon: TestTube },
  { title: "Voice Interface", url: "/voice", icon: Phone },
  { title: "Documentation", url: "/documentation", icon: FileText },
]

const systemItems = [
  { title: "Security", url: "/security", icon: Shield },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const isCollapsed = state === "collapsed"

  const isActive = (path: string) => currentPath === path || (path !== "/" && currentPath.startsWith(path))
  
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    cn(
      "w-full justify-start transition-all duration-200",
      isActive 
        ? "bg-gradient-primary text-primary-foreground shadow-glow" 
        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
    )

  return (
    <Sidebar className={cn("border-r border-sidebar-border", isCollapsed ? "w-16" : "w-64")}>
      <SidebarContent className="bg-sidebar">
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="font-bold text-lg text-sidebar-foreground">PixelMind AI</h1>
                <p className="text-xs text-sidebar-foreground/60">Pro Platform</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/80">Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="w-4 h-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Advanced AI Features */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/80">Advanced AI</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {advancedItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="w-4 h-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Tools */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/80">Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {toolsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="w-4 h-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* System */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/80">System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="w-4 h-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}