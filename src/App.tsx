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
import Analytics from "./pages/Analytics";
import Conversations from "./pages/Conversations";
import BotManagement from "./pages/BotManagement";
import BotBuilder from "./pages/BotBuilder";
import Knowledge from "./pages/Knowledge";
import Integrations from "./pages/Integrations";
import TeamManagement from "./pages/TeamManagement";
import Testing from "./pages/Testing";
import Settings from "./pages/Settings";
import Voice from "./pages/Voice";
import Security from "./pages/Security";
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
                  <Route path="/conversations" element={<Conversations />} />
                  <Route path="/knowledge" element={<Knowledge />} />
                  <Route path="/integrations" element={<Integrations />} />
                  <Route path="/team" element={<TeamManagement />} />
                  <Route path="/testing" element={<Testing />} />
                  <Route path="/voice" element={<Voice />} />
                  <Route path="/security" element={<Security />} />
                  <Route path="/settings" element={<Settings />} />
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
