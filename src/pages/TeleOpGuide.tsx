import { DocsLayout } from "@/components/DocsLayout";
import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/CodeBlock";
import { Gamepad, Layers } from "lucide-react";

const hardware = [
  { name: "leftFront", type: "motor" as const, position: { x: 60, y: 60 } },
  { name: "rightFront", type: "motor" as const, position: { x: 140, y: 60 } },
  { name: "leftRear", type: "motor" as const, position: { x: 60, y: 140 } },
  { name: "rightRear", type: "motor" as const, position: { x: 140, y: 140 } },
];

const TeleOpGuide = () => {
  return (
    <DocsLayout robotHardware={hardware}>
      <article className="prose prose-slate max-w-none">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Your First TeleOp</h1>
          <p className="text-lg text-muted-foreground">
            Wire together a drivetrain, simple subsystem calls, and driver-friendly controls.
          </p>
        </div>

        <Card className="p-6 mb-8 border-l-4 border-l-primary bg-primary/5">
          <div className="flex items-start gap-3">
            <Gamepad className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">TeleOp checklist</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Initialize hardware in <code className="bg-muted px-1.5 py-0.5 rounded text-xs">init()</code></li>
                <li>Read gamepad inputs every loop</li>
                <li>Send telemetry updates for drivers</li>
                <li>Add safety (slow mode, emergency stop)</li>
              </ul>
            </div>
          </div>
        </Card>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Command-based TeleOp template</h2>
          <CodeBlock
            language="java"
            code={`package org.firstinspires.ftc.teamcode;

import com.arcrobotics.ftclib.command.CommandOpMode;
import com.arcrobotics.ftclib.command.RunCommand;
import com.qualcomm.robotcore.eventloop.opmode.TeleOp;
import org.firstinspires.ftc.teamcode.Subsystems.DriveTrainSubsystem;
import org.firstinspires.ftc.teamcode.Commands.DefaultDriveCommand;

@TeleOp(name="RookieTeleOp", group="Rookie")
public class RookieTeleOp extends CommandOpMode {
    
    private DriveTrainSubsystem driveTrainSubsystem;

    @Override
    public void initialize() {
        // Initialize subsystems
        driveTrainSubsystem = new DriveTrainSubsystem(hardwareMap, telemetry);
        
        // Reset IMU heading at start
        driveTrainSubsystem.resetHeading(false);
        
        // Schedule default drive command to run continuously
        // This command reads gamepad inputs and drives the robot
        driveTrainSubsystem.setDefaultCommand(
            new RunCommand(() -> {
                double x = gamepad1.left_stick_x;
                double y = -gamepad1.left_stick_y;  // Invert Y axis
                double rx = gamepad1.right_stick_x;
                
                // Optional: Slow mode with left trigger
                if (gamepad1.left_trigger > 0.5) {
                    x *= 0.4;
                    y *= 0.4;
                    rx *= 0.4;
                }
                
                // Create and schedule drive command
                new DefaultDriveCommand(driveTrainSubsystem, x, y, rx).schedule();
            })
        );
        
        telemetry.addLine("Ready! Press START to begin.");
        telemetry.update();
    }

    @Override
    public void run() {
        // Command scheduler runs automatically
        // Subsystems update in their periodic() methods
        run();
    }
}`}
          />
          
          <p className="text-muted-foreground mt-4">
            This uses FTCLib's command-based architecture. The <code className="bg-muted px-2 py-1 rounded text-sm">DefaultDriveCommand</code> handles all the field-centric math, and the scheduler ensures it runs every loop.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Layers className="w-6 h-6 text-accent" />
            Expand with subsystems
          </h2>
          <p className="text-foreground leading-relaxed mb-4">
            Replace direct hardware references with subsystem method calls so TeleOp stays readable:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li><strong className="text-foreground">driveSubsystem.drive(gamepad1)</strong> keeps all mecanum logic outside the OpMode.</li>
            <li><strong className="text-foreground">liftSubsystem.setLevel(LiftLevel.HIGH)</strong> ties buttons to preset positions.</li>
            <li><strong className="text-foreground">intakeSubsystem.toggle()</strong> handles state + LED feedback.</li>
          </ul>
        </section>
      </article>
    </DocsLayout>
  );
};

export default TeleOpGuide;

