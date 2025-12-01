import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  Play,
  Pause,
  Square,
  Workflow,
  Zap,
  Database,
  Brain,
  GitBranch,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Activity,
  TrendingUp,
  Settings,
  Search,
  Filter,
  MoreVertical
} from "lucide-react";

interface WorkflowRun {
  id: string;
  agentName: string;
  status: "running" | "completed" | "failed" | "paused";
  startTime: Date;
  duration?: number;
  progress: number;
  stepsCompleted: number;
  totalSteps: number;
  throughput: number;
}

interface AgentNode {
  id: string;
  name: string;
  type: "trigger" | "condition" | "action" | "knowledge";
  status: "idle" | "running" | "success" | "failed";
  executions: number;
  avgDuration: number;
  successRate: number;
}

const mockRuns: WorkflowRun[] = [
  {
    id: "run-001",
    agentName: "Customer Support Pro",
    status: "running",
    startTime: new Date(Date.now() - 45000),
    progress: 65,
    stepsCompleted: 13,
    totalSteps: 20,
    throughput: 847
  },
  {
    id: "run-002",
    agentName: "Lead Qualifier",
    status: "completed",
    startTime: new Date(Date.now() - 180000),
    duration: 142000,
    progress: 100,
    stepsCompleted: 15,
    totalSteps: 15,
    throughput: 1243
  },
  {
    id: "run-003",
    agentName: "Data Processor",
    status: "failed",
    startTime: new Date(Date.now() - 300000),
    duration: 89000,
    progress: 40,
    stepsCompleted: 6,
    totalSteps: 15,
    throughput: 423
  },
  {
    id: "run-004",
    agentName: "Knowledge Assistant",
    status: "completed",
    startTime: new Date(Date.now() - 420000),
    duration: 234000,
    progress: 100,
    stepsCompleted: 28,
    totalSteps: 28,
    throughput: 2156
  }
];

const mockNodes: AgentNode[] = [
  {
    id: "node-1",
    name: "Email Trigger",
    type: "trigger",
    status: "success",
    executions: 1247,
    avgDuration: 89,
    successRate: 99.8
  },
  {
    id: "node-2",
    name: "Sentiment Analysis",
    type: "action",
    status: "running",
    executions: 1243,
    avgDuration: 342,
    successRate: 97.3
  },
  {
    id: "node-3",
    name: "Customer History Check",
    type: "knowledge",
    status: "success",
    executions: 1198,
    avgDuration: 567,
    successRate: 99.1
  },
  {
    id: "node-4",
    name: "Priority Router",
    type: "condition",
    status: "success",
    executions: 1198,
    avgDuration: 123,
    successRate: 100
  },
  {
    id: "node-5",
    name: "Agent Assignment",
    type: "action",
    status: "success",
    executions: 1156,
    avgDuration: 234,
    successRate: 98.9
  }
];

export default function TemporalDebugger() {
  const [selectedRun, setSelectedRun] = useState<WorkflowRun | null>(mockRuns[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running": return <Activity className="w-4 h-4 animate-pulse" />;
      case "completed": return <CheckCircle2 className="w-4 h-4" />;
      case "failed": return <XCircle className="w-4 h-4" />;
      case "paused": return <Pause className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running": return "text-blue-500 bg-blue-500/10 border-blue-500/20";
      case "completed": return "text-green-500 bg-green-500/10 border-green-500/20";
      case "failed": return "text-red-500 bg-red-500/10 border-red-500/20";
      case "paused": return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
      default: return "text-gray-500 bg-gray-500/10 border-gray-500/20";
    }
  };

  const getNodeTypeIcon = (type: string) => {
    switch (type) {
      case "trigger": return <Zap className="w-4 h-4 text-yellow-500" />;
      case "condition": return <GitBranch className="w-4 h-4 text-orange-500" />;
      case "action": return <Database className="w-4 h-4 text-blue-500" />;
      case "knowledge": return <Brain className="w-4 h-4 text-purple-500" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Agent Workflow Orchestrator
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor and optimize production AI agent workflows in real-time
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
          <Button className="bg-gradient-to-r from-primary to-purple-600">
            <Play className="w-4 h-4 mr-2" />
            Deploy New
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Active Workflows</p>
                <p className="text-3xl font-bold">3</p>
                <p className="text-xs text-green-500 mt-1">+2 from last hour</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Workflow className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-500/20 bg-gradient-to-br from-card to-green-500/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Success Rate</p>
                <p className="text-3xl font-bold">98.7%</p>
                <p className="text-xs text-green-500 mt-1">+1.2% improvement</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-500/20 bg-gradient-to-br from-card to-purple-500/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg Response Time</p>
                <p className="text-3xl font-bold">234ms</p>
                <p className="text-xs text-green-500 mt-1">-45ms faster</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-orange-500/20 bg-gradient-to-br from-card to-orange-500/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Executions</p>
                <p className="text-3xl font-bold">8.4K</p>
                <p className="text-xs text-green-500 mt-1">+847 today</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Runs */}
        <Card className="lg:col-span-1 border-2 border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Workflow className="w-5 h-5 text-primary" />
                Active Runs
              </CardTitle>
              <Button size="sm" variant="ghost">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
            <div className="relative mt-2">
              <Search className="absolute left-2 top-2.5 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search workflows..." 
                className="pl-8 bg-background/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-3">
                {mockRuns.map((run) => (
                  <Card
                    key={run.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedRun?.id === run.id 
                        ? "ring-2 ring-primary border-primary/50 shadow-primary/20" 
                        : "hover:border-primary/30"
                    }`}
                    onClick={() => setSelectedRun(run)}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold truncate">{run.agentName}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {run.id}
                            </p>
                          </div>
                          <Badge className={`${getStatusColor(run.status)} border`}>
                            {getStatusIcon(run.status)}
                            <span className="ml-1 capitalize">{run.status}</span>
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{run.stepsCompleted}/{run.totalSteps} steps</span>
                            <span>{run.progress}%</span>
                          </div>
                          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-primary to-purple-600 transition-all duration-300"
                              style={{ width: `${run.progress}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">
                            {formatDuration(Date.now() - run.startTime.getTime())} elapsed
                          </span>
                          <span className="font-medium">{run.throughput}/min</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Details Panel */}
        <div className="lg:col-span-2 space-y-6">
          {selectedRun ? (
            <>
              {/* Run Controls */}
              <Card className="border-2 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{selectedRun.agentName}</h3>
                      <p className="text-sm text-muted-foreground">Run ID: {selectedRun.id}</p>
                    </div>
                    <div className="flex gap-2">
                      {selectedRun.status === "running" ? (
                        <>
                          <Button size="sm" variant="outline">
                            <Pause className="w-4 h-4 mr-1" />
                            Pause
                          </Button>
                          <Button size="sm" variant="destructive">
                            <Square className="w-4 h-4 mr-1" />
                            Stop
                          </Button>
                        </>
                      ) : (
                        <Button size="sm">
                          <Play className="w-4 h-4 mr-1" />
                          Restart
                        </Button>
                      )}
                      <Button size="sm" variant="ghost">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Progress</p>
                      <p className="text-lg font-bold">{selectedRun.progress}%</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Steps</p>
                      <p className="text-lg font-bold">{selectedRun.stepsCompleted}/{selectedRun.totalSteps}</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Throughput</p>
                      <p className="text-lg font-bold">{selectedRun.throughput}/m</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Elapsed</p>
                      <p className="text-lg font-bold">
                        {formatDuration(Date.now() - selectedRun.startTime.getTime())}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Node Performance */}
              <Card className="border-2 border-border/50">
                <CardHeader>
                  <CardTitle>Node Performance</CardTitle>
                  <CardDescription>Real-time execution metrics for each workflow component</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="nodes" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="nodes">Nodes</TabsTrigger>
                      <TabsTrigger value="metrics">Metrics</TabsTrigger>
                      <TabsTrigger value="logs">Logs</TabsTrigger>
                    </TabsList>

                    <TabsContent value="nodes" className="space-y-3 mt-4">
                      {mockNodes.map((node) => (
                        <Card key={node.id} className="bg-card/60">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                  {getNodeTypeIcon(node.type)}
                                </div>
                                <div>
                                  <p className="font-semibold">{node.name}</p>
                                  <p className="text-xs text-muted-foreground capitalize">{node.type}</p>
                                </div>
                              </div>
                              <Badge className={getStatusColor(node.status)}>
                                {getStatusIcon(node.status)}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-center">
                              <div className="p-2 rounded bg-muted/50">
                                <p className="text-xs text-muted-foreground">Executions</p>
                                <p className="text-sm font-bold">{node.executions.toLocaleString()}</p>
                              </div>
                              <div className="p-2 rounded bg-muted/50">
                                <p className="text-xs text-muted-foreground">Avg Time</p>
                                <p className="text-sm font-bold">{node.avgDuration}ms</p>
                              </div>
                              <div className="p-2 rounded bg-muted/50">
                                <p className="text-xs text-muted-foreground">Success</p>
                                <p className="text-sm font-bold text-green-500">{node.successRate}%</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>

                    <TabsContent value="metrics" className="mt-4">
                      <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-border rounded-lg">
                        <p className="text-muted-foreground">Performance charts and graphs</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="logs" className="mt-4">
                      <ScrollArea className="h-[300px] border-2 border-border rounded-lg p-4">
                        <div className="space-y-2 font-mono text-xs">
                          {Array.from({ length: 20 }).map((_, i) => (
                            <div key={i} className="text-muted-foreground">
                              <span className="text-green-500">[{new Date().toISOString()}]</span>
                              {" "}INFO: Node execution completed successfully
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="border-2 border-dashed border-border h-[600px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Workflow className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>Select a workflow run to view details</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
