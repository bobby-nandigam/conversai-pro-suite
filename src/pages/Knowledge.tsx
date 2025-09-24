import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  Book, 
  Plus, 
  Search, 
  Upload, 
  FileText, 
  Globe, 
  Edit, 
  Trash2,
  Eye,
  Download,
  Link,
  Tag,
  Calendar,
  User,
  BarChart3,
  Settings,
  Filter
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const mockDocuments = [
  {
    id: 1,
    title: "Product User Guide",
    type: "document",
    size: "2.4 MB",
    pages: 45,
    uploadDate: "2024-01-15",
    status: "processed",
    tags: ["product", "guide", "help"],
    views: 1250,
    author: "John Smith"
  },
  {
    id: 2,
    title: "API Documentation",
    type: "document", 
    size: "1.8 MB",
    pages: 32,
    uploadDate: "2024-01-10",
    status: "processed",
    tags: ["api", "technical", "developer"],
    views: 856,
    author: "Sarah Johnson"
  },
  {
    id: 3,
    title: "Pricing FAQ",
    type: "faq",
    questions: 28,
    uploadDate: "2024-01-08",
    status: "processed", 
    tags: ["pricing", "billing", "faq"],
    views: 2341,
    author: "Mike Chen"
  }
]

const mockFAQs = [
  {
    id: 1,
    question: "What is your refund policy?",
    answer: "We offer a 30-day money-back guarantee for all our products. If you're not satisfied, contact our support team for a full refund.",
    category: "Billing",
    tags: ["refund", "policy", "billing"],
    lastUpdated: "2024-01-15",
    views: 1250
  },
  {
    id: 2,
    question: "How do I upgrade my plan?",
    answer: "You can upgrade your plan at any time from your account settings. Go to Billing > Change Plan and select your desired tier.",
    category: "Account",
    tags: ["upgrade", "plan", "billing"],
    lastUpdated: "2024-01-12",
    views: 890
  },
  {
    id: 3,
    question: "Is my data secure?",
    answer: "Yes, we use enterprise-grade encryption and security measures to protect your data. All data is encrypted in transit and at rest.",
    category: "Security",
    tags: ["security", "data", "privacy"],
    lastUpdated: "2024-01-10",
    views: 2100
  }
]

const mockWebsites = [
  {
    id: 1,
    url: "https://docs.company.com",
    title: "Company Documentation",
    pages: 156,
    lastCrawl: "2024-01-15",
    status: "active",
    frequency: "weekly"
  },
  {
    id: 2,
    url: "https://blog.company.com", 
    title: "Company Blog",
    pages: 89,
    lastCrawl: "2024-01-14",
    status: "active",
    frequency: "daily"
  }
]

export default function Knowledge() {
  const [activeTab, setActiveTab] = useState("documents")
  const [searchTerm, setSearchTerm] = useState("")
  const [documents, setDocuments] = useState(mockDocuments)
  const [faqs, setFAQs] = useState(mockFAQs)
  const [websites, setWebsites] = useState(mockWebsites)
  const [newFAQ, setNewFAQ] = useState({ question: "", answer: "", category: "", tags: "" })
  const [newWebsite, setNewWebsite] = useState("")
  const { toast } = useToast()

  const handleAddFAQ = () => {
    if (!newFAQ.question || !newFAQ.answer) return
    
    const faq = {
      id: faqs.length + 1,
      question: newFAQ.question,
      answer: newFAQ.answer,
      category: newFAQ.category || "General",
      tags: newFAQ.tags.split(",").map(t => t.trim()).filter(Boolean),
      lastUpdated: new Date().toISOString().split('T')[0],
      views: 0
    }
    
    setFAQs([...faqs, faq])
    setNewFAQ({ question: "", answer: "", category: "", tags: "" })
    toast({
      title: "FAQ Added",
      description: "New FAQ has been added to your knowledge base."
    })
  }

  const handleAddWebsite = () => {
    if (!newWebsite) return
    
    const website = {
      id: websites.length + 1,
      url: newWebsite,
      title: "New Website",
      pages: 0,
      lastCrawl: "Pending",
      status: "crawling" as const,
      frequency: "weekly" as const
    }
    
    setWebsites([...websites, website])
    setNewWebsite("")
    toast({
      title: "Website Added",
      description: "Website crawling has started. This may take a few minutes."
    })
  }

  const handleDeleteDocument = (id: number) => {
    setDocuments(docs => docs.filter(d => d.id !== id))
    toast({
      title: "Document Deleted",
      description: "Document has been removed from your knowledge base."
    })
  }

  const handleDeleteFAQ = (id: number) => {
    setFAQs(faqs => faqs.filter(f => f.id !== id))
    toast({
      title: "FAQ Deleted", 
      description: "FAQ has been removed from your knowledge base."
    })
  }

  const filteredDocuments = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Knowledge Management</h1>
          <p className="text-muted-foreground">Upload documents, create FAQs, and manage your bot's knowledge base</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="glass">
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Document</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-2">Drag and drop files here, or click to browse</p>
                  <p className="text-xs text-muted-foreground">Supports PDF, DOC, TXT files up to 10MB</p>
                  <Button variant="outline" className="mt-4">Choose Files</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="ai">
            <Plus className="w-4 h-4 mr-2" />
            New FAQ
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-ai">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Documents</p>
                <p className="text-2xl font-bold">{documents.length}</p>
              </div>
              <FileText className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-ai">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">FAQ Entries</p>
                <p className="text-2xl font-bold">{faqs.length}</p>
              </div>
              <Book className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-ai">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Websites</p>
                <p className="text-2xl font-bold">{websites.length}</p>
              </div>
              <Globe className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-ai">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">{documents.reduce((acc, doc) => acc + doc.views, 0) + faqs.reduce((acc, faq) => acc + faq.views, 0)}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="card-ai">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search knowledge base..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
          <TabsTrigger value="websites">Websites</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-4">
          <div className="grid gap-4">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id} className="card-ai">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{doc.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span>{doc.size}</span>
                          <span>{doc.pages} pages</span>
                          <span>Uploaded {doc.uploadDate}</span>
                          <span>By {doc.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {doc.tags.map(tag => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                          ))}
                          <Badge variant="outline" className="text-success">
                            {doc.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right text-sm text-muted-foreground mr-4">
                        <div>{doc.views} views</div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteDocument(doc.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="faqs" className="space-y-4">
          {/* Add FAQ Form */}
          <Card className="card-ai">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add New FAQ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Question"
                  value={newFAQ.question}
                  onChange={(e) => setNewFAQ({...newFAQ, question: e.target.value})}
                />
                <Input
                  placeholder="Category"
                  value={newFAQ.category}
                  onChange={(e) => setNewFAQ({...newFAQ, category: e.target.value})}
                />
              </div>
              <Textarea
                placeholder="Answer"
                value={newFAQ.answer}
                onChange={(e) => setNewFAQ({...newFAQ, answer: e.target.value})}
                rows={3}
              />
              <Input
                placeholder="Tags (comma separated)"
                value={newFAQ.tags}
                onChange={(e) => setNewFAQ({...newFAQ, tags: e.target.value})}
              />
              <Button onClick={handleAddFAQ} className="bg-gradient-primary">
                Add FAQ
              </Button>
            </CardContent>
          </Card>

          {/* FAQ List */}
          <div className="grid gap-4">
            {filteredFAQs.map((faq) => (
              <Card key={faq.id} className="card-ai">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground mb-3">{faq.answer}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span>Category: {faq.category}</span>
                        <span>Updated: {faq.lastUpdated}</span>
                        <span>{faq.views} views</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {faq.tags.map(tag => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteFAQ(faq.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="websites" className="space-y-4">
          {/* Add Website Form */}
          <Card className="card-ai">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Add Website to Crawl
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Input
                  placeholder="https://example.com"
                  value={newWebsite}
                  onChange={(e) => setNewWebsite(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleAddWebsite} className="bg-gradient-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Website
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Website List */}
          <div className="grid gap-4">
            {websites.map((website) => (
              <Card key={website.id} className="card-ai">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <Globe className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{website.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{website.url}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span>{website.pages} pages</span>
                          <span>Last crawl: {website.lastCrawl}</span>
                          <span>Frequency: {website.frequency}</span>
                        </div>
                        <Badge variant="outline" className={
                          website.status === 'active' ? 'text-success' : 
                          website.status === 'crawling' ? 'text-warning' : 'text-muted-foreground'
                        }>
                          {website.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Link className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}