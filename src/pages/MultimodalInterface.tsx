import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Mic, Upload, Hand, Eye, Type, Video, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { AgentCanvas } from "@/components/agent-builder/AgentCanvas";

export default function MultimodalInterface() {
  const [activeMode, setActiveMode] = useState<"voice" | "text" | "gesture" | "visual">("text");
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();

  const startVoiceInput = () => {
    setIsListening(true);
    setActiveMode("voice");
    toast({
      title: "Voice Mode Activated",
      description: "Speak your command to control the workflow builder",
    });

    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false);
      toast({
        title: "Voice Command Recognized",
        description: "Adding sentiment analysis node...",
      });
    }, 3000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "Document Uploaded",
        description: "Extracting workflow from document...",
      });
    }
  };

  const enableGestureMode = () => {
    setActiveMode("gesture");
    toast({
      title: "Gesture Mode Activated",
      description: "Use touch gestures to manipulate nodes",
    });
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Multimodal Interface
          </h1>
          <p className="text-muted-foreground mt-1">
            Interact with agents through voice, text, gesture, and visual inputs
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          <Eye className="w-3 h-3 mr-1" />
          All Input Modes Active
        </Badge>
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
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a command (e.g., 'Add a condition node that checks sentiment')"
                    className="flex-1"
                  />
                  <Button>Execute</Button>
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

      {/* Workflow Canvas */}
      <Card>
        <CardHeader>
          <CardTitle>Workflow Builder</CardTitle>
          <CardDescription>
            Your workflow responds to all input modes - voice, text, gestures, and visual uploads
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg h-[400px] bg-muted/30 overflow-hidden">
            <AgentCanvas />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
