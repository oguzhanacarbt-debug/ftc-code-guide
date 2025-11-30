import { useEffect, useState } from "react";
import { Activity, Play, Square, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";

interface HardwareItem {
  name: string;
  type: "motor" | "sensor" | "servo";
  position: { x: number; y: number };
}

interface MovementCommand {
  type: "forward" | "backward" | "left" | "right" | "rotate-left" | "rotate-right" | "stop";
  duration: number;
  power?: number;
}

interface RobotPreviewProps {
  initializedHardware?: HardwareItem[];
  movementSequence?: MovementCommand[];
  codeDescription?: string;
}

export const RobotPreview = ({ 
  initializedHardware = [], 
  movementSequence = [],
  codeDescription 
}: RobotPreviewProps) => {
  const [hardware, setHardware] = useState<HardwareItem[]>(initializedHardware);
  const [isRunning, setIsRunning] = useState(false);
  const [currentCommand, setCurrentCommand] = useState<MovementCommand | null>(null);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    setHardware(initializedHardware);
  }, [initializedHardware]);

  useEffect(() => {
    if (!isRunning || movementSequence.length === 0) return;

    let commandIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const executeCommand = () => {
      if (commandIndex >= movementSequence.length) {
        setIsRunning(false);
        setCurrentCommand(null);
        return;
      }

      const command = movementSequence[commandIndex];
      setCurrentCommand(command);

      // Animate movement
      const startPos = { x: position.x, y: position.y };
      const startRot = rotation;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / command.duration, 1);

        switch (command.type) {
          case "forward":
            setPosition({
              x: startPos.x,
              y: startPos.y - (50 * progress)
            });
            break;
          case "backward":
            setPosition({
              x: startPos.x,
              y: startPos.y + (50 * progress)
            });
            break;
          case "left":
            setPosition({
              x: startPos.x - (50 * progress),
              y: startPos.y
            });
            break;
          case "right":
            setPosition({
              x: startPos.x + (50 * progress),
              y: startPos.y
            });
            break;
          case "rotate-left":
            setRotation(startRot - (90 * progress));
            break;
          case "rotate-right":
            setRotation(startRot + (90 * progress));
            break;
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          commandIndex++;
          timeoutId = setTimeout(executeCommand, 100);
        }
      };

      animate();
    };

    executeCommand();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isRunning, movementSequence]);

  const handleRun = () => {
    setPosition({ x: 100, y: 100 });
    setRotation(0);
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    setCurrentCommand(null);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentCommand(null);
    setPosition({ x: 100, y: 100 });
    setRotation(0);
  };

  return (
    <aside className="w-80 border-l border-border bg-robot-panel h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Activity className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Robot Preview</h2>
        </div>

        {movementSequence.length > 0 && (
          <div className="mb-4 space-y-2">
            <div className="flex gap-2">
              <Button
                onClick={handleRun}
                disabled={isRunning}
                size="sm"
                className="flex-1"
              >
                <Play className="w-4 h-4 mr-1" />
                Run
              </Button>
              <Button
                onClick={handleStop}
                disabled={!isRunning}
                size="sm"
                variant="secondary"
              >
                <Square className="w-4 h-4" />
              </Button>
              <Button
                onClick={handleReset}
                size="sm"
                variant="outline"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
            {isRunning && currentCommand && (
              <div className="text-xs text-muted-foreground bg-accent/20 px-3 py-2 rounded">
                Executing: <span className="font-semibold capitalize">{currentCommand.type}</span>
              </div>
            )}
            {codeDescription && (
              <p className="text-xs text-muted-foreground italic">{codeDescription}</p>
            )}
          </div>
        )}

        <div className="bg-card border border-border rounded-lg p-4 mb-4">
          <p className="text-sm text-muted-foreground mb-4">
            {movementSequence.length > 0 ? "Click 'Run' to simulate movement" : "Initialized hardware will appear here"}
          </p>
          
          {/* Robot Chassis SVG */}
          <svg
            viewBox="0 0 200 200"
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g transform={`translate(${position.x}, ${position.y}) rotate(${rotation}, 0, 0)`}>
              {/* Robot Body */}
              <rect
                x="-50"
                y="-50"
                width="100"
                height="100"
                fill="hsl(var(--card))"
                stroke="hsl(var(--border))"
                strokeWidth="2"
                rx="4"
                className={isRunning ? "transition-all duration-200" : ""}
              />

              {/* Front indicator */}
              <polygon
                points="0,-50 10,-60 -10,-60"
                fill="hsl(var(--primary))"
              />

              {/* Motor positions */}
              {[
                { name: "leftFront", x: -40, y: -40 },
                { name: "rightFront", x: 30, y: -40 },
                { name: "leftRear", x: -40, y: 30 },
                { name: "rightRear", x: 30, y: 30 },
              ].map((motor) => {
                const isInitialized = hardware.some(
                  (hw) => hw.name === motor.name && hw.type === "motor"
                );
                const isActive = isRunning && isInitialized;
                return (
                  <g key={motor.name}>
                    <circle
                      cx={motor.x}
                      cy={motor.y}
                      r="8"
                      fill={isInitialized ? "hsl(var(--robot-highlight))" : "hsl(var(--muted))"}
                      stroke="hsl(var(--border))"
                      strokeWidth="2"
                      className={isActive ? "animate-pulse" : ""}
                    />
                    {isInitialized && (
                      <text
                        x={motor.x}
                        y={motor.y + 20}
                        fontSize="8"
                        fill="hsl(var(--primary))"
                        textAnchor="middle"
                        className="font-mono font-bold"
                      >
                        {motor.name}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* IMU position */}
              {hardware.some((hw) => hw.type === "sensor") && (
                <g>
                  <rect
                    x="-10"
                    y="-10"
                    width="20"
                    height="20"
                    fill="hsl(var(--accent))"
                    stroke="hsl(var(--border))"
                    strokeWidth="2"
                    rx="2"
                  />
                  <text
                    x="0"
                    y="25"
                    fontSize="8"
                    fill="hsl(var(--accent-foreground))"
                    textAnchor="middle"
                    className="font-mono"
                  >
                    IMU
                  </text>
                </g>
              )}
            </g>
          </svg>
        </div>

        {/* Hardware List */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-foreground mb-2">Initialized Hardware</h3>
          {hardware.length === 0 ? (
            <p className="text-xs text-muted-foreground italic">
              No hardware initialized yet
            </p>
          ) : (
            <ul className="space-y-1">
              {hardware.map((item, index) => (
                <li
                  key={index}
                  className="text-xs bg-sidebar-accent px-3 py-2 rounded-md flex items-center justify-between"
                >
                  <span className="font-mono text-foreground">{item.name}</span>
                  <span className="text-muted-foreground capitalize">{item.type}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </aside>
  );
};
