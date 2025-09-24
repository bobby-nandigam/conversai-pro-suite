import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  Play, 
  Pause, 
  Square, 
  RotateCcw,
  TestTube,
  MessageSquare,
  BarChart3,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  Zap,
  Bot,
  User,
  Settings,
  Plus,
  Eye,
  Download,
  Share,
  AlertTriangle
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const mockTestSuites = [
  {
    id: 1,
    name: "Welcome Flow Test",
    description: "Tests the initial greeting and menu navigation",
    status: "passed",
    lastRun: "2024-01-15 10:30 AM",
    duration: "2.3s",
    testCases: 8,
    passed: 8,
    failed: 0,
    bot: "Customer Support Bot"
  },
  {
    id: 2,
    name: "Payment Flow Test",
    description: "Tests billing inquiries and payment processing",
    status: "failed",
    lastRun: "2024-01-15 09:45 AM", 
    duration: "4.1s",
    testCases: 12,
    passed: 9,
    failed: 3,
    bot: "Sales Assistant"
  },
  {
    id: 3,
    name: "Technical Support Test",
    description: "Tests technical issue resolution paths",
    status: "running",
    lastRun: "2024-01-15 11:05 AM",
    duration: "1.8s",
    testCases: 15,
    passed: 10,
    failed: 0,
    bot: "Tech Support Bot"
  }
]

const mockABTests = [
  {
    id: 1,
    name: "Welcome Message Variants",
    description: "Testing different greeting styles",
    status: "active",
    variants: ["Friendly", "Professional", "Casual"],
    traffic: 33,
    startDate: "2024-01-10",
    endDate: "2024-01-24",
    conversions: {
      "Friendly": { rate: 24.5, conversations: 245 },
      "Professional": { rate: 28.2, conversations: 298 },
      "Casual": { rate: 22.1, conversations: 187 }
    },
    winner: "Professional"
  },
  {
    id: 2,
    name: "Response Time Test",
    description: "Testing different response delays",
    status: "completed",
    variants: ["Instant", "1s Delay", "2s Delay"],
    traffic: 33,
    startDate: "2024-01-05",
    endDate: "2024-01-12",
    conversions: {
      "Instant": { rate: 31.2, conversations: 412 },
      "1s Delay": { rate: 29.8, conversations: 389 },
      "2s Delay": { rate: 26.4, conversations: 298 }
    },
    winner: "Instant"
  }
]

const mockConversationSimulator = {
  scenarios: [
    {
      id: 1,
      name: "New Customer Inquiry",
      steps: [
        { type: "user", message: "Hello, I'm interested in your products" },
        { type: "bot", message: "Hi! Welcome to our store. I'd be happy to help you find the perfect product. What are you looking for today?" },
        { type: "user", message: "I need a laptop for work" },
        { type: "bot", message: "Great choice! What's your budget range and what type of work will you be using it for?" }
      ]
    },
    {
      id: 2,
      name: "Billing Support",
      steps: [
        { type: "user", message: "I have a question about my bill" },
        { type: "bot", message: "I can help you with billing questions. Can you provide your account number or email address?" },
        { type: "user", message: "My email is john@example.com" },
        { type: "bot", message: "I found your account. What specific billing question can I help you with?" }
      ]
    }
  ]
}

export default function Testing() {
  const [activeTab, setActiveTab] = useState("suites")
  const [testSuites, setTestSuites] = useState(mockTestSuites)
  const [abTests, setABTests] = useState(mockABTests)
  const [selectedScenario, setSelectedScenario] = useState(mockConversationSimulator.scenarios[0])
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationStep, setSimulationStep] = useState(0)
  const [newTestSuite, setNewTestSuite] = useState({
    name: "",
    description: "",
    bot: "",
    scenarios: ""
  })
  const { toast } = useToast()

  const handleRunTest = (testId: number) => {
    setTestSuites(prev => prev.map(test => 
      test.id === testId 
        ? { ...test, status: "running", lastRun: new Date().toLocaleString() }
        : test
    ))
    
    setTimeout(() => {
      setTestSuites(prev => prev.map(test => 
        test.id === testId 
          ? { 
              ...test, 
              status: Math.random() > 0.3 ? "passed" : "failed",
              passed: Math.floor(Math.random() * test.testCases),
              failed: Math.floor(Math.random() * 3),
              duration: `${(Math.random() * 5 + 1).toFixed(1)}s`
            }
          : test
      ))
      
      toast({
        title: "Test Completed",
        description: "Test suite has finished running."
      })
    }, 3000)
    
    toast({
      title: "Test Started",
      description: "Test suite is now running..."
    })
  }

  const handleStartSimulation = () => {
    setIsSimulating(true)
    setSimulationStep(0)
    
    const interval = setInterval(() => {
      setSimulationStep(prev => {
        if (prev >= selectedScenario.steps.length - 1) {
          clearInterval(interval)
          setIsSimulating(false)
          toast({
            title: "Simulation Complete",
            description: "Conversation simulation has finished successfully."
          })
          return prev
        }
        return prev + 1
      })
    }, 2000)
  }

  const handleCreateABTest = () => {
    const newTest = {
      id: abTests.length + 1,
      name: "New A/B Test",
      description: "New test description",
      status: "draft" as const,
      variants: ["Variant A", "Variant B"],
      traffic: 50,
      startDate: new Date().toISOString().split('T')[0],
      endDate: "",
      conversions: {
        "Variant A": { rate: 0, conversations: 0 },
        "Variant B": { rate: 0, conversations: 0 }
      } as any,
      winner: null as any
    }
    
    setABTests([...abTests, newTest as any])
    toast({
      title: "A/B Test Created",
      description: "New A/B test has been created and saved as draft."
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "passed":
      case "completed":
        return "text-success"
      case "failed":
        return "text-destructive"
      case "running":
      case "active":
        return "text-warning"
      default:
        return "text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed":
      case "completed":
        return <CheckCircle className="w-4 h-4 text-success" />
      case "failed":
        return <XCircle className="w-4 h-4 text-destructive" />
      case "running":
      case "active":
        return <Clock className="w-4 h-4 text-warning" />
      default:
        return <AlertTriangle className="w-4 h-4 text-muted-foreground" />
    }
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Testing & Optimization</h1>
          <p className="text-muted-foreground">Run A/B tests, simulate conversations, and optimize your bot's performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="glass">
            <Plus className="w-4 h-4 mr-2" />
            New Test Suite
          </Button>
          <Button variant="ai" onClick={handleCreateABTest}>
            <Target className="w-4 h-4 mr-2" />
            Create A/B Test
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-ai">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Test Suites</p>
                <p className="text-2xl font-bold">{testSuites.length}</p>
              </div>
              <TestTube className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-ai">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tests Passed</p>
                <p className="text-2xl font-bold">{testSuites.reduce((acc, test) => acc + test.passed, 0)}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-ai">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">A/B Tests</p>
                <p className="text-2xl font-bold">{abTests.length}</p>
              </div>
              <Target className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-ai">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">94.2%</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="suites">Test Suites</TabsTrigger>
          <TabsTrigger value="ab-testing">A/B Testing</TabsTrigger>
          <TabsTrigger value="simulator">Conversation Simulator</TabsTrigger>
        </TabsList>

        <TabsContent value="suites" className="space-y-6">
          {/* Test Suites */}
          <div className="grid gap-4">
            {testSuites.map((testSuite) => (
              <Card key={testSuite.id} className="card-ai">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <TestTube className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{testSuite.name}</h3>
                          <Badge variant="outline" className={getStatusColor(testSuite.status)}>
                            {getStatusIcon(testSuite.status)}
                            <span className="ml-1">{testSuite.status}</span>
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{testSuite.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Bot: {testSuite.bot}</span>
                          <span>Last run: {testSuite.lastRun}</span>
                          <span>Duration: {testSuite.duration}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="flex items-center gap-4 mb-2">
                          <div className="text-center">
                            <p className="font-medium text-success">{testSuite.passed}</p>
                            <p className="text-xs text-muted-foreground">Passed</p>
                          </div>
                          <div className="text-center">
                            <p className="font-medium text-destructive">{testSuite.failed}</p>
                            <p className="text-xs text-muted-foreground">Failed</p>
                          </div>
                          <div className="text-center">
                            <p className="font-medium">{testSuite.testCases}</p>
                            <p className="text-xs text-muted-foreground">Total</p>
                          </div>
                        </div>
                        <Progress 
                          value={(testSuite.passed / testSuite.testCases) * 100} 
                          className="w-32"
                        />
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="glass"
                          onClick={() => handleRunTest(testSuite.id)}
                          disabled={testSuite.status === "running"}
                        >
                          {testSuite.status === "running" ? (
                            <Square className="w-4 h-4 mr-2" />
                          ) : (
                            <Play className="w-4 h-4 mr-2" />
                          )}
                          {testSuite.status === "running" ? "Stop" : "Run"}
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ab-testing" className="space-y-6">
          {/* A/B Tests */}
          <div className="grid gap-6">
            {abTests.map((test) => (
              <Card key={test.id} className="card-ai">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{test.name}</h3>
                        <Badge variant="outline" className={getStatusColor(test.status)}>
                          {getStatusIcon(test.status)}
                          <span className="ml-1">{test.status}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{test.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{test.startDate} - {test.endDate || "Ongoing"}</span>
                        <span>{test.traffic}% traffic split</span>
                        {test.winner && <span className="text-success">Winner: {test.winner}</span>}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="glass">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        View Results
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {test.variants.map((variant, index) => {
                      const conversion = test.conversions[variant]
                      const isWinner = test.winner === variant
                      return (
                        <Card key={variant} className={`${isWinner ? 'ring-2 ring-success' : ''}`}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{variant}</h4>
                              {isWinner && <Badge variant="secondary" className="text-success">Winner</Badge>}
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Conversion Rate:</span>
                                <span className="font-medium">{conversion.rate}%</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Conversations:</span>
                                <span className="font-medium">{conversion.conversations}</span>
                              </div>
                              <Progress value={conversion.rate} className="h-2" />
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="simulator" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Scenario Selection */}
            <Card className="card-ai">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Test Scenarios
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockConversationSimulator.scenarios.map((scenario) => (
                  <Card 
                    key={scenario.id} 
                    className={`cursor-pointer transition-all ${selectedScenario.id === scenario.id ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setSelectedScenario(scenario)}
                  >
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">{scenario.name}</h4>
                      <p className="text-sm text-muted-foreground">{scenario.steps.length} steps</p>
                    </CardContent>
                  </Card>
                ))}
                
                <Button variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Scenario
                </Button>
              </CardContent>
            </Card>

            {/* Simulation Interface */}
            <Card className="card-ai">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="w-5 h-5" />
                    Conversation Simulator
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="glass"
                      onClick={handleStartSimulation}
                      disabled={isSimulating}
                    >
                      {isSimulating ? (
                        <Pause className="w-4 h-4 mr-2" />
                      ) : (
                        <Play className="w-4 h-4 mr-2" />
                      )}
                      {isSimulating ? "Running..." : "Start Simulation"}
                    </Button>
                    <Button variant="ghost" size="icon">
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground mb-4">
                    Scenario: {selectedScenario.name}
                  </div>
                  
                  <ScrollArea className="h-96 border border-border rounded-lg p-4">
                    <div className="space-y-4">
                      {selectedScenario.steps.map((step, index) => (
                        <div 
                          key={index} 
                          className={`flex ${step.type === 'user' ? 'justify-end' : 'justify-start'} ${
                            index <= simulationStep ? 'opacity-100' : 'opacity-30'
                          }`}
                        >
                          <div className={`flex gap-2 max-w-[80%] ${step.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              step.type === 'user' ? 'bg-muted' : 'bg-gradient-primary'
                            }`}>
                              {step.type === 'user' ? (
                                <User className="w-4 h-4" />
                              ) : (
                                <Bot className="w-4 h-4 text-white" />
                              )}
                            </div>
                            <div className={`px-3 py-2 rounded-lg ${
                              step.type === 'user' 
                                ? 'bg-muted text-foreground' 
                                : 'bg-gradient-primary text-white'
                            }`}>
                              <p className="text-sm">{step.message}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {isSimulating && simulationStep < selectedScenario.steps.length - 1 && (
                        <div className="flex justify-start">
                          <div className="flex gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                              <Bot className="w-4 h-4 text-white" />
                            </div>
                            <div className="px-3 py-2 rounded-lg bg-gradient-primary text-white">
                              <div className="flex gap-1">
                                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Step {Math.min(simulationStep + 1, selectedScenario.steps.length)} of {selectedScenario.steps.length}</span>
                    <Progress 
                      value={(Math.min(simulationStep + 1, selectedScenario.steps.length) / selectedScenario.steps.length) * 100} 
                      className="w-32"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}