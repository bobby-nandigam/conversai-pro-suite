import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import {
  Bot,
  Sparkles,
  Zap,
  Brain,
  GitBranch,
  MessageSquare,
  Database,
  Workflow,
  ArrowRight,
  Plus,
  Settings,
  Play,
  Code,
  Network
} from "lucide-react";

const agentTemplates = [
  {
    name: "Customer Support Agent",
    description: "Intelligent support automation with sentiment analysis and ticket routing",
    icon: MessageSquare,
    color: "from-blue-500 to-cyan-500",
    nodes: 8,
    complexity: "Advanced"
  },
  {
    name: "Sales Assistant",
    description: "Lead qualification, product recommendations, and pipeline management",
    icon: Sparkles,
    color: "from-purple-500 to-pink-500",
    nodes: 12,
    complexity: "Expert"
  },
  {
    name: "Data Processor",
    description: "Automated data extraction, transformation, and analysis workflows",
    icon: Database,
    color: "from-orange-500 to-red-500",
    nodes: 6,
    complexity: "Intermediate"
  },
  {
    name: "Knowledge Assistant",
    description: "RAG-powered Q&A with multi-source knowledge integration",
    icon: Brain,
    color: "from-green-500 to-emerald-500",
    nodes: 10,
    complexity: "Advanced"
  }
];

const capabilities = [
  { icon: GitBranch, label: "Multi-Step Workflows", description: "Complex decision trees and parallel processing" },
  { icon: Brain, label: "AI-Powered Logic", description: "LLM integration with custom prompts and knowledge bases" },
  { icon: Database, label: "Data Operations", description: "CRUD operations, transformations, and validations" },
  { icon: Network, label: "API Integrations", description: "Connect to any external service or database" },
  { icon: Zap, label: "Real-Time Processing", description: "Event-driven triggers and streaming responses" },
  { icon: Code, label: "Custom Functions", description: "JavaScript/Python execution in secure sandboxes" }
];

export default function Index() {
  const navigate = useNavigate();
  const [agentName, setAgentName] = useState("");
  const [agentDescription, setAgentDescription] = useState("");

  const handleCreateAgent = () => {
    if (agentName.trim()) {
      navigate("/collaborative-editing");
    }
  };

  const handleUseTemplate = (template: any) => {
    navigate("/collaborative-editing");
  };

  return (
    <div className="flex-1 overflow-auto">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 border-b border-border/40">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="relative px-6 py-16 md:py-24 max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-12">
            <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
              <Sparkles className="w-3 h-3 mr-1" />
              Production-Ready AI Agent Platform
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Build <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">Intelligent Agents</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Design, orchestrate, and deploy sophisticated AI workflows with visual canvas, 
              real-time collaboration, and enterprise-grade reliability.
            </p>
          </div>

          {/* Quick Create Card */}
          <Card className="max-w-2xl mx-auto bg-card/60 backdrop-blur-xl border-2 border-primary/20 shadow-2xl shadow-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-6 h-6 text-primary" />
                Create Your First Agent
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Agent Name</label>
                <Input
                  placeholder="e.g., Customer Support Pro, Lead Qualifier..."
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description (Optional)</label>
                <Textarea
                  placeholder="What will this agent do? Define its purpose and capabilities..."
                  value={agentDescription}
                  onChange={(e) => setAgentDescription(e.target.value)}
                  className="bg-background/50 min-h-[100px]"
                />
              </div>
              <div className="flex gap-3">
                <Button 
                  className="flex-1 bg-gradient-to-r from-primary to-purple-600 hover:opacity-90"
                  size="lg"
                  onClick={handleCreateAgent}
                >
                  <Workflow className="w-4 h-4 mr-2" />
                  Start Building
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" size="lg">
                  <Play className="w-4 h-4 mr-2" />
                  Quick Tour
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Agent Templates Section */}
      <div className="px-6 py-16 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Start with a Template</h2>
          <p className="text-muted-foreground text-lg">
            Pre-built workflows you can customize and deploy in minutes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {agentTemplates.map((template, index) => (
            <Card 
              key={index}
              className="group cursor-pointer hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/40 bg-gradient-to-br from-card to-card/50"
              onClick={() => handleUseTemplate(template)}
            >
              <CardContent className="p-6 space-y-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${template.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <template.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {template.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {template.description}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border/40">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {template.nodes} nodes
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {template.complexity}
                    </Badge>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" onClick={() => navigate("/marketplace")}>
            <Plus className="w-4 h-4 mr-2" />
            Browse 50+ Templates
          </Button>
        </div>
      </div>

      {/* Capabilities Section */}
      <div className="bg-muted/30 border-y border-border/40 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Everything You Need to Build</h2>
            <p className="text-muted-foreground text-lg">
              Enterprise-grade features for production AI agents
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((capability, index) => (
              <Card key={index} className="bg-card/60 backdrop-blur-sm hover:bg-card transition-colors border-border/40">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <capability.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{capability.label}</h3>
                      <p className="text-sm text-muted-foreground">
                        {capability.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 py-16 max-w-4xl mx-auto text-center">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold">Ready to Build Something Amazing?</h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of teams using PixelMind AI to automate complex workflows
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90"
              onClick={() => navigate("/collaborative-editing")}
            >
              <Workflow className="w-5 h-5 mr-2" />
              Start Building Now
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/documentation")}>
              View Documentation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
