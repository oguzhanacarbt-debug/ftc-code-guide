import { DocsLayout } from "@/components/DocsLayout";
import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/CodeBlock";
import { Goal, Route } from "lucide-react";

const hardware = [
  { name: "leftFront", type: "motor" as const, position: { x: 60, y: 60 } },
  { name: "rightFront", type: "motor" as const, position: { x: 140, y: 60 } },
  { name: "leftRear", type: "motor" as const, position: { x: 60, y: 140 } },
  { name: "rightRear", type: "motor" as const, position: { x: 140, y: 140 } },
  { name: "imu", type: "sensor" as const, position: { x: 100, y: 100 } },
];

const AutonomousGuide = () => {
  return (
    <DocsLayout robotHardware={hardware}>
      <article className="prose prose-slate max-w-none">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">First Autonomous Routine</h1>
          <p className="text-lg text-muted-foreground">
            Build a simple sequence that drives off the line, scores a preload, and parks using encoder + IMU data.
          </p>
        </div>

        <Card className="p-6 mb-8 border-l-4 border-l-primary bg-primary/5">
          <div className="flex items-start gap-3">
            <Goal className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Autonomous priorities</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Consistent starting pose</li>
                <li>Dead-simple path first, fancy later</li>
                <li>Telemetry + LEDs that show progress</li>
                <li>Abort/stop button for field safety</li>
              </ul>
            </div>
          </div>
        </Card>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Route className="w-6 h-6 text-accent" />
            Command-based Autonomous template
          </h2>

          <CodeBlock
            language="java"
            code={`package org.firstinspires.ftc.teamcode;

import com.arcrobotics.ftclib.command.CommandOpMode;
import com.arcrobotics.ftclib.command.SequentialCommandGroup;
import com.arcrobotics.ftclib.command.WaitCommand;
import com.qualcomm.robotcore.eventloop.opmode.Autonomous;
import org.firstinspires.ftc.teamcode.Subsystems.DriveTrainSubsystem;
import org.firstinspires.ftc.teamcode.Subsystems.OdometrySubsystem;
import org.firstinspires.ftc.teamcode.Commands.DriveToPoseCommand;

@Autonomous(name="RookieAuto", group="Rookie")
public class RookieAuto extends CommandOpMode {
    
    private DriveTrainSubsystem driveTrainSubsystem;
    private OdometrySubsystem odometrySubsystem;

    @Override
    public void initialize() {
        // Initialize subsystems
        driveTrainSubsystem = new DriveTrainSubsystem(hardwareMap, telemetry);
        odometrySubsystem = new OdometrySubsystem(hardwareMap, telemetry);
        
        // Reset IMU and odometry to starting position
        driveTrainSubsystem.resetHeading(true);
        odometrySubsystem.ResetandCalibrateIMU();
        
        telemetry.addLine("Ready! Press START to begin.");
        telemetry.update();
    }

    @Override
    public void run() {
        waitForStart();
        if (isStopRequested()) return;
        
        // Create autonomous sequence using commands
        SequentialCommandGroup autoSequence = new SequentialCommandGroup(
            // Drive forward 24 inches (60.96 cm)
            new DriveToPoseCommand(driveTrainSubsystem, odometrySubsystem, 
                0, 60.96, 0),
            
            // Wait for robot to settle
            new WaitCommand(500),
            
            // Turn to 90 degrees
            new DriveToPoseCommand(driveTrainSubsystem, odometrySubsystem, 
                0, 60.96, 90),
            
            // Drive forward 6 inches (15.24 cm)
            new DriveToPoseCommand(driveTrainSubsystem, odometrySubsystem, 
                0, 76.2, 90),
            
            // Wait before depositing
            new WaitCommand(500),
            
            // Park: drive back 12 inches (30.48 cm)
            new DriveToPoseCommand(driveTrainSubsystem, odometrySubsystem, 
                0, 45.72, 90)
        );
        
        // Schedule the entire sequence
        autoSequence.schedule();
        
        // Run until sequence completes or stop is requested
        while (opModeIsActive() && !autoSequence.isFinished()) {
            run();
        }
        
        // Stop all motors
        driveTrainSubsystem.setMotorPowers(0, 0, 0, 0);
    }
}`}
          />
          
          <p className="text-muted-foreground mt-4">
            This uses <code className="bg-muted px-2 py-1 rounded text-sm">SequentialCommandGroup</code> to chain commands together. Each <code className="bg-muted px-2 py-1 rounded text-sm">DriveToPoseCommand</code> finishes automatically when it reaches its target, making autonomous sequences easy to read and modify.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Incremental testing plan</h2>
          <ol className="space-y-3 text-foreground">
            <li>Print each step to telemetry and watch it run on blocks.</li>
            <li>Measure the real distance traveled vs commanded; update constants.</li>
            <li>Add sensors (vision, distance) once the dead-reckoning path is stable.</li>
          </ol>
        </section>
      </article>
    </DocsLayout>
  );
};

export default AutonomousGuide;

