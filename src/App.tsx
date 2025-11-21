import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import GettingStarted from "./pages/GettingStarted";
import RobotInit from "./pages/RobotInit";
import TeleOpGuide from "./pages/TeleOpGuide";
import MecanumDrive from "./pages/MecanumDrive";
import ConstantsGuide from "./pages/ConstantsGuide";
import MotorSettings from "./pages/MotorSettings";
import Subsystems from "./pages/Subsystems";
import CommandsGuide from "./pages/CommandsGuide";
import IMUSubsystem from "./pages/IMUSubsystem";
import SensorIntegration from "./pages/SensorIntegration";
import AutonomousGuide from "./pages/AutonomousGuide";
import FTCLabGuide from "./pages/FTCLabGuide";
import CodeQuality from "./pages/CodeQuality";
import SeasonExample from "./pages/SeasonExample";
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
          <Route path="/teleop" element={<TeleOpGuide />} />
          <Route path="/mecanum-drive" element={<MecanumDrive />} />
          <Route path="/constants" element={<ConstantsGuide />} />
          <Route path="/motor-settings" element={<MotorSettings />} />
          <Route path="/subsystems" element={<Subsystems />} />
          <Route path="/commands" element={<CommandsGuide />} />
          <Route path="/imu-subsystem" element={<IMUSubsystem />} />
          <Route path="/sensor-integration" element={<SensorIntegration />} />
          <Route path="/autonomous" element={<AutonomousGuide />} />
          <Route path="/ftclab" element={<FTCLabGuide />} />
          <Route path="/code-quality" element={<CodeQuality />} />
          <Route path="/season-example" element={<SeasonExample />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
