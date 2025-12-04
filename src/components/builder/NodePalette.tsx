import { memo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Zap,
  Database,
  Brain,
  GitBranch,
  MessageSquare,
  Mail,
  Globe,
  Webhook,
  FileText,
  Bot,
  Sparkles,
  Search,
  Filter,
  Clock,
  Users,
  ShoppingCart,
  Headphones,
  CreditCard,
  BarChart3,
  Code,
  Phone
} from 'lucide-react';

export interface NodeTemplate {
  id: string;
  type: string;
  label: string;
  description: string;
  icon: any;
  color: string;
  category: 'triggers' | 'logic' | 'ai' | 'integrations' | 'actions';
}

const nodeTemplates: NodeTemplate[] = [
  // Triggers
  { id: 'trigger-message', type: 'trigger', label: 'User Message', description: 'Triggered on user input', icon: MessageSquare, color: '#eab308', category: 'triggers' },
  { id: 'trigger-webhook', type: 'trigger', label: 'Webhook', description: 'External webhook trigger', icon: Webhook, color: '#eab308', category: 'triggers' },
  { id: 'trigger-schedule', type: 'trigger', label: 'Schedule', description: 'Time-based trigger', icon: Clock, color: '#eab308', category: 'triggers' },
  { id: 'trigger-event', type: 'trigger', label: 'Event', description: 'Custom event trigger', icon: Zap, color: '#eab308', category: 'triggers' },
  
  // Logic
  { id: 'condition', type: 'condition', label: 'Condition', description: 'Branch logic flow', icon: GitBranch, color: '#f97316', category: 'logic' },
  { id: 'filter', type: 'condition', label: 'Filter', description: 'Filter data', icon: Filter, color: '#f97316', category: 'logic' },
  { id: 'loop', type: 'condition', label: 'Loop', description: 'Iterate over items', icon: BarChart3, color: '#f97316', category: 'logic' },
  
  // AI
  { id: 'ai-knowledge', type: 'knowledge', label: 'Knowledge Base', description: 'Query knowledge', icon: Brain, color: '#a855f7', category: 'ai' },
  { id: 'ai-sentiment', type: 'knowledge', label: 'Sentiment Analysis', description: 'Analyze sentiment', icon: Sparkles, color: '#a855f7', category: 'ai' },
  { id: 'ai-nlp', type: 'knowledge', label: 'NLP Processor', description: 'Process natural language', icon: Bot, color: '#a855f7', category: 'ai' },
  { id: 'ai-generate', type: 'knowledge', label: 'AI Response', description: 'Generate AI response', icon: MessageSquare, color: '#a855f7', category: 'ai' },
  
  // Integrations
  { id: 'int-database', type: 'data', label: 'Database', description: 'Query database', icon: Database, color: '#3b82f6', category: 'integrations' },
  { id: 'int-api', type: 'data', label: 'API Call', description: 'External API request', icon: Code, color: '#3b82f6', category: 'integrations' },
  { id: 'int-crm', type: 'data', label: 'CRM', description: 'Salesforce, HubSpot', icon: Users, color: '#3b82f6', category: 'integrations' },
  { id: 'int-helpdesk', type: 'data', label: 'Help Desk', description: 'Zendesk, Freshdesk', icon: Headphones, color: '#3b82f6', category: 'integrations' },
  { id: 'int-ecommerce', type: 'data', label: 'E-commerce', description: 'Shopify, WooCommerce', icon: ShoppingCart, color: '#3b82f6', category: 'integrations' },
  { id: 'int-payments', type: 'data', label: 'Payments', description: 'Stripe, PayPal', icon: CreditCard, color: '#3b82f6', category: 'integrations' },
  
  // Actions
  { id: 'action-email', type: 'action', label: 'Send Email', description: 'Send email notification', icon: Mail, color: '#10b981', category: 'actions' },
  { id: 'action-sms', type: 'action', label: 'Send SMS', description: 'Send text message', icon: Phone, color: '#10b981', category: 'actions' },
  { id: 'action-web', type: 'action', label: 'Web Action', description: 'Trigger web action', icon: Globe, color: '#10b981', category: 'actions' },
  { id: 'action-output', type: 'action', label: 'Output', description: 'Final response', icon: FileText, color: '#10b981', category: 'actions' },
];

interface Props {
  onDragStart: (template: NodeTemplate) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export default memo(({ onDragStart, searchTerm, onSearchChange }: Props) => {
  const filterNodes = (category: NodeTemplate['category']) => {
    return nodeTemplates.filter(
      (node) =>
        node.category === category &&
        (node.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          node.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const DraggableNode = ({ template }: { template: NodeTemplate }) => (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('application/json', JSON.stringify(template));
        onDragStart(template);
      }}
      className="cursor-grab active:cursor-grabbing"
    >
      <Card className="p-3 hover:border-primary/50 transition-all hover:shadow-md hover:scale-[1.02] bg-card/80 backdrop-blur-sm border-border/50">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 shadow-sm"
            style={{ backgroundColor: template.color }}
          >
            <template.icon className="w-4 h-4 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium truncate text-foreground">{template.label}</p>
            <p className="text-xs text-muted-foreground truncate">{template.description}</p>
          </div>
        </div>
      </Card>
    </div>
  );

  const categoryLabels = {
    triggers: 'Triggers',
    logic: 'Logic',
    ai: 'AI Nodes',
    integrations: 'Integrations',
    actions: 'Actions',
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search nodes..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          />
        </div>
      </div>

      <Tabs defaultValue="triggers" className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-5 mx-4 mt-4">
          <TabsTrigger value="triggers" className="text-xs px-2">
            <Zap className="w-3 h-3" />
          </TabsTrigger>
          <TabsTrigger value="logic" className="text-xs px-2">
            <GitBranch className="w-3 h-3" />
          </TabsTrigger>
          <TabsTrigger value="ai" className="text-xs px-2">
            <Brain className="w-3 h-3" />
          </TabsTrigger>
          <TabsTrigger value="integrations" className="text-xs px-2">
            <Database className="w-3 h-3" />
          </TabsTrigger>
          <TabsTrigger value="actions" className="text-xs px-2">
            <Mail className="w-3 h-3" />
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1 p-4">
          {(['triggers', 'logic', 'ai', 'integrations', 'actions'] as const).map((category) => (
            <TabsContent key={category} value={category} className="space-y-2 mt-0">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {categoryLabels[category]}
                </span>
                <Badge variant="secondary" className="text-xs">
                  {filterNodes(category).length}
                </Badge>
              </div>
              {filterNodes(category).map((template) => (
                <DraggableNode key={template.id} template={template} />
              ))}
              {filterNodes(category).length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No nodes found
                </p>
              )}
            </TabsContent>
          ))}
        </ScrollArea>
      </Tabs>
    </div>
  );
});
