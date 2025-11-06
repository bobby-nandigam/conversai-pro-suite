import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mic, Upload, Hand, Eye, Type, Video, FileText, Activity, Settings, Play, Pause, Save, Zap, Users, TrendingUp } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { AgentCanvas } from "@/components/agent-builder/AgentCanvas";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Activity {
  id: string;
  type: "voice" | "text" | "gesture" | "visual";
  message: string;
  timestamp: Date;
  status: "success" | "processing" | "error";
}

export default function MultimodalInterface() {
  const [activeMode, setActiveMode] = useState<"voice" | "text" | "gesture" | "visual">("text");
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [textCommand, setTextCommand] = useState("");
  const [activities, setActivities] = useState<Activity[]>([]);
  const [stats, setStats] = useState({
    voiceCommands: 0,
    textCommands: 0,
    gesturesUsed: 0,
    filesUploaded: 0,
  });
  const { toast } = useToast();

  const addActivity = (type: Activity["type"], message: string, status: Activity["status"] = "success") => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date(),
      status,
    };
    setActivities((prev) => [newActivity, ...prev].slice(0, 10));
  };

  const startVoiceInput = () => {
    setIsListening(true);
    setIsProcessing(true);
    setActiveMode("voice");
    addActivity("voice", "Voice recording started...", "processing");
    
    toast({
      title: "Voice Mode Activated",
      description: "Speak your command to control the workflow builder",
    });

    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false);
      setIsProcessing(false);
      setStats((prev) => ({ ...prev, voiceCommands: prev.voiceCommands + 1 }));
      addActivity("voice", "Voice command processed: 'Add sentiment analysis node'", "success");
      
      toast({
        title: "Voice Command Recognized",
        description: "Adding sentiment analysis node...",
      });
    }, 3000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsProcessing(true);
      addActivity("visual", `Uploading ${file.name}...`, "processing");
      
      toast({
        title: "Document Uploaded",
        description: "Extracting workflow from document...",
      });

      setTimeout(() => {
        setIsProcessing(false);
        setStats((prev) => ({ ...prev, filesUploaded: prev.filesUploaded + 1 }));
        addActivity("visual", `Successfully processed ${file.name}`, "success");
      }, 2000);
    }
  };

  const enableGestureMode = () => {
    setActiveMode("gesture");
    setStats((prev) => ({ ...prev, gesturesUsed: prev.gesturesUsed + 1 }));
    addActivity("gesture", "Gesture mode enabled", "success");
    
    toast({
      title: "Gesture Mode Activated",
      description: "Use touch gestures to manipulate nodes",
    });
  };

  const handleTextCommand = () => {
    if (!textCommand.trim()) return;
    
    setIsProcessing(true);
    addActivity("text", `Processing: "${textCommand}"`, "processing");
    
    setTimeout(() => {
      setIsProcessing(false);
      setStats((prev) => ({ ...prev, textCommands: prev.textCommands + 1 }));
      addActivity("text", `Executed: "${textCommand}"`, "success");
      
      toast({
        title: "Command Executed",
        description: "Workflow updated successfully",
      });
      
      setTextCommand("");
    }, 1500);
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Multimodal Interface
            </h1>
            <p className="text-muted-foreground mt-2">
              Interact with AI agents through voice, text, gesture, and visual inputs
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-sm px-3 py-1">
              <Activity className="w-3 h-3 mr-1.5 animate-pulse text-green-500" />
              All Systems Active
            </Badge>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Configure
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-primary">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Voice Commands</p>
                  <h3 className="text-2xl font-bold mt-1">{stats.voiceCommands}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mic className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="mt-3">
                <Badge variant="secondary" className="text-xs">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12% this week
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Text Commands</p>
                  <h3 className="text-2xl font-bold mt-1">{stats.textCommands}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Type className="w-6 h-6 text-blue-500" />
                </div>
              </div>
              <div className="mt-3">
                <Badge variant="secondary" className="text-xs">
                  <Zap className="w-3 h-3 mr-1" />
                  Most used
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Gesture Actions</p>
                  <h3 className="text-2xl font-bold mt-1">{stats.gesturesUsed}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Hand className="w-6 h-6 text-purple-500" />
                </div>
              </div>
              <div className="mt-3">
                <Badge variant="secondary" className="text-xs">
                  Touch enabled
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Files Uploaded</p>
                  <h3 className="text-2xl font-bold mt-1">{stats.filesUploaded}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Upload className="w-6 h-6 text-orange-500" />
                </div>
              </div>
              <div className="mt-3">
                <Badge variant="secondary" className="text-xs">
                  AI powered
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Input Mode Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Select Input Mode</CardTitle>
          <CardDescription>Choose your preferred way to interact with the workflow builder</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card
              className={`cursor-pointer transition-all hover:shadow-lg ${
                activeMode === "voice" ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setActiveMode("voice")}
            >
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Mic className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-1">Voice Commands</h4>
                <p className="text-xs text-muted-foreground">
                  Build workflows entirely through speech
                </p>
              </CardContent>
            </Card>

            <Card
              className={`cursor-pointer transition-all hover:shadow-lg ${
                activeMode === "text" ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setActiveMode("text")}
            >
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Type className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-1">Text Input</h4>
                <p className="text-xs text-muted-foreground">
                  Type commands and descriptions
                </p>
              </CardContent>
            </Card>

            <Card
              className={`cursor-pointer transition-all hover:shadow-lg ${
                activeMode === "gesture" ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setActiveMode("gesture")}
            >
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Hand className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-1">Gesture Control</h4>
                <p className="text-xs text-muted-foreground">
                  Touch and motion-based interactions
                </p>
              </CardContent>
            </Card>

            <Card
              className={`cursor-pointer transition-all hover:shadow-lg ${
                activeMode === "visual" ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setActiveMode("visual")}
            >
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-1">Visual Upload</h4>
                <p className="text-xs text-muted-foreground">
                  Upload documents or screenshots
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeMode} onValueChange={(v) => setActiveMode(v as any)}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="voice">
            <Mic className="w-4 h-4 mr-2" />
            Voice
          </TabsTrigger>
          <TabsTrigger value="text">
            <Type className="w-4 h-4 mr-2" />
            Text
          </TabsTrigger>
          <TabsTrigger value="gesture">
            <Hand className="w-4 h-4 mr-2" />
            Gesture
          </TabsTrigger>
          <TabsTrigger value="visual">
            <Upload className="w-4 h-4 mr-2" />
            Visual
          </TabsTrigger>
        </TabsList>

        <TabsContent value="voice" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Mic
                    className={`w-12 h-12 text-primary ${isListening ? "animate-pulse" : ""}`}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {isListening ? "Listening..." : "Voice Control Ready"}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {isListening
                      ? "Speak clearly to describe your workflow"
                      : "Click the button below to start voice input"}
                  </p>
                </div>
                <Button size="lg" onClick={startVoiceInput} disabled={isListening}>
                  <Mic className="w-4 h-4 mr-2" />
                  {isListening ? "Recording..." : "Start Voice Input"}
                </Button>
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm font-semibold mb-3">Example Commands:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div className="p-3 bg-muted rounded-lg">
                      "Add a sentiment analysis node"
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      "Connect trigger to email sender"
                    </div>
                    <div className="p-3 bg-muted rounded-lg">"Delete the last node I created"</div>
                    <div className="p-3 bg-muted rounded-lg">"Save this workflow as 'Support Bot'"</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="text" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Text Command Interface</h3>
                  <p className="text-sm text-muted-foreground">
                    Type natural language commands to build and modify your workflow
                  </p>
                </div>
                <div className="space-y-3">
                  <Textarea
                    placeholder="Type a command (e.g., 'Add a condition node that checks sentiment and routes to different teams based on the result')"
                    className="min-h-[100px]"
                    value={textCommand}
                    onChange={(e) => setTextCommand(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.ctrlKey) {
                        handleTextCommand();
                      }
                    }}
                  />
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-muted-foreground">Press Ctrl+Enter to execute</p>
                    <Button onClick={handleTextCommand} disabled={!textCommand.trim() || isProcessing}>
                      {isProcessing ? (
                        <>
                          <Activity className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Execute Command
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-semibold mb-2">Recent Commands:</p>
                  <div className="space-y-2">
                    <div className="p-3 bg-muted rounded-lg text-sm">
                      <Badge variant="outline" className="mr-2">
                        2m ago
                      </Badge>
                      "Add sentiment analysis after trigger"
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-sm">
                      <Badge variant="outline" className="mr-2">
                        5m ago
                      </Badge>
                      "Create email notification node"
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gesture" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Hand className="w-12 h-12 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Gesture Controls Active</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Use touch and motion-based interactions on supported devices
                  </p>
                </div>
                <Button size="lg" onClick={enableGestureMode}>
                  <Hand className="w-4 h-4 mr-2" />
                  Enable Gesture Mode
                </Button>
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm font-semibold mb-3">Supported Gestures:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-semibold text-sm mb-1">Pinch to Zoom</h4>
                      <p className="text-xs text-muted-foreground">
                        Zoom in/out of workflow canvas
                      </p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-semibold text-sm mb-1">Two-Finger Pan</h4>
                      <p className="text-xs text-muted-foreground">Move around the canvas</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-semibold text-sm mb-1">Long Press</h4>
                      <p className="text-xs text-muted-foreground">Open node context menu</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-semibold text-sm mb-1">Swipe</h4>
                      <p className="text-xs text-muted-foreground">Navigate between workflows</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visual" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Upload className="w-12 h-12 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Visual Upload</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload documents, diagrams, or screenshots to extract workflows automatically
                  </p>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <label htmlFor="file-upload">
                    <Button size="lg" asChild>
                      <span className="cursor-pointer">
                        <FileText className="w-4 h-4 mr-2" />
                        Upload Document
                      </span>
                    </Button>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                    onChange={handleFileUpload}
                  />
                  <p className="text-xs text-muted-foreground">
                    Supports PDF, Word, PNG, JPG (Max 10MB)
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm font-semibold mb-3">What We Can Extract:</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <FileText className="w-6 h-6 mb-2 mx-auto" />
                      <h4 className="font-semibold text-sm mb-1">Process Documents</h4>
                      <p className="text-xs text-muted-foreground">
                        Extract workflows from PDF/Word
                      </p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <Video className="w-6 h-6 mb-2 mx-auto" />
                      <h4 className="font-semibold text-sm mb-1">Flowchart Images</h4>
                      <p className="text-xs text-muted-foreground">Convert diagrams to workflows</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <Eye className="w-6 h-6 mb-2 mx-auto" />
                      <h4 className="font-semibold text-sm mb-1">Screenshots</h4>
                      <p className="text-xs text-muted-foreground">Recreate workflows from images</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workflow Canvas - Takes 2 columns */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Workflow Canvas</CardTitle>
                  <CardDescription>
                    Your workflow responds to all input modes in real-time
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {isProcessing && (
                    <Badge variant="outline" className="animate-pulse">
                      <Activity className="w-3 h-3 mr-1" />
                      Processing
                    </Badge>
                  )}
                  <Button variant="outline" size="sm">
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed rounded-lg h-[500px] bg-muted/30 overflow-hidden relative">
                <AgentCanvas />
                {isProcessing && (
                  <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center space-y-3">
                      <Activity className="w-8 h-8 animate-spin mx-auto text-primary" />
                      <p className="text-sm font-medium">Processing your input...</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Feed - Takes 1 column */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Activity Feed
              </CardTitle>
              <CardDescription>Real-time updates from all input modes</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-3">
                  {activities.length === 0 ? (
                    <div className="text-center py-12">
                      <Activity className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                      <p className="text-sm text-muted-foreground">No activities yet</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Start interacting to see updates
                      </p>
                    </div>
                  ) : (
                    activities.map((activity) => (
                      <div
                        key={activity.id}
                        className="p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              activity.type === "voice"
                                ? "bg-primary/10"
                                : activity.type === "text"
                                ? "bg-blue-500/10"
                                : activity.type === "gesture"
                                ? "bg-purple-500/10"
                                : "bg-orange-500/10"
                            }`}
                          >
                            {activity.type === "voice" && <Mic className="w-4 h-4 text-primary" />}
                            {activity.type === "text" && <Type className="w-4 h-4 text-blue-500" />}
                            {activity.type === "gesture" && <Hand className="w-4 h-4 text-purple-500" />}
                            {activity.type === "visual" && <Upload className="w-4 h-4 text-orange-500" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge
                                variant={
                                  activity.status === "success"
                                    ? "default"
                                    : activity.status === "processing"
                                    ? "secondary"
                                    : "destructive"
                                }
                                className="text-xs"
                              >
                                {activity.status}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {activity.timestamp.toLocaleTimeString()}
                              </span>
                            </div>
                            <p className="text-sm">{activity.message}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
