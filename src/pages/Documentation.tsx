import { useState } from "react";
import { Book, Search, FileText, Code, Lightbulb, Video, Download, ExternalLink, Copy, Check, BookOpen, Sparkles, Zap, Shield, Users, Database, MessageSquare, Settings } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";

export default function Documentation() {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const documentationSections = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: Sparkles,
      items: [
        { title: "Quick Start Guide", time: "5 min", badge: "Essential" },
        { title: "Installation & Setup", time: "10 min", badge: "Essential" },
        { title: "Your First Agent", time: "15 min", badge: "Tutorial" },
        { title: "Dashboard Overview", time: "8 min", badge: "Guide" },
      ]
    },
    {
      id: "agents",
      title: "Agent Management",
      icon: Users,
      items: [
        { title: "Creating Agents", time: "12 min", badge: "Guide" },
        { title: "Agent Configuration", time: "15 min", badge: "Advanced" },
        { title: "Training Your Agent", time: "20 min", badge: "Tutorial" },
        { title: "Agent Analytics", time: "10 min", badge: "Guide" },
      ]
    },
    {
      id: "integrations",
      title: "Integrations",
      icon: Zap,
      items: [
        { title: "Webhook Setup", time: "8 min", badge: "Essential" },
        { title: "API Integration", time: "15 min", badge: "Advanced" },
        { title: "Third-party Services", time: "12 min", badge: "Guide" },
        { title: "Custom Connectors", time: "25 min", badge: "Advanced" },
      ]
    },
    {
      id: "security",
      title: "Security & Privacy",
      icon: Shield,
      items: [
        { title: "Authentication Methods", time: "10 min", badge: "Essential" },
        { title: "Data Encryption", time: "8 min", badge: "Guide" },
        { title: "Compliance & GDPR", time: "15 min", badge: "Important" },
        { title: "Security Best Practices", time: "12 min", badge: "Guide" },
      ]
    },
  ];

  const apiEndpoints = [
    {
      method: "POST",
      endpoint: "/api/agents/create",
      description: "Create a new agent",
      example: `{
  "name": "Customer Support Bot",
  "type": "support",
  "configuration": {
    "language": "en",
    "tone": "friendly"
  }
}`
    },
    {
      method: "GET",
      endpoint: "/api/agents/{id}",
      description: "Get agent details",
      example: `// Response
{
  "id": "agent_123",
  "name": "Customer Support Bot",
  "status": "active",
  "metrics": {
    "conversations": 1234,
    "satisfaction": 4.8
  }
}`
    },
    {
      method: "POST",
      endpoint: "/api/conversations/send",
      description: "Send a message to an agent",
      example: `{
  "agent_id": "agent_123",
  "message": "Hello, I need help",
  "user_id": "user_456",
  "metadata": {
    "channel": "web"
  }
}`
    },
    {
      method: "GET",
      endpoint: "/api/analytics/overview",
      description: "Get analytics overview",
      example: `// Response
{
  "total_conversations": 5432,
  "active_agents": 12,
  "avg_response_time": "2.3s",
  "satisfaction_rate": 4.7
}`
    },
  ];

  const faqItems = [
    {
      question: "How do I create my first agent?",
      answer: "Navigate to the Agent Management page, click 'Create New Agent', configure the agent settings including name, type, and training data, then deploy. You can start testing immediately after deployment."
    },
    {
      question: "What integrations are supported?",
      answer: "We support webhooks, REST APIs, Slack, Discord, Microsoft Teams, Telegram, WhatsApp, email, and custom integrations through our API. You can also build custom connectors using our SDK."
    },
    {
      question: "How is my data secured?",
      answer: "All data is encrypted at rest and in transit using AES-256 and TLS 1.3. We're SOC 2 Type II certified, GDPR compliant, and follow industry best practices for data security and privacy."
    },
    {
      question: "Can I train agents with my own data?",
      answer: "Yes! You can upload documents, add FAQs, crawl your website, or connect to your knowledge base. The agent will learn from this data to provide accurate, context-aware responses."
    },
    {
      question: "What's the response time for agents?",
      answer: "Average response time is under 500ms for simple queries and 1-2 seconds for complex reasoning. Performance varies based on agent configuration and integration complexity."
    },
    {
      question: "How do I monitor agent performance?",
      answer: "Use the Analytics dashboard to track metrics like conversation volume, response times, satisfaction ratings, and more. You can also set up alerts for specific events or thresholds."
    },
  ];

  const codeExamples = [
    {
      title: "Initialize SDK",
      language: "javascript",
      code: `import { AgentSDK } from '@yourplatform/sdk';

const sdk = new AgentSDK({
  apiKey: process.env.API_KEY,
  environment: 'production'
});

// Initialize agent
const agent = await sdk.agents.get('agent_123');`
    },
    {
      title: "Send Message",
      language: "javascript",
      code: `const response = await agent.sendMessage({
  message: 'Hello, I need help with my order',
  userId: 'user_456',
  metadata: {
    channel: 'web',
    locale: 'en-US'
  }
});

console.log(response.message);`
    },
    {
      title: "Stream Responses",
      language: "javascript",
      code: `const stream = await agent.streamMessage({
  message: 'Explain quantum computing',
  onChunk: (chunk) => {
    process.stdout.write(chunk.text);
  },
  onComplete: (response) => {
    console.log('\\nDone!', response.metadata);
  }
});`
    },
    {
      title: "Handle Events",
      language: "javascript",
      code: `agent.on('message', (data) => {
  console.log('New message:', data);
});

agent.on('error', (error) => {
  console.error('Error:', error);
});

agent.on('status_change', (status) => {
  console.log('Status:', status);
});`
    },
  ];

  const tutorials = [
    {
      title: "Building a Customer Support Bot",
      duration: "30 min",
      level: "Beginner",
      description: "Learn how to create and deploy a fully functional customer support agent",
      thumbnail: "📚",
      steps: 5
    },
    {
      title: "Advanced Agent Training",
      duration: "45 min",
      level: "Advanced",
      description: "Deep dive into training techniques, fine-tuning, and optimization",
      thumbnail: "🎓",
      steps: 8
    },
    {
      title: "Multi-Channel Integration",
      duration: "25 min",
      level: "Intermediate",
      description: "Connect your agents to Slack, Discord, and other platforms",
      thumbnail: "🔗",
      steps: 6
    },
    {
      title: "Analytics & Monitoring",
      duration: "20 min",
      level: "Beginner",
      description: "Track performance, set up alerts, and optimize your agents",
      thumbnail: "📊",
      steps: 4
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Documentation Center
              </h1>
              <p className="text-muted-foreground">Everything you need to build amazing AI agents</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search documentation..."
              className="pl-10 h-12 bg-card border-border/50 focus-visible:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border/50 hover:border-primary/50 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Book className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">150+</p>
                  <p className="text-sm text-muted-foreground">Guides</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 hover:border-primary/50 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Code className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">50+</p>
                  <p className="text-sm text-muted-foreground">Code Examples</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 hover:border-primary/50 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Video className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">25+</p>
                  <p className="text-sm text-muted-foreground">Video Tutorials</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 hover:border-primary/50 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Lightbulb className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">100+</p>
                  <p className="text-sm text-muted-foreground">Tips & Tricks</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="guides" className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="guides" className="gap-2">
              <FileText className="h-4 w-4" />
              Guides
            </TabsTrigger>
            <TabsTrigger value="api" className="gap-2">
              <Code className="h-4 w-4" />
              API Reference
            </TabsTrigger>
            <TabsTrigger value="tutorials" className="gap-2">
              <Video className="h-4 w-4" />
              Tutorials
            </TabsTrigger>
            <TabsTrigger value="examples" className="gap-2">
              <Sparkles className="h-4 w-4" />
              Code Examples
            </TabsTrigger>
            <TabsTrigger value="faq" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              FAQ
            </TabsTrigger>
          </TabsList>

          {/* Guides Tab */}
          <TabsContent value="guides" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {documentationSections.map((section) => (
                <Card key={section.id} className="border-border/50 hover:border-primary/50 transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                        <section.icon className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <CardTitle>{section.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {section.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <Book className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          <div>
                            <p className="font-medium group-hover:text-primary transition-colors">{item.title}</p>
                            <p className="text-xs text-muted-foreground">{item.time} read</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="ml-2">{item.badge}</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* API Reference Tab */}
          <TabsContent value="api" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  API Endpoints
                </CardTitle>
                <CardDescription>
                  RESTful API reference for integrating with our platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {apiEndpoints.map((endpoint, idx) => (
                  <Card key={idx} className="border-border/50 bg-muted/30">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <Badge 
                          variant={endpoint.method === "GET" ? "default" : "secondary"}
                          className="font-mono"
                        >
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm font-mono flex-1">{endpoint.endpoint}</code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(endpoint.example, `api-${idx}`)}
                        >
                          {copiedCode === `api-${idx}` ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <CardDescription>{endpoint.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-32 w-full rounded-lg border bg-background/50 p-4">
                        <pre className="text-xs font-mono">
                          <code>{endpoint.example}</code>
                        </pre>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                ))}

                <Card className="border-primary/50 bg-primary/5">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium mb-2">Need an API key?</p>
                        <p className="text-sm text-muted-foreground mb-3">
                          Generate your API keys in the Settings page under API Access.
                        </p>
                        <Button variant="outline" size="sm">
                          Go to Settings
                          <ExternalLink className="h-3 w-3 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tutorials Tab */}
          <TabsContent value="tutorials" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tutorials.map((tutorial, idx) => (
                <Card key={idx} className="border-border/50 hover:border-primary/50 transition-all hover:shadow-lg overflow-hidden group cursor-pointer">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform">
                    {tutorial.thumbnail}
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{tutorial.level}</Badge>
                      <Badge variant="secondary">{tutorial.duration}</Badge>
                      <Badge variant="secondary">{tutorial.steps} steps</Badge>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {tutorial.title}
                    </CardTitle>
                    <CardDescription>{tutorial.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                      <Video className="h-4 w-4 mr-2" />
                      Start Tutorial
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Code Examples Tab */}
          <TabsContent value="examples" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {codeExamples.map((example, idx) => (
                <Card key={idx} className="border-border/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{example.title}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-mono text-xs">
                          {example.language}
                        </Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(example.code, `code-${idx}`)}
                        >
                          {copiedCode === `code-${idx}` ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-48 w-full rounded-lg border bg-background/50 p-4">
                      <pre className="text-sm font-mono">
                        <code>{example.code}</code>
                      </pre>
                    </ScrollArea>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-primary/50 bg-primary/5">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Download className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium mb-2">Download Complete SDK</p>
                    <p className="text-sm text-muted-foreground mb-3">
                      Get the full SDK with TypeScript definitions, examples, and utilities.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3 mr-2" />
                        Download SDK
                      </Button>
                      <Button variant="ghost" size="sm">
                        View on GitHub
                        <ExternalLink className="h-3 w-3 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>
                  Quick answers to common questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, idx) => (
                    <AccordionItem key={idx} value={`item-${idx}`}>
                      <AccordionTrigger className="text-left hover:text-primary">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <MessageSquare className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
                    <p className="text-muted-foreground mb-4">
                      Our support team is here to help you 24/7
                    </p>
                    <div className="flex gap-2 justify-center">
                      <Button>Contact Support</Button>
                      <Button variant="outline">Join Community</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}