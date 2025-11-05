import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  GitBranch,
  Target,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  FileText,
  Eye,
  Download,
} from "lucide-react";

interface DecisionNode {
  id: string;
  label: string;
  confidence: number;
  reasoning: string;
  dataPoints: string[];
  children?: DecisionNode[];
}

const mockDecisionTree: DecisionNode = {
  id: "1",
  label: "Customer Support Request",
  confidence: 95,
  reasoning: "Analyzed incoming message for intent and urgency",
  dataPoints: ["Message content", "Customer history", "Time of day"],
  children: [
    {
      id: "2",
      label: "Sentiment Analysis",
      confidence: 92,
      reasoning: "Detected negative sentiment with high confidence",
      dataPoints: ["Emotional keywords", "Tone analysis", "Punctuation patterns"],
      children: [
        {
          id: "3",
          label: "Priority Classification",
          confidence: 88,
          reasoning: "Classified as high priority based on sentiment and history",
          dataPoints: ["Sentiment score: -0.7", "Customer tier: Premium", "Previous escalations: 2"],
          children: [
            {
              id: "4",
              label: "Route to Senior Agent",
              confidence: 94,
              reasoning: "Premium customer with negative sentiment requires senior attention",
              dataPoints: ["Agent availability", "Specialization match", "Current workload"],
            },
          ],
        },
      ],
    },
  ],
};

interface AuditEntry {
  timestamp: Date;
  action: string;
  decision: string;
  confidence: number;
  dataUsed: string[];
  outcome: string;
}

const mockAuditLog: AuditEntry[] = [
  {
    timestamp: new Date("2025-01-15T10:30:00"),
    action: "Customer Inquiry Routed",
    decision: "Escalate to Senior Support",
    confidence: 94,
    dataUsed: ["Sentiment: Negative (-0.7)", "Customer Tier: Premium", "Issue: Billing"],
    outcome: "Successfully resolved in 12 minutes",
  },
  {
    timestamp: new Date("2025-01-15T10:25:00"),
    action: "Lead Qualification",
    decision: "High-Quality Lead",
    confidence: 87,
    dataUsed: ["Company size: 500+", "Industry: SaaS", "Budget: $50k+"],
    outcome: "Converted to opportunity",
  },
  {
    timestamp: new Date("2025-01-15T10:20:00"),
    action: "Email Categorization",
    decision: "Spam Detection",
    confidence: 98,
    dataUsed: ["Sender reputation", "Content patterns", "Link analysis"],
    outcome: "Correctly filtered",
  },
];

export default function ExplainableAI() {
  const [selectedNode, setSelectedNode] = useState<DecisionNode>(mockDecisionTree);
  const [selectedAudit, setSelectedAudit] = useState<AuditEntry | null>(null);

  const renderDecisionNode = (node: DecisionNode, level: number = 0) => {
    const isSelected = selectedNode.id === node.id;

    return (
      <div key={node.id} className={`${level > 0 ? "ml-8 mt-4" : ""}`}>
        <Card
          className={`cursor-pointer transition-all hover:shadow-lg ${
            isSelected ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => setSelectedNode(node)}
        >
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-3">
              <h4 className="font-semibold">{node.label}</h4>
              <Badge
                variant={node.confidence >= 90 ? "default" : node.confidence >= 70 ? "secondary" : "outline"}
              >
                {node.confidence}% confidence
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{node.reasoning}</p>
            <div className="space-y-2">
              <p className="text-xs font-semibold">Data Points Used:</p>
              <div className="flex flex-wrap gap-2">
                {node.dataPoints.map((point, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {point}
                  </Badge>
                ))}
              </div>
            </div>
            <Progress value={node.confidence} className="mt-3" />
          </CardContent>
        </Card>
        {node.children?.map((child) => renderDecisionNode(child, level + 1))}
      </div>
    );
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Explainable AI Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Full transparency into agent decision-making with visual reasoning paths
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Brain className="w-4 h-4 mr-2" />
            Analyze Decision
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Confidence</p>
                <p className="text-2xl font-bold">92.3%</p>
              </div>
              <Target className="w-8 h-8 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Decisions Today</p>
                <p className="text-2xl font-bold">1,247</p>
              </div>
              <GitBranch className="w-8 h-8 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Accuracy Rate</p>
                <p className="text-2xl font-bold">97.8%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Bias Alerts</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-500 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="decision-tree">
        <TabsList>
          <TabsTrigger value="decision-tree">Decision Tree</TabsTrigger>
          <TabsTrigger value="audit-trail">Audit Trail</TabsTrigger>
          <TabsTrigger value="bias-detection">Bias Detection</TabsTrigger>
          <TabsTrigger value="what-if">What-If Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="decision-tree" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GitBranch className="w-5 h-5" />
                    Decision Flow Visualization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] pr-4">
                    {renderDecisionNode(mockDecisionTree)}
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Detailed Reasoning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">{selectedNode.label}</h4>
                      <Progress value={selectedNode.confidence} className="mb-2" />
                      <p className="text-sm text-muted-foreground">{selectedNode.reasoning}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Confidence Breakdown</h4>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Data Quality</span>
                            <span>95%</span>
                          </div>
                          <Progress value={95} />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Model Certainty</span>
                            <span>91%</span>
                          </div>
                          <Progress value={91} />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Historical Accuracy</span>
                            <span>89%</span>
                          </div>
                          <Progress value={89} />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Data Sources</h4>
                      <div className="space-y-2">
                        {selectedNode.dataPoints.map((point, index) => (
                          <div key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Uncertainty Factors</h4>
                      <div className="space-y-2">
                        <Badge variant="outline" className="text-xs">
                          Limited historical data: -3%
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Time sensitivity: -2%
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="audit-trail">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Complete Audit Trail
              </CardTitle>
              <CardDescription>
                Full logs of data sources, reasoning steps, and decision factors for compliance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {mockAuditLog.map((entry, index) => (
                    <Card
                      key={index}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        selectedAudit === entry ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setSelectedAudit(entry)}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-semibold">{entry.action}</h4>
                            <p className="text-xs text-muted-foreground">
                              {entry.timestamp.toLocaleString()}
                            </p>
                          </div>
                          <Badge variant="secondary">{entry.confidence}%</Badge>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <p className="text-sm font-semibold">Decision:</p>
                            <p className="text-sm text-muted-foreground">{entry.decision}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold">Data Used:</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {entry.dataUsed.map((data, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {data}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-semibold">Outcome:</p>
                            <p className="text-sm text-muted-foreground">{entry.outcome}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bias-detection">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Bias Detection & Fairness Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Fairness Score</p>
                          <p className="text-2xl font-bold">96.2%</p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-green-500 opacity-20" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Bias Alerts</p>
                          <p className="text-2xl font-bold">2</p>
                        </div>
                        <AlertCircle className="w-8 h-8 text-yellow-500 opacity-20" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Compliance</p>
                          <p className="text-2xl font-bold">100%</p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-green-500 opacity-20" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Detected Potential Biases</h3>
                  <div className="space-y-3">
                    <Card className="border-yellow-500/50">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1">Geographic Distribution Imbalance</h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              82% of training data from North America, may affect performance in other regions
                            </p>
                            <Button size="sm" variant="outline">
                              Review Training Data
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-yellow-500/50">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1">Time-of-Day Sensitivity</h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              Slightly lower accuracy for requests made between 2-6 AM
                            </p>
                            <Button size="sm" variant="outline">
                              Investigate Pattern
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">GDPR Compliance</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">Right to explanation - All decisions explainable</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">Data minimization - Only necessary data used</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">Transparency - Full audit trail maintained</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">Fairness - Bias detection active</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="what-if">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                What-If Analysis
              </CardTitle>
              <CardDescription>
                Test how different inputs would change agent decisions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Brain className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-20" />
                <p className="text-muted-foreground">What-If Analysis interface coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
