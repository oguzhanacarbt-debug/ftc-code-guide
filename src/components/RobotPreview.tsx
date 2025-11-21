import { useEffect, useState } from "react";
import { Activity } from "lucide-react";

interface HardwareItem {
  name: string;
  type: "motor" | "sensor" | "servo";
  position: { x: number; y: number };
}

interface RobotPreviewProps {
  initializedHardware?: HardwareItem[];
}

export const RobotPreview = ({ initializedHardware = [] }: RobotPreviewProps) => {
  const [hardware, setHardware] = useState<HardwareItem[]>(initializedHardware);

  useEffect(() => {
    setHardware(initializedHardware);
  }, [initializedHardware]);

  return (
    <aside className="w-80 border-l border-border bg-robot-panel h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Activity className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Robot Preview</h2>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 mb-4">
          <p className="text-sm text-muted-foreground mb-4">
            Initialize edilen donanımlar burada görünecek
          </p>
          
          {/* Robot Chassis SVG */}
          <svg
            viewBox="0 0 200 200"
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Robot Body */}
            <rect
              x="50"
              y="50"
              width="100"
              height="100"
              fill="hsl(var(--card))"
              stroke="hsl(var(--border))"
              strokeWidth="2"
              rx="4"
            />

            {/* Front indicator */}
            <polygon
              points="100,50 110,40 90,40"
              fill="hsl(var(--primary))"
            />

            {/* Motor positions */}
            {[
              { name: "leftFront", x: 60, y: 60 },
              { name: "rightFront", x: 130, y: 60 },
              { name: "leftRear", x: 60, y: 130 },
              { name: "rightRear", x: 130, y: 130 },
            ].map((motor) => {
              const isInitialized = hardware.some(
                (hw) => hw.name === motor.name && hw.type === "motor"
              );
              return (
                <g key={motor.name}>
                  <circle
                    cx={motor.x}
                    cy={motor.y}
                    r="8"
                    fill={isInitialized ? "hsl(var(--robot-highlight))" : "hsl(var(--muted))"}
                    stroke="hsl(var(--border))"
                    strokeWidth="2"
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
                  x="90"
                  y="90"
                  width="20"
                  height="20"
                  fill="hsl(var(--accent))"
                  stroke="hsl(var(--border))"
                  strokeWidth="2"
                  rx="2"
                />
                <text
                  x="100"
                  y="115"
                  fontSize="8"
                  fill="hsl(var(--accent-foreground))"
                  textAnchor="middle"
                  className="font-mono"
                >
                  IMU
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Hardware List */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-foreground mb-2">Initialized Hardware</h3>
          {hardware.length === 0 ? (
            <p className="text-xs text-muted-foreground italic">
              Henüz donanım initialize edilmedi
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
