import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search,
  Star,
  Download,
  TrendingUp,
  Shield,
  Zap,
  Users,
  MessageSquare,
  DollarSign,
  Heart,
  Filter,
  SlidersHorizontal,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface AgentTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  downloads: number;
  price: number;
  isFree: boolean;
  verified: boolean;
  tags: string[];
  author: string;
  features: string[];
}

const agentTemplates: AgentTemplate[] = [
  {
    id: "1",
    name: "Customer Support Pro",
    description: "Advanced customer support agent with sentiment analysis, ticket routing, and multilingual support",
    category: "Customer Service",
    rating: 4.8,
    downloads: 12500,
    price: 0,
    isFree: true,
    verified: true,
    tags: ["Support", "Multilingual", "Sentiment Analysis"],
    author: "ConversaAI Team",
    features: ["24/7 Availability", "Sentiment Analysis", "Auto-routing", "Knowledge Base Integration"],
  },
  {
    id: "2",
    name: "Sales Lead Qualifier",
    description: "Intelligent lead qualification with CRM integration and automated follow-ups",
    category: "Sales",
    rating: 4.9,
    downloads: 8300,
    price: 49,
    isFree: false,
    verified: true,
    tags: ["Sales", "CRM", "Lead Generation"],
    author: "SalesBoost Inc",
    features: ["Lead Scoring", "CRM Sync", "Email Automation", "Meeting Scheduler"],
  },
  {
    id: "3",
    name: "HR Onboarding Assistant",
    description: "Streamline employee onboarding with document processing and training coordination",
    category: "HR",
    rating: 4.7,
    downloads: 6200,
    price: 0,
    isFree: true,
    verified: true,
    tags: ["HR", "Onboarding", "Training"],
    author: "HRTech Solutions",
    features: ["Document Collection", "Training Scheduling", "Compliance Tracking", "FAQs"],
  },
  {
    id: "4",
    name: "Financial Report Analyzer",
    description: "SOC2-certified agent for financial analysis and automated reporting",
    category: "Finance",
    rating: 5.0,
    downloads: 4100,
    price: 199,
    isFree: false,
    verified: true,
    tags: ["Finance", "SOC2", "Reporting"],
    author: "FinanceAI Corp",
    features: ["Data Analysis", "Custom Reports", "Compliance", "Forecasting"],
  },
  {
    id: "5",
    name: "Healthcare Patient Intake",
    description: "HIPAA-compliant patient intake with appointment scheduling",
    category: "Healthcare",
    rating: 4.9,
    downloads: 5800,
    price: 99,
    isFree: false,
    verified: true,
    tags: ["Healthcare", "HIPAA", "Scheduling"],
    author: "MedTech AI",
    features: ["HIPAA Compliant", "Appointment Booking", "Insurance Verification", "Medical History"],
  },
  {
    id: "6",
    name: "E-commerce Order Tracker",
    description: "Track orders, handle returns, and provide shipping updates automatically",
    category: "E-commerce",
    rating: 4.6,
    downloads: 9700,
    price: 0,
    isFree: true,
    verified: false,
    tags: ["E-commerce", "Logistics", "Returns"],
    author: "ShopAI",
    features: ["Order Tracking", "Return Processing", "Shipping Updates", "Inventory Check"],
  },
];

const categories = ["All", "Customer Service", "Sales", "HR", "Finance", "Healthcare", "E-commerce"];

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filterVerified, setFilterVerified] = useState(false);
  const [filterFree, setFilterFree] = useState(false);
  const { toast } = useToast();

  const filteredAgents = agentTemplates.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "All" || agent.category === selectedCategory;
    const matchesVerified = !filterVerified || agent.verified;
    const matchesFree = !filterFree || agent.isFree;

    return matchesSearch && matchesCategory && matchesVerified && matchesFree;
  });

  const handleDeploy = (agent: AgentTemplate) => {
    toast({
      title: "Agent Deployed",
      description: `${agent.name} has been added to your workspace.`,
    });
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            AI Agent Marketplace
          </h1>
          <p className="text-muted-foreground mt-1">
            Discover, deploy, and monetize pre-built AI agents
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Heart className="w-4 h-4 mr-2" />
            Favorites
          </Button>
          <Button>
            <TrendingUp className="w-4 h-4 mr-2" />
            Publish Agent
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Agents</p>
                <p className="text-2xl font-bold">300+</p>
              </div>
              <Zap className="w-8 h-8 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Downloads</p>
                <p className="text-2xl font-bold">50K+</p>
              </div>
              <Download className="w-8 h-8 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Verified Agents</p>
                <p className="text-2xl font-bold">95%</p>
              </div>
              <Shield className="w-8 h-8 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
                <p className="text-2xl font-bold">4.8</p>
              </div>
              <Star className="w-8 h-8 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search agents by name, description, or tags..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterVerified ? "default" : "outline"}
                onClick={() => setFilterVerified(!filterVerified)}
                size="sm"
              >
                <Shield className="w-4 h-4 mr-2" />
                Verified Only
              </Button>
              <Button
                variant={filterFree ? "default" : "outline"}
                onClick={() => setFilterFree(!filterFree)}
                size="sm"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Free Only
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="w-full justify-start overflow-x-auto">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <Card key={agent.id} className="flex flex-col hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {agent.name}
                    {agent.verified && (
                      <Shield className="w-4 h-4 text-primary" />
                    )}
                  </CardTitle>
                  <CardDescription className="mt-1">by {agent.author}</CardDescription>
                </div>
                <Badge variant={agent.isFree ? "secondary" : "default"}>
                  {agent.isFree ? "Free" : `$${agent.price}`}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <p className="text-sm text-muted-foreground mb-4">{agent.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {agent.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-xs font-semibold">Key Features:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {agent.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-primary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{agent.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Download className="w-4 h-4" />
                    <span>{agent.downloads.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" onClick={() => handleDeploy(agent)}>
                    <Download className="w-4 h-4 mr-2" />
                    Deploy
                  </Button>
                  <Button variant="outline" size="icon">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAgents.length === 0 && (
        <Card>
          <CardContent className="pt-12 pb-12 text-center">
            <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-20" />
            <p className="text-muted-foreground">No agents found matching your criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
