import { ReactNode } from "react";
import { DocsSidebar } from "./DocsSidebar";
import { RobotPreview } from "./RobotPreview";

interface MovementCommand {
  type: "forward" | "backward" | "left" | "right" | "rotate-left" | "rotate-right" | "stop";
  duration: number;
  power?: number;
}

interface DocsLayoutProps {
  children: ReactNode;
  robotHardware?: Array<{ name: string; type: "motor" | "sensor" | "servo"; position: { x: number; y: number } }>;
  movementSequence?: MovementCommand[];
  codeDescription?: string;
}

export const DocsLayout = ({ 
  children, 
  robotHardware, 
  movementSequence,
  codeDescription 
}: DocsLayoutProps) => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <DocsSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-8 py-12">
          {children}
        </div>
      </main>
      <RobotPreview 
        initializedHardware={robotHardware} 
        movementSequence={movementSequence}
        codeDescription={codeDescription}
      />
    </div>
  );
};
