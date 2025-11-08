import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { AppSidebar } from "@/components/app-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";

// Pages
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Conversations from "./pages/Conversations";
import BotManagement from "./pages/AgentManagement";
import BotBuilder from "./pages/BotBuilder";
import Knowledge from "./pages/Knowledge";
import Integrations from "./pages/Integrations";
import TeamManagement from "./pages/TeamManagement";
import Testing from "./pages/Testing";
import Settings from "./pages/Settings";
import Voice from "./pages/Voice";
import Security from "./pages/Security";
import Documentation from "./pages/Documentation";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";
import WorkflowBuilder from "./pages/WorkflowBuilder";
import Marketplace from "./pages/Marketplace";
import ExplainableAI from "./pages/ExplainableAI";
import CollaborativeEditing from "./pages/CollaborativeEditing";
import TemporalDebugger from "./pages/TemporalDebugger";
import SelfHealing from "./pages/SelfHealing";
import MultimodalInterface from "./pages/MultimodalInterface";
import AgentMonitoring from "./pages/AgentMonitoring";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="conversa-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <div className="min-h-screen flex w-full bg-background">
              <AppSidebar />
              <div className="flex-1 flex flex-col">
                <DashboardHeader />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/agents" element={<BotManagement />} />
                    <Route path="/bots" element={<BotManagement />} />
                    <Route path="/bots/builder" element={<BotBuilder />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/conversations" element={<Conversations />} />
                    <Route path="/knowledge" element={<Knowledge />} />
                    <Route path="/integrations" element={<Integrations />} />
                    <Route path="/team" element={<TeamManagement />} />
                    <Route path="/testing" element={<Testing />} />
                    <Route path="/voice" element={<Voice />} />
                    <Route path="/security" element={<Security />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/documentation" element={<Documentation />} />
                    <Route path="/workflow-builder" element={<WorkflowBuilder />} />
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/explainable-ai" element={<ExplainableAI />} />
                    <Route path="/collaborative-editing" element={<CollaborativeEditing />} />
                    <Route path="/temporal-debugger" element={<TemporalDebugger />} />
                    <Route path="/self-healing" element={<SelfHealing />} />
                    <Route path="/multimodal-interface" element={<MultimodalInterface />} />
                    <Route path="/agent-monitoring" element={<AgentMonitoring />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
