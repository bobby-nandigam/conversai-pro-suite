import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";

// Pages
import Dashboard from "./pages/Dashboard";
import BotManagement from "./pages/BotManagement";
import BotBuilder from "./pages/BotBuilder";
import Analytics from "./pages/Analytics";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
                  <Route path="/bots" element={<BotManagement />} />
                  <Route path="/bots/builder" element={
                    <BotBuilder />
                  } />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/conversations" element={
                    <Placeholder 
                      title="Conversation Management" 
                      description="Monitor live conversations, manage handoffs, and review chat history across all channels." 
                    />
                  } />
                  <Route path="/knowledge" element={
                    <Placeholder 
                      title="Knowledge Management" 
                      description="Upload documents, create FAQs, and manage your bot's knowledge base with advanced search capabilities." 
                    />
                  } />
                  <Route path="/integrations" element={
                    <Placeholder 
                      title="Integration Hub" 
                      description="Connect with CRMs, help desks, e-commerce platforms, and other business tools seamlessly." 
                    />
                  } />
                  <Route path="/team" element={
                    <Placeholder 
                      title="Team Management" 
                      description="Invite team members, manage roles and permissions, and organize your workspace efficiently." 
                    />
                  } />
                  <Route path="/testing" element={
                    <Placeholder 
                      title="Testing & Optimization" 
                      description="Run A/B tests, simulate conversations, and optimize your bot's performance with advanced testing tools." 
                    />
                  } />
                  <Route path="/voice" element={
                    <Placeholder 
                      title="Voice Interface" 
                      description="Enable voice interactions, speech-to-text, and voice response capabilities for your AI assistants." 
                    />
                  } />
                  <Route path="/security" element={
                    <Placeholder 
                      title="Security & Compliance" 
                      description="Manage data encryption, access controls, audit logs, and ensure GDPR compliance for your platform." 
                    />
                  } />
                  <Route path="/settings" element={
                    <Placeholder 
                      title="Platform Settings" 
                      description="Configure global settings, manage billing, customize branding, and control platform-wide preferences." 
                    />
                  } />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
