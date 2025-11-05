import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  Clock,
  GitBranch,
  Database,
  Activity,
  AlertTriangle,
  CheckCircle,
  ZapOff,
} from "lucide-react";

interface WorkflowExecution {
  id: string;
  timestamp: Date;
  status: "success" | "failed" | "in_progress";
  duration: number;
  stepsCompleted: number;
  totalSteps: number;
}

interface ExecutionStep {
  id: string;
  nodeId: string;
  nodeName: string;
  timestamp: Date;
  duration: number;
  status: "success" | "failed" | "pending";
  input: any;
  output: any;
  error?: string;
}

const mockExecutions: WorkflowExecution[] = [
  {
    id: "exec-1",
    timestamp: new Date("2025-01-15T10:30:00"),
    status: "success",
    duration: 2340,
    stepsCompleted: 8,
    totalSteps: 8,
  },
  {
    id: "exec-2",
    timestamp: new Date("2025-01-15T10:25:00"),
    status: "failed",
    duration: 1560,
    stepsCompleted: 5,
    totalSteps: 8,
  },
  {
    id: "exec-3",
    timestamp: new Date("2025-01-15T10:20:00"),
    status: "success",
    duration: 2180,
    stepsCompleted: 8,
    totalSteps: 8,
  },
];

const mockSteps: ExecutionStep[] = [
  {
    id: "step-1",
    nodeId: "node-1",
    nodeName: "Trigger: Email Received",
    timestamp: new Date("2025-01-15T10:30:00"),
    duration: 120,
    status: "success",
    input: { event: "email_received", from: "customer@example.com" },
    output: { processed: true, email_id: "12345" },
  },
  {
    id: "step-2",
    nodeId: "node-2",
    nodeName: "Sentiment Analysis",
    timestamp: new Date("2025-01-15T10:30:01"),
    duration: 450,
    status: "success",
    input: { text: "I'm very unhappy with the service..." },
    output: { sentiment: "negative", score: -0.7, confidence: 0.92 },
  },
  {
    id: "step-3",
    nodeId: "node-3",
    nodeName: "Check Customer History",
    timestamp: new Date("2025-01-15T10:30:02"),
    duration: 680,
    status: "success",
    input: { customer_email: "customer@example.com" },
    output: { tier: "premium", previous_issues: 2, lifetime_value: 12500 },
  },
  {
    id: "step-4",
    nodeId: "node-4",
    nodeName: "Priority Classification",
    timestamp: new Date("2025-01-15T10:30:03"),
    duration: 200,
    status: "success",
    input: { sentiment: -0.7, tier: "premium" },
    output: { priority: "high", assigned_team: "senior_support" },
  },
  {
    id: "step-5",
    nodeId: "node-5",
    nodeName: "Route to Senior Agent",
    timestamp: new Date("2025-01-15T10:30:03"),
    duration: 890,
    status: "success",
    input: { team: "senior_support", priority: "high" },
    output: { assigned_to: "agent_47", queue_position: 1 },
  },
];

export default function TemporalDebugger() {
  const [selectedExecution, setSelectedExecution] = useState(mockExecutions[0]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const currentStepData = mockSteps[currentStep];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleStepForward = () => {
    if (currentStep < mockSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Temporal Debugging
          </h1>
          <p className="text-muted-foreground mt-1">
            Time-travel through workflow executions with advanced debugging
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <GitBranch className="w-4 h-4 mr-2" />
            Compare Versions
          </Button>
          <Button>
            <Database className="w-4 h-4 mr-2" />
            Export State
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Executions</p>
                <p className="text-2xl font-bold">{mockExecutions.length}</p>
              </div>
              <Activity className="w-8 h-8 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">66.7%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500 opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Duration</p>
                <p className="text-2xl font-bold">2.0s</p>
              </div>
              <Clock className="w-8 h-8 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Failed Steps</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-500 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Execution History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Execution History</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              <div className="space-y-2">
                {mockExecutions.map((execution) => (
                  <Card
                    key={execution.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedExecution.id === execution.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => {
                      setSelectedExecution(execution);
                      setCurrentStep(0);
                    }}
                  >
                    <CardContent className="pt-4 pb-4">
                      <div className="flex items-start justify-between mb-2">
                        <Badge
                          variant={
                            execution.status === "success"
                              ? "default"
                              : execution.status === "failed"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {execution.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {execution.duration}ms
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {execution.timestamp.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {execution.stepsCompleted}/{execution.totalSteps} steps
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Main Debugger */}
        <div className="lg:col-span-3 space-y-6">
          {/* Playback Controls */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="outline" onClick={handleReset}>
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="outline" onClick={handleStepBackward}>
                      <SkipBack className="w-4 h-4" />
                    </Button>
                    <Button size="icon" onClick={handlePlayPause}>
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button size="icon" variant="outline" onClick={handleStepForward}>
                      <SkipForward className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Speed:</span>
                    <Badge variant="outline">{playbackSpeed}x</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>
                      Step {currentStep + 1} of {mockSteps.length}
                    </span>
                    <span className="text-muted-foreground">
                      {currentStepData.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <Slider
                    value={[currentStep]}
                    min={0}
                    max={mockSteps.length - 1}
                    step={1}
                    onValueChange={(value) => setCurrentStep(value[0])}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Step Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  Step: {currentStepData.nodeName}
                </CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge
                      variant={
                        currentStepData.status === "success"
                          ? "default"
                          : currentStepData.status === "failed"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {currentStepData.status}
                    </Badge>
                    <span className="text-xs">{currentStepData.duration}ms</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Input State:</h4>
                    <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                      {JSON.stringify(currentStepData.input, null, 2)}
                    </pre>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Output State:</h4>
                    <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                      {JSON.stringify(currentStepData.output, null, 2)}
                    </pre>
                  </div>
                  {currentStepData.error && (
                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-destructive">Error:</h4>
                      <div className="bg-destructive/10 p-3 rounded-lg text-xs">
                        {currentStepData.error}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Execution Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {mockSteps.map((step, index) => (
                      <div
                        key={step.id}
                        className={`flex items-start gap-3 ${
                          index === currentStep ? "opacity-100" : "opacity-40"
                        }`}
                      >
                        <div className="relative">
                          <div
                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                              step.status === "success"
                                ? "bg-green-500/10 border-green-500 text-green-500"
                                : step.status === "failed"
                                ? "bg-red-500/10 border-red-500 text-red-500"
                                : "bg-gray-500/10 border-gray-500 text-gray-500"
                            }`}
                          >
                            {index + 1}
                          </div>
                          {index < mockSteps.length - 1 && (
                            <div className="absolute left-1/2 -translate-x-1/2 top-8 w-0.5 h-8 bg-border" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{step.nodeName}</p>
                          <p className="text-xs text-muted-foreground">{step.duration}ms</p>
                        </div>
                        {step.status === "success" ? (
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        ) : step.status === "failed" ? (
                          <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                        ) : (
                          <ZapOff className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Performance Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {mockSteps.map((step) => (
                  <div key={step.id} className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="truncate">{step.nodeName}</span>
                      <span className="text-muted-foreground">{step.duration}ms</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${(step.duration / 900) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
