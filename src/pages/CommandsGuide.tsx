import { DocsLayout } from "@/components/DocsLayout";
import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/CodeBlock";
import { Workflow, Play } from "lucide-react";

const CommandsGuide = () => {
  return (
    <DocsLayout>
      <article className="prose prose-slate max-w-none">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Command-Based Programming</h1>
          <p className="text-lg text-muted-foreground">
            Pair commands with subsystems to describe robot behavior in easy-to-read sentences.
          </p>
        </div>

        <Card className="p-6 mb-8 border-l-4 border-l-primary bg-primary/5">
          <div className="flex items-start gap-3">
            <Workflow className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Vocabulary</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li><strong className="text-foreground">Command:</strong> A task (e.g., DriveWithJoysticks)</li>
                <li><strong className="text-foreground">Subsystem:</strong> Hardware owner (e.g., DriveSubsystem)</li>
                <li><strong className="text-foreground">Scheduler:</strong> Runs commands, enforces resource locking</li>
              </ul>
            </div>
          </div>
        </Card>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Play className="w-6 h-6 text-accent" />
            Example: DefaultDriveCommand (TeleOp)
          </h2>

          <CodeBlock
            language="java"
            code={`package org.firstinspires.ftc.teamcode.Commands;

import com.arcrobotics.ftclib.command.CommandBase;
import org.firstinspires.ftc.teamcode.Subsystems.DriveTrainSubsystem;

public class DefaultDriveCommand extends CommandBase {
    private final DriveTrainSubsystem driveTrainSubsystem;
    private final double x;
    private final double y;
    private final double rx;

    public DefaultDriveCommand(DriveTrainSubsystem driveTrainSubsystem, 
                               double x, double y, double rx){
        this.driveTrainSubsystem = driveTrainSubsystem;
        this.x = x;
        this.y = y;
        this.rx = rx;
        
        // This command requires exclusive access to the drive subsystem
        addRequirements(driveTrainSubsystem);
    }
    
    @Override
    public void execute() {
        super.execute();
        // Call field-centric drive with joystick inputs
        // Note: y and x are swapped to match gamepad convention
        driveTrainSubsystem.FieldCentricDrive(y, x, rx);
    }
}`}
          />

          <p className="text-muted-foreground mt-4">
            Commands stay tiny—no hardware references, just subsystem method calls. The <code className="bg-muted px-2 py-1 rounded text-sm">addRequirements()</code> call ensures only one command can use the drive subsystem at a time.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Play className="w-6 h-6 text-accent" />
            Example: DriveToPoseCommand (Autonomous)
          </h2>

          <CodeBlock
            language="java"
            code={`package org.firstinspires.ftc.teamcode.Commands;

import com.arcrobotics.ftclib.command.CommandBase;
import org.firstinspires.ftc.teamcode.Subsystems.DriveTrainSubsystem;
import org.firstinspires.ftc.teamcode.Subsystems.OdometrySubsystem;
import org.firstinspires.ftc.teamcode.Constants;

public class DriveToPoseCommand extends CommandBase {
    private final DriveTrainSubsystem drive;
    private final OdometrySubsystem odo;
    private final double targetX_CM;
    private final double targetY_CM;
    private final double targetHeading_DEG;

    public DriveToPoseCommand(DriveTrainSubsystem drive, 
                              OdometrySubsystem odo, 
                              double x_CM, double y_CM, double heading_DEG) {
        this.drive = drive;
        this.odo = odo;
        this.targetX_CM = x_CM;
        this.targetY_CM = y_CM;
        this.targetHeading_DEG = heading_DEG;
        addRequirements(drive);
    }

    @Override
    public void execute() {
        // Calculate position errors
        double errorX = targetX_CM - odo.getX_CM();
        double errorY = targetY_CM - odo.getY_CM();
        double errorH = targetHeading_DEG - odo.getHeadingDegrees();

        // Apply proportional control from Constants
        double powerX = Constants.DriveToPoseConstants.KP_X * errorX;
        double powerY = Constants.DriveToPoseConstants.KP_Y * errorY;
        double powerH = Constants.DriveToPoseConstants.KP_H * errorH;

        // Drive toward target pose
        drive.FieldCentricDrive(powerX, powerY, powerH);
    }

    @Override
    public boolean isFinished() {
        // Check if we're within tolerance
        double errorX = Math.abs(targetX_CM - odo.getX_CM());
        double errorY = Math.abs(targetY_CM - odo.getY_CM());
        double errorH = Math.abs(targetHeading_DEG - odo.getHeadingDegrees());

        return errorX < Constants.DriveToPoseConstants.POSE_TOLERANCE_X &&
               errorY < Constants.DriveToPoseConstants.POSE_TOLERANCE_Y &&
               errorH < Math.toDegrees(Constants.DriveToPoseConstants.POSE_TOLERANCE_H);
    }
}`}
          />

          <p className="text-muted-foreground mt-4">
            This command uses odometry to drive to a specific pose. It finishes automatically when within tolerance, making it perfect for autonomous sequences.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Command builder ideas</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: "SequentialCommandGroup",
                detail: "Chain steps for autonomous (drive, deposit, park).",
              },
              {
                title: "ParallelCommandGroup",
                detail: "Run intake while driving, or hold a lift position.",
              },
              {
                title: "InstantCommand",
                detail: "Flip a servo or reset encoders without writing boilerplate.",
              },
              {
                title: "WaitCommand",
                detail: "Delay between steps while sensors settle.",
              },
            ].map((item) => (
              <Card key={item.title} className="p-4 border-border">
                <h3 className="text-lg font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.detail}</p>
              </Card>
            ))}
          </div>
        </section>
      </article>
    </DocsLayout>
  );
};

export default CommandsGuide;

