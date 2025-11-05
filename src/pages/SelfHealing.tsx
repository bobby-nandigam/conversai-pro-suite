import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Shield,
  Zap,
  TrendingUp,
  RefreshCw,
  Bell,
} from "lucide-react";

interface HealthMetric {
  name: string;
  value: number;
  status: "healthy" | "warning" | "critical";
  trend: "up" | "down" | "stable";
}

interface Incident {
  id: string;
  timestamp: Date;
  type: string;
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  rootCause: string;
  remediation: string;
  status: "detected" | "analyzing" | "recovering" | "resolved";
  recoveryTime?: number;
}

const healthMetrics: HealthMetric[] = [
  { name: "System Health", value: 97, status: "healthy", trend: "up" },
  { name: "Response Time", value: 85, status: "healthy", trend: "stable" },
  { name: "Error Rate", value: 92, status: "warning", trend: "down" },
  { name: "Resource Usage", value: 78, status: "healthy", trend: "stable" },
];

const recentIncidents: Incident[] = [
  {
    id: "inc-1",
    timestamp: new Date("2025-01-15T10:30:00"),
    type: "API Timeout",
    severity: "high",
    description: "External API endpoint not responding within 5s timeout",
    rootCause: "Third-party service experiencing degraded performance",
    remediation: "Activated circuit breaker, routing to fallback service",
    status: "resolved",
    recoveryTime: 45,
  },
  {
    id: "inc-2",
    timestamp: new Date("2025-01-15T09:15:00"),
    type: "Database Connection Pool Exhausted",
    severity: "critical",
    description: "Connection pool reached maximum capacity",
    rootCause: "Sudden spike in concurrent requests exceeded pool limits",
    remediation: "Scaled connection pool size, implemented adaptive retry",
    status: "resolved",
    recoveryTime: 120,
  },
  {
    id: "inc-3",
    timestamp: new Date("2025-01-15T08:45:00"),
    type: "Memory Leak Detected",
    severity: "medium",
    description: "Gradual memory consumption increase in workflow engine",
    rootCause: "Event listeners not properly cleaned up after workflow completion",
    remediation: "Triggered garbage collection, deployed hotfix",
    status: "resolved",
    recoveryTime: 180,
  },
];

export default function SelfHealing() {
  const getSeverityColor = (severity: Incident["severity"]) => {
    switch (severity) {
      case "critical":
        return "destructive";
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
    }
  };

  const getStatusIcon = (status: Incident["status"]) => {
    switch (status) {
      case "detected":
        return <AlertTriangle className="w-4 h-4" />;
      case "analyzing":
        return <Activity className="w-4 h-4 animate-pulse" />;
      case "recovering":
        return <RefreshCw className="w-4 h-4 animate-spin" />;
      case "resolved":
        return <CheckCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Self-Healing Agents
          </h1>
          <p className="text-muted-foreground mt-1">
            Autonomous error detection, diagnosis, and recovery without human intervention
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Bell className="w-4 h-4 mr-2" />
            Configure Alerts
          </Button>
          <Button>
            <Shield className="w-4 h-4 mr-2" />
            View Policies
          </Button>
        </div>
      </div>

      {/* Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {healthMetrics.map((metric) => (
          <Card key={metric.name}>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">{metric.name}</p>
                  <Badge
                    variant={
                      metric.status === "healthy"
                        ? "default"
                        : metric.status === "warning"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {metric.status}
                  </Badge>
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold">{metric.value}%</p>
                  <TrendingUp
                    className={`w-4 h-4 ${
                      metric.trend === "up"
                        ? "text-green-500"
                        : metric.trend === "down"
                        ? "text-red-500"
                        : "text-gray-500"
                    } ${metric.trend === "down" ? "rotate-180" : ""}`}
                  />
                </div>
                <Progress value={metric.value} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Fault Detection Accuracy</p>
                <p className="text-2xl font-bold">97.3%</p>
              </div>
              <Activity className="w-8 h-8 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Self-Healing Success</p>
                <p className="text-2xl font-bold">89.1%</p>
              </div>
              <Shield className="w-8 h-8 text-green-500 opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Downtime Reduction</p>
                <p className="text-2xl font-bold">-32%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Incidents */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Incidents & Resolutions</CardTitle>
          <CardDescription>Automated detection, analysis, and recovery actions</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-4">
              {recentIncidents.map((incident) => (
                <Card key={incident.id}>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {getStatusIcon(incident.status)}
                            <h4 className="font-semibold">{incident.type}</h4>
                            <Badge variant={getSeverityColor(incident.severity)}>
                              {incident.severity}
                            </Badge>
                            <Badge variant="outline" className="capitalize">
                              {incident.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {incident.timestamp.toLocaleString()}
                          </p>
                        </div>
                        {incident.recoveryTime && (
                          <Badge variant="secondary">
                            Recovered in {incident.recoveryTime}s
                          </Badge>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <h5 className="text-sm font-semibold flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-500" />
                            Issue Detected
                          </h5>
                          <p className="text-sm text-muted-foreground">{incident.description}</p>
                        </div>

                        <div className="space-y-2">
                          <h5 className="text-sm font-semibold flex items-center gap-2">
                            <Activity className="w-4 h-4 text-blue-500" />
                            Root Cause
                          </h5>
                          <p className="text-sm text-muted-foreground">{incident.rootCause}</p>
                        </div>

                        <div className="space-y-2">
                          <h5 className="text-sm font-semibold flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Automated Action
                          </h5>
                          <p className="text-sm text-muted-foreground">{incident.remediation}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Self-Healing Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Active Safeguards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Circuit Breakers</p>
                  <p className="text-xs text-muted-foreground">Isolate failures, prevent cascading</p>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Automatic Retry with Backoff</p>
                  <p className="text-xs text-muted-foreground">Adaptive retry strategies</p>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Resource Auto-Scaling</p>
                  <p className="text-xs text-muted-foreground">Scale based on demand</p>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Graceful Degradation</p>
                  <p className="text-xs text-muted-foreground">Maintain critical functions</p>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Automatic Rollback</p>
                  <p className="text-xs text-muted-foreground">Revert to stable versions</p>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Learning & Improvement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Pattern Recognition</span>
                  <span className="text-sm text-muted-foreground">94%</span>
                </div>
                <Progress value={94} />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Predictive Accuracy</span>
                  <span className="text-sm text-muted-foreground">87%</span>
                </div>
                <Progress value={87} />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Recovery Optimization</span>
                  <span className="text-sm text-muted-foreground">91%</span>
                </div>
                <Progress value={91} />
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm font-semibold mb-2">Recent Learnings:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    API timeouts correlate with regional outages
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    Memory issues precede database errors by ~30min
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    Circuit breaker prevents 89% of cascade failures
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
