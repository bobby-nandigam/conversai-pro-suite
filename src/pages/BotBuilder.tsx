import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"
import { 
  Bot, 
  Plus, 
  Play, 
  Save, 
  Undo, 
  Redo, 
  Settings, 
  MessageSquare, 
  Zap,
  Database,
  Brain,
  Eye,
  Trash2,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Upload,
  Link,
  Globe,
  Palette,
  Mic,
  Languages,
  Shield,
  Clock,
  BarChart3,
  Users,
  Webhook,
  Code,
  FileText,
  Image
} from "lucide-react"

export default function BotBuilder() {
  const [currentStep, setCurrentStep] = useState(0)
  const [botData, setBotData] = useState({
    // Basic Information
    name: "",
    description: "",
    category: "",
    purpose: "",
    
    // Configuration
    model: "gpt-4",
    temperature: 0.7,
    maxTokens: 2048,
    responseTime: "fast",
    
    // Personality & Tone
    personality: "professional",
    tone: "friendly",
    communicationStyle: "conversational",
    customInstructions: "",
    
    // Knowledge Base
    knowledgeFiles: [],
    websites: [],
    manualKnowledge: "",
    
    // Integrations
    channels: {
      webchat: true,
      whatsapp: false,
      slack: false,
      discord: false,
      telegram: false
    },
    apis: [],
    webhooks: [],
    
    // Training Data
    trainingPhrases: [],
    responses: [],
    
    // Advanced Settings
    fallbackMessage: "I'm sorry, I don't understand. Could you please rephrase?",
    escalationRules: [],
    analytics: true,
    logging: true,
    rateLimiting: false,
    
    // Appearance
    primaryColor: "#3b82f6",
    avatar: null,
    welcomeMessage: "Hello! How can I help you today?"
  })
  
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()

  const steps = [
    { id: 0, title: "Basic Info", icon: Bot },
    { id: 1, title: "Configuration", icon: Settings },
    { id: 2, title: "Personality", icon: Palette },
    { id: 3, title: "Knowledge", icon: Brain },
    { id: 4, title: "Integrations", icon: Link },
    { id: 5, title: "Training", icon: Database },
    { id: 6, title: "Advanced", icon: Code },
    { id: 7, title: "Preview", icon: Eye }
  ]

  const handleSaveBot = () => {
    toast({
      title: "Bot Saved!",
      description: "Your bot configuration has been saved successfully.",
    })
  }

  const handleTestBot = () => {
    setIsPreviewOpen(true)
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleDeploy = () => {
    toast({
      title: "Bot Deployed!",
      description: "Your bot is now live and ready to interact with users.",
    })
    navigate('/bots')
  }

  const updateBotData = (field: string, value: any) => {
    setBotData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const updateChannels = (channel: string, enabled: boolean) => {
    setBotData(prev => ({
      ...prev,
      channels: {
        ...prev.channels,
        [channel]: enabled
      }
    }))
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Basic Information
        return (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="botName">Bot Name</Label>
                  <Input 
                    id="botName"
                    value={botData.name}
                    onChange={(e) => updateBotData('name', e.target.value)}
                    placeholder="e.g., Customer Support Bot"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={botData.category} onValueChange={(value) => updateBotData('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer-support">Customer Support</SelectItem>
                      <SelectItem value="sales">Sales Assistant</SelectItem>
                      <SelectItem value="hr">HR Assistant</SelectItem>
                      <SelectItem value="technical">Technical Support</SelectItem>
                      <SelectItem value="general">General Purpose</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description"
                  value={botData.description}
                  onChange={(e) => updateBotData('description', e.target.value)}
                  placeholder="Describe what your bot does and its main purpose"
                  className="min-h-[100px]"
                />
              </div>
              
              <div>
                <Label htmlFor="purpose">Primary Purpose</Label>
                <Input 
                  id="purpose"
                  value={botData.purpose}
                  onChange={(e) => updateBotData('purpose', e.target.value)}
                  placeholder="e.g., Answer customer questions and resolve issues"
                />
              </div>
            </CardContent>
          </Card>
        )
        
      case 1: // Configuration
        return (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Bot Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>AI Model</Label>
                  <Select value={botData.model} onValueChange={(value) => updateBotData('model', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4">GPT-4 (Most Capable)</SelectItem>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo (Faster)</SelectItem>
                      <SelectItem value="claude-3">Claude 3 (Alternative)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Response Speed</Label>
                  <Select value={botData.responseTime} onValueChange={(value) => updateBotData('responseTime', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fast">Fast (1-2s)</SelectItem>
                      <SelectItem value="balanced">Balanced (2-4s)</SelectItem>
                      <SelectItem value="thorough">Thorough (4-8s)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label>Creativity Level: {botData.temperature}</Label>
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.1"
                  value={botData.temperature}
                  onChange={(e) => updateBotData('temperature', parseFloat(e.target.value))}
                  className="w-full mt-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Focused</span>
                  <span>Creative</span>
                </div>
              </div>
              
              <div>
                <Label>Max Response Length</Label>
                <Select value={botData.maxTokens.toString()} onValueChange={(value) => updateBotData('maxTokens', parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="512">Short (512 tokens)</SelectItem>
                    <SelectItem value="1024">Medium (1024 tokens)</SelectItem>
                    <SelectItem value="2048">Long (2048 tokens)</SelectItem>
                    <SelectItem value="4096">Very Long (4096 tokens)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )
        
      case 2: // Personality & Tone
        return (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Personality & Tone
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Personality Type</Label>
                  <Select value={botData.personality} onValueChange={(value) => updateBotData('personality', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                      <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Communication Tone</Label>
                  <Select value={botData.tone} onValueChange={(value) => updateBotData('tone', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="conversational">Conversational</SelectItem>
                      <SelectItem value="empathetic">Empathetic</SelectItem>
                      <SelectItem value="direct">Direct</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label>Communication Style</Label>
                <Select value={botData.communicationStyle} onValueChange={(value) => updateBotData('communicationStyle', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conversational">Conversational</SelectItem>
                    <SelectItem value="instructional">Instructional</SelectItem>
                    <SelectItem value="supportive">Supportive</SelectItem>
                    <SelectItem value="analytical">Analytical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="customInstructions">Custom Instructions</Label>
                <Textarea 
                  id="customInstructions"
                  value={botData.customInstructions}
                  onChange={(e) => updateBotData('customInstructions', e.target.value)}
                  placeholder="Provide specific instructions about how the bot should behave, what it should avoid, or special guidelines..."
                  className="min-h-[120px]"
                />
              </div>
              
              <div>
                <Label htmlFor="welcomeMessage">Welcome Message</Label>
                <Input 
                  id="welcomeMessage"
                  value={botData.welcomeMessage}
                  onChange={(e) => updateBotData('welcomeMessage', e.target.value)}
                  placeholder="The first message users will see"
                />
              </div>
            </CardContent>
          </Card>
        )
        
      case 3: // Knowledge Base
        return (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Knowledge Base
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium">Upload Documents</Label>
                <div className="mt-2 border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Drop files here or click to upload
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PDF, DOCX, TXT files up to 10MB
                  </p>
                  <Button variant="outline" className="mt-2">
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Files
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <Label className="text-base font-medium">Website URLs</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex gap-2">
                    <Input placeholder="https://example.com/help" />
                    <Button variant="outline">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Add websites to scrape for knowledge
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <Label htmlFor="manualKnowledge" className="text-base font-medium">Manual Knowledge</Label>
                <Textarea 
                  id="manualKnowledge"
                  value={botData.manualKnowledge}
                  onChange={(e) => updateBotData('manualKnowledge', e.target.value)}
                  placeholder="Enter any specific knowledge, FAQs, or information you want the bot to know..."
                  className="min-h-[150px] mt-2"
                />
              </div>
            </CardContent>
          </Card>
        )
        
      case 4: // Integrations
        return (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="w-5 h-5" />
                Integrations & Channels
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium mb-4 block">Communication Channels</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(botData.channels).map(([channel, enabled]) => (
                    <div key={channel} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-primary" />
                        <span className="capitalize">{channel}</span>
                      </div>
                      <Switch 
                        checked={enabled}
                        onCheckedChange={(checked) => updateChannels(channel, checked)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <Label className="text-base font-medium">API Integrations</Label>
                <div className="space-y-2 mt-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Webhook className="w-4 h-4 mr-2" />
                    Add Webhook Integration
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Database className="w-4 h-4 mr-2" />
                    Connect Database
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Code className="w-4 h-4 mr-2" />
                    Custom API
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )
        
      case 5: // Training Data
        return (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Training Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="trainingPhrases" className="text-base font-medium">Training Phrases</Label>
                <Textarea 
                  id="trainingPhrases"
                  placeholder="Enter example user questions/phrases (one per line):&#10;&#10;How do I reset my password?&#10;I need help with my account&#10;What are your business hours?"
                  className="min-h-[150px] mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="responses" className="text-base font-medium">Sample Responses</Label>
                <Textarea 
                  id="responses"
                  placeholder="Enter example bot responses (one per line):&#10;&#10;I can help you reset your password. Please click on 'Forgot Password' on the login page.&#10;I'm here to help with your account. What specific issue are you experiencing?&#10;Our business hours are Monday-Friday 9AM-5PM EST."
                  className="min-h-[150px] mt-2"
                />
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Training Tips</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Provide diverse examples of how users might ask the same question</li>
                  <li>• Include edge cases and variations in language</li>
                  <li>• Add responses for common follow-up questions</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )
        
      case 6: // Advanced Settings
        return (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Advanced Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="fallbackMessage">Fallback Message</Label>
                <Input 
                  id="fallbackMessage"
                  value={botData.fallbackMessage}
                  onChange={(e) => updateBotData('fallbackMessage', e.target.value)}
                  placeholder="Message when bot doesn't understand"
                />
              </div>
              
              <div className="space-y-4">
                <Label className="text-base font-medium">Features</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Analytics & Reporting</span>
                      <p className="text-sm text-muted-foreground">Track conversations and performance</p>
                    </div>
                    <Switch 
                      checked={botData.analytics}
                      onCheckedChange={(checked) => updateBotData('analytics', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Conversation Logging</span>
                      <p className="text-sm text-muted-foreground">Store conversation history</p>
                    </div>
                    <Switch 
                      checked={botData.logging}
                      onCheckedChange={(checked) => updateBotData('logging', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Rate Limiting</span>
                      <p className="text-sm text-muted-foreground">Limit messages per user</p>
                    </div>
                    <Switch 
                      checked={botData.rateLimiting}
                      onCheckedChange={(checked) => updateBotData('rateLimiting', checked)}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <Label>Bot Avatar Color</Label>
                <div className="flex gap-2 mt-2">
                  {['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'].map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 ${botData.primaryColor === color ? 'border-foreground' : 'border-transparent'}`}
                      style={{ backgroundColor: color }}
                      onClick={() => updateBotData('primaryColor', color)}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )
        
      case 7: // Preview
        return (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Preview & Deploy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-4">Bot Summary</h3>
                <div className="space-y-2">
                  <p><strong>Name:</strong> {botData.name || 'Unnamed Bot'}</p>
                  <p><strong>Category:</strong> {botData.category || 'Not specified'}</p>
                  <p><strong>Model:</strong> {botData.model}</p>
                  <p><strong>Personality:</strong> {botData.personality}</p>
                  <p><strong>Active Channels:</strong> {Object.entries(botData.channels).filter(([_, enabled]) => enabled).map(([channel]) => channel).join(', ') || 'None'}</p>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-3">Test Conversation</h4>
                <div className="space-y-3">
                  <div className="bg-primary text-primary-foreground p-3 rounded-lg max-w-xs">
                    {botData.welcomeMessage}
                  </div>
                  <div className="bg-muted p-3 rounded-lg max-w-xs ml-auto">
                    Hello, I need help with my account
                  </div>
                  <div className="bg-primary text-primary-foreground p-3 rounded-lg max-w-xs">
                    I'd be happy to help you with your account. What specific issue are you experiencing?
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={handleTestBot}>
                  <Play className="w-4 h-4 mr-2" />
                  Test Bot
                </Button>
                <Button className="flex-1" onClick={handleDeploy}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Deploy Bot
                </Button>
              </div>
            </CardContent>
          </Card>
        )
        
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border sticky top-0 bg-background/80 backdrop-blur z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/bots')}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold">Create New Bot</h1>
              <p className="text-sm text-muted-foreground">Step {currentStep + 1} of {steps.length}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleSaveBot}>
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
          </div>
        </div>
        
        {/* Progress Steps */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  index <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {index < currentStep ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <step.icon className="w-4 h-4" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    index < currentStep ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {steps.map((step, index) => (
              <span key={step.id} className={`text-xs ${
                index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {step.title}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {renderStepContent()}
      </div>
      
      {/* Navigation */}
      <div className="sticky bottom-0 bg-background border-t border-border p-4">
        <div className="flex justify-between max-w-2xl mx-auto">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <Button 
            onClick={currentStep === steps.length - 1 ? handleDeploy : handleNext}
            disabled={currentStep === steps.length - 1 && (!botData.name || !botData.description)}
          >
            {currentStep === steps.length - 1 ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Deploy Bot
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Preview Modal */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Test Your Bot</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Bot className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm font-medium">{botData.name || 'Your Bot'}</span>
              </div>
              <p className="text-sm">{botData.welcomeMessage}</p>
            </div>
            <Input placeholder="Type your message..." />
            <Button className="w-full">
              <MessageSquare className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}