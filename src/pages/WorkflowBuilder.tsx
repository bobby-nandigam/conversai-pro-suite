import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Mic, Send, Wand2, Download, Play, Eye, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { AgentCanvas } from "@/components/agent-builder/AgentCanvas";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface GeneratedWorkflow {
  id: string;
  name: string;
  description: string;
  nodes: any[];
  confidence: number;
}

export default function WorkflowBuilder() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI workflow assistant. Describe the workflow you want to create in plain language, and I'll build it for you. For example: 'When a customer emails a complaint, analyze sentiment, check their history, and route to the right team'",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedWorkflows, setGeneratedWorkflows] = useState<GeneratedWorkflow[]>([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState<GeneratedWorkflow | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      const workflow: GeneratedWorkflow = {
        id: `workflow-${Date.now()}`,
        name: `Workflow for: ${input.substring(0, 50)}...`,
        description: input,
        nodes: generateNodesFromDescription(input),
        confidence: 0.92,
      };

      setGeneratedWorkflows((prev) => [...prev, workflow]);

      const assistantMessage: Message = {
        role: "assistant",
        content: `I've created a workflow based on your description. The workflow includes ${workflow.nodes.length} nodes with ${(workflow.confidence * 100).toFixed(0)}% confidence. Would you like me to refine it or add more details?`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setSelectedWorkflow(workflow);
      setIsProcessing(false);

      toast({
        title: "Workflow Generated",
        description: "Your workflow has been created successfully.",
      });
    }, 2000);
  };

  const generateNodesFromDescription = (description: string): any[] => {
    const lowerDesc = description.toLowerCase();
    const nodes = [];

    // Trigger node (always first)
    nodes.push({
      id: `node-${nodes.length + 1}`,
      type: "trigger",
      label: "Trigger",
      position: { x: 100, y: 100 },
      config: {
        event: lowerDesc.includes("email") ? "email_received" : "webhook_received",
      },
    });

    // Sentiment analysis
    if (lowerDesc.includes("sentiment") || lowerDesc.includes("analyze")) {
      nodes.push({
        id: `node-${nodes.length + 1}`,
        type: "nlp",
        label: "Analyze Sentiment",
        position: { x: 100, y: 220 },
        config: {
          analysis_type: "sentiment",
        },
      });
    }

    // Check history
    if (lowerDesc.includes("history") || lowerDesc.includes("check")) {
      nodes.push({
        id: `node-${nodes.length + 1}`,
        type: "data_source",
        label: "Check Customer History",
        position: { x: 100, y: 340 },
        config: {
          source: "customer_database",
        },
      });
    }

    // Condition/routing
    if (lowerDesc.includes("route") || lowerDesc.includes("if") || lowerDesc.includes("team")) {
      nodes.push({
        id: `node-${nodes.length + 1}`,
        type: "condition",
        label: "Route Decision",
        position: { x: 100, y: 460 },
        config: {
          condition: "sentiment === 'negative'",
        },
      });
    }

    // Action nodes
    if (lowerDesc.includes("email") || lowerDesc.includes("send")) {
      nodes.push({
        id: `node-${nodes.length + 1}`,
        type: "send_email",
        label: "Send Email",
        position: { x: 300, y: 580 },
        config: {
          to: "support@company.com",
        },
      });
    }

    // Output node
    nodes.push({
      id: `node-${nodes.length + 1}`,
      type: "output",
      label: "Complete",
      position: { x: 100, y: 700 },
      config: {},
    });

    return nodes;
  };

  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsRecording(true);
      toast({
        title: "Recording Started",
        description: "Speak your workflow description...",
      });

      // Simulate recording for demo
      setTimeout(() => {
        stopVoiceRecording();
        setInput("When a customer emails a complaint, analyze sentiment and route to support team");
      }, 3000);
    } catch (error) {
      toast({
        title: "Microphone Access Denied",
        description: "Please allow microphone access to use voice input.",
        variant: "destructive",
      });
    }
  };

  const stopVoiceRecording = () => {
    setIsRecording(false);
    toast({
      title: "Recording Stopped",
      description: "Processing your voice input...",
    });
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Natural Language Workflow Builder
          </h1>
          <p className="text-muted-foreground mt-1">
            Create complex workflows using voice or text - no coding required
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          <Wand2 className="w-3 h-3 mr-1" />
          AI-Powered
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chat Interface */}
        <Card className="flex flex-col h-[calc(100vh-200px)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="w-5 h-5" />
              Conversation
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-4">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-60 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                {isProcessing && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-4 max-w-[80%]">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="flex gap-2">
              <Button
                size="icon"
                variant={isRecording ? "destructive" : "outline"}
                onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
              >
                <Mic className="w-4 h-4" />
              </Button>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Describe your workflow in plain language..."
                disabled={isProcessing}
              />
              <Button onClick={handleSend} disabled={isProcessing || !input.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Workflow Preview */}
        <Card className="h-[calc(100vh-200px)]">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Generated Workflow
              </span>
              {selectedWorkflow && (
                <Badge variant="secondary">
                  {(selectedWorkflow.confidence * 100).toFixed(0)}% Confidence
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedWorkflow ? (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Play className="w-4 h-4 mr-2" />
                    Test
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                </div>

                <div className="border rounded-lg p-4 bg-muted/30">
                  <h4 className="font-semibold mb-2">Workflow Details</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {selectedWorkflow.description}
                  </p>
                  <div className="space-y-2">
                    {selectedWorkflow.nodes.map((node, index) => (
                      <div
                        key={node.id}
                        className="flex items-center gap-3 p-3 bg-background rounded-lg border"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{node.label}</p>
                          <p className="text-xs text-muted-foreground capitalize">
                            {node.type.replace("_", " ")}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {node.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Wand2 className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>Describe a workflow to see it generated here</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Generated Workflows History */}
      {generatedWorkflows.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Workflows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {generatedWorkflows.map((workflow) => (
                <Card
                  key={workflow.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedWorkflow?.id === workflow.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedWorkflow(workflow)}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm line-clamp-1">{workflow.name}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {(workflow.confidence * 100).toFixed(0)}%
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {workflow.description}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {workflow.nodes.length} nodes
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
