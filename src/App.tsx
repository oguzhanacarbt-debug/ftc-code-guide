import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import GettingStarted from "./pages/GettingStarted";
import RobotInit from "./pages/RobotInit";
import Autonomous from "./pages/Autonomous";
import TeleOp from "./pages/TeleOp";
import Sensors from "./pages/Sensors";
import MovementSystems from "./pages/MovementSystems";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/getting-started" element={<GettingStarted />} />
          <Route path="/robot-init" element={<RobotInit />} />
          <Route path="/autonomous" element={<Autonomous />} />
          <Route path="/teleop" element={<TeleOp />} />
          <Route path="/sensors" element={<Sensors />} />
          <Route path="/movement-systems" element={<MovementSystems />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
