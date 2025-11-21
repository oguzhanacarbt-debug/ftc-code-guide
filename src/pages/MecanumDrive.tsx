import { DocsLayout } from "@/components/DocsLayout";
import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/CodeBlock";
import { Compass, Move } from "lucide-react";

const hardware = [
  { name: "leftFront", type: "motor" as const, position: { x: 60, y: 60 } },
  { name: "rightFront", type: "motor" as const, position: { x: 140, y: 60 } },
  { name: "leftRear", type: "motor" as const, position: { x: 60, y: 140 } },
  { name: "rightRear", type: "motor" as const, position: { x: 140, y: 140 } },
];

const MecanumDrive = () => {
  return (
    <DocsLayout robotHardware={hardware}>
      <article className="prose prose-slate max-w-none">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Mecanum Drivetrain Basics</h1>
          <p className="text-lg text-muted-foreground">
            Learn how to translate joystick inputs into omnidirectional motion with proper normalization and field-centric math.
          </p>
        </div>

        <Card className="p-6 mb-8 border-l-4 border-l-primary bg-primary/5">
          <div className="flex items-start gap-3">
            <Compass className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Four motions to combine</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Forward/backward (drive)</li>
                <li>Left/right (strafe)</li>
                <li>Rotation (turn)</li>
                <li>Field-centric heading offset (optional)</li>
              </ul>
            </div>
          </div>
        </Card>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Robot-centric drive (basic)</h2>
          <CodeBlock
            language="java"
            code={`// Robot-centric drive for autonomous
public void RobotCentricDriveToPose(double forward, double strafe, double rx){
    double max;
    
    // Scale inputs to max speeds from Constants
    forward = Range.scale(forward, -1, 1, 
        -Constants.DriveTrainConstants.MAX_Y_AUTO_SPEED, 
        Constants.DriveTrainConstants.MAX_Y_AUTO_SPEED);
    strafe = Range.scale(strafe, -1, 1, 
        -Constants.DriveTrainConstants.MAX_X_AUTO_SPEED, 
        Constants.DriveTrainConstants.MAX_X_AUTO_SPEED);
    rx = Range.scale(rx, -1, 1, 
        -Constants.DriveTrainConstants.MAX_RX_AUTO_SPEED, 
        Constants.DriveTrainConstants.MAX_RX_AUTO_SPEED);
    
    // Calculate mecanum wheel powers
    double FrontLeftPower = forward + strafe + rx;
    double FrontRightPower = forward - strafe - rx;
    double BackLeftPower = forward - strafe + rx;
    double BackRightPower = forward + strafe - rx;
    
    // Normalize to prevent clipping
    max = Math.max(Math.abs(FrontLeftPower), Math.abs(FrontRightPower));
    max = Math.max(max, Math.abs(BackLeftPower));
    max = Math.max(max, Math.abs(BackRightPower));
    
    if (max > 1.0) {
        FrontLeftPower /= max;
        FrontRightPower /= max;
        BackLeftPower /= max;
        BackRightPower /= max;
    }
    
    setMotorPowers(FrontLeftPower, FrontRightPower, BackLeftPower, BackRightPower);
}`}
          />

          <p className="text-muted-foreground mt-4">
            The normalization step keeps outputs between -1 and 1 so you never clip power mid-match. This is essential for mecanum drives.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Move className="w-6 h-6 text-accent" />
            Field-centric drive (TeleOp)
          </h2>
          <p className="text-foreground leading-relaxed mb-4">
            Combine your IMU heading with joystick vectors so drivers push the stick relative to the field instead of the robot. This makes driving much more intuitive.
          </p>

          <CodeBlock
            language="java"
            code={`public void FieldCentricDrive(double x, double y, double rx){
    double max;
    
    // Scale inputs to max speeds from Constants
    y = Range.scale(y, -1, 1, 
        -Constants.DriveTrainConstants.MAX_Y_SPEED, 
        Constants.DriveTrainConstants.MAX_Y_SPEED);
    x = Range.scale(x, -1, 1, 
        -Constants.DriveTrainConstants.MAX_X_SPEED, 
        Constants.DriveTrainConstants.MAX_X_SPEED);
    rx = Range.scale(rx, -1, 1, 
        -Constants.DriveTrainConstants.MAX_RX_SPEED, 
        Constants.DriveTrainConstants.MAX_RX_SPEED);
    
    // Get current robot heading in radians
    double botHeading = getHeadingRadians();
    
    // Rotate joystick vector by negative heading (field-centric math)
    double rotX = x * Math.cos(-botHeading) - y * Math.sin(-botHeading);
    double rotY = x * Math.sin(-botHeading) + y * Math.cos(-botHeading);
    
    // Calculate mecanum wheel powers
    double FrontLeftPower = rotY + rotX + rx;
    double FrontRightPower = rotY - rotX - rx;
    double BackLeftPower = rotY - rotX + rx;
    double BackRightPower = rotY + rotX - rx;
    
    // Normalize to prevent clipping
    max = Math.max(Math.abs(FrontLeftPower), Math.abs(FrontRightPower));
    if (max > 1.0) {
        FrontLeftPower /= max;
        FrontRightPower /= max;
        BackLeftPower /= max;
        BackRightPower /= max;
    }
    
    setMotorPowers(FrontLeftPower, FrontRightPower, BackLeftPower, BackRightPower);
}

// Helper method to get heading
public double getHeadingRadians(){
    return imu.getRobotYawPitchRollAngles().getYaw(AngleUnit.RADIANS);
}`}
          />

          <p className="text-muted-foreground mt-4">
            Remember to re-zero your IMU at the start of every match so field-centric math is accurate. Use <code className="bg-muted px-2 py-1 rounded text-sm">imu.resetYaw()</code> in your OpMode init.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Gamepad ergonomics</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: "Slow mode trigger",
                detail: "Scale power by 0.4 while the left trigger is held for lining up scoring.",
              },
              {
                title: "Snap rotation buttons",
                detail: "Assign d-pad left/right to rotate to preset headings with a PID command.",
              },
            ].map((tip) => (
              <Card key={tip.title} className="p-4 border-border">
                <h3 className="text-lg font-semibold text-foreground mb-1">{tip.title}</h3>
                <p className="text-sm text-muted-foreground">{tip.detail}</p>
              </Card>
            ))}
          </div>
        </section>
      </article>
    </DocsLayout>
  );
};

export default MecanumDrive;

