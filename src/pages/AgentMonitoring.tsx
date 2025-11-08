import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  Cpu, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  BarChart3, 
  Terminal,
  Zap,
  TrendingUp,
  TrendingDown,
  RefreshCw
} from "lucide-react";

interface AgentMetrics {
  id: string;
  name: string;
  status: "active" | "idle" | "error" | "maintenance";
  uptime: number;
  requestsHandled: number;
  avgResponseTime: number;
  errorRate: number;
  cpuUsage: number;
  memoryUsage: number;
  lastActivity: Date;
}

const mockAgents: AgentMetrics[] = [
  {
    id: "agent-1",
    name: "Customer Support Agent",
    status: "active",
    uptime: 99.8,
    requestsHandled: 15234,
    avgResponseTime: 245,
    errorRate: 0.3,
    cpuUsage: 45,
    memoryUsage: 62,
    lastActivity: new Date(),
  },
  {
    id: "agent-2",
    name: "Sales Assistant",
    status: "active",
    uptime: 99.5,
    requestsHandled: 8942,
    avgResponseTime: 312,
    errorRate: 0.5,
    cpuUsage: 38,
    memoryUsage: 55,
    lastActivity: new Date(Date.now() - 120000),
  },
  {
    id: "agent-3",
    name: "Technical Documentation",
    status: "idle",
    uptime: 98.2,
    requestsHandled: 3421,
    avgResponseTime: 189,
    errorRate: 1.2,
    cpuUsage: 12,
    memoryUsage: 28,
    lastActivity: new Date(Date.now() - 600000),
  },
  {
    id: "agent-4",
    name: "Data Analytics Agent",
    status: "error",
    uptime: 95.1,
    requestsHandled: 12087,
    avgResponseTime: 542,
    errorRate: 4.8,
    cpuUsage: 78,
    memoryUsage: 91,
    lastActivity: new Date(Date.now() - 300000),
  },
];

export default function AgentMonitoring() {
  const [agents, setAgents] = useState<AgentMetrics[]>(mockAgents);
  const [selectedAgent, setSelectedAgent] = useState<AgentMetrics | null>(agents[0]);

  const getStatusColor = (status: AgentMetrics["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "idle":
        return "bg-yellow-500";
      case "error":
        return "bg-red-500";
      case "maintenance":
        return "bg-blue-500";
    }
  };

  const getStatusVariant = (status: AgentMetrics["status"]) => {
    switch (status) {
      case "active":
        return "default";
      case "idle":
        return "secondary";
      case "error":
        return "destructive";
      case "maintenance":
        return "outline";
    }
  };

  const totalRequests = agents.reduce((sum, agent) => sum + agent.requestsHandled, 0);
  const avgUptime = agents.reduce((sum, agent) => sum + agent.uptime, 0) / agents.length;
  const activeAgents = agents.filter((a) => a.status === "active").length;

  return (
    <div className="flex-1 p-6 space-y-6 bg-background">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            AI Agent Monitoring
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time performance tracking and health monitoring for all AI agents
          </p>
        </div>
        <Button>
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Data
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Agents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-foreground">
                  {activeAgents}/{agents.length}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {((activeAgents / agents.length) * 100).toFixed(0)}% operational
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Activity className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-foreground">
                  {totalRequests.toLocaleString()}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <p className="text-xs text-muted-foreground">+12.5% today</p>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-secondary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Uptime
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-foreground">
                  {avgUptime.toFixed(1)}%
                </div>
                <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-accent/50 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-accent-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Response Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-foreground">
                  {Math.round(
                    agents.reduce((sum, a) => sum + a.avgResponseTime, 0) / agents.length
                  )}
                  <span className="text-lg text-muted-foreground ml-1">ms</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="w-3 h-3 text-green-500" />
                  <p className="text-xs text-muted-foreground">-5.2% faster</p>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <Clock className="w-6 h-6 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agent List and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agent List */}
        <Card className="lg:col-span-1 border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Terminal className="w-5 h-5" />
              All Agents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-3">
                {agents.map((agent) => (
                  <div
                    key={agent.id}
                    onClick={() => setSelectedAgent(agent)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                      selectedAgent?.id === agent.id
                        ? "bg-primary/10 border-primary"
                        : "bg-card border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-foreground">{agent.name}</h4>
                        <p className="text-xs text-muted-foreground">{agent.id}</p>
                      </div>
                      <Badge variant={getStatusVariant(agent.status)} className="text-xs">
                        {agent.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        {agent.requestsHandled.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {agent.avgResponseTime}ms
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Agent Details */}
        <Card className="lg:col-span-2 border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-foreground">
              <span className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Agent Details
              </span>
              {selectedAgent && (
                <Badge variant={getStatusVariant(selectedAgent.status)}>
                  {selectedAgent.status}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedAgent ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-1">
                    {selectedAgent.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{selectedAgent.id}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="border-border bg-background">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Uptime</span>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                      <div className="text-2xl font-bold text-foreground">
                        {selectedAgent.uptime}%
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border bg-background">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Requests</span>
                        <Zap className="w-4 h-4 text-primary" />
                      </div>
                      <div className="text-2xl font-bold text-foreground">
                        {selectedAgent.requestsHandled.toLocaleString()}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border bg-background">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Response Time</span>
                        <Clock className="w-4 h-4 text-secondary" />
                      </div>
                      <div className="text-2xl font-bold text-foreground">
                        {selectedAgent.avgResponseTime}ms
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border bg-background">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Error Rate</span>
                        <AlertCircle
                          className={`w-4 h-4 ${
                            selectedAgent.errorRate > 2 ? "text-red-500" : "text-muted-foreground"
                          }`}
                        />
                      </div>
                      <div className="text-2xl font-bold text-foreground">
                        {selectedAgent.errorRate}%
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Resource Usage */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Resource Usage</h4>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-foreground">CPU Usage</span>
                        </div>
                        <span className="text-sm font-semibold text-foreground">
                          {selectedAgent.cpuUsage}%
                        </span>
                      </div>
                      <Progress value={selectedAgent.cpuUsage} className="h-2" />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-foreground">Memory Usage</span>
                        </div>
                        <span className="text-sm font-semibold text-foreground">
                          {selectedAgent.memoryUsage}%
                        </span>
                      </div>
                      <Progress value={selectedAgent.memoryUsage} className="h-2" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>
                      Last activity:{" "}
                      {selectedAgent.lastActivity.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-[600px] flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Activity className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>Select an agent to view details</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
